'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Languages,
  Pause,
  Play,
  Type,
  Volume2,
} from 'lucide-react'
import { SURAHS } from '@/lib/quran'
import { usePlayer } from '@/components/player/player-provider'
import {
  QURAN_LANGUAGES,
  DEFAULT_LANGUAGE,
  getLanguage,
  arabicUrl,
  translationUrl,
  fetchTranslation,
  ayahAudioUrl,
  translationAudioUrl,
  translationAudioCredit,
  hasTranslationAudio,
  type ChapterResponse,
} from '@/lib/quran-languages'
import { KEYS, EVENTS } from '@/lib/prefs'

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

export function QuranReader({ surahNumber }: { surahNumber: number }) {
  const surah = SURAHS.find((s) => s.number === surahNumber) ?? SURAHS[0]
  const { playSurah } = usePlayer()
  const [langCode, setLangCode] = useState(DEFAULT_LANGUAGE)
  const [mode, setMode] = useState<ReadingMode>('translation')
  const language = getLanguage(langCode)

  // Load saved language + mode preferences & listen to global changes
  useEffect(() => {
    const loadPrefs = () => {
      const savedLang = window.localStorage.getItem(KEYS.LANG)
      if (savedLang && QURAN_LANGUAGES.some((l) => l.code === savedLang)) setLangCode(savedLang)
      const savedMode = window.localStorage.getItem(KEYS.READING_MODE)
      if (savedMode === 'translation' || savedMode === 'arabic') setMode(savedMode)
    }
    loadPrefs()

    window.addEventListener('storage', loadPrefs)
    window.addEventListener(EVENTS.LANG_CHANGED, loadPrefs)
    return () => {
      window.removeEventListener('storage', loadPrefs)
      window.removeEventListener(EVENTS.LANG_CHANGED, loadPrefs)
    }
  }, [])

  const changeLanguage = (code: string) => {
    setLangCode(code)
    window.localStorage.setItem(KEYS.LANG, code)
    window.dispatchEvent(new CustomEvent(EVENTS.LANG_CHANGED))
  }

  const changeMode = (next: ReadingMode) => {
    setMode(next)
    window.localStorage.setItem(KEYS.READING_MODE, next)
  }

  const { data: arabic } = useSWR<ChapterResponse>(arabicUrl(surah.number), fetcher)
  const { data: translation } = useSWR<ChapterResponse>(
    mode === 'translation' ? translationUrl(language, surah.number) : null,
    fetchTranslation,
  )

  // Per-ayah read-along audio (Arabic recitation, then optional Urdu translation - Islam360 style)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeAyah, setActiveAyah] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [translationAudio, setTranslationAudio] = useState(true)
  const continueRef = useRef(false)
  const translationAudioRef = useRef(true)
  const langRef = useRef(langCode)
  const modeRef = useRef(mode)
  langRef.current = langCode
  modeRef.current = mode
  translationAudioRef.current = translationAudio

  const stop = useCallback(() => {
    audioRef.current?.pause()
    continueRef.current = false
    setIsPlaying(false)
    setActiveAyah(null)
  }, [])

  const playAyah = useCallback(
    (ayah: number, continueToEnd: boolean) => {
      // Pause global surah audio if playing
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(EVENTS.STOP_GLOBAL_AUDIO))
      }

      if (!audioRef.current) {
        audioRef.current = new Audio()
        audioRef.current.preload = 'auto'
      }
      const audio = audioRef.current
      continueRef.current = continueToEnd

      const advance = () => {
        if (continueRef.current && ayah < surah.ayahCount) {
          playAyah(ayah + 1, true)
        } else {
          setIsPlaying(false)
          setActiveAyah(null)
        }
      }

      const playTranslationThenAdvance = () => {
        // In Arabic-only mode, skip the translation audio entirely.
        const tAudioUrl =
          modeRef.current === 'translation' &&
          translationAudioRef.current
            ? translationAudioUrl(getLanguage(langRef.current), surah.number, ayah)
            : null

        if (tAudioUrl) {
          audio.src = tAudioUrl
          audio.onended = advance
          audio.onerror = advance // If translation audio fails, still advance
          audio.play().catch(advance)
        } else {
          advance()
        }
      }

      audio.src = ayahAudioUrl(surah.number, ayah)
      audio.onended = playTranslationThenAdvance
      audio.onerror = () => {
        console.warn(`Could not load audio for ayah ${ayah}, trying next...`)
        advance()
      }
      audio
        .play()
        .then(() => {
          setActiveAyah(ayah)
          setIsPlaying(true)
          document
            .getElementById(`ayah-${ayah}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
        .catch(() => setIsPlaying(false))
    },
    [surah.number, surah.ayahCount],
  )

  // Stop audio when leaving the page or when global player requests pause
  useEffect(() => {
    const onStopVerse = () => stop()
    if (typeof window !== 'undefined') {
      window.addEventListener(EVENTS.STOP_VERSE_AUDIO, onStopVerse)
    }
    return () => {
      audioRef.current?.pause()
      continueRef.current = false
      if (typeof window !== 'undefined') {
        window.removeEventListener(EVENTS.STOP_VERSE_AUDIO, onStopVerse)
      }
    }
  }, [stop])

  const verses = arabic?.chapter ?? []
  const translations = translation?.chapter ?? []
  const showBismillah = surah.number !== 1 && surah.number !== 9

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-32">
      {/* Controls */}
      <div className="sticky top-16 z-10 -mx-4 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (isPlaying ? stop() : playAyah(1, true))}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Stop' : 'Play & follow'}
          </button>
          <button
            type="button"
            onClick={() => playSurah(surah)}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-muted"
            title="Listen to full surah recitation"
          >
            <Headphones className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">Full Surah</span>
          </button>
        </div>

        {/* Reading mode toggle */}
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
            className={`inline-flex items-center gap-1.5 rounded-[calc(var(--radius)*0.6)] px-3 py-1.5 text-sm transition-colors ${
              mode === 'translation'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            Translation
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'arabic'}
            onClick={() => changeMode('arabic')}
            className={`inline-flex items-center gap-1.5 rounded-[calc(var(--radius)*0.6)] px-3 py-1.5 text-sm transition-colors ${
              mode === 'arabic'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Arabic only
          </button>
        </div>

        {mode === 'translation' && hasTranslationAudio(langCode) && (
          <button
            type="button"
            onClick={() => setTranslationAudio((v) => !v)}
            aria-pressed={translationAudio}
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
              translationAudio
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:bg-muted'
            }`}
          >
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            Translation audio {translationAudio ? 'on' : 'off'}
          </button>
        )}

        {mode === 'translation' && (
          <label className="flex items-center gap-2 text-sm">
            <Languages className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span className="sr-only">Translation language</span>
            <select
              value={langCode}
              onChange={(e) => changeLanguage(e.target.value)}
              className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground"
            >
              {QURAN_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label === l.nativeLabel ? l.label : `${l.label} — ${l.nativeLabel}`}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {verses.length === 0 ? (
        <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading verses">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : mode === 'arabic' ? (
        /* ---------- Arabic-only Mushaf page ---------- */
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
            className="text-right text-[2rem] leading-[2.4] text-foreground md:text-[2.5rem] md:leading-[2.6]"
            style={{ textAlignLast: 'right' }}
          >
            {verses.map((v) => {
              const isActive = activeAyah === v.verse
              return (
                <span
                  key={v.verse}
                  id={`ayah-${v.verse}`}
                  onClick={() => (isActive && isPlaying ? stop() : playAyah(v.verse, false))}
                  className={`cursor-pointer rounded-md px-1 transition-colors ${
                    isActive ? 'bg-primary/15 text-primary' : 'hover:bg-muted'
                  }`}
                >
                  {v.text}
                  <span
                    className="mx-1 inline-flex h-9 w-9 select-none items-center justify-center rounded-full border border-primary/30 text-base text-primary md:h-10 md:w-10"
                    aria-hidden="true"
                  >
                    {toArabicDigits(v.verse)}
                  </span>{' '}
                </span>
              )
            })}
          </p>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Uthmani script &middot; Tap any ayah to hear it &middot; Recitation: Sheikh Yasser
            Ad-Dussary
          </p>
        </div>
      ) : (
        /* ---------- Translation view ---------- */
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
                  className={`rounded-lg border p-5 transition-colors ${
                    isActive ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-muted/50'
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
                      {surah.number}:{v.verse}
                    </span>
                    <button
                      type="button"
                      onClick={() => (isActive && isPlaying ? stop() : playAyah(v.verse, false))}
                      aria-label={
                        isActive && isPlaying ? `Stop verse ${v.verse}` : `Play verse ${v.verse}`
                      }
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {isActive && isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p
                    lang="ar"
                    dir="rtl"
                    className="mb-4 text-2xl leading-loose text-foreground md:text-3xl md:leading-loose"
                  >
                    {v.text}
                  </p>
                  <p
                    dir={language.direction}
                    className={`leading-relaxed text-muted-foreground ${language.direction === 'rtl' ? 'text-right font-serif text-lg' : 'text-pretty'}`}
                  >
                    {tr?.text ?? '\u2026'}
                  </p>
                </li>
              )
            })}
          </ol>

          {/* Translator credit */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            {language.note ? `${language.note} \u2014 ` : 'Translation: '}
            {language.translator} &middot; Recitation: Sheikh Yasser Ad-Dussary
            {mode === 'translation' && hasTranslationAudio(langCode) && translationAudio &&
              ` \u00b7 Translation audio: ${translationAudioCredit(language)}`}
          </p>
        </>
      )}

      {/* Prev / Next surah */}
      <nav className="mt-8 flex items-center justify-between gap-4" aria-label="Surah navigation">
        {surah.number > 1 ? (
          <Link
            href={`/read/${surah.number - 1}`}
            className="inline-flex items-center gap-1 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
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
            className="inline-flex items-center gap-1 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
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
