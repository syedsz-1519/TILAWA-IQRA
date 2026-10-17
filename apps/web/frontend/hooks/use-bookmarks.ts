'use client'

import { useCallback, useState } from 'react'
import {
  getBookmarks as getBookmarksLocal,
  addBookmark as addBookmarkLocal,
  removeBookmark as removeBookmarkLocal,
  type Bookmark,
} from '@/lib/db-client'

/**
 * Hook to manage Quran bookmarks — fully offline via localStorage.
 */
export function useBookmarks(userId: string | null) {
  const effectiveId = userId ?? 'guest'

  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    if (typeof window === 'undefined') return []
    return getBookmarksLocal(effectiveId)
  })

  const isBookmarked = useCallback(
    (surahNumber: number, ayahNumber: number) => {
      return bookmarks.some(
        (b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
      )
    },
    [bookmarks]
  )

  const toggleBookmark = useCallback(
    async (surahNumber: number, ayahNumber: number) => {
      try {
        let updated: Bookmark[]
        if (isBookmarked(surahNumber, ayahNumber)) {
          updated = removeBookmarkLocal(effectiveId, surahNumber, ayahNumber)
        } else {
          updated = addBookmarkLocal(effectiveId, surahNumber, ayahNumber)
        }
        setBookmarks(updated)
      } catch (err) {
        console.error('Failed to toggle bookmark:', err)
        throw err
      }
    },
    [effectiveId, isBookmarked]
  )

  return {
    bookmarks,
    isLoading: false,
    isError: false,
    isBookmarked,
    toggleBookmark,
  }
}
