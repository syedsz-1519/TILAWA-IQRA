/**
 * TILAWA Language Configuration
 * Supports 10+ Indian languages for Quran learning
 */

export type LanguageCode = 
  | 'ur' | 'hi' | 'te' | 'mr' | 'gu' | 'bn' | 'ta' | 'ml' | 'pa' | 'kn' | 'or' | 'ks' | 'as' | 'sa' | 'en'

export interface LanguageConfig {
  code: LanguageCode
  name: string
  nativeName: string
  script: string
  direction: 'ltr' | 'rtl'
  speakers: number
  flag: string
  enabled: boolean
}

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    script: 'Nastaliq/Naskh',
    direction: 'rtl',
    speakers: 230000000,
    flag: '🇵🇰',
    enabled: true,
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    script: 'Devanagari',
    direction: 'ltr',
    speakers: 345000000,
    flag: '🇮🇳',
    enabled: true,
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    direction: 'ltr',
    speakers: 84000000,
    flag: '🇮🇳',
    enabled: true,
  },
  mr: {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari',
    direction: 'ltr',
    speakers: 83000000,
    flag: '🇮🇳',
    enabled: true,
  },
  gu: {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
    direction: 'ltr',
    speakers: 60000000,
    flag: '🇮🇳',
    enabled: true,
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali',
    direction: 'ltr',
    speakers: 300000000,
    flag: '🇧🇩',
    enabled: true,
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    direction: 'ltr',
    speakers: 85000000,
    flag: '🇮🇳',
    enabled: true,
  },
  ml: {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    script: 'Malayalam',
    direction: 'ltr',
    speakers: 35000000,
    flag: '🇮🇳',
    enabled: true,
  },
  pa: {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    direction: 'ltr',
    speakers: 125000000,
    flag: '🇮🇳',
    enabled: true,
  },
  kn: {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    direction: 'ltr',
    speakers: 50000000,
    flag: '🇮🇳',
    enabled: true,
  },
  or: {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    script: 'Odia',
    direction: 'ltr',
    speakers: 42000000,
    flag: '🇮🇳',
    enabled: true,
  },
  ks: {
    code: 'ks',
    name: 'Kashmiri',
    nativeName: 'کٲشُر',
    script: 'Perso-Arabic',
    direction: 'rtl',
    speakers: 7000000,
    flag: '🇮🇳',
    enabled: true,
  },
  as: {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    script: 'Assamese',
    direction: 'ltr',
    speakers: 13000000,
    flag: '🇮🇳',
    enabled: true,
  },
  sa: {
    code: 'sa',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    script: 'Devanagari',
    direction: 'ltr',
    speakers: 25000,
    flag: '📚',
    enabled: true,
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    script: 'Latin',
    direction: 'ltr',
    speakers: 1500000000,
    flag: '🌍',
    enabled: true,
  },
}

/**
 * Get all enabled languages
 */
export function getEnabledLanguages(): LanguageConfig[] {
  return Object.values(LANGUAGES).filter(lang => lang.enabled)
}

/**
 * Get language by code
 */
export function getLanguage(code: LanguageCode): LanguageConfig | undefined {
  return LANGUAGES[code]
}

/**
 * Get language name in English
 */
export function getLanguageName(code: LanguageCode): string {
  return LANGUAGES[code]?.name || 'Unknown'
}

/**
 * Get language name in native script
 */
export function getNativeLanguageName(code: LanguageCode): string {
  return LANGUAGES[code]?.nativeName || 'Unknown'
}

/**
 * Get text direction for language (LTR or RTL)
 */
export function getLanguageDirection(code: LanguageCode): 'ltr' | 'rtl' {
  return LANGUAGES[code]?.direction || 'ltr'
}

/**
 * Check if language is RTL
 */
export function isRTLLanguage(code: LanguageCode): boolean {
  return getLanguageDirection(code) === 'rtl'
}

/**
 * Get all language codes
 */
export function getLanguageCodes(): LanguageCode[] {
  return Object.keys(LANGUAGES) as LanguageCode[]
}

/**
 * Sort languages by number of speakers (descending)
 */
export function sortLanguagesBySpeakers(): LanguageConfig[] {
  return Object.values(LANGUAGES)
    .filter(lang => lang.enabled)
    .sort((a, b) => b.speakers - a.speakers)
}

/**
 * Get region-specific languages
 */
export function getRegionLanguages(region: 'south-asia' | 'india' | 'all'): LanguageConfig[] {
  const southAsianCodes: LanguageCode[] = ['ur', 'hi', 'te', 'mr', 'gu', 'bn', 'ta', 'ml', 'pa', 'kn', 'or', 'ks', 'as', 'sa']
  const indianCodes: LanguageCode[] = ['hi', 'te', 'mr', 'gu', 'bn', 'ta', 'ml', 'pa', 'kn', 'or', 'ks', 'as', 'sa']
  
  let codes: LanguageCode[] = []
  
  if (region === 'south-asia') codes = southAsianCodes
  else if (region === 'india') codes = indianCodes
  else codes = getLanguageCodes()
  
  return codes
    .map(code => LANGUAGES[code])
    .filter(lang => lang && lang.enabled)
}

/**
 * Format text with language-specific styling
 */
export interface LanguageStyle {
  fontSize?: string
  fontFamily?: string
  letterSpacing?: string
  lineHeight?: string
}

export function getLanguageStyle(code: LanguageCode): LanguageStyle {
  const baseStyle: LanguageStyle = {
    fontSize: '16px',
    lineHeight: '1.8',
    letterSpacing: '0.5px',
  }

  // Language-specific font recommendations
  const fontFamilies: Record<LanguageCode, string> = {
    ur: 'Noto Naskh Arabic, Arial',
    hi: 'Noto Sans Devanagari, Arial',
    te: 'Noto Sans Telugu, Arial',
    mr: 'Noto Sans Devanagari, Arial',
    gu: 'Noto Sans Gujarati, Arial',
    bn: 'Noto Sans Bengali, Arial',
    ta: 'Noto Sans Tamil, Arial',
    ml: 'Noto Sans Malayalam, Arial',
    pa: 'Noto Sans Punjabi, Arial',
    kn: 'Noto Sans Kannada, Arial',
    or: 'Noto Sans Odia, Arial',
    ks: 'Noto Naskh Arabic, Arial',
    as: 'Noto Sans Bengali, Arial',
    sa: 'Noto Sans Devanagari, Arial',
    en: 'Segoe UI, Arial',
  }

  return {
    ...baseStyle,
    fontFamily: fontFamilies[code],
  }
}

/**
 * Language pair for translation display
 * Example: Arabic + Urdu + English
 */
export interface LanguagePair {
  source: LanguageCode
  translation: LanguageCode
  transliteration?: LanguageCode
}

export const DEFAULT_LANGUAGE_PAIRS: LanguagePair[] = [
  { source: 'en', translation: 'ur', transliteration: 'en' },
  { source: 'en', translation: 'hi', transliteration: 'en' },
  { source: 'en', translation: 'te', transliteration: 'en' },
  { source: 'en', translation: 'ta', transliteration: 'en' },
  { source: 'en', translation: 'bn', transliteration: 'en' },
]
