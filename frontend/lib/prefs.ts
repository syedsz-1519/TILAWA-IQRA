/**
 * lib/prefs.ts
 * -----------
 * Single source of truth for every localStorage key the app touches.
 * Import KEYS (raw strings) or the typed helpers (get/set wrappers).
 *
 * All reads/writes go through here so renaming a key is a one-line change.
 */

// ---------------------------------------------------------------------------
// Keys
// ---------------------------------------------------------------------------
export const KEYS = {
  /** Active translation language code, e.g. 'ur-taqiusmani' */
  LANG: 'tilawa-quran-lang',
  /** Active reciter id, e.g. 'yasser-al-dosari' */
  RECITER: 'tilawa-reciter-id',
  /** Reading mode: 'translation' | 'arabic' */
  READING_MODE: 'tilawa-quran-mode',
  /** Translation audio toggle: 'true' | 'false' */
  TRANSLATION_AUDIO: 'tilawa-translation-audio',
  /** Font size variant: 'sm' | 'md' | 'lg' */
  FONT_SIZE: 'tilawa-font-size',
} as const

export type FontSize = 'sm' | 'md' | 'lg'
export type ReadingMode = 'translation' | 'arabic'

// ---------------------------------------------------------------------------
// Custom DOM event names (dispatched on window to sync across components)
// ---------------------------------------------------------------------------
export const EVENTS = {
  LANG_CHANGED: 'tilawa-lang-changed',
  STOP_VERSE_AUDIO: 'tilawa-stop-verse-audio',
  STOP_GLOBAL_AUDIO: 'tilawa-stop-global-audio',
} as const

// ---------------------------------------------------------------------------
// Typed helpers — safe to call only in browser (guard with isBrowser or
// inside useEffect / event handlers).
// ---------------------------------------------------------------------------

export function isBrowser() {
  return typeof window !== 'undefined'
}

// --- Language ---
export function getLang(fallback: string): string {
  if (!isBrowser()) return fallback
  return window.localStorage.getItem(KEYS.LANG) ?? fallback
}
export function setLang(code: string) {
  if (!isBrowser()) return
  window.localStorage.setItem(KEYS.LANG, code)
  window.dispatchEvent(new CustomEvent(EVENTS.LANG_CHANGED))
}

// --- Reciter ---
export function getReciterId(fallback: string): string {
  if (!isBrowser()) return fallback
  return window.localStorage.getItem(KEYS.RECITER) ?? fallback
}
export function setReciterId(id: string) {
  if (!isBrowser()) return
  window.localStorage.setItem(KEYS.RECITER, id)
}

// --- Reading mode ---
export function getReadingMode(fallback: ReadingMode): ReadingMode {
  if (!isBrowser()) return fallback
  const saved = window.localStorage.getItem(KEYS.READING_MODE)
  return (saved === 'translation' || saved === 'arabic') ? saved : fallback
}
export function setReadingMode(mode: ReadingMode) {
  if (!isBrowser()) return
  window.localStorage.setItem(KEYS.READING_MODE, mode)
}

// --- Translation audio toggle ---
export function getTranslationAudio(): boolean {
  if (!isBrowser()) return true
  const saved = window.localStorage.getItem(KEYS.TRANSLATION_AUDIO)
  return saved !== 'false' // default on
}
export function setTranslationAudio(enabled: boolean) {
  if (!isBrowser()) return
  window.localStorage.setItem(KEYS.TRANSLATION_AUDIO, String(enabled))
}

// --- Font size ---
export function getFontSize(fallback: FontSize = 'md'): FontSize {
  if (!isBrowser()) return fallback
  const saved = window.localStorage.getItem(KEYS.FONT_SIZE)
  return (saved === 'sm' || saved === 'md' || saved === 'lg') ? saved : fallback
}
export function setFontSize(size: FontSize) {
  if (!isBrowser()) return
  window.localStorage.setItem(KEYS.FONT_SIZE, size)
  applyFontSize(size)
}

/**
 * Apply a font-size variant to the document root as a CSS custom property.
 * --quran-font-size is consumed by the QuranReader for Arabic + translation text.
 */
export function applyFontSize(size: FontSize) {
  if (!isBrowser()) return
  const map: Record<FontSize, string> = {
    sm: '1.5rem',
    md: '2rem',
    lg: '2.75rem',
  }
  document.documentElement.style.setProperty('--quran-font-size', map[size])
}
