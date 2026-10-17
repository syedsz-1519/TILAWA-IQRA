/**
 * lib/db-client.ts — Fully offline, localStorage-based data layer.
 * No backend required. All data persists in the browser.
 */

const PREFIX = 'tilawa_'

function getKey(key: string): string {
  return PREFIX + key
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(getKey(key))
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(getKey(key), JSON.stringify(value))
  } catch {
    // storage full or unavailable — silently skip
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

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

// ────────────────────────────────────────────────────────────────────────────
// Streaks
// ────────────────────────────────────────────────────────────────────────────

export function getStreaks(_userId: string): StreakData {
  return readJson<StreakData>('streaks', {
    currentStreak: 0,
    totalXP: 0,
    lastActivityDate: null,
  })
}

export function updateStreaks(_userId: string, xpGain: number): StreakData {
  const today = new Date().toISOString().split('T')[0]
  const current = getStreaks(_userId)

  // Increment streak if last activity was yesterday or today
  let newStreak = current.currentStreak
  if (current.lastActivityDate) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]
    if (current.lastActivityDate === yesterdayStr) {
      newStreak += 1
    } else if (current.lastActivityDate !== today) {
      newStreak = 1 // reset
    }
  } else {
    newStreak = 1
  }

  const updated: StreakData = {
    currentStreak: newStreak,
    totalXP: current.totalXP + xpGain,
    lastActivityDate: today,
  }
  writeJson('streaks', updated)
  return updated
}

// ────────────────────────────────────────────────────────────────────────────
// Bookmarks
// ────────────────────────────────────────────────────────────────────────────

export function getBookmarks(_userId: string): Bookmark[] {
  return readJson<Bookmark[]>('bookmarks', [])
}

export function addBookmark(
  _userId: string,
  surahNumber: number,
  ayahNumber: number
): Bookmark[] {
  const bookmarks = getBookmarks(_userId)
  const alreadyExists = bookmarks.some(
    (b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
  )
  if (alreadyExists) return bookmarks

  const updated = [
    ...bookmarks,
    { surahNumber, ayahNumber, bookmarkedAt: new Date().toISOString() },
  ]
  writeJson('bookmarks', updated)
  return updated
}

export function removeBookmark(
  _userId: string,
  surahNumber: number,
  ayahNumber: number
): Bookmark[] {
  const bookmarks = getBookmarks(_userId)
  const updated = bookmarks.filter(
    (b) => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber)
  )
  writeJson('bookmarks', updated)
  return updated
}

// ────────────────────────────────────────────────────────────────────────────
// Reading Progress
// ────────────────────────────────────────────────────────────────────────────

export function getReadingProgress(
  _userId: string,
  surahNumber?: number
): ReadingProgressData[] {
  const all = readJson<ReadingProgressData[]>('reading_progress', [])
  if (surahNumber !== undefined) {
    return all.filter((p) => p.surahNumber === surahNumber)
  }
  return all
}

export function updateReadingProgress(
  _userId: string,
  surahNumber: number,
  lastAyahRead: number
): ReadingProgressData {
  const all = readJson<ReadingProgressData[]>('reading_progress', [])
  const existing = all.findIndex((p) => p.surahNumber === surahNumber)
  const entry: ReadingProgressData = {
    surahNumber,
    lastAyahRead,
    updatedAt: new Date().toISOString(),
  }
  if (existing >= 0) {
    all[existing] = entry
  } else {
    all.push(entry)
  }
  writeJson('reading_progress', all)
  return entry
}
