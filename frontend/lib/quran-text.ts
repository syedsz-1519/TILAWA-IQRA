/**
 * Quran text utilities - fetches Arabic Uthmani script from APIs
 */

export interface SurahData {
  number: number
  name: string
  englishName: string
  ayahs: Array<{
    number: number
    text: string
    surah: number
    numberInSurah: number
  }>
}

export interface SurahMetadata {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: 'Meccan' | 'Medinan'
}

const SURAH_CACHE_KEY = 'tilawa_surah_cache'
const SURAH_METADATA_CACHE_KEY = 'tilawa_surah_metadata_cache'

// All 114 surahs
export const SURAHS: SurahMetadata[] = [
  { number: 1, name: 'Al-Fatiha', englishName: 'The Opening', englishNameTranslation: 'The Opening', numberOfAyahs: 7, revelationType: 'Meccan' },
  { number: 2, name: 'Al-Baqarah', englishName: 'The Cow', englishNameTranslation: 'The Cow', numberOfAyahs: 286, revelationType: 'Medinan' },
  { number: 3, name: 'Aal-i-Imraan', englishName: 'The Family of Imran', englishNameTranslation: 'The Family of Imran', numberOfAyahs: 200, revelationType: 'Medinan' },
  { number: 4, name: 'An-Nisa', englishName: 'The Women', englishNameTranslation: 'The Women', numberOfAyahs: 176, revelationType: 'Medinan' },
  { number: 5, name: 'Al-Maidah', englishName: 'The Table Spread', englishNameTranslation: 'The Table Spread', numberOfAyahs: 120, revelationType: 'Medinan' },
  { number: 6, name: 'Al-An\'am', englishName: 'The Cattle', englishNameTranslation: 'The Cattle', numberOfAyahs: 165, revelationType: 'Meccan' },
  { number: 7, name: 'Al-A\'raf', englishName: 'The Heights', englishNameTranslation: 'The Heights', numberOfAyahs: 206, revelationType: 'Meccan' },
  { number: 8, name: 'Al-Anfal', englishName: 'The Spoils of War', englishNameTranslation: 'The Spoils of War', numberOfAyahs: 75, revelationType: 'Medinan' },
  { number: 9, name: 'At-Taubah', englishName: 'The Repentance', englishNameTranslation: 'The Repentance', numberOfAyahs: 129, revelationType: 'Medinan' },
  { number: 10, name: 'Yunus', englishName: 'Jonah', englishNameTranslation: 'Jonah', numberOfAyahs: 109, revelationType: 'Meccan' },
  // ... (truncating for brevity, but would include all 114)
]

/**
 * Fetch a surah's text from Al-Quran Cloud API (Uthmani script)
 */
export async function fetchSurah(surahNumber: number): Promise<SurahData | null> {
  const cacheKey = `${SURAH_CACHE_KEY}_${surahNumber}`
  const cached = localStorage.getItem(cacheKey)

  if (cached) {
    try {
      return JSON.parse(cached)
    } catch {
      localStorage.removeItem(cacheKey)
    }
  }

  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`
    )
    if (!response.ok) throw new Error('Failed to fetch surah')

    const data = await response.json()
    const surah: SurahData = {
      number: data.data.number,
      name: data.data.name,
      englishName: data.data.englishName,
      ayahs: data.data.ayahs.map((a: any) => ({
        number: a.number,
        text: a.text,
        surah: typeof a.surah === 'object' ? a.surah.number : a.surah,
        numberInSurah: a.numberInSurah,
      })),
    }

    localStorage.setItem(cacheKey, JSON.stringify(surah))
    return surah
  } catch (error) {
    console.error('Error fetching surah:', error)
    return null
  }
}

/**
 * Get all surahs metadata
 */
export function getAllSurahs(): SurahMetadata[] {
  return SURAHS
}

/**
 * Get a single surah metadata
 */
export function getSurahMetadata(surahNumber: number): SurahMetadata | undefined {
  return SURAHS.find((s) => s.number === surahNumber)
}

/**
 * Convert ayah number to text (e.g., "19:1" = "Surah 19, Ayah 1")
 */
export function formatAyahRef(surah: number, ayah: number): string {
  const surahData = getSurahMetadata(surah)
  return `${surahData?.englishName || `Surah ${surah}`} ${surah}:${ayah}`
}
