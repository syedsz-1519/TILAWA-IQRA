'use client'

import { useCallback, useState } from 'react'
import { logError } from '@/lib/error-handler'
import {
  getStreaks as getStreaksLocal,
  updateStreaks as updateStreaksLocal,
  type StreakData,
} from '@/lib/db-client'

/**
 * Hook to manage user streaks and XP — fully offline via localStorage.
 */
export function useStreaks(userId: string | null) {
  const effectiveId = userId ?? 'guest'

  const [data, setData] = useState<StreakData>(() => {
    if (typeof window === 'undefined') {
      return { currentStreak: 0, totalXP: 0, lastActivityDate: null }
    }
    return getStreaksLocal(effectiveId)
  })
  const [isUpdating, setIsUpdating] = useState(false)

  const addXP = useCallback(
    async (xpAmount: number) => {
      if (typeof xpAmount !== 'number' || xpAmount <= 0) {
        logError(new Error('Invalid XP amount'), {
          component: 'useStreaks',
          action: 'addXP',
          context: { xpAmount },
        })
        return null
      }

      setIsUpdating(true)
      try {
        const updated = updateStreaksLocal(effectiveId, xpAmount)
        setData(updated)
        return updated
      } catch (err) {
        logError(err, { component: 'useStreaks', action: 'addXP' })
        throw err
      } finally {
        setIsUpdating(false)
      }
    },
    [effectiveId]
  )

  const refreshStreaks = useCallback(() => {
    const fresh = getStreaksLocal(effectiveId)
    setData(fresh)
    return fresh
  }, [effectiveId])

  return {
    streaks: data,
    currentStreak: data.currentStreak,
    totalXP: data.totalXP,
    isLoading: false,
    isError: false,
    isUpdating,
    addXP,
    refreshStreaks,
    error: null,
  }
}
