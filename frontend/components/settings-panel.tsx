'use client'

import {
  Check,
  Clock,
  Database,
  Globe,
  Headphones,
  Mic,
  Monitor,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  Type,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import { usePlayer } from '@/components/player/player-provider'
import { DEFAULT_RECITER, RECITERS } from '@/lib/quran'
import {
  FEATURED_TRANSLATORS,
  QURAN_LANGUAGES,
  UPCOMING_LANGUAGES,
  type QuranLanguage,
  type UpcomingLanguage,
} from '@/lib/quran-languages'
import { KEYS, EVENTS, getFontSize, setFontSize, applyFontSize, type FontSize } from '@/lib/prefs'
import { cn } from '@/lib/utils'

const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun, hint: 'Warm parchment tones for daytime reading' },
  { value: 'dark', label: 'Dark', icon: Moon, hint: 'Deep forest palette, easy on the eyes at night' },
  { value: 'system', label: 'System', icon: Monitor, hint: 'Follows your device preference automatically' },
]

const speedOptions = [0.75, 1, 1.25, 1.5]

const fontSizeOptions: { value: FontSize; label: string; hint: string; arabicPreview: string }[] = [
  { value: 'sm', label: 'Small', hint: 'Compact — fits more on screen', arabicPreview: 'text-xl' },
  { value: 'md', label: 'Medium', hint: 'Default — balanced reading size', arabicPreview: 'text-2xl' },
  { value: 'lg', label: 'Large', hint: 'Larger Arabic text — easier on eyes', arabicPreview: 'text-3xl' },
]

