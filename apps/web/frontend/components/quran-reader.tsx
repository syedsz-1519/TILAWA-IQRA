'use client'

/**
 * QuranReader — text-first reading experience.
 *
 * Controls on the sticky bar:
 *   - Mode toggle: Translation | Arabic only
 *   - TranslationPicker (shared, read mode — shows all editions incl. readOnly)
 *
 * Per-ayah play:
 *   - Tapping the small play icon on any ayah plays that single ayah via the
 *     default Arabic reciter (Yasser Ad-Dussary).
 *   - No full-surah controls, no reciter selector, no translation audio toggle.
 *   - If the active translation has human audio, it plays after the Arabic ayah.
 *
 * Audio note:
 *   - Translation audio plays only when a real recording exists
 *     (translationAudioFolder is set). TTS is never used.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Languages,
  Pause,
  Play,
  Square,
} from 'lucide-react'
import { SURAHS } from '@/lib/quran'
import {
  DEFAULT_EDITION_ID,
  ENABLED_EDITIONS,
  getEdition,
  arabicUrl,
  translationUrl,
  fetchTranslation,
  ayahAudioUrls,
  translationAudioUrl,
  type ChapterResponse,
  type TranslationEdition,
} from '@/lib/quran-languages'
import { KEYS, EVENTS } from '@/lib/prefs'
import { TranslationPicker } from '@/components/quran/TranslationPicker'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type ReadingMode = 'translation' | 'arabic'

/** Convert a number to Arabic-Indic digits for verse-end markers. */
function toArabicDigits(n: number): string {
  const map = ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669']
  return String(n)
    .split('')
    .map((d) => map[Number(d)] ?? d)
    .join('')
}

