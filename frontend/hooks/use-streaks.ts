'use client'

import { useCallback, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { getStreaks as getStreaksAction, addXP as addXPAction } from '@/app/actions/streaks'
import { logError } from '@/lib/error-handler'
import type { StreakData } from '@/lib/db-client'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Hook to manage user streaks and XP with automatic error handling
 */
export function useStreaks(userId: string | null) {
  const url = userId ? `/api/streaks?userId=${userId}` : null
  const [isUpdating, setIsUpdating] = useState(false)

  const { data, error, isLoading } = useSWR<StreakData>(url, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 60000, // 1 minute
  })

  const addXP = useCallback(
    async (xpAmount: number) => {
      if (!userId) {
        logError(new Error('User ID not available'), {
          component: 'useStreaks',
          action: 'addXP',
        })
        return null
      }

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
        const result = await addXPAction(userId, xpAmount)

        if (!result.success) {
          throw new Error(result.error || 'Failed to add XP')
        }

        // Revalidate cache after successful update
        if (url) {
          await mutate(url)
        }

        return result.data
      } catch (err) {
        logError(err, {
          component: 'useStreaks',
          action: 'addXP',
          userId,
          context: { xpAmount },
        })
        throw err
      } finally {
        setIsUpdating(false)
      }
    },
    [userId, url]
  )

  const refreshStreaks = useCallback(async () => {
    if (!userId) return null

    try {
      const result = await getStreaksAction(userId)

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch streaks')
      }

      // Revalidate cache
      if (url) {
        await mutate(url)
      }

      return result.data
    } catch (err) {
      logError(err, {
        component: 'useStreaks',
        action: 'refreshStreaks',
        userId,
      })
      throw err
    }
  }, [userId, url])

  return {
    streaks: data,
    currentStreak: data?.currentStreak ?? 0,
    totalXP: data?.totalXP ?? 0,
    isLoading,
    isError: !!error,
    isUpdating,
    addXP,
    refreshStreaks,
    error,
  }
}
