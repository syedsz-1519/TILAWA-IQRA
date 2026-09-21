/**
 * Midnight refresh utilities
 * Auto-refresh data at midnight (new day) without requiring page reload
 * Handles timezone, DST transitions, and browser sleep
 */

interface MidnightRefreshCallback {
  (): Promise<void> | void
}

let midnightTimeout: NodeJS.Timeout | null = null
let lastExecutionDate: string | null = null
const callbacks: Set<MidnightRefreshCallback> = new Set()

/**
 * Calculate milliseconds until next midnight in local timezone
 * Accounts for DST and timezone changes
 */
function msUntilMidnight(): number {
  const now = new Date()
  const today = new Date(now)
  today.setHours(0, 0, 0, 0)

  // Get tomorrow's midnight in local time
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  let msUntil = tomorrow.getTime() - now.getTime()

  // Safety check: if calculation gives negative or very small number, add 24h
  if (msUntil < 100) {
    msUntil += 24 * 60 * 60 * 1000
  }

  return msUntil
}

/**
 * Get today's date string for comparison
 */
function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Run all registered callbacks and reschedule for next midnight
 */
async function executeMidnightRefresh(): Promise<void> {
  const today = getTodayDateString()

  // Prevent multiple executions on same day
  if (lastExecutionDate === today) {
    console.log('✅ Midnight refresh already executed today')
    return
  }

  lastExecutionDate = today
  console.log('🌙 Midnight refresh triggered')

  // Clear all daily caches
  const cacheKeys = [
    'tilawa_hijri_date_cache',
    'tilawa_hijri_cache_date',
    'tilawa_daily_ayah_cache',
    'tilawa_daily_ayah_date',
    'tilawa_prayer_times_cache',
    'tilawa_prayer_times_date',
    'tilawa_adhkar_progress',
    'tilawa_adhkar_date',
  ]

  cacheKeys.forEach((key) => {
    try {
      localStorage.removeItem(key)
    } catch {
      // localStorage might be unavailable
    }
  })

  // Execute all callbacks
  for (const callback of callbacks) {
    try {
      await callback()
    } catch (error) {
      console.error('Error in midnight refresh callback:', error)
    }
  }

  // Reschedule for next midnight
  scheduleMidnightRefresh()
}

/**
 * Schedule the midnight refresh
 * Caps timeout to 25 hours max (browser tab timeout limit is 24.8 days but capping for safety)
 */
function scheduleMidnightRefresh(): void {
  // Clear existing timeout
  if (midnightTimeout) {
    clearTimeout(midnightTimeout)
  }

  let msUntil = msUntilMidnight()

  // Cap to 25 hours to prevent browser timeout issues
  if (msUntil > 25 * 60 * 60 * 1000) {
    msUntil = 25 * 60 * 60 * 1000
  }

  const minutesUntil = Math.round(msUntil / 1000 / 60)
  console.log(`⏰ Midnight refresh scheduled in ${minutesUntil} minutes`)

  midnightTimeout = setTimeout(() => {
    executeMidnightRefresh()
  }, msUntil)
}

/**
 * Schedule a callback to run at midnight
 * Returns unsubscribe function
 */
export function onMidnightRefresh(callback: MidnightRefreshCallback): () => void {
  callbacks.add(callback)

  // Return unsubscribe function
  return () => {
    callbacks.delete(callback)
  }
}

/**
 * Initialize midnight refresh system
 * Call this once in your app root (e.g., layout.tsx)
 */
export function initializeMidnightRefresh(): void {
  if (typeof window === 'undefined') return

  console.log('🌙 Initializing midnight refresh system')

  // Check if we need to refresh (in case of DST transition or date change)
  const savedDate = localStorage.getItem('tilawa_last_refresh_date')
  const today = getTodayDateString()

  if (savedDate && savedDate !== today) {
    console.log('📅 Date changed, executing refresh immediately')
    lastExecutionDate = null // Reset so it executes
  }

  localStorage.setItem('tilawa_last_refresh_date', today)

  // Schedule for midnight
  scheduleMidnightRefresh()

  // Handle browser wake from sleep
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Check if we crossed midnight while tab was hidden
        const currentDate = getTodayDateString()
        if (lastExecutionDate && lastExecutionDate !== currentDate) {
          console.log('🌙 Tab woke after midnight, executing refresh')
          executeMidnightRefresh()
        }
      }
    })

    // Also listen for online event (in case device went offline)
    window.addEventListener('online', () => {
      const currentDate = getTodayDateString()
      if (lastExecutionDate && lastExecutionDate !== currentDate) {
        console.log('🌙 Device came online after midnight, executing refresh')
        executeMidnightRefresh()
      }
    })
  }
}

/**
 * Cleanup midnight refresh on app unmount
 */
export function cleanupMidnightRefresh(): void {
  if (midnightTimeout) {
    clearTimeout(midnightTimeout)
    midnightTimeout = null
  }
}

/**
 * Force immediate refresh (useful for testing/debugging)
 */
export async function forceMidnightRefresh(): Promise<void> {
  lastExecutionDate = null // Reset so it executes
  await executeMidnightRefresh()
}
