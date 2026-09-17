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
  /** Whether spoken or synthesized recitation audio exists for this translator */
  hasAudio: boolean
  audioReciter?: string
}

export interface UpcomingLanguage {
  code: string
  language: string
  nativeName: string
  translator: string
  status: 'In Pipeline' | 'Formatting' | 'Verification'
  expectedRelease: string
}

export const UPCOMING_LANGUAGES: UpcomingLanguage[] = [
  {
    code: 'ps',
    language: 'Pashto',
    nativeName: 'پښتو',
    translator: 'Maulana Abdulwali Khan & Zakariya',
    status: 'In Pipeline',
    expectedRelease: 'Phase 2',
  },
  {
    code: 'sd',
    language: 'Sindhi',
    nativeName: 'سنڌي',
    translator: 'Taj Mehmood Amroti',
    status: 'In Pipeline',
    expectedRelease: 'Phase 2',
  },
  {
    code: 'ks',
    language: 'Kashmiri',
    nativeName: 'کٲشُر',
    translator: 'Mirwaiz Mohammad Yousuf Shah',
    status: 'Verification',
    expectedRelease: 'Phase 2',
  },
  {
    code: 'pa',
    language: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ / پنجابی',
    translator: 'Sharif Kunjahi & Master Sunder Singh',
    status: 'Formatting',
    expectedRelease: 'Phase 2',
  },
  {
    code: 'kn',
    language: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    translator: 'Abdussalam Puthige',
    status: 'Verification',
    expectedRelease: 'Phase 2',
  },
  {
    code: 'or',
    language: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    translator: 'Mohammad Anwar',
    status: 'In Pipeline',
    expectedRelease: 'Phase 2',
  },
  {
    code: 'id',
    language: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    translator: 'Kementerian Agama RI (Kemenag)',
    status: 'Formatting',
    expectedRelease: 'Phase 2',
  },
  {
    code: 'ms',
    language: 'Malay',
    nativeName: 'Bahasa Melayu',
    translator: 'Abdullah Muhammad Basmeih',
    status: 'In Pipeline',
    expectedRelease: 'Phase 2',
  },
  {
    code: 'de',
    language: 'German',
    nativeName: 'Deutsch',
    translator: 'Frank Bubenheim & Nadeem Elyas',
    status: 'Formatting',
    expectedRelease: 'Phase 2',
  },
  {
    code: 'fa',
    language: 'Persian / Farsi',
    nativeName: 'فارسی',
    translator: 'Mohammad Mahdi Fooladvand',
    status: 'Verification',
    expectedRelease: 'Phase 2',
  },
  {
    code: 'ja',
    language: 'Japanese',
    nativeName: '日本語',
    translator: 'Ryoichi Mita',
    status: 'In Pipeline',
    expectedRelease: 'Phase 3',
  },
  {
    code: 'ko',
    language: 'Korean',
    nativeName: '한국어',
    translator: 'Hamed Choi',
    status: 'In Pipeline',
    expectedRelease: 'Phase 3',
  },
  {
    code: 'sw',
    language: 'Swahili',
    nativeName: 'Kiswahili',
    translator: 'Ali Muhsin Al-Barwani',
    status: 'In Pipeline',
    expectedRelease: 'Phase 3',
  },
  {
    code: 'ha',
    language: 'Hausa',
    nativeName: 'Hausa',
    translator: 'Abubakar Mahmoud Gumi',
    status: 'In Pipeline',
    expectedRelease: 'Phase 3',
  },
]

export const FEATURED_TRANSLATORS: FeaturedTranslator[] = [
  {
    code: 'ur-taqiusmani',
    nameEnglish: 'Mufti Taqi Usmani (Urdu)',
    nameNative: 'مفتی تقی عثمانی',
    description: 'Tauzeeh Al-Qur\'an — authoritative contemporary Urdu translation',
    hasAudio: false,
  },
  {
    code: 'ur',
    nameEnglish: 'Fateh Muhammad Jalandhri (Urdu)',
    nameNative: 'فتح محمد جالندھری',
    description: 'Classic Urdu translation with authentic recitation by Shamshad Ali Khan',
    hasAudio: true,
    audioReciter: 'Shamshad Ali Khan',
  },
  {
    code: 'ur-roman',
    nameEnglish: 'Roman Urdu (Latin Script)',
    nameNative: 'Roman Urdu',
    description: 'Authentic Roman Urdu rendering (Abul Ala Maududi) with Urdu audio recitation',
    hasAudio: true,
    audioReciter: 'Shamshad Ali Khan',
  },
  {
    code: 'en-sahih',
    nameEnglish: 'Saheeh International (English)',
    nameNative: 'Saheeh International',
    description: 'Clear modern English translation with authentic recitation by Ibrahim Walk',
    hasAudio: true,
    audioReciter: 'Ibrahim Walk',
  },
  {
    code: 'hi',
    nameEnglish: 'Hindi (हिन्दी देवनागरी)',
    nameNative: 'हिन्दी (सुहेल फ़ारूक़ ख़ान)',
    description: 'Complete Devanagari Hindi translation by Suhel Farooq Khan & Saifur Rahman Nadwi',
    hasAudio: true,
    audioReciter: 'TTS Hindi / Voice',
  },
  {
    code: 'en-taqiusmani',
    nameEnglish: 'Mufti Taqi Usmani (English)',
    nameNative: 'Taqi Usmani',
    description: 'Clear, scholarly English rendering by the renowned jurist',
    hasAudio: false,
  },
  {
    code: 'ur-kanzuliman',
    nameEnglish: 'Kanzul Imaan (Urdu)',
    nameNative: 'کنز الایمان',
    description: 'A\'la Hazrat Imam Ahmad Raza Khan Bareillvi',
    hasAudio: false,
  },
  {
    code: 'ur-farhat',
    nameEnglish: 'Dr. Farhat Hashmi (Urdu Audio)',
    nameNative: 'ڈاکٹر فرحت ہاشمی',
    description: 'Word-by-word Urdu commentary and spoken recitation (Al-Huda)',
    hasAudio: true,
    audioReciter: 'Dr. Farhat Hashmi',
  },
]

