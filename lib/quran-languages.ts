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
    edition: 'urd-abulaalamaududi-la',
    direction: 'ltr',
    translator: 'Abul A\u2019la Maududi',
  },
  {
    code: 'ur',
    label: 'Urdu',
    nativeLabel: '\u0627\u0631\u062f\u0648',
    edition: 'urd-abulaalamaududi',
    direction: 'rtl',
    translator: 'Abul A\u2019la Maududi',
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
