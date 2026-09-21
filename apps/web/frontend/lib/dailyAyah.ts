/**
 * Daily Ayah utilities
 * Fetches a "daily" ayah deterministic by day-of-year
 */

export interface DailyAyahData {
  surahNumber: number
  ayahNumber: number
  surahName: string
  arabic: string
  translation: string
}

interface AyahResponse {
  code: number
  data: {
    number: number
    surah: {
      number: number
      name: string
      englishName: string
      englishNameTranslation: string
    }
    numberInSurah: number
    text: string
  }
}

interface AyahTranslationResponse {
  code: number
  data: {
    translations: Array<{
      text: string
    }>
  }
}

const DAILY_AYAH_CACHE_KEY = 'tilawa_daily_ayah_cache'
const DAILY_AYAH_DATE_KEY = 'tilawa_daily_ayah_date'

// Total number of ayahs in the Quran
const TOTAL_AYAHS = 6236

/**
 * Calculate deterministic ayah number for a given date
 * Same ayah for all users on the same calendar day
 */
export function getDailyAyahNumber(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  return 1 + (dayOfYear % TOTAL_AYAHS)
}

/**
 * Fetch a single ayah from Al-Quran Cloud API
 */
async function fetchAyah(ayahNumber: number): Promise<{ surah: number; ayah: number; arabic: string }> {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/ayah/${ayahNumber}/quran-uthmani`
    )
    if (!response.ok) throw new Error('Failed to fetch ayah')

    const data: AyahResponse = await response.json()
    return {
      surah: data.data.surah.number,
      ayah: data.data.numberInSurah,
      arabic: data.data.text,
    }
  } catch (error) {
    console.error('Error fetching ayah:', error)
    throw error
  }
}

/**
 * Fetch translation for an ayah
 */
async function fetchTranslation(surah: number, ayah: number): Promise<string> {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/en.asad`
    )
    if (!response.ok) throw new Error('Failed to fetch translation')

    const data: AyahResponse = await response.json()
    return data.data.text
  } catch (error) {
    console.error('Error fetching translation:', error)
    return 'Translation not available'
  }
}

/**
 * Get surah name
 */
async function getSurahName(surahNumber: number): Promise<string> {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}`
    )
    if (!response.ok) throw new Error('Failed to fetch surah')

    const data: AyahResponse = await response.json()
    return data.data.surah.englishName
  } catch {
    return `Surah ${surahNumber}`
  }
}

/**
 * Fetch the daily ayah with translation
 */
export async function getDailyAyah(): Promise<DailyAyahData> {
  const today = new Date().toISOString().split('T')[0]
  const cacheDate = localStorage.getItem(DAILY_AYAH_DATE_KEY)

  // Check cache
  if (cacheDate === today) {
    const cached = localStorage.getItem(DAILY_AYAH_CACHE_KEY)
    if (cached) {
      try {
        return JSON.parse(cached)
      } catch {
        localStorage.removeItem(DAILY_AYAH_CACHE_KEY)
      }
    }
  }

  const ayahNumber = getDailyAyahNumber()

  try {
    const { surah, ayah, arabic } = await fetchAyah(ayahNumber)
    const translation = await fetchTranslation(surah, ayah)
    const surahName = await getSurahName(surah)

    const result: DailyAyahData = {
      surahNumber: surah,
      ayahNumber: ayah,
      surahName,
      arabic,
      translation,
    }

    // Cache
    localStorage.setItem(DAILY_AYAH_CACHE_KEY, JSON.stringify(result))
    localStorage.setItem(DAILY_AYAH_DATE_KEY, today)

    return result
  } catch (error) {
    console.error('Error getting daily ayah:', error)
    throw error
  }
}
