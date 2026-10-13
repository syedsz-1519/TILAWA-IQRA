/**
 * Single source of truth for every Quran translation edition the app offers.
 *
 * Rules:
 *  - Every entry must have a named translator.
 *  - `enabled: false` hides an edition without deleting it (pending decision).
 *  - `readOnly: true` means the edition appears in Read but NOT in Listen
 *    (e.g. Roman Urdu — visual script aid, not a separate audio language).
 *  - `translationAudioFolder` may only be set when a real human recording
 *    exists on everyayah.com. Never use it as a TTS fallback trigger.
 *  - Text direction, font family, and credit text are consumed by the UI;
 *    keep them accurate.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Which upstream API serves a translation edition. */
export type TranslationApi = 'fawazahmed' | 'alquran'

export interface TranslationEdition {
  /** Stable internal code used as localStorage key and URL param. */
  id: string
  /** ISO 639-1 language code (used for grouping). */
  langCode: string
  /** Language name in English. */
  langName: string
  /** Language name in its own script. */
  langNative: string
  /** Translator's full name (required — never leave blank). */
  translator: string
  /** Short display label: "Translator Name" or "Work Title". */
  label: string
  /** Label in the native script of the translation. */
  nativeLabel: string
  /** Upstream API to use. */
  api: TranslationApi
  /** Edition identifier within the chosen API. */
  editionId: string
  /** Text direction of the translation. */
  direction: 'ltr' | 'rtl'
  /** Suggested CSS font-family for this script (comma-separated, no quotes). */
  fontFamily: string
  /** Optional explanatory note (work title, school of thought, etc.). */
  note?: string
  /**
   * everyayah.com folder path for per-ayah translation audio.
   * Only set when a real human recording exists. Never for TTS.
   */
  translationAudioFolder?: string
  /** Human-readable credit for the audio recording. */
  audioCredit?: string
  /**
   * When true, edition appears only in the Read section.
   * Use for script-aid editions (Roman Urdu) that share audio with another entry.
   */
  readOnly?: boolean
  /**
   * false = hidden from UI but preserved in the registry.
   * Set to false when a source cannot be independently verified.
   */
  enabled: boolean
  /** Reason for disabling (shown in dev console, never in UI). */
  disabledReason?: string
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const TRANSLATION_REGISTRY: TranslationEdition[] = [

  // ==========================================================================
  // URDU — 9 verified editions
  // Source: alquran.cloud /v1/edition/language/ur (confirmed in API listing)
  //         fawazahmed0 CDN (confirmed in editions.min.json)
  // ==========================================================================

  {
    id: 'ur-jalandhri',
    langCode: 'ur',
    langName: 'Urdu',
    langNative: 'اردو',
    translator: 'Fateh Muhammad Jalandhri',
    label: 'Jalandhri',
    nativeLabel: 'فتح محمد جالندھری',
    api: 'alquran',
    editionId: 'ur.jalandhry',
    direction: 'rtl',
    fontFamily: 'Noto Nastaliq Urdu, Noto Naskh Arabic, serif',
    note: 'Classic prose Urdu — widely memorised',
    translationAudioFolder: 'urdu_shamshad_ali_khan_46kbps',
    audioCredit: 'Shamshad Ali Khan via EveryAyah',
    enabled: true,
  },
  {
    id: 'ur-maududi',
    langCode: 'ur',
    langName: 'Urdu',
    langNative: 'اردو',
    translator: 'Abul Ala Maududi',
    label: 'Maududi — Tafheem-ul-Quran',
    nativeLabel: 'مودودی — تفہیم القرآن',
    api: 'alquran',
    editionId: 'ur.maududi',
    direction: 'rtl',
    fontFamily: 'Noto Nastaliq Urdu, Noto Naskh Arabic, serif',
    note: 'Tafheem-ul-Quran — explanatory contemporary Urdu',
    enabled: true,
  },
  {
    id: 'ur-taqiusmani',
    langCode: 'ur',
    langName: 'Urdu',
    langNative: 'اردو',
    translator: 'Mufti Taqi Usmani',
    label: 'Taqi Usmani — Tauzeeh-ul-Quran',
    nativeLabel: 'تقی عثمانی — توضیح القرآن',
    api: 'fawazahmed',
    editionId: 'urd-muhammadtaqiusm',
    direction: 'rtl',
    fontFamily: 'Noto Nastaliq Urdu, Noto Naskh Arabic, serif',
    note: 'Tauzeeh-ul-Quran — authoritative juristic Urdu',
    enabled: true,
  },
  {
    id: 'ur-tahirul-qadri',
    langCode: 'ur',
    langName: 'Urdu',
    langNative: 'اردو',
    translator: 'Tahir ul Qadri',
    label: 'Tahir ul Qadri — Irfan-ul-Quran',
    nativeLabel: 'طاہر القادری — عرفان القرآن',
    api: 'alquran',
    editionId: 'ur.qadri',
    direction: 'rtl',
    fontFamily: 'Noto Nastaliq Urdu, Noto Naskh Arabic, serif',
    note: 'Irfan-ul-Quran — Minhaj ul Quran',
    enabled: true,
  },
  {
    id: 'ur-junagarhi',
    langCode: 'ur',
    langName: 'Urdu',
    langNative: 'اردو',
    translator: 'Muhammad Junagarhi',
    label: 'Junagarhi',
    nativeLabel: 'محمد جوناگڑھی',
    api: 'alquran',
    editionId: 'ur.junagarhi',
    direction: 'rtl',
    fontFamily: 'Noto Nastaliq Urdu, Noto Naskh Arabic, serif',
    note: 'King Fahd Complex approved Urdu',
    enabled: true,
  },
  {
    id: 'ur-kanzuliman',
    langCode: 'ur',
    langName: 'Urdu',
    langNative: 'اردو',
    translator: "A'la Hazrat Imam Ahmad Raza Khan Barelvi",
    label: "Kanz-ul-Iman — Ahmad Raza Khan",
    nativeLabel: 'کنز الایمان — احمد رضا خان',
    api: 'alquran',
    editionId: 'ur.kanzuliman',
    direction: 'rtl',
    fontFamily: 'Noto Nastaliq Urdu, Noto Naskh Arabic, serif',
    note: 'Kanz-ul-Iman — Barelvi school',
    enabled: true,
  },
  {
    id: 'ur-ahmedali',
    langCode: 'ur',
    langName: 'Urdu',
    langNative: 'اردو',
    translator: 'Ahmed Ali',
    label: 'Ahmed Ali',
    nativeLabel: 'احمد علی',
    api: 'alquran',
    editionId: 'ur.ahmedali',
    direction: 'rtl',
    fontFamily: 'Noto Nastaliq Urdu, Noto Naskh Arabic, serif',
    enabled: true,
  },
  {
    id: 'ur-mahmoodulhassan',
    langCode: 'ur',
    langName: 'Urdu',
    langNative: 'اردو',
    translator: 'Mahmood ul Hassan',
    label: 'Mahmood ul Hassan — Shaikh ul Hind',
    nativeLabel: 'محمود الحسن — شیخ الہند',
    api: 'fawazahmed',
    editionId: 'urd-mahmoodulhassan',
    direction: 'rtl',
    fontFamily: 'Noto Nastaliq Urdu, Noto Naskh Arabic, serif',
    note: 'Shaikh ul Hind — earliest modern Urdu translation',
    enabled: true,
  },
  {
    id: 'ur-jawadi',
    langCode: 'ur',
    langName: 'Urdu',
    langNative: 'اردو',
    translator: 'Syed Zeeshan Haider Jawadi',
    label: 'Jawadi',
    nativeLabel: 'سید ذیشان حیدر جوادی',
    api: 'alquran',
    editionId: 'ur.jawadi',
    direction: 'rtl',
    fontFamily: 'Noto Nastaliq Urdu, Noto Naskh Arabic, serif',
    note: 'Shia Ithna Ashari Urdu translation',
    enabled: true,
  },
  /**
   * Roman Urdu — read-only script aid.
   * Audio: uses the same Shamshad Ali Khan Urdu recording as ur-jalandhri.
   * The displayed text is the Maududi Roman transliteration (Latin script);
   * the listener follows the audio in readable Roman script.
   * Not shown in Listen section — readOnly: true.
   */
  {
    id: 'ur-roman',
    langCode: 'ur-roman',
    langName: 'Roman Urdu',
    langNative: 'Roman Urdu',
    translator: 'Abul Ala Maududi (Roman transliteration)',
    label: 'Roman Urdu — Maududi',
    nativeLabel: 'Roman Urdu',
    api: 'fawazahmed',
    editionId: 'urd-abulaalamaududi-la',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    note: 'Latin-script Urdu. Audio is Shamshad Ali Khan Urdu recitation.',
    translationAudioFolder: 'urdu_shamshad_ali_khan_46kbps',
    audioCredit: 'Shamshad Ali Khan via EveryAyah (Urdu audio for Roman script)',
    readOnly: true,
    enabled: true,
  },

  // ==========================================================================
  // ENGLISH — 6 verified editions
  // ==========================================================================

  {
    id: 'en-sahih',
    langCode: 'en',
    langName: 'English',
    langNative: 'English',
    translator: 'Saheeh International',
    label: 'Saheeh International',
    nativeLabel: 'Saheeh International',
    api: 'alquran',
    editionId: 'en.sahih',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    translationAudioFolder: 'English/Sahih_Intnl_Ibrahim_Walk_192kbps',
    audioCredit: 'Ibrahim Walk via EveryAyah',
    enabled: true,
  },
  {
    id: 'en-yusufali',
    langCode: 'en',
    langName: 'English',
    langNative: 'English',
    translator: 'Abdullah Yusuf Ali',
    label: 'Yusuf Ali',
    nativeLabel: 'Yusuf Ali',
    api: 'fawazahmed',
    editionId: 'eng-abdullahyusufal',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'en-pickthall',
    langCode: 'en',
    langName: 'English',
    langNative: 'English',
    translator: 'Mohammed Marmaduke Pickthall',
    label: 'Pickthall',
    nativeLabel: 'Pickthall',
    api: 'fawazahmed',
    editionId: 'eng-mohammedmarmadu',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'en-taqiusmani',
    langCode: 'en',
    langName: 'English',
    langNative: 'English',
    translator: 'Mufti Taqi Usmani',
    label: 'Taqi Usmani',
    nativeLabel: 'Taqi Usmani',
    api: 'fawazahmed',
    editionId: 'eng-muhammadtaqiusm',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    note: 'Tauzeeh-ul-Quran English',
    enabled: true,
  },
  {
    id: 'en-asad',
    langCode: 'en',
    langName: 'English',
    langNative: 'English',
    translator: 'Muhammad Asad',
    label: 'Muhammad Asad — The Message of the Quran',
    nativeLabel: 'Muhammad Asad',
    api: 'fawazahmed',
    editionId: 'eng-muhammadasad',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    note: 'The Message of the Quran',
    enabled: true,
  },
  {
    id: 'en-kanzuliman',
    langCode: 'en',
    langName: 'English',
    langNative: 'English',
    translator: "A'la Hazrat Ahmad Raza Khan, tr. Prof. Shah Faridul Haque",
    label: "Kanz-ul-Iman English",
    nativeLabel: 'Kanz-ul-Iman',
    api: 'alquran',
    editionId: 'en.ahmedraza',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    note: 'Kanz-ul-Iman English translation',
    enabled: true,
  },

  // ==========================================================================
  // HINDI — 3 verified editions
  // ==========================================================================

  {
    id: 'hi-suhel',
    langCode: 'hi',
    langName: 'Hindi',
    langNative: 'हिन्दी',
    translator: 'Suhel Farooq Khan & Saifur Rahman Nadwi',
    label: 'Suhel Farooq Khan & Saifur Rahman Nadwi',
    nativeLabel: 'सुहेल फारूक़ ख़ान',
    api: 'fawazahmed',
    editionId: 'hin-suhelfarooqkhan',
    direction: 'ltr',
    fontFamily: 'Noto Sans Devanagari, system-ui, sans-serif',
    note: 'Devanagari script',
    // No human audio confirmed — TTS is NOT used. Text only.
    enabled: true,
  },
  {
    id: 'hi-farooq',
    langCode: 'hi',
    langName: 'Hindi',
    langNative: 'हिन्दी',
    translator: 'Muhammad Farooq Khan & Muhammad Ahmed',
    label: 'Farooq Khan & Muhammad Ahmed',
    nativeLabel: 'फ़ारूक़ ख़ान',
    api: 'fawazahmed',
    editionId: 'hin-muhammadfarooqk',
    direction: 'ltr',
    fontFamily: 'Noto Sans Devanagari, system-ui, sans-serif',
    note: 'Devanagari script',
    enabled: true,
  },
  {
    id: 'hi-kanzuliman',
    langCode: 'hi',
    langName: 'Hindi',
    langNative: 'हिन्दी',
    translator: "A'la Hazrat Imam Ahmad Raza Khan",
    label: "Kanz-ul-Iman Hindi",
    nativeLabel: 'कनज़ुल ईमान',
    api: 'alquran',
    editionId: 'hin-kanzuliman',
    direction: 'ltr',
    fontFamily: 'Noto Sans Devanagari, system-ui, sans-serif',
    note: 'Kanz-ul-Iman Devanagari',
    enabled: true,
  },

  // ==========================================================================
  // BENGALI — 2 editions
  // ==========================================================================

  {
    id: 'bn-muhiuddin',
    langCode: 'bn',
    langName: 'Bengali',
    langNative: 'বাংলা',
    translator: 'Muhiuddin Khan',
    label: 'Muhiuddin Khan',
    nativeLabel: 'মুহিউদ্দিন খান',
    api: 'fawazahmed',
    editionId: 'ben-muhiuddinkhan',
    direction: 'ltr',
    fontFamily: 'Noto Sans Bengali, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'bn-kanzuliman',
    langCode: 'bn',
    langName: 'Bengali',
    langNative: 'বাংলা',
    translator: "A'la Hazrat Imam Ahmad Raza Khan",
    label: "Kanz-ul-Iman Bengali",
    nativeLabel: 'কানজুল ঈমান',
    api: 'alquran',
    editionId: 'ben-kanzuliman',
    direction: 'ltr',
    fontFamily: 'Noto Sans Bengali, system-ui, sans-serif',
    note: 'Kanz-ul-Iman Bengali',
    enabled: true,
  },

  // ==========================================================================
  // SOUTH INDIAN LANGUAGES
  // ==========================================================================

  {
    id: 'te',
    langCode: 'te',
    langName: 'Telugu',
    langNative: 'తెలుగు',
    translator: 'Abdul Raheem Mohammad Moulana',
    label: 'Abdul Raheem Mohammad Moulana',
    nativeLabel: 'తెలుగు',
    api: 'fawazahmed',
    editionId: 'tel-abdulraheemmoha',
    direction: 'ltr',
    fontFamily: 'Noto Sans Telugu, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'ta',
    langCode: 'ta',
    langName: 'Tamil',
    langNative: 'தமிழ்',
    translator: 'Jan Turst Foundation',
    label: 'Jan Turst Foundation',
    nativeLabel: 'தமிழ்',
    api: 'fawazahmed',
    editionId: 'tam-janturstfoundat',
    direction: 'ltr',
    fontFamily: 'Noto Sans Tamil, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'ml',
    langCode: 'ml',
    langName: 'Malayalam',
    langNative: 'മലയാളം',
    translator: 'Abdul Hameed Madani & Kunhi Mohammed',
    label: 'Abdul Hameed Madani & Kunhi Mohammed',
    nativeLabel: 'മലയാളം',
    api: 'fawazahmed',
    editionId: 'mal-abdulhameedmada',
    direction: 'ltr',
    fontFamily: 'Noto Sans Malayalam, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'guj',
    langCode: 'gu',
    langName: 'Gujarati',
    langNative: 'ગુજરાતી',
    translator: 'Rabila Al Omari',
    label: 'Rabila Al Omari',
    nativeLabel: 'ગુજરાતી',
    api: 'fawazahmed',
    editionId: 'guj-rabilaalomari',
    direction: 'ltr',
    fontFamily: 'Noto Sans Gujarati, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'mr',
    langCode: 'mr',
    langName: 'Marathi',
    langNative: 'मराठी',
    translator: 'Muhammad Shafi Ansari',
    label: 'Muhammad Shafi Ansari',
    nativeLabel: 'मराठी',
    api: 'fawazahmed',
    editionId: 'mar-muhammadshafiia',
    direction: 'ltr',
    fontFamily: 'Noto Sans Devanagari, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'as',
    langCode: 'as',
    langName: 'Assamese',
    langNative: 'অসমীয়া',
    translator: 'Shaykh Rafeequl Islam Habibur Rahman',
    label: 'Shaykh Rafeequl Islam Habibur Rahman',
    nativeLabel: 'অসমীয়া',
    api: 'fawazahmed',
    editionId: 'asm-shaykhrafeequli',
    direction: 'ltr',
    fontFamily: 'Noto Sans Bengali, system-ui, sans-serif',
    enabled: true,
  },

  // ==========================================================================
  // INTERNATIONAL LANGUAGES
  // ==========================================================================

  {
    id: 'fr',
    langCode: 'fr',
    langName: 'French',
    langNative: 'Français',
    translator: 'Muhammad Hamidullah',
    label: 'Muhammad Hamidullah',
    nativeLabel: 'Français',
    api: 'fawazahmed',
    editionId: 'fra-muhammadhamidul',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'es',
    langCode: 'es',
    langName: 'Spanish',
    langNative: 'Español',
    translator: 'Muhammad Isa García',
    label: 'Muhammad Isa García',
    nativeLabel: 'Español',
    api: 'fawazahmed',
    editionId: 'spa-muhammadisagarc',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'tr',
    langCode: 'tr',
    langName: 'Turkish',
    langNative: 'Türkçe',
    translator: 'Diyanet İşleri',
    label: 'Diyanet İşleri',
    nativeLabel: 'Türkçe',
    api: 'fawazahmed',
    editionId: 'tur-diyanetisleri',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'ru',
    langCode: 'ru',
    langName: 'Russian',
    langNative: 'Русский',
    translator: 'Elmir Kuliev',
    label: 'Elmir Kuliev',
    nativeLabel: 'Русский',
    api: 'fawazahmed',
    editionId: 'rus-elmirkuliev',
    direction: 'ltr',
    fontFamily: 'Inter, system-ui, sans-serif',
    enabled: true,
  },
  {
    id: 'zh',
    langCode: 'zh',
    langName: 'Chinese',
    langNative: '中文',
    translator: 'Ma Jian',
    label: 'Ma Jian',
    nativeLabel: '中文',
    api: 'fawazahmed',
    editionId: 'zho-majian',
    direction: 'ltr',
    fontFamily: 'Noto Sans SC, system-ui, sans-serif',
    enabled: true,
  },

  // ==========================================================================
  // DISABLED — pending decision (enabled: false, reason documented)
  // ==========================================================================

  {
    id: 'ur-farhat',
    langCode: 'ur',
    langName: 'Urdu',
    langNative: 'اردو',
    translator: 'Dr. Farhat Hashmi (audio) / Fateh Muhammad Jalandhri (text)',
    label: 'Farhat Hashmi Audio',
    nativeLabel: 'فرحت ہاشمی',
    api: 'fawazahmed',
    editionId: 'urd-fatehmuhammadja',
    direction: 'rtl',
    fontFamily: 'Noto Nastaliq Urdu, Noto Naskh Arabic, serif',
    note: 'Al-Huda — spoken audio; text is Jalandhri',
    translationAudioFolder: 'urdu_farhat_hashmi',
    audioCredit: 'Dr. Farhat Hashmi via EveryAyah',
    enabled: false,
    disabledReason: 'Audio folder "urdu_farhat_hashmi" not confirmed on everyayah.com. Enable after verifying the CDN path.',
  },
]

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

/** All editions that are enabled and visible in the UI. */
export const ENABLED_EDITIONS = TRANSLATION_REGISTRY.filter((e) => e.enabled)

/** Editions available in the Listen section (excludes readOnly). */
export const LISTEN_EDITIONS = ENABLED_EDITIONS.filter((e) => !e.readOnly)

/** Editions that carry real human translation audio. */
export const AUDIO_EDITIONS = LISTEN_EDITIONS.filter((e) => !!e.translationAudioFolder)

/** Default translation shown on first visit. */
export const DEFAULT_EDITION_ID = 'ur-jalandhri'

/**
 * Return a single edition by its stable id.
 * Falls back to the default if not found.
 */
export function getEdition(id: string): TranslationEdition {
  return (
    TRANSLATION_REGISTRY.find((e) => e.id === id && e.enabled) ??
    TRANSLATION_REGISTRY.find((e) => e.id === DEFAULT_EDITION_ID)!
  )
}

/**
 * Return editions grouped by language, in a fixed display order.
 * readOnly editions are included (they appear in the Read picker but not Listen).
 */
export function getEditionsByLanguage(): { langCode: string; langName: string; langNative: string; editions: TranslationEdition[] }[] {
  // Fixed language display order
  const LANG_ORDER = ['ur', 'ur-roman', 'en', 'hi', 'bn', 'te', 'ta', 'ml', 'gu', 'mr', 'as', 'fr', 'es', 'tr', 'ru', 'zh']

  const map = new Map<string, TranslationEdition[]>()
  for (const e of ENABLED_EDITIONS) {
    const group = map.get(e.langCode) ?? []
    group.push(e)
    map.set(e.langCode, group)
  }

  return LANG_ORDER
    .filter((lc) => map.has(lc))
    .map((lc) => {
      const editions = map.get(lc)!
      return {
        langCode: lc,
        langName: editions[0].langName,
        langNative: editions[0].langNative,
        editions,
      }
    })
}

// ---------------------------------------------------------------------------
// URL builders — kept here so callers never hard-code API base URLs
// ---------------------------------------------------------------------------

const FAWAZ_CDN = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1'

export function arabicUrl(surah: number): string {
  return `${FAWAZ_CDN}/editions/ara-quranuthmanihaf/${surah}.json`
}

export function translationUrl(edition: TranslationEdition, surah: number): string {
  if (edition.api === 'alquran') {
    return `https://api.alquran.cloud/v1/surah/${surah}/${edition.editionId}`
  }
  return `${FAWAZ_CDN}/editions/${edition.editionId}/${surah}.json`
}

// ---------------------------------------------------------------------------
// Normaliser — maps either API shape to a flat verse array
// ---------------------------------------------------------------------------

export interface ApiVerse {
  chapter: number
  verse: number
  text: string
}

export interface ChapterResponse {
  chapter: ApiVerse[]
}

/**
 * Fetch a translation URL and normalise either API response into ChapterResponse.
 *
 * fawazahmed0: { chapter: [{ chapter, verse, text }] }
 * alquran.cloud: { data: { number, ayahs: [{ numberInSurah, text }] } }
 */
export async function fetchTranslation(url: string): Promise<ChapterResponse> {
  const res = await fetch(url)
  if (!res.ok) return { chapter: [] }
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

// ---------------------------------------------------------------------------
// Audio helpers
// ---------------------------------------------------------------------------

/** Candidate Arabic recitation URLs in priority order. */
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
 * Returns the translation audio URL for an edition if it has human audio.
 * Returns null when no recording is available — the UI must show "Text only".
 * Never triggers TTS.
 */
export function translationAudioUrl(
  edition: TranslationEdition,
  surah: number,
  ayah: number,
): string | null {
  if (!edition.translationAudioFolder) return null
  const s = String(surah).padStart(3, '0')
  const a = String(ayah).padStart(3, '0')
  if (edition.translationAudioFolder.startsWith('English/')) {
    return `https://everyayah.com/data/${edition.translationAudioFolder}/${s}${a}.mp3`
  }
  return `https://everyayah.com/data/translations/${edition.translationAudioFolder}/${s}${a}.mp3`
}

// ---------------------------------------------------------------------------
// Legacy shim — keeps existing callers working while we migrate them
// (Remove after Cluster 3 + 4 are complete)
// ---------------------------------------------------------------------------

export type QuranLanguage = {
  code: string
  label: string
  nativeLabel: string
  edition: string
  direction: 'ltr' | 'rtl'
  translator: string
  api?: TranslationApi
  note?: string
  translationAudioFolder?: string
}

function editionToLegacy(e: TranslationEdition): QuranLanguage {
  return {
    code: e.id,
    label: e.label,
    nativeLabel: e.nativeLabel,
    edition: e.editionId,
    direction: e.direction,
    translator: e.translator,
    api: e.api,
    note: e.note,
    translationAudioFolder: e.translationAudioFolder,
  }
}

/** @deprecated Use ENABLED_EDITIONS from the registry instead. */
export const QURAN_LANGUAGES: QuranLanguage[] = ENABLED_EDITIONS.map(editionToLegacy)

/** @deprecated Use DEFAULT_EDITION_ID instead. */
export const DEFAULT_LANGUAGE = DEFAULT_EDITION_ID

/** @deprecated Use getEdition() instead. */
export function getLanguage(code: string): QuranLanguage {
  return editionToLegacy(getEdition(code))
}

/** @deprecated Use translationAudioUrl() with a TranslationEdition instead. */
export function translationAudioCredit(lang: QuranLanguage): string | null {
  const e = getEdition(lang.code)
  return e.audioCredit ?? null
}

/** @deprecated Use edition.translationAudioFolder directly. */
export function hasTranslationAudio(code: string): boolean {
  const e = getEdition(code)
  return !!e.translationAudioFolder
}

// ---------------------------------------------------------------------------
// Upcoming languages pipeline (no editions yet — display only)
// ---------------------------------------------------------------------------

export interface UpcomingLanguage {
  code: string
  language: string
  nativeName: string
  translator: string
  status: 'In Pipeline' | 'Formatting' | 'Verification'
  expectedRelease: string
}

export const UPCOMING_LANGUAGES: UpcomingLanguage[] = [
  { code: 'ps', language: 'Pashto',            nativeName: 'پښتو',               translator: 'Maulana Abdulwali Khan & Zakariya',   status: 'In Pipeline',  expectedRelease: 'Phase 2' },
  { code: 'sd', language: 'Sindhi',            nativeName: 'سنڌي',               translator: 'Taj Mehmood Amroti',                  status: 'In Pipeline',  expectedRelease: 'Phase 2' },
  { code: 'ks', language: 'Kashmiri',          nativeName: 'کٲشُر',              translator: 'Mirwaiz Mohammad Yousuf Shah',         status: 'Verification', expectedRelease: 'Phase 2' },
  { code: 'pa', language: 'Punjabi',           nativeName: 'ਪੰਜਾਬੀ / پنجابی',    translator: 'Sharif Kunjahi & Master Sunder Singh', status: 'Formatting',   expectedRelease: 'Phase 2' },
  { code: 'kn', language: 'Kannada',           nativeName: 'ಕನ್ನಡ',              translator: 'Abdussalam Puthige',                  status: 'Verification', expectedRelease: 'Phase 2' },
  { code: 'or', language: 'Odia',              nativeName: 'ଓଡ଼ିଆ',              translator: 'Mohammad Anwar',                      status: 'In Pipeline',  expectedRelease: 'Phase 2' },
  { code: 'id', language: 'Indonesian',        nativeName: 'Bahasa Indonesia',    translator: 'Kementerian Agama RI (Kemenag)',       status: 'Formatting',   expectedRelease: 'Phase 2' },
  { code: 'ms', language: 'Malay',             nativeName: 'Bahasa Melayu',       translator: 'Abdullah Muhammad Basmeih',           status: 'In Pipeline',  expectedRelease: 'Phase 2' },
  { code: 'de', language: 'German',            nativeName: 'Deutsch',             translator: 'Frank Bubenheim & Nadeem Elyas',       status: 'Formatting',   expectedRelease: 'Phase 2' },
  { code: 'fa', language: 'Persian / Farsi',   nativeName: 'فارسی',               translator: 'Mohammad Mahdi Fooladvand',           status: 'Verification', expectedRelease: 'Phase 2' },
  { code: 'ja', language: 'Japanese',          nativeName: '日本語',               translator: 'Ryoichi Mita',                        status: 'In Pipeline',  expectedRelease: 'Phase 3' },
  { code: 'ko', language: 'Korean',            nativeName: '한국어',               translator: 'Hamed Choi',                          status: 'In Pipeline',  expectedRelease: 'Phase 3' },
  { code: 'sw', language: 'Swahili',           nativeName: 'Kiswahili',           translator: 'Ali Muhsin Al-Barwani',               status: 'In Pipeline',  expectedRelease: 'Phase 3' },
  { code: 'ha', language: 'Hausa',             nativeName: 'Hausa',               translator: 'Abubakar Mahmoud Gumi',               status: 'In Pipeline',  expectedRelease: 'Phase 3' },
]

// ---------------------------------------------------------------------------
// Featured translators for the settings panel quick-pick cards.
// Each code must reference an id that exists in TRANSLATION_REGISTRY.
// ---------------------------------------------------------------------------

export interface FeaturedTranslator {
  code: string
  nameEnglish: string
  nameNative: string
  description: string
  hasAudio: boolean
  audioReciter?: string
}

export const FEATURED_TRANSLATORS: FeaturedTranslator[] = [
  {
    code: 'ur-jalandhri',
    nameEnglish: 'Fateh Muhammad Jalandhri (Urdu)',
    nameNative: 'فتح محمد جالندھری',
    description: 'Classic Urdu — with authentic recitation by Shamshad Ali Khan',
    hasAudio: true,
    audioReciter: 'Shamshad Ali Khan',
  },
  {
    code: 'ur-maududi',
    nameEnglish: 'Abul Ala Maududi — Tafheem-ul-Quran',
    nameNative: 'مودودی — تفہیم القرآن',
    description: 'Explanatory contemporary Urdu — widely referenced',
    hasAudio: false,
  },
  {
    code: 'ur-taqiusmani',
    nameEnglish: 'Mufti Taqi Usmani — Tauzeeh-ul-Quran',
    nameNative: 'تقی عثمانی — توضیح القرآن',
    description: 'Authoritative juristic Urdu from a leading contemporary scholar',
    hasAudio: false,
  },
  {
    code: 'en-sahih',
    nameEnglish: 'Saheeh International (English)',
    nameNative: 'Saheeh International',
    description: 'Clear modern English — with authentic recitation by Ibrahim Walk',
    hasAudio: true,
    audioReciter: 'Ibrahim Walk',
  },
  {
    code: 'ur-roman',
    nameEnglish: 'Roman Urdu — Maududi (Latin script)',
    nameNative: 'Roman Urdu',
    description: 'Follow the Urdu recitation in readable Latin script',
    hasAudio: true,
    audioReciter: 'Shamshad Ali Khan',
  },
  {
    code: 'hi-suhel',
    nameEnglish: 'Suhel Farooq Khan & Saifur Rahman Nadwi (Hindi)',
    nameNative: 'सुहेल फारूक़ ख़ान',
    description: 'Complete Devanagari Hindi translation — text only',
    hasAudio: false,
  },
]
