/**
 * Hijri Calendar utilities
 * Converts Gregorian dates to Hijri and fetches formatted date strings
 */

interface HijriDateData {
  day: number
  monthAr: string
  monthEn: string
  year: number
}

interface AladhanResponse {
  data: {
    hijri: {
      day: number
      month: {
        ar: string
        en: string
        number: number
      }
      year: number
    }
  }
}

const CACHE_KEY = 'tilawa_hijri_date_cache'
const CACHE_DATE_KEY = 'tilawa_hijri_cache_date'

/**
 * Fetch Hijri date from Aladhan API and cache it
 */
export async function getHijriDate(date?: Date): Promise<HijriDateData> {
  const targetDate = date || new Date()
  const dateStr = `${String(targetDate.getDate()).padStart(2, '0')}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${targetDate.getFullYear()}`
  const cacheDate = localStorage.getItem(CACHE_DATE_KEY)

  // Check if cache exists and is still valid (same day)
  if (cacheDate === dateStr) {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        return JSON.parse(cached)
      } catch {
        localStorage.removeItem(CACHE_KEY)
      }
    }
  }

  try {
    const response = await fetch(`https://api.aladhan.com/v1/gToH?date=${dateStr}`)
    if (!response.ok) throw new Error('Failed to fetch Hijri date')

    const data: AladhanResponse = await response.json()
    const hijri = data.data.hijri

    const result: HijriDateData = {
      day: hijri.day,
      monthAr: hijri.month.ar,
      monthEn: hijri.month.en,
      year: hijri.year,
    }

    // Cache the result
    localStorage.setItem(CACHE_KEY, JSON.stringify(result))
    localStorage.setItem(CACHE_DATE_KEY, dateStr)

    return result
  } catch (error) {
    console.error('Error fetching Hijri date:', error)
    throw error
  }
}

/**
 * Format Hijri date for display
 */
export function formatArabicDate(hijri: HijriDateData): string {
  return `${hijri.day} ${hijri.monthAr} ${hijri.year} AH`
}

/**
 * Get current Islamic day/month/year
 */
export async function getCurrentHijriDate(): Promise<HijriDateData> {
  return getHijriDate(new Date())
}
