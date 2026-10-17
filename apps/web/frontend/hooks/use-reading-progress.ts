'use client'

import { useCallback, useState } from 'react'
import {
  getReadingProgress as getProgressLocal,
  updateReadingProgress as updateProgressLocal,
  type ReadingProgressData,
} from '@/lib/db-client'

/**
 * Hook to manage reading progress for a specific surah — fully offline via localStorage.
 */
export function useReadingProgress(userId: string | null, surahNumber: number) {
  const effectiveId = userId ?? 'guest'

  const [progress, setProgress] = useState<ReadingProgressData | null>(() => {
    if (typeof window === 'undefined') return null
    const results = getProgressLocal(effectiveId, surahNumber)
    return results[0] ?? null
  })

  const updateProgress = useCallback(
    async (lastAyahRead: number) => {
      try {
        const updated = updateProgressLocal(effectiveId, surahNumber, lastAyahRead)
        setProgress(updated)
        return updated
      } catch (err) {
        console.error('Failed to update reading progress:', err)
        throw err
      }
    },
    [effectiveId, surahNumber]
  )

  return {
    progress,
    lastAyahRead: progress?.lastAyahRead ?? 0,
    isLoading: false,
    isError: false,
    updateProgress,
  }
}

/**
 * Hook to get all reading progress — fully offline via localStorage.
 */
export function useAllReadingProgress(userId: string | null) {
  const effectiveId = userId ?? 'guest'

  const [allProgress] = useState<ReadingProgressData[]>(() => {
    if (typeof window === 'undefined') return []
    return getProgressLocal(effectiveId)
  })

  return {
    allProgress,
    isLoading: false,
    isError: false,
  }
}
