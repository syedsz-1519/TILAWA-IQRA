'use client'

import { useCallback } from 'react'
import useSWR, { mutate } from 'swr'
import { getBookmarks, addBookmark, removeBookmark, type Bookmark } from '@/lib/db-client'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Hook to manage mushaf bookmarks
 */
export function useBookmarks(userId: string | null) {
  const url = userId ? `/api/bookmarks?userId=${userId}` : null

  const { data, error, isLoading } = useSWR<Bookmark[]>(url, fetcher)

  const bookmarks = data ?? []

  const isBookmarked = useCallback(
    (surahNumber: number, ayahNumber: number) => {
      return bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber)
    },
    [bookmarks]
  )

  const toggleBookmark = useCallback(
    async (surahNumber: number, ayahNumber: number) => {
      if (!userId) return

      try {
        if (isBookmarked(surahNumber, ayahNumber)) {
          await removeBookmark(userId, surahNumber, ayahNumber)
        } else {
          await addBookmark(userId, surahNumber, ayahNumber)
        }
        // Revalidate cache
        mutate(url)
      } catch (err) {
        console.error('Failed to toggle bookmark:', err)
        throw err
      }
    },
    [userId, url, isBookmarked]
  )

  return {
    bookmarks,
    isLoading,
    isError: !!error,
    isBookmarked,
    toggleBookmark,
  }
}
