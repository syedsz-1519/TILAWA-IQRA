// Multilingual Quran translation registry.
// Editions served free from the fawazahmed0/quran-api CDN (jsDelivr).
// English is the default; more Indian languages are added one by one.

/** Which upstream API serves a translation edition. */
export type TranslationApi = 'fawazahmed' | 'alquran'

export interface QuranLanguage {
  /** Internal code used in the UI */
  code: string
  /** Display label shown to users */
  label: string
  /** Native/label script name */
  nativeLabel: string
  /** Edition ID (fawazahmed0 CDN slug, or alquran.cloud identifier) */
  edition: string
  /** Text direction of the translation */
  direction: 'ltr' | 'rtl'
  /** Translator credit */
  translator: string
  /** Source API for this edition. Defaults to fawazahmed. */
  api?: TranslationApi
  /** Optional short note shown under the language (e.g. school of thought) */
  note?: string
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
  // ----- Kanzul Imaan (Aala Hazrat Imam Ahmad Raza Khan) -----
  {
    code: 'ur-kanzuliman',
    label: 'Kanzul Imaan (Urdu)',
    nativeLabel: '\u06a9\u0646\u0632 \u0627\u0644\u0627\u06cc\u0645\u0627\u0646',
    edition: 'ur.kanzuliman',
    direction: 'rtl',
    translator: "A'la Hazrat Imam Ahmad Raza Khan",
    api: 'alquran',
    note: 'Kanzul Imaan',
  },
  {
    code: 'en-kanzuliman',
    label: 'Kanzul Imaan (English)',
    nativeLabel: 'Kanzul Imaan',
    edition: 'en.ahmedraza',
    direction: 'ltr',
    translator: "A'la Hazrat Ahmad Raza Khan, tr. Prof. Shah Faridul Haque",
    api: 'alquran',
    note: 'Kanzul Imaan',
  },
  {
    code: 'hi-kanzuliman',
    label: 'Kanzul Imaan (Hindi)',
    nativeLabel: 'कनज़ुल ईमान',
    edition: 'hin-kanzuliman',
    direction: 'ltr',
    translator: "A'la Hazrat Imam Ahmad Raza Khan",
    api: 'alquran',
    note: 'Kanzul Imaan',
  },
  {
    code: 'bn-kanzuliman',
    label: 'Kanzul Imaan (Bengali)',
    nativeLabel: 'কানজুল ঈমান',
    edition: 'ben-kanzuliman',
    direction: 'ltr',
    translator: "A'la Hazrat Imam Ahmad Raza Khan",
    api: 'alquran',
    note: 'Kanzul Imaan',
  },
  // ----- Urdu family -----
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
  // ----- Indian languages -----
  {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    edition: 'hin-suhelfarooqkhan-la',
    direction: 'ltr',
    translator: 'Suhel Farooq Khan',
  },
  {
    code: 'bn',
    label: 'Bengali',
    nativeLabel: 'বাংলা',
    edition: 'ben-muhiuddinkhan-la',
    direction: 'ltr',
    translator: 'Muhiuddin Khan',
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
  // ----- World languages -----
  {
    code: 'fr',
    label: 'French',
    nativeLabel: 'Français',
    edition: 'fra-muhammadhamidul-la',
    direction: 'ltr',
    translator: 'Muhammad Hamidullah',
  },
  {
    code: 'es',
    label: 'Spanish',
    nativeLabel: 'Español',
    edition: 'spa-muhammadisagarc-la',
    direction: 'ltr',
    translator: 'Muhammad Isa García',
  },
  {
    code: 'tr',
    label: 'Turkish',
    nativeLabel: 'Türkçe',
    edition: 'tur-diyanetisleri-la',
    direction: 'ltr',
    translator: 'Diyanet İşleri',
  },
  {
    code: 'ru',
    label: 'Russian',
    nativeLabel: 'Русский',
    edition: 'rus-elmirkuliev-la',
    direction: 'ltr',
    translator: 'Elmir Kuliev',
  },
  {
    code: 'zh',
    label: 'Chinese',
    nativeLabel: '中文',
    edition: 'zho-majian-la',
    direction: 'ltr',
    translator: 'Ma Jian',
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

/** Translation text URL for a surah in the given language edition. */
export function translationUrl(lang: QuranLanguage, surah: number) {
  if (lang.api === 'alquran') {
    return `https://api.alquran.cloud/v1/surah/${surah}/${lang.edition}`
  }
  return `${CDN_BASE}/editions/${lang.edition}/${surah}.json`
}

/**
 * Fetch a translation and normalize either API shape into ChapterResponse.
 * - fawazahmed0 returns `{ chapter: [{ chapter, verse, text }] }`
 * - alquran.cloud returns `{ data: { number, ayahs: [{ numberInSurah, text }] } }`
 */
export async function fetchTranslation(url: string): Promise<ChapterResponse> {
  const res = await fetch(url)
  const json = await res.json()

  if (Array.isArray(json?.chapter)) {
    return json as ChapterResponse
  }

  if (Array.isArray(json?.data?.ayahs)) {
    const chapterNo = json.data.number as number
    return {
      chapter: json.data.ayahs.map((a: { numberInSurah: number; text: string }) => ({
        chapter: chapterNo,
        verse: a.numberInSurah,
        text: a.text,
      })),
    }
  }

  return { chapter: [] }
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