const BISMILLAH =
  '\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function QuranReader({ surahNumber }: { surahNumber: number }) {
  const surah = SURAHS.find((s) => s.number === surahNumber) ?? SURAHS[0]

  const [langCode, setLangCode] = useState(DEFAULT_EDITION_ID)
  const [mode, setMode] = useState<ReadingMode>('translation')
  const language: TranslationEdition = getEdition(langCode)

  // Sync with localStorage / TranslationPicker changes
  useEffect(() => {
    const load = () => {
      const saved = window.localStorage.getItem(KEYS.LANG)
      if (saved && ENABLED_EDITIONS.some((e) => e.id === saved)) setLangCode(saved)
      const savedMode = window.localStorage.getItem(KEYS.READING_MODE)
      if (savedMode === 'translation' || savedMode === 'arabic') setMode(savedMode)
    }
    load()
    window.addEventListener('storage', load)
    window.addEventListener(EVENTS.LANG_CHANGED, load)
    return () => {
      window.removeEventListener('storage', load)
      window.removeEventListener(EVENTS.LANG_CHANGED, load)
    }
  }, [])

  const changeMode = (next: ReadingMode) => {
    setMode(next)
    window.localStorage.setItem(KEYS.READING_MODE, next)
  }

  // Fetch Arabic text + translation
  const { data: arabic } = useSWR<ChapterResponse>(arabicUrl(surah.number), fetcher)
  const { data: translation } = useSWR<ChapterResponse>(
    mode === 'translation' ? translationUrl(language, surah.number) : null,
    fetchTranslation,
  )

  // ---------------------------------------------------------------------------
  // Per-ayah audio (single-ayah only — no continuous play-through from here)
  // ---------------------------------------------------------------------------
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeAyah, setActiveAyah] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const langRef = useRef(langCode)
  const modeRef = useRef(mode)
  langRef.current = langCode
  modeRef.current = mode

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    setIsPlaying(false)
    setActiveAyah(null)
  }, [])

  /**
   * Play a single ayah. Sequence:
   *   1. Arabic recitation (Yasser Ad-Dussary, with mirror fallbacks)
   *   2. If the active translation has a human recording, play it next
   *   3. Stop
   */
  const playAyah = useCallback(
    (ayah: number) => {
      // Stop global surah player if running
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(EVENTS.STOP_GLOBAL_AUDIO))
      }

      if (!audioRef.current) {
        audioRef.current = new Audio()
        audioRef.current.preload = 'auto'
      }
      const audio = audioRef.current

      const finish = () => {
        setIsPlaying(false)
        setActiveAyah(null)
      }

      const playTranslationAudio = () => {
        // Only if we are in translation mode and the edition has real human audio
        if (modeRef.current !== 'translation') { finish(); return }
        const edition = getEdition(langRef.current)
        const url = translationAudioUrl(edition, surah.number, ayah)
        if (!url) { finish(); return }
        audio.src = url
        audio.onended = finish
        audio.onerror = finish
        audio.play().catch(finish)
      }

      const mirrors = ayahAudioUrls(surah.number, ayah)

      const tryMirror = (idx: number) => {
        if (idx >= mirrors.length) { finish(); return }
        audio.src = mirrors[idx]
        audio.load()
        audio.onended = playTranslationAudio
        audio.onerror = () => tryMirror(idx + 1)
        audio
          .play()
          .then(() => {
            setActiveAyah(ayah)
            setIsPlaying(true)
            document
              .getElementById(`ayah-${ayah}`)
              ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          })
          .catch(() => tryMirror(idx + 1))
      }

      tryMirror(0)
    },
    [surah.number],
  )

  // Clean up audio on unmount / global stop signal
  useEffect(() => {
    const onStop = () => stop()
    window.addEventListener(EVENTS.STOP_VERSE_AUDIO, onStop)
    return () => {
      audioRef.current?.pause()
      window.removeEventListener(EVENTS.STOP_VERSE_AUDIO, onStop)
    }
  }, [stop])

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const verses = arabic?.chapter ?? []
  const translations = translation?.chapter ?? []
  const showBismillah = surah.number !== 1 && surah.number !== 9

  // Font size class for translation text, based on direction / script
  const translationClass =
    language.direction === 'rtl'
      ? 'text-right text-lg leading-[2] text-foreground'
      : 'text-pretty text-base leading-relaxed text-muted-foreground'

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-32">

      {/* ------------------------------------------------------------------ */}
      {/* Sticky toolbar                                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="sticky top-14 z-20 -mx-4 mb-6 border-b border-border bg-background/95 px-3 py-2 backdrop-blur sm:top-16 sm:px-4 sm:py-3">
        <div className="flex flex-wrap items-center gap-2">

          {/* Mode toggle */}
          <div
            role="tablist"
            aria-label="Reading mode"
            className="inline-flex items-center rounded-md border border-border bg-card p-0.5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'translation'}
              onClick={() => changeMode('translation')}
              className={`inline-flex items-center gap-1 rounded-[calc(var(--radius)*0.6)] px-2.5 py-1.5 text-xs transition-colors sm:px-3 sm:text-sm ${
                mode === 'translation'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Languages className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Translation</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'arabic'}
              onClick={() => changeMode('arabic')}
              className={`inline-flex items-center gap-1 rounded-[calc(var(--radius)*0.6)] px-2.5 py-1.5 text-xs transition-colors sm:px-3 sm:text-sm ${
                mode === 'arabic'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Arabic only</span>
            </button>
          </div>

          {/* Translation picker — only visible in translation mode */}
          {mode === 'translation' && (
            <div className="relative">
              <TranslationPicker mode="read" />
            </div>
          )}

          {/* Active audio indicator */}
          {isPlaying && (
            <button
              type="button"
              onClick={stop}
              className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground active:scale-95"
              aria-label="Stop current ayah playback"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              Stop
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Loading skeleton                                                     */}
      {/* ------------------------------------------------------------------ */}
      {verses.length === 0 && (
        <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading verses">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Arabic-only Mushaf view                                             */}
      {/* ------------------------------------------------------------------ */}
      {verses.length > 0 && mode === 'arabic' && (
        <div className="rounded-2xl border border-primary/20 bg-card p-6 shadow-sm ring-1 ring-primary/5 md:p-10">
          {showBismillah && (
            <p
              lang="ar"
              dir="rtl"
              className="mb-8 border-b border-primary/15 pb-6 text-center text-3xl leading-loose text-primary md:text-4xl"
            >
              {BISMILLAH}
            </p>
          )}
          <p
            lang="ar"
            dir="rtl"
            className="text-right text-[2rem] leading-[2.6] text-foreground md:text-[2.5rem]"
          >
            {verses.map((v) => {
              const isActive = activeAyah === v.verse
              return (
                <span
                  key={v.verse}
                  id={`ayah-${v.verse}`}
                  onClick={() => isActive && isPlaying ? stop() : playAyah(v.verse)}
                  className={`cursor-pointer rounded-md px-0.5 transition-colors ${
                    isActive ? 'bg-primary/15 text-primary' : 'hover:bg-muted'
                  }`}
                >
                  {v.text}
                  <span
                    className="mx-1 inline-flex h-9 w-9 select-none items-center justify-center rounded-full border border-primary/30 text-base text-primary"
                    aria-hidden="true"
                  >
                    {toArabicDigits(v.verse)}
                  </span>{' '}
                </span>
              )
            })}
          </p>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Uthmani script · Tap any ayah to hear it · Recitation: Sheikh Yasser Ad-Dussary
          </p>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Translation view                                                    */}
      {/* ------------------------------------------------------------------ */}
      {verses.length > 0 && mode === 'translation' && (
        <>
          {showBismillah && (
            <p lang="ar" dir="rtl" className="mb-8 text-center text-3xl leading-loose text-primary">
              {BISMILLAH}
            </p>
          )}

          <ol className="flex flex-col gap-2">
            {verses.map((v) => {
              const isActive = activeAyah === v.verse
              const tr = translations.find((t) => t.verse === v.verse)
              return (
                <li
                  key={v.verse}
                  id={`ayah-${v.verse}`}
                  className={`rounded-xl border px-5 py-4 transition-colors ${
                    isActive
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-transparent hover:bg-muted/50'
                  }`}
                >
                  {/* Ayah header row */}
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
                      {surah.number}:{v.verse}
                    </span>
                    {/* Single play/pause button per ayah — 44 px touch target */}
                    <button
                      type="button"
                      onClick={() => isActive && isPlaying ? stop() : playAyah(v.verse)}
                      aria-label={isActive && isPlaying ? `Stop ayah ${v.verse}` : `Play ayah ${v.verse}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground active:scale-95"
                    >
                      {isActive && isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4 translate-x-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Arabic text */}
                  <p
                    lang="ar"
                    dir="rtl"
                    className="mb-4 text-2xl leading-loose text-foreground md:text-3xl"
                  >
                    {v.text}
                  </p>

                  {/* Translation text */}
                  {tr ? (
                    <p
                      dir={language.direction}
                      lang={language.langCode}
                      className={translationClass}
                      style={{ fontFamily: language.fontFamily }}
                    >
                      {tr.text}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground/50 italic">Loading…</p>
                  )}
                </li>
              )
            })}
          </ol>

          {/* Credit footer */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            {language.note ? `${language.note} — ` : ''}
            {language.translator}
            {' · '}Recitation: Sheikh Yasser Ad-Dussary
            {language.translationAudioFolder ? ` · Translation audio: ${language.audioCredit}` : ''}
          </p>
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Prev / Next surah navigation                                        */}
      {/* ------------------------------------------------------------------ */}
      <nav className="mt-8 flex items-center justify-between gap-4" aria-label="Surah navigation">
        {surah.number > 1 ? (
          <Link
            href={`/read/${surah.number - 1}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm transition-colors hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
            {SURAHS[surah.number - 2].nameTransliterated}
          </Link>
        ) : (
          <span />
        )}
        {surah.number < 114 ? (
          <Link
            href={`/read/${surah.number + 1}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm transition-colors hover:bg-muted"
          >
            {SURAHS[surah.number].nameTransliterated}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
