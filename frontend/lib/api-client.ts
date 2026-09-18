/**
 * Standardized API client with error handling & automatic recovery
 * Centralized place for all API calls with consistent error handling
 */

import {
  withRetry,
  logError,
  attemptAutoRecovery,
  classifyError,
  validateData,
  type ErrorContext,
} from './error-handler'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const QURAN_API_BASE = process.env.NEXT_PUBLIC_ALQURAN_CLOUD_API || 'https://api.alquran.cloud/v1'
const QURAN_COM_API = 'https://api.quran.com/api/v4'

export interface ApiError {
  message: string
  status?: number
  code?: string
}

/**
 * Fetch with automatic retry, timeout, and error recovery
 */
async function apiFetch<T = any>(
  url: string,
  options?: RequestInit & { retries?: number; errorContext?: ErrorContext }
): Promise<{ data: T | null; error: ApiError | null }> {
  const { retries = 2, errorContext, ...fetchOptions } = options ?? {}

  try {
    const response = await withRetry(
      async () => {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 30000)

        try {
          return await fetch(url, {
            headers: {
              'Content-Type': 'application/json',
              ...fetchOptions.headers,
            },
            ...fetchOptions,
            signal: controller.signal,
          })
        } finally {
          clearTimeout(timeout)
        }
      },
      {
        maxAttempts: retries + 1,
        delayMs: 1000,
        backoffMultiplier: 2,
      }
    )

    if (!response) {
      const error: ApiError = {
        message: 'All retry attempts failed',
        code: 'RETRY_FAILED',
      }

      logError(
        new Error(error.message),
        errorContext || { action: 'apiFetch', context: { url } }
      )

      return { data: null, error }
    }

    if (!response.ok) {
      const error: ApiError = {
        message: `API error: ${response.status} ${response.statusText}`,
        status: response.status,
        code: `HTTP_${response.status}`,
      }

      // Attempt auto-recovery for specific status codes
      if (response.status === 401) {
        await attemptAutoRecovery('AUTH_ERROR', errorContext)
      } else if (response.status === 408 || response.status === 504) {
        await attemptAutoRecovery('TIMEOUT_ERROR', errorContext)
      }

      logError(new Error(error.message), errorContext)

      return { data: null, error }
    }

    const data = await response.json()
    return { data: data as T, error: null }
  } catch (error) {
    const errorType = classifyError(error)
    const message = error instanceof Error ? error.message : 'Unknown error'

    logError(error, {
      ...errorContext,
      component: 'apiFetch',
      context: { url, errorType },
    })

    // Attempt auto-recovery
    await attemptAutoRecovery(errorType, errorContext)

    return {
      data: null,
      error: {
        message: `Failed to fetch: ${message}`,
        code: errorType,
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
