/**
 * Database client utilities for frontend
 * Provides hooks and functions to interact with database APIs
 */

// ========================================
// Streaks
// ========================================

export async function getStreaks(userId: string) {
  const res = await fetch(`/api/streaks?userId=${userId}`)
  if (!res.ok) throw new Error('Failed to fetch streaks')
  return res.json()
}

export async function updateStreaks(userId: string, xpGain: number) {
  const res = await fetch('/api/streaks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, xpGain }),
  })
  if (!res.ok) throw new Error('Failed to update streaks')
  return res.json()
}

// ========================================
// Bookmarks
// ========================================

export async function getBookmarks(userId: string) {
  const res = await fetch(`/api/bookmarks?userId=${userId}`)
  if (!res.ok) throw new Error('Failed to fetch bookmarks')
  return res.json()
}

export async function addBookmark(userId: string, surahNumber: number, ayahNumber: number) {
  const res = await fetch('/api/bookmarks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, surahNumber, ayahNumber }),
  })
  if (!res.ok) throw new Error('Failed to add bookmark')
  return res.json()
}

export async function removeBookmark(userId: string, surahNumber: number, ayahNumber: number) {
  const res = await fetch('/api/bookmarks', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, surahNumber, ayahNumber }),
  })
  if (!res.ok) throw new Error('Failed to remove bookmark')
  return res.json()
}

// ========================================
// Reading Progress
// ========================================

export async function getReadingProgress(userId: string, surahNumber?: number) {
  let url = `/api/reading-progress?userId=${userId}`
  if (surahNumber) url += `&surahNumber=${surahNumber}`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch reading progress')
  return res.json()
}

export async function updateReadingProgress(
  userId: string,
  surahNumber: number,
  lastAyahRead: number
) {
  const res = await fetch('/api/reading-progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, surahNumber, lastAyahRead }),
  })
  if (!res.ok) throw new Error('Failed to update reading progress')
  return res.json()
}

// ========================================
// Types
// ========================================

export interface StreakData {
  currentStreak: number
  totalXP: number
  lastActivityDate: string | null
}

export interface Bookmark {
  surahNumber: number
  ayahNumber: number
  bookmarkedAt: string
}

export interface ReadingProgressData {
  surahNumber: number
  lastAyahRead: number
  updatedAt: string
}
