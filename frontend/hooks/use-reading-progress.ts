'use client'

import { useCallback, useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { getReadingProgress, updateReadingProgress, type ReadingProgressData } from '@/lib/db-client'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Hook to manage reading progress for a specific surah
 */
export function useReadingProgress(userId: string | null, surahNumber: number) {
  const url = userId ? `/api/reading-progress?userId=${userId}&surahNumber=${surahNumber}` : null

  const { data, error, isLoading } = useSWR<ReadingProgressData | null>(url, fetcher)

  const updateProgress = useCallback(
    async (lastAyahRead: number) => {
      if (!userId) return

      try {
        const updated = await updateReadingProgress(userId, surahNumber, lastAyahRead)
        // Revalidate cache
        mutate(url)
        return updated
      } catch (err) {
        console.error('Failed to update reading progress:', err)
        throw err
      }
    },
    [userId, surahNumber, url]
  )

  return {
    progress: data,
    lastAyahRead: data?.lastAyahRead ?? 0,
    isLoading,
    isError: !!error,
    updateProgress,
  }
}

/**
 * Hook to get all reading progress for a user
 */
export function useAllReadingProgress(userId: string | null) {
  const url = userId ? `/api/reading-progress?userId=${userId}` : null

  const { data, error, isLoading } = useSWR<ReadingProgressData[]>(url, fetcher)

  return {
    allProgress: data ?? [],
    isLoading,
    isError: !!error,
  }
}
