// Multilingual Quran translation registry.
// Editions served free from the fawazahmed0/quran-api CDN (jsDelivr).
// English is the default; more Indian languages are added one by one.

export interface QuranLanguage {
  /** Internal code used in the UI */
  code: string
  /** Display label shown to users */
  label: string
  /** Native/label script name */
  nativeLabel: string
  /** Edition ID on the fawazahmed0 quran-api CDN */
  edition: string
  /** Text direction of the translation */
  direction: 'ltr' | 'rtl'
  /** Translator credit */
  translator: string
}

export const QURAN_LANGUAGES: QuranLanguage[] = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    edition: 'eng-abdullahyusufal',
    direction: 'ltr',
    translator: 'Abdullah Yusuf Ali',
  },
  {
    code: 'ur-roman',
    label: 'Roman Urdu',
    nativeLabel: 'Roman Urdu',
    edition: 'urd-fatehmuhammadja-la',
    direction: 'ltr',
    translator: 'Fateh Muhammad Jalandhri',
  },
  {
    code: 'ur',
    label: 'Urdu',
    nativeLabel: '\u0627\u0631\u062f\u0648',
    edition: 'urd-fatehmuhammadja',
    direction: 'rtl',
    translator: 'Fateh Muhammad Jalandhri',
  },
  {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    edition: 'hin-suhelfarooqkhan-la',
    direction: 'ltr',
    translator: 'Suhel Farooq Khan',
  },
  {
    code: 'te',
    label: 'Telugu',
    nativeLabel: 'తెలుగు',
    edition: 'tel-aburida-la',
    direction: 'ltr',
    translator: 'Aburida Muhammad Ibrahim',
  },
  {
    code: 'mr',
    label: 'Marathi',
    nativeLabel: 'मराठी',
    edition: 'mar-muhammadshafi-la',
    direction: 'ltr',
    translator: 'Muhammad Shafi Ansari',
  },
  {
    code: 'ta',
    label: 'Tamil',
    nativeLabel: 'தமிழ்',
    edition: 'tam-janturstfoundation-la',
    direction: 'ltr',
    translator: 'Jan Turst Foundation',
  },
  {
    code: 'ml',
    label: 'Malayalam',
    nativeLabel: 'മലയാളം',
    edition: 'mal-abdulhameed-la',
    direction: 'ltr',
    translator: 'Abdul Hameed Madani & Kunhi Mohammed',
  },
  {
    code: 'gu',
    label: 'Gujarati',
    nativeLabel: 'ગુજરાતી',
    edition: 'guj-rabilaalomari-la',
    direction: 'ltr',
    translator: 'Rabila Al Omari',
  },
  {
    code: 'as',
    label: 'Assamese',
    nativeLabel: 'অসমীয়া',
    edition: 'asm-shaykhrafeequli-la',
    direction: 'ltr',
    translator: 'Shaykh Rafeequl Islam Habibur Rahman',
  },
]

export const DEFAULT_LANGUAGE = 'en'

export function getLanguage(code: string): QuranLanguage {
  return QURAN_LANGUAGES.find((l) => l.code === code) ?? QURAN_LANGUAGES[0]
}

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1'

/** Uthmani Arabic text for a surah */
export function arabicUrl(surah: number) {
  return `${CDN_BASE}/editions/ara-quranuthmanihaf/${surah}.json`
}

/** Translation text for a surah in the given edition */
export function translationUrl(edition: string, surah: number) {
  return `${CDN_BASE}/editions/${edition}/${surah}.json`
}

/** Per-ayah recitation by Sheikh Yasser Ad-Dussary (everyayah.com) */
export function ayahAudioUrl(surah: number, ayah: number) {
  const s = String(surah).padStart(3, '0')
  const a = String(ayah).padStart(3, '0')
  return `https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/${s}${a}.mp3`
}

/** Per-ayah Urdu translation audio by Shamshad Ali Khan (everyayah.com).
 * Spoken Urdu serves both the Urdu and Roman Urdu (same spoken language) modes. */
export function urduTranslationAudioUrl(surah: number, ayah: number) {
  const s = String(surah).padStart(3, '0')
  const a = String(ayah).padStart(3, '0')
  return `https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/${s}${a}.mp3`
}

/** Languages that have interleaved translation audio available */
export function hasTranslationAudio(code: string) {
  return code === 'ur' || code === 'ur-roman'
}

export interface ApiVerse {
  chapter: number
  verse: number
  text: string
}

export interface ChapterResponse {
  chapter: ApiVerse[]
}
