'use client'

import { useCallback } from 'react'
import useSWR, { mutate } from 'swr'
import { getStreaks, updateStreaks, type StreakData } from '@/lib/db-client'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Hook to manage user streaks and XP
 */
export function useStreaks(userId: string | null) {
  const url = userId ? `/api/streaks?userId=${userId}` : null

  const { data, error, isLoading } = useSWR<StreakData>(url, fetcher)

  const addXP = useCallback(
    async (xpAmount: number) => {
      if (!userId) return

      try {
        const updated = await updateStreaks(userId, xpAmount)
        // Revalidate cache
        mutate(url)
        return updated
      } catch (err) {
        console.error('Failed to update XP:', err)
        throw err
      }
    },
    [userId, url]
  )

  return {
    streaks: data,
    currentStreak: data?.currentStreak ?? 0,
    totalXP: data?.totalXP ?? 0,
    isLoading,
    isError: !!error,
    addXP,
  }
}