export function SettingsPanel() {
  const { theme, setTheme } = useTheme()
  const { playbackRate, setPlaybackRate, repeat, toggleRepeat, currentReciter, setReciter } = usePlayer()

  const [mounted, setMounted] = useState(false)
  const [activeLangCode, setActiveLangCode] = useState<string>('')
  const [fontSize, setFontSizeState] = useState<FontSize>('md')

  // Top toggle for Audio Reciters vs Translators & Languages
  const [audioViewMode, setAudioViewMode] = useState<'reciters' | 'translators'>('translators')

  // Sub-filter for Translators (Active Working vs Upcoming Roadmap)
  const [translationFilter, setTranslationFilter] = useState<'working' | 'upcoming'>('working')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setMounted(true)

    // Load saved translation
    const savedLang = window.localStorage.getItem(KEYS.LANG)
    if (savedLang && QURAN_LANGUAGES.some((l) => l.code === savedLang)) {
      setActiveLangCode(savedLang)
    } else {
      setActiveLangCode(FEATURED_TRANSLATORS[0].code)
    }

    // Load saved font size and apply immediately
    const savedSize = getFontSize()
    setFontSizeState(savedSize)
    applyFontSize(savedSize)
  }, [])

  const selectTranslator = (code: string) => {
    setActiveLangCode(code)
    window.localStorage.setItem(KEYS.LANG, code)
    window.dispatchEvent(new CustomEvent(EVENTS.LANG_CHANGED))
  }

  const changeFontSize = (size: FontSize) => {
    setFontSizeState(size)
    setFontSize(size)
  }

  // Filter working languages by search query
  const filteredWorkingLanguages = useMemo(() => {
    if (!searchQuery.trim()) return QURAN_LANGUAGES
    const q = searchQuery.toLowerCase().trim()
    return QURAN_LANGUAGES.filter(
      (lang) =>
        lang.label.toLowerCase().includes(q) ||
        lang.nativeLabel.toLowerCase().includes(q) ||
        lang.translator.toLowerCase().includes(q) ||
        (lang.note && lang.note.toLowerCase().includes(q)),
    )
  }, [searchQuery])

  // Filter upcoming languages by search query
  const filteredUpcomingLanguages = useMemo(() => {
    if (!searchQuery.trim()) return UPCOMING_LANGUAGES
    const q = searchQuery.toLowerCase().trim()
    return UPCOMING_LANGUAGES.filter(
      (lang) =>
        lang.language.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        lang.translator.toLowerCase().includes(q),
    )
  }, [searchQuery])

  return (
    <div className="flex flex-col gap-6">
      {/* ------------------------------------------------------------------ */}
      {/* Unified Audio Section: Reciters & Translators                       */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-labelledby="audio-reciters-translators-heading"
        className="rounded-xl border border-border bg-card p-5 sm:p-6"
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="audio-reciters-translators-heading" className="text-base font-semibold sm:text-lg">
              Quran Voices & Translations
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Select your Quran reciter or switch language translation with audio.
            </p>
          </div>
        </div>

        {/* Segmented View Switcher: Reciters vs Translators */}
        <div className="mt-5 grid grid-cols-2 gap-1.5 rounded-lg border border-border bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setAudioViewMode('reciters')}
            aria-pressed={audioViewMode === 'reciters'}
            className={cn(
              'flex items-center justify-center gap-2 rounded-md py-2.5 text-xs font-semibold transition-all sm:text-sm',
              audioViewMode === 'reciters'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-card hover:text-foreground',
            )}
          >
            <Mic className="size-4" aria-hidden="true" />
            <span>Reciters (قراء کرام)</span>
          </button>
          <button
            type="button"
            onClick={() => setAudioViewMode('translators')}
            aria-pressed={audioViewMode === 'translators'}
            className={cn(
              'flex items-center justify-center gap-2 rounded-md py-2.5 text-xs font-semibold transition-all sm:text-sm',
              audioViewMode === 'translators'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-card hover:text-foreground',
            )}
          >
            <Globe className="size-4" aria-hidden="true" />
            <span>Translators & Languages (ترجمے)</span>
          </button>
        </div>

        {/* ================================================================ */}
        {/* VIEW 1: RECITERS                                                 */}
        {/* ================================================================ */}
        {audioViewMode === 'reciters' && (
          <div className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Available Reciters ({RECITERS.length})
              </span>
              <span className="text-xs text-muted-foreground">High-quality CDN streaming</span>
            </div>

            <ul className="flex flex-col gap-2">
              {RECITERS.map((reciter) => {
                const isSelected = currentReciter.id === reciter.id
                return (
                  <li key={reciter.id}>
                    <button
                      type="button"
                      onClick={() => setReciter(reciter)}
                      className={cn(
                        'flex w-full items-center justify-between gap-2 rounded-lg border p-3.5 text-start transition-colors sm:p-4',
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-sm'
                          : 'border-border bg-background hover:border-primary/40 hover:bg-muted/50',
                      )}
                    >
                      <div className="flex min-w-0 flex-col">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold text-foreground">
                            {reciter.nameEnglish}
                          </span>
                          {reciter.id === DEFAULT_RECITER.id && (
                            <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-medium text-primary">
                              Featured
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{reciter.riwayah}</span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
                        <span lang="ar" dir="rtl" className="font-serif text-sm text-primary sm:text-base">
                          {reciter.nameArabic}
                        </span>
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground sm:px-3 sm:py-1 sm:text-xs">
                            <Check className="size-3" />
                            Active
                          </span>
                        ) : (
                          <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] text-muted-foreground sm:px-3 sm:py-1 sm:text-xs">
                            Select
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* ================================================================ */}
        {/* VIEW 2: TRANSLATORS & LANGUAGES                                  */}
        {/* ================================================================ */}
        {audioViewMode === 'translators' && (
          <div className="mt-4">
            {/* Sub-Tabs: Active Working vs Upcoming Pipeline */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTranslationFilter('working')}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                    translationFilter === 'working'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'border border-border bg-background text-muted-foreground hover:bg-muted',
                  )}
                >
                  <Sparkles className="size-3" />
                  <span>Active & Verified ({QURAN_LANGUAGES.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTranslationFilter('upcoming')}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                    translationFilter === 'upcoming'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'border border-border bg-background text-muted-foreground hover:bg-muted',
                  )}
                >
                  <Clock className="size-3" />
                  <span>Launching Soon ({UPCOMING_LANGUAGES.length})</span>
                </button>
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-48">
                <Search className="absolute start-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search languages..."
                  className="h-8 w-full rounded-md border border-border bg-background ps-8 pe-3 text-xs placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* TAB CONTENT: ACTIVE & WORKING TRANSLATIONS */}
            {translationFilter === 'working' && (
              <div className="mt-4">
                <p className="mb-3 text-xs text-muted-foreground">
                  Includes complete authentic translations in Urdu, Roman Urdu, Hindi (Devanagari), English, Indian regional scripts, and international editions with synchronized recitation audio.
                </p>

                <ul className="flex flex-col gap-2">
                  {filteredWorkingLanguages.map((t) => {
                    const isSelected = activeLangCode === t.code
                    return (
                      <li key={t.code}>
                        <button
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => selectTranslator(t.code)}
                          className={cn(
                            'flex w-full items-center justify-between gap-3 rounded-lg border p-3.5 text-start transition-colors sm:p-4',
                            isSelected
                              ? 'border-primary bg-primary/10 shadow-sm'
                              : 'border-border bg-background hover:border-primary/40 hover:bg-muted/50',
                          )}
                        >
                          {/* Left: label + translator */}
                          <div className="flex min-w-0 flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <span className="truncate text-sm font-semibold text-foreground">
                                {t.label}
                              </span>
                              {t.note && (
                                <span className="hidden rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline-block">
                                  {t.note}
                                </span>
                              )}
                            </div>
                            <span className="line-clamp-1 text-xs leading-relaxed text-muted-foreground">
                              {t.translator}
                            </span>
                          </div>

                          {/* Right: Native script + audio badge */}
                          <div className="flex shrink-0 flex-col items-end gap-1.5">
                            <span
                              dir={t.direction}
                              className="font-serif text-sm font-medium text-primary"
                            >
                              {t.nativeLabel}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {t.translationAudioFolder ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                                  <Volume2 className="size-3" aria-hidden="true" />
                                  <span>Audio Studio</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400">
                                  <Volume2 className="size-3" aria-hidden="true" />
                                  <span>Voice Ready</span>
                                </span>
                              )}
                              {isSelected ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground sm:px-3 sm:py-1 sm:text-xs">
                                  <Check className="size-3" />
                                  Active
                                </span>
                              ) : (
                                <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] text-muted-foreground sm:px-3 sm:py-1 sm:text-xs">
                                  Select
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* TAB CONTENT: UPCOMING / LAUNCHING SOON */}
            {translationFilter === 'upcoming' && (
              <div className="mt-4">
                <div className="mb-3 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs leading-relaxed text-foreground">
                  <strong>Tilawa Global Translation Pipeline:</strong> The following languages and regional dialects are currently undergoing scholarly verification and tajweed alignment for upcoming releases.
                </div>

                <ul className="flex flex-col gap-2">
                  {filteredUpcomingLanguages.map((item) => (
                    <li
                      key={item.code}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/60 p-3.5 sm:p-4"
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {item.language}
                          </span>
                          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {item.status}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Translator: {item.translator}
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="font-serif text-sm text-primary">
                          {item.nativeName}
                        </span>
                        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                          Coming Soon ({item.expectedRelease})
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Playback Settings                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="playback-heading" className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <h2 id="playback-heading" className="text-base font-semibold sm:text-lg">
          Recitation Playback Defaults
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Control playback speed and loop mode for memorization.
        </p>

        <div className="mt-4 flex flex-col gap-5">
          {/* Speed */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Recitation speed</span>
            <div role="radiogroup" aria-label="Playback speed" className="flex flex-wrap gap-2">
              {speedOptions.map((speed) => (
                <button
                  key={speed}
                  type="button"
                  role="radio"
                  aria-checked={playbackRate === speed}
                  onClick={() => setPlaybackRate(speed)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                    playbackRate === speed
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
                  )}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Repeat toggle */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Repeat surah</span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                Loop the current recitation continuously — helpful for Hifz (memorization)
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={repeat}
              aria-label="Repeat surah"
              onClick={toggleRepeat}
              className={cn(
                'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                repeat ? 'bg-primary' : 'bg-muted',
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 size-5 rounded-full bg-card shadow transition-all',
                  repeat ? 'start-[22px]' : 'start-0.5',
                )}
              />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Appearance                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="theme-heading" className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <h2 id="theme-heading" className="text-base font-semibold sm:text-lg">Appearance & Theme</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Choose your visual theme. Saved directly on your device.
        </p>
        <div role="radiogroup" aria-label="Theme" className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {themeOptions.map((option) => {
            const Icon = option.icon
            const active = mounted && theme === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setTheme(option.value)}
                className={cn(
                  'flex flex-col items-start gap-2 rounded-lg border p-3 text-start transition-colors sm:p-4',
                  active ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/40',
                )}
              >
                <span
                  className={cn(
                    'flex size-8 items-center justify-center rounded-md sm:size-9',
                    active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium sm:text-sm">{option.label}</span>
                <span className="hidden text-xs leading-relaxed text-muted-foreground sm:block">
                  {option.hint}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Font Size                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="fontsize-heading" className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Type className="size-4 text-muted-foreground" aria-hidden="true" />
          <h2 id="fontsize-heading" className="text-base font-semibold sm:text-lg">Font Size</h2>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Arabic typography and translation font scale in the reader.
        </p>
        <div role="radiogroup" aria-label="Font size" className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {fontSizeOptions.map((opt) => {
            const active = mounted && fontSize === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => changeFontSize(opt.value)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors sm:p-4',
                  active ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/40',
                )}
              >
                <span
                  lang="ar"
                  dir="rtl"
                  className={cn('font-serif font-bold text-primary', opt.arabicPreview)}
                >
                  بِسْمِ اللَّهِ
                </span>
                <span className="text-xs font-medium sm:text-sm">{opt.label}</span>
                <span className="hidden text-xs leading-relaxed text-muted-foreground sm:block">
                  {opt.hint}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Database & Cloud Sync Instructions                                 */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="db-heading" className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Database className="size-4 text-primary" aria-hidden="true" />
          <h2 id="db-heading" className="text-base font-semibold sm:text-lg">Database & Cloud Sync</h2>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Instructions for connecting PostgreSQL / Cloud SQL and persistent synchronization.
        </p>

        <div className="mt-4 rounded-lg border border-border bg-background p-4 text-xs leading-relaxed">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-semibold text-foreground">Storage Engine Status:</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
              <Check className="size-3" />
              Hybrid Storage (Cloud Ready + Client Local Cache)
            </span>
          </div>
          <p className="text-muted-foreground">
            Tilawa stores your active reading preferences, last-read ayah, streak records, and Nafs reflection habits in client local storage automatically.
          </p>
          <div className="mt-3 rounded border border-border bg-muted/30 p-2.5 font-mono text-[11px] text-foreground">
            # To connect full PostgreSQL / Cloud SQL database, set in .env:<br />
            DATABASE_URL=&quot;postgres://username:password@host:5432/tilawa_db&quot;
          </div>
          <p className="mt-2 text-muted-foreground">
            Managed tables: <code className="text-foreground">streaks</code>, <code className="text-foreground">nafsTracking</code>, <code className="text-foreground">mushafBookmarks</code>, <code className="text-foreground">readingProgress</code>, <code className="text-foreground">tajweedScores</code>.
          </p>
        </div>
      </section>
    </div>
  )
}
