/**
 * Midnight refresh utilities
 * Auto-refresh data at midnight (new day) without requiring page reload
 */

interface MidnightRefreshCallback {
  (): Promise<void> | void
}

let midnightTimeout: NodeJS.Timeout | null = null
const callbacks: Set<MidnightRefreshCallback> = new Set()

/**
 * Calculate milliseconds until next midnight
 */
function msUntilMidnight(): number {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  return tomorrow.getTime() - now.getTime()
}

/**
 * Schedule a callback to run at midnight
 */
export function onMidnightRefresh(callback: MidnightRefreshCallback): () => void {
  callbacks.add(callback)

  // Return unsubscribe function
  return () => {
    callbacks.delete(callback)
  }
}

/**
 * Run all registered callbacks and reschedule for next midnight
 */
async function executeMidnightRefresh(): Promise<void> {
  console.log('🌙 Midnight refresh triggered')

  // Clear all caches related to daily data
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
    localStorage.removeItem(key)
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
 */
function scheduleMidnightRefresh(): void {
  // Clear existing timeout
  if (midnightTimeout) {
    clearTimeout(midnightTimeout)
  }

  const msUntil = msUntilMidnight()
  console.log(`⏰ Midnight refresh scheduled in ${Math.round(msUntil / 1000 / 60)} minutes`)

  midnightTimeout = setTimeout(() => {
    executeMidnightRefresh()
  }, msUntil)
}

/**
 * Initialize midnight refresh system
 * Call this once in your app root (e.g., layout.tsx)
 */
export function initializeMidnightRefresh(): void {
  console.log('🌙 Initializing midnight refresh system')
  scheduleMidnightRefresh()
}

/**
 * Cleanup midnight refresh on app unmount
 */
export function cleanupMidnightRefresh(): void {
  if (midnightTimeout) {
    clearTimeout(midnightTimeout)
    midnightTimeout = null
  }
  callbacks.clear()
}

/**
 * Force immediate refresh (useful for testing)
 */
export async function forceMidnightRefresh(): Promise<void> {
  await executeMidnightRefresh()
}
