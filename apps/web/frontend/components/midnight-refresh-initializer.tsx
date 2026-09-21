'use client'

import { useEffect } from 'react'
import { initializeMidnightRefresh, cleanupMidnightRefresh, onMidnightRefresh } from '@/lib/midnight-refresh'
import { getHijriDate } from '@/lib/hijri'
import { getDailyAyah } from '@/lib/dailyAyah'

/**
 * Initializes the midnight refresh system on app mount
 * Registers callbacks to refresh daily data at midnight
 */
export function MidnightRefreshInitializer() {
  useEffect(() => {
    // Initialize midnight refresh system
    initializeMidnightRefresh()

    // Register callbacks to refresh at midnight
    const unsubscribeHijri = onMidnightRefresh(async () => {
      console.log('🌙 Refreshing Hijri date at midnight')
      try {
        await getHijriDate()
      } catch (error) {
        console.error('Failed to refresh Hijri date:', error)
      }
    })

    const unsubscribeAyah = onMidnightRefresh(async () => {
      console.log('🌙 Refreshing daily ayah at midnight')
      try {
        await getDailyAyah()
      } catch (error) {
        console.error('Failed to refresh daily ayah:', error)
      }
    })

    // Cleanup on unmount
    return () => {
      unsubscribeHijri()
      unsubscribeAyah()
      cleanupMidnightRefresh()
    }
  }, [])

  return null
}
