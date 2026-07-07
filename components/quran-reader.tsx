'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Languages, Pause, Play } from 'lucide-react'
import { SURAHS } from '@/lib/quran'
import {
  QURAN_LANGUAGES,
  DEFAULT_LANGUAGE,
  getLanguage,
  arabicUrl,
  translationUrl,
  ayahAudioUrl,
  type ChapterResponse,
} from '@/lib/quran-languages'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const LANG_STORAGE_KEY = 'tilawa-quran-lang'

export function QuranReader({ surahNumber }: { surahNumber: number }) {
  const surah = SURAHS.find((s) => s.number === surahNumber) ?? SURAHS[0]
  const [langCode, setLangCode] = useState(DEFAULT_LANGUAGE)
  const language = getLanguage(langCode)

  // Load saved language preference
  useEffect(() => {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY)
    if (saved && QURAN_LANGUAGES.some((l) => l.code === saved)) setLangCode(saved)
  }, [])

  const changeLanguage = (code: string) => {
    setLangCode(code)
    window.localStorage.setItem(LANG_STORAGE_KEY, code)
  }

  const { data: arabic } = useSWR<ChapterResponse>(arabicUrl(surah.number), fetcher)
  const { data: translation } = useSWR<ChapterResponse>(
    translationUrl(language.edition, surah.number),
    fetcher,
  )

  // Per-ayah read-along audio
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeAyah, setActiveAyah] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const continueRef = useRef(false)

  const stop = useCallback(() => {
    audioRef.current?.pause()
    continueRef.current = false
    setIsPlaying(false)
    setActiveAyah(null)
  }, [])

  const playAyah = useCallback(
    (ayah: number, continueToEnd: boolean) => {
      if (!audioRef.current) {
        audioRef.current = new Audio()
        audioRef.current.preload = 'auto'
      }
      const audio = audioRef.current
      continueRef.current = continueToEnd
      audio.src = ayahAudioUrl(surah.number, ayah)
      audio.onended = () => {
        if (continueRef.current && ayah < surah.ayahCount) {
          playAyah(ayah + 1, true)
        } else {
          setIsPlaying(false)
          setActiveAyah(null)
        }
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

  // Stop audio when leaving the page
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      continueRef.current = false
    }
  }, [])

  const verses = arabic?.chapter ?? []
  const translations = translation?.chapter ?? []

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-32">
      {/* Controls */}
      <div className="sticky top-16 z-10 -mx-4 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (isPlaying ? stop() : playAyah(1, true))}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Stop' : 'Play & follow'}
          </button>
        </div>
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
                {l.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Bismillah (except Surah 1 where it is verse 1, and Surah 9) */}
      {surah.number !== 1 && surah.number !== 9 && (
        <p lang="ar" dir="rtl" className="mb-8 text-center text-3xl leading-loose text-primary">
          {'\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650'}
        </p>
      )}

      {/* Verses */}
      {verses.length === 0 ? (
        <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading verses">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
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
                      isActive && isPlaying
                        ? `Stop verse ${v.verse}`
                        : `Play verse ${v.verse}`
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
                <p lang="ar" dir="rtl" className="mb-4 text-2xl leading-loose text-foreground md:text-3xl md:leading-loose">
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
      )}

      {/* Translator credit */}
      <p className="mt-8 text-center text-xs text-muted-foreground">
        Translation: {language.translator} &middot; Recitation: Sheikh Yasser Ad-Dussary
      </p>

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
