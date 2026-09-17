/**
 * Standardized API client with error handling
 * Centralized place for all API calls with consistent error handling
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const QURAN_API_BASE = process.env.NEXT_PUBLIC_ALQURAN_CLOUD_API || 'https://api.alquran.cloud/v1'
const QURAN_COM_API = 'https://api.quran.com/api/v4'

export interface ApiError {
  message: string
  status?: number
  code?: string
}

/**
 * Fetch with standardized error handling
 */
async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T | null; error: ApiError | null }> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: `API error: ${response.status} ${response.statusText}`,
          status: response.status,
        },
      }
    }

    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('API fetch error:', message)
    return {
      data: null,
      error: {
        message: `Failed to fetch: ${message}`,
        code: 'FETCH_ERROR',
      },
    }
  }
}

// ==================
// BACKEND API CALLS
// ==================

/**
 * Get user streaks
 */
export async function getStreaks(userId: string) {
  return apiFetch(`${API_BASE}/api/streaks?userId=${userId}`)
}

/**
 * Update user streaks
 */
export async function updateStreaks(userId: string, xpGain: number) {
  return apiFetch(`${API_BASE}/api/streaks`, {
    method: 'POST',
    body: JSON.stringify({ userId, xpGain }),
  })
}

/**
 * Get user bookmarks
 */
export async function getBookmarks(userId: string) {
  return apiFetch(`${API_BASE}/api/bookmarks?userId=${userId}`)
}

/**
 * Add bookmark
 */
export async function addBookmark(userId: string, surahNumber: number, ayahNumber: number) {
  return apiFetch(`${API_BASE}/api/bookmarks`, {
    method: 'POST',
    body: JSON.stringify({ userId, surahNumber, ayahNumber }),
  })
}

/**
 * Remove bookmark
 */
export async function removeBookmark(userId: string, surahNumber: number, ayahNumber: number) {
  return apiFetch(`${API_BASE}/api/bookmarks`, {
    method: 'DELETE',
    body: JSON.stringify({ userId, surahNumber, ayahNumber }),
  })
}

/**
 * Get reading progress for user
 */
export async function getReadingProgress(userId: string) {
  return apiFetch(`${API_BASE}/api/reading-progress?userId=${userId}`)
}

/**
 * Get reading progress for specific surah
 */
export async function getSurahProgress(userId: string, surahNumber: number) {
  return apiFetch(
    `${API_BASE}/api/reading-progress/surah/${surahNumber}?userId=${userId}`
  )
}

/**
 * Update reading progress
 */
export async function updateReadingProgress(
  userId: string,
  surahNumber: number,
  lastAyahRead: number
) {
  return apiFetch(`${API_BASE}/api/reading-progress`, {
    method: 'POST',
    body: JSON.stringify({ userId, surahNumber, lastAyahRead }),
  })
}

// ==================
// QURAN CLOUD API
// ==================

/**
 * Get ayah with translation
 */
export async function getAyahTranslation(surahNumber: number, ayahNumber: number) {
  const ayahRef = `${surahNumber}:${ayahNumber}`
  return apiFetch(
    `${QURAN_API_BASE}/ayah/${ayahRef}/en.asad`
  )
}

/**
 * Get ayah audio URL
 */
export async function getAyahAudio(surahNumber: number, ayahNumber: number) {
  const ayahRef = `${surahNumber}:${ayahNumber}`
  return apiFetch(
    `${QURAN_API_BASE}/ayah/${ayahRef}/ar.alafasy`
  )
}

/**
 * Get surah text (Uthmani script)
 */
export async function getSurahText(surahNumber: number) {
  return apiFetch(
    `${QURAN_API_BASE}/surah/${surahNumber}/quran-uthmani`
  )
}

// ==================
// QURAN.COM API
// ==================

/**
 * Get tafseer (Ibn Kathir - tafsir ID 169)
 */
export async function getTafseer(surahNumber: number, ayahNumber: number) {
  const ayahRef = `${surahNumber}:${ayahNumber}`
  return apiFetch(
    `${QURAN_COM_API}/tafsirs/169/by_ayah/${ayahRef}`
  )
}

/**
 * Get ayah by verse key
 */
export async function getAyahByVerseKey(verseKey: string) {
  return apiFetch(
    `${QURAN_COM_API}/verses/by_verse_key/${verseKey}`
  )
}

// ==================
// PRAYER TIMES API
// ==================

/**
 * Get prayer times from Aladhan API
 */
export async function getPrayerTimes(latitude: number, longitude: number, date?: string) {
  const dateParam = date || new Date().toISOString().split('T')[0]
  return apiFetch(
    `https://api.aladhan.com/v1/timings/${dateParam}?latitude=${latitude}&longitude=${longitude}&method=2`
  )
}

/**
 * Get Hijri date from Aladhan API
 */
export async function getHijriDate(date?: string) {
  const dateParam = date || new Date().toISOString().split('T')[0]
  return apiFetch(
    `https://api.aladhan.com/v1/gToH?date=${dateParam}`
  )
}

// ==================
// ERROR HANDLING HELPERS
// ==================

/**
 * Get safe value or fallback
 */
export function getSafeData<T>(data: T | null, fallback: T): T {
  return data ?? fallback
}

/**
 * Check if error exists
 */
export function hasError(error: ApiError | null): error is ApiError {
  return error !== null
}

/**
 * Log API error with context
 */
export function logApiError(context: string, error: ApiError | null) {
  if (error) {
    console.error(`[${context}] ${error.message}`, {
      status: error.status,
      code: error.code,
    })
  }
}