export const QURAN_LANGUAGES: QuranLanguage[] = [
  // =========================================================================
  // Primary Languages (Urdu, English, Roman Urdu, Hindi)
  // =========================================================================

  // ----- Urdu -----
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
    code: 'ur',
    label: 'Urdu — Fateh Muhammad Jalandhri',
    nativeLabel: 'اردو (جالندھری)',
    edition: 'urd-fatehmuhammadja',
    direction: 'rtl',
    translator: 'Fateh Muhammad Jalandhri',
    translationAudioFolder: 'urdu_shamshad_ali_khan_46kbps',
    note: 'With Shamshad Ali Khan Audio',
  },
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
    code: 'ur-farhat',
    label: 'Urdu — Farhat Hashmi',
    nativeLabel: 'فرحت ہاشمی',
    edition: 'urd-fatehmuhammadja',
    direction: 'rtl',
    translator: 'Dr. Farhat Hashmi (audio) / Fateh Muhammad Jalandhri (text)',
    translationAudioFolder: 'urdu_farhat_hashmi',
    note: 'Al-Huda Spoken Audio',
  },

  // ----- Roman Urdu (Latin script) -----
  {
    code: 'ur-roman',
    label: 'Roman Urdu',
    nativeLabel: 'Roman Urdu',
    edition: 'urd-abulaalamaududi-la',
    direction: 'ltr',
    translator: 'Abul Ala Maududi (Roman Script)',
    translationAudioFolder: 'urdu_shamshad_ali_khan_46kbps',
    note: 'Roman Script with Spoken Urdu Audio',
  },

  // ----- Hindi -----
  {
    code: 'hi',
    label: 'Hindi (हिन्दी)',
    nativeLabel: 'हिन्दी',
    edition: 'hin-suhelfarooqkhan',
    direction: 'ltr',
    translator: 'Suhel Farooq Khan & Saifur Rahman Nadwi',
    note: 'Devanagari Script',
  },
  {
    code: 'hi-farooq',
    label: 'Hindi — Maulana Farooq Khan',
    nativeLabel: 'फ़ारूक़ ख़ान',
    edition: 'hin-muhammadfarooqk',
    direction: 'ltr',
    translator: 'Muhammad Farooq Khan & Muhammad Ahmed',
    note: 'Devanagari Script',
  },
  {
    code: 'hi-kanzuliman',
    label: 'Kanzul Imaan (Hindi)',
    nativeLabel: 'कनज़ुल ईमान',
    edition: 'hin-kanzuliman',
    direction: 'ltr',
    translator: "A'la Hazrat Imam Ahmad Raza Khan",
    api: 'alquran',
    note: 'Kanzul Imaan Devanagari',
  },

  // ----- English -----
  {
    code: 'en-sahih',
    label: 'Saheeh International (English)',
    nativeLabel: 'Saheeh International',
    edition: 'en.sahih',
    direction: 'ltr',
    translator: 'Saheeh International',
    api: 'alquran',
    translationAudioFolder: 'English/Sahih_Intnl_Ibrahim_Walk_192kbps',
    note: 'With Ibrahim Walk English Audio',
  },
  {
    code: 'en',
    label: 'English — Abdullah Yusuf Ali',
    nativeLabel: 'Yusuf Ali',
    edition: 'eng-abdullahyusufal',
    direction: 'ltr',
    translator: 'Abdullah Yusuf Ali',
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
  {
    code: 'en-pickthall',
    label: 'Pickthall (English)',
    nativeLabel: 'Pickthall',
    edition: 'eng-mohammedmarmadu',
    direction: 'ltr',
    translator: 'Mohammed Marmaduke Pickthall',
  },
  {
    code: 'en-asad',
    label: 'Muhammad Asad (English)',
    nativeLabel: 'Muhammad Asad',
    edition: 'eng-muhammadasad',
    direction: 'ltr',
    translator: 'Muhammad Asad',
    note: 'The Message of the Qur\'an',
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

  // =========================================================================
  // Indian Regional Languages (Verified Working Native Scripts)
  // =========================================================================
  {
    code: 'bn',
    label: 'Bengali (বাংলা)',
    nativeLabel: 'বাংলা',
    edition: 'ben-muhiuddinkhan',
    direction: 'ltr',
    translator: 'Muhiuddin Khan',
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
  {
    code: 'te',
    label: 'Telugu (తెలుగు)',
    nativeLabel: 'తెలుగు',
    edition: 'tel-abdulraheemmoha',
    direction: 'ltr',
    translator: 'Abdul Raheem Mohammad Moulana',
  },
  {
    code: 'ta',
    label: 'Tamil (தமிழ்)',
    nativeLabel: 'தமிழ்',
    edition: 'tam-janturstfoundat',
    direction: 'ltr',
    translator: 'Jan Turst Foundation',
  },
  {
    code: 'ml',
    label: 'Malayalam (മലയാളം)',
    nativeLabel: 'മലയാളം',
    edition: 'mal-abdulhameedmada',
    direction: 'ltr',
    translator: 'Abdul Hameed Madani & Kunhi Mohammed',
  },
  {
    code: 'guj',
    label: 'Gujarati (ગુજરાતી)',
    nativeLabel: 'ગુજરાતી',
    edition: 'guj-rabilaalomari',
    direction: 'ltr',
    translator: 'Rabila Al Omari',
  },
  {
    code: 'mr',
    label: 'Marathi (मराठी)',
    nativeLabel: 'मराठी',
    edition: 'mar-muhammadshafiia',
    direction: 'ltr',
    translator: 'Muhammad Shafi I Ansari',
  },
  {
    code: 'as',
    label: 'Assamese (অসমীয়া)',
    nativeLabel: 'অসমীয়া',
    edition: 'asm-shaykhrafeequli',
    direction: 'ltr',
    translator: 'Shaykh Rafeequl Islam Habibur Rahman',
  },

  // =========================================================================
  // International Languages (Verified Working)
  // =========================================================================
  {
    code: 'fr',
    label: 'French (Français)',
    nativeLabel: 'Français',
    edition: 'fra-muhammadhamidul',
    direction: 'ltr',
    translator: 'Muhammad Hamidullah',
  },
  {
    code: 'es',
    label: 'Spanish (Español)',
    nativeLabel: 'Español',
    edition: 'spa-muhammadisagarc',
    direction: 'ltr',
    translator: 'Muhammad Isa García',
  },
  {
    code: 'tr',
    label: 'Turkish (Türkçe)',
    nativeLabel: 'Türkçe',
    edition: 'tur-diyanetisleri',
    direction: 'ltr',
    translator: 'Diyanet İşleri',
  },
  {
    code: 'ru',
    label: 'Russian (Русский)',
    nativeLabel: 'Русский',
    edition: 'rus-elmirkuliev',
    direction: 'ltr',
    translator: 'Elmir Kuliev',
  },
  {
    code: 'zh',
    label: 'Chinese (中文)',
    nativeLabel: '中文',
    edition: 'zho-majian',
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

/** Per-ayah recitation by Sheikh Yasser Ad-Dussary (everyayah.com) with Alafasy CDN backups */
export function ayahAudioUrl(surah: number, ayah: number) {
  const s = String(surah).padStart(3, '0')
  const a = String(ayah).padStart(3, '0')
  return `https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/${s}${a}.mp3`
}

/** Array of candidate audio mirrors for verse-by-verse recitation */
export function ayahAudioUrls(surah: number, ayah: number): string[] {
  const s = String(surah).padStart(3, '0')
  const a = String(ayah).padStart(3, '0')
  return [
    `https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/${s}${a}.mp3`,
    `https://verses.quran.com/Alafasy/mp3/${s}${a}.mp3`,
    `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`,
  ]
}

/**
 * Per-ayah translation audio URL.
 * Returns a URL if the language has a `translationAudioFolder`, otherwise null.
 * Audio is served from everyayah.com
 */
export function translationAudioUrl(lang: QuranLanguage, surah: number, ayah: number): string | null {
  if (!lang.translationAudioFolder) return null
  const s = String(surah).padStart(3, '0')
  const a = String(ayah).padStart(3, '0')
  if (lang.translationAudioFolder.startsWith('English/')) {
    return `https://everyayah.com/data/${lang.translationAudioFolder}/${s}${a}.mp3`
  }
  return `https://everyayah.com/data/translations/${lang.translationAudioFolder}/${s}${a}.mp3`
}

/**
 * Returns the human-readable audio attribution for a language's translation audio.
 * Used in footer credits.
 */
export function translationAudioCredit(lang: QuranLanguage): string | null {
  if (!lang.translationAudioFolder) return null
  const map: Record<string, string> = {
    urdu_shamshad_ali_khan_46kbps: 'Shamshad Ali Khan (Urdu)',
    urdu_farhat_hashmi: 'Dr. Farhat Hashmi (Urdu)',
    'English/Sahih_Intnl_Ibrahim_Walk_192kbps': 'Ibrahim Walk (English)',
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
