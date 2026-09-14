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
  /**
   * everyayah.com folder name for per-ayah translation audio.
   * When set, the read-along player will play this audio after each Arabic ayah.
   */
  translationAudioFolder?: string
}

// ---------------------------------------------------------------------------
// The 5 "Featured Translators" shown as quick-pick cards in Settings.
// Each entry mirrors a code that exists in QURAN_LANGUAGES below.
// ---------------------------------------------------------------------------
export interface FeaturedTranslator {
  code: string
  nameEnglish: string
  nameNative: string
  description: string
  /** Whether everyayah.com audio exists for this translator */
  hasAudio: boolean
}

export const FEATURED_TRANSLATORS: FeaturedTranslator[] = [
  {
    code: 'ur-taqiusmani',
    nameEnglish: 'Mufti Taqi Usmani',
    nameNative: 'مفتی تقی عثمانی',
    description: 'Tauzeeh Al-Qur\'an — authoritative contemporary Urdu translation',
    hasAudio: false,
  },
  {
    code: 'en-taqiusmani',
    nameEnglish: 'Mufti Taqi Usmani (English)',
    nameNative: 'Taqi Usmani',
    description: 'Clear, scholarly English rendering by the renowned Pakistani jurist',
    hasAudio: false,
  },
  {
    code: 'en-sahih',
    nameEnglish: 'Saheeh International',
    nameNative: 'Saheeh International',
    description: 'Modern, precise English translation widely used worldwide',
    hasAudio: false,
  },
  {
    code: 'en-pickthall',
    nameEnglish: 'Pickthall',
    nameNative: 'Pickthall',
    description: 'The Meaning of the Glorious Qur\'an — classic literary English',
    hasAudio: false,
  },
  {
    code: 'en-asad',
    nameEnglish: 'Muhammad Asad',
    nameNative: 'Muhammad Asad',
    description: 'The Message of the Qur\'an — intellectual, in-depth commentary',
    hasAudio: false,
  },
]

export const QURAN_LANGUAGES: QuranLanguage[] = [
  // =========================================================================
  // Featured Translators (shown in Settings)
  // =========================================================================

  // ----- Mufti Taqi Usmani -----
  {
    code: 'ur-taqiusmani',
    label: 'Mufti Taqi Usmani (Urdu)',
    nativeLabel: 'مفتی تقی عثمانی',
    edition: 'urd-muhammadtaqiusm',
    direction: 'rtl',
    translator: 'Mufti Taqi Usmani',
    note: 'Tauzeeh Al-Qur\'an',
  },
  {
    code: 'en-taqiusmani',
    label: 'Mufti Taqi Usmani (English)',
    nativeLabel: 'Taqi Usmani',
    edition: 'eng-muhammadtaqiusm',
    direction: 'ltr',
    translator: 'Mufti Taqi Usmani',
    note: 'Tauzeeh Al-Qur\'an',
  },

  // ----- Saheeh International -----
  {
    code: 'en-sahih',
    label: 'Saheeh International',
    nativeLabel: 'Saheeh International',
    edition: 'en.sahih',
    direction: 'ltr',
    translator: 'Saheeh International',
    api: 'alquran',
  },

  // ----- Pickthall -----
  {
    code: 'en-pickthall',
    label: 'Pickthall (English)',
    nativeLabel: 'Pickthall',
    edition: 'eng-mohammedmarmadu',
    direction: 'ltr',
    translator: 'Mohammed Marmaduke Pickthall',
  },

  // ----- Muhammad Asad -----
  {
    code: 'en-asad',
    label: 'Muhammad Asad (English)',
    nativeLabel: 'Muhammad Asad',
    edition: 'eng-muhammadasad',
    direction: 'ltr',
    translator: 'Muhammad Asad',
    note: 'The Message of the Qur\'an',
  },

  // =========================================================================
  // Classic / existing editions
  // =========================================================================

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
    nativeLabel: 'کنز الایمان',
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

  // ----- Urdu family (with spoken translation audio) -----
  {
    code: 'ur-roman',
    label: 'Roman Urdu',
    nativeLabel: 'Roman Urdu',
    edition: 'urd-fatehmuhammadja-la',
    direction: 'ltr',
    translator: 'Fateh Muhammad Jalandhri',
    // Shamshad Ali Khan spoken Urdu works for Roman Urdu too (same speech)
    translationAudioFolder: 'urdu_shamshad_ali_khan_46kbps',
  },
  {
    code: 'ur',
    label: 'Urdu',
    nativeLabel: 'اردو',
    edition: 'urd-fatehmuhammadja',
    direction: 'rtl',
    translator: 'Fateh Muhammad Jalandhri',
    translationAudioFolder: 'urdu_shamshad_ali_khan_46kbps',
  },
  {
    code: 'ur-farhat',
    label: 'Urdu — Farhat Hashmi',
    nativeLabel: 'فرحت ہاشمی',
    edition: 'urd-fatehmuhammadja',   // text falls back to Jalandhri; audio is the key differentiator
    direction: 'rtl',
    translator: 'Dr. Farhat Hashmi (audio) / Fateh Muhammad Jalandhri (text)',
    translationAudioFolder: 'urdu_farhat_hashmi',
    note: 'Al-Huda',
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

export const DEFAULT_LANGUAGE = 'ur-taqiusmani'

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

/**
 * Per-ayah translation audio URL.
 * Returns a URL if the language has a `translationAudioFolder`, otherwise null.
 * Audio is served from everyayah.com/data/translations/<folder>/<SSS><AAA>.mp3
 */
export function translationAudioUrl(lang: QuranLanguage, surah: number, ayah: number): string | null {
  if (!lang.translationAudioFolder) return null
  const s = String(surah).padStart(3, '0')
  const a = String(ayah).padStart(3, '0')
  return `https://everyayah.com/data/translations/${lang.translationAudioFolder}/${s}${a}.mp3`
}

/**
 * Returns the human-readable audio attribution for a language's translation audio.
 * Used in footer credits.
 */
export function translationAudioCredit(lang: QuranLanguage): string | null {
  if (!lang.translationAudioFolder) return null
  const map: Record<string, string> = {
    urdu_shamshad_ali_khan_46kbps: 'Shamshad Ali Khan',
    urdu_farhat_hashmi: 'Dr. Farhat Hashmi',
  }
  return map[lang.translationAudioFolder] ?? lang.translationAudioFolder
}

/** Whether a language has interleaved per-ayah translation audio */
export function hasTranslationAudio(code: string): boolean {
  const lang = getLanguage(code)
  return !!lang.translationAudioFolder
}

export interface ApiVerse {
  chapter: number
  verse: number
  text: string
}

export interface ChapterResponse {
  chapter: ApiVerse[]
}
