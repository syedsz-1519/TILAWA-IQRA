'use client'

/**
 * Listen Quran — full-surah Arabic audio + optional per-ayah translation audio.
 *
 * How translation audio works:
 * - User picks a translation via TranslationPicker (saves to localStorage).
 * - If the chosen edition has `translationAudioFolder`, an ayah-by-ayah
 *   translation playback mode is enabled via the "Translation Audio" toggle.
 * - When enabled, after each Arabic ayah ends the matching translation MP3
 *   plays automatically (fetches from everyayah.com/data/translations/...).
 * - Only editions with real human recordings offer audio. Others show
 *   "Text only" and the toggle is disabled.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Info,
  Languages,
  Mic,
  Pause,
  Play,
  Radio,
  RefreshCw,
  Repeat,
  RotateCcw,
  RotateCw,
  Search,
  Sparkles,
  Square,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { usePlayer } from '@/components/player/player-provider'
import { RECITERS, SURAHS, type Reciter, type Surah } from '@/lib/quran'
import { TranslationPicker } from '@/components/quran/TranslationPicker'
import {
  getEdition,
  translationAudioUrl,
  DEFAULT_EDITION_ID,
  type TranslationEdition,
} from '@/lib/quran-languages'
import { KEYS, EVENTS } from '@/lib/prefs'

// ---------------------------------------------------------------------------
// Popular surahs quick-picks
// ---------------------------------------------------------------------------
const POPULAR_SURAHS = [
  { number: 1,   tag: 'The Opening'           },
  { number: 2,   tag: 'Ayat al-Kursi'         },
  { number: 18,  tag: 'Friday Sunnah'         },
  { number: 36,  tag: 'Heart of Quran'        },
  { number: 55,  tag: 'The Beneficent'        },
  { number: 56,  tag: 'The Inevitable'        },
  { number: 67,  tag: 'Protection from Grave' },
  { number: 112, tag: 'Tawhid'                },
  { number: 113, tag: 'Seek Refuge'           },
  { number: 114, tag: 'Mankind'              },
]

function formatTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

// ---------------------------------------------------------------------------
// Hook: track the active translation edition from localStorage
// ---------------------------------------------------------------------------
function useActiveEdition() {
  const [edition, setEdition] = useState<TranslationEdition>(() => getEdition(DEFAULT_EDITION_ID))

  useEffect(() => {
    const load = () => {
      const saved = window.localStorage.getItem(KEYS.LANG)
      setEdition(getEdition(saved ?? DEFAULT_EDITION_ID))
    }
    load()
    window.addEventListener(EVENTS.LANG_CHANGED, load)
    return () => window.removeEventListener(EVENTS.LANG_CHANGED, load)
  }, [])

  return edition
}

// ---------------------------------------------------------------------------
// Hook: per-ayah translation audio player
// ---------------------------------------------------------------------------
function useTranslationAudio(
  edition: TranslationEdition,
  activeSurah: Surah,
  isMainPlaying: boolean,
) {
  const audioRef   = useRef<HTMLAudioElement | null>(null)
  const enabledRef = useRef(false)
  const [enabled,    setEnabled]    = useState(false)
  const [playingAyah, setPlayingAyah] = useState<number | null>(null)
  const [status,     setStatus]     = useState<'idle' | 'loading' | 'playing' | 'error'>('idle')
  const ayahCountRef = useRef(activeSurah.ayahCount)
  ayahCountRef.current = activeSurah.ayahCount

  const hasAudio = !!edition.translationAudioFolder

  // Get or create audio element
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = 'auto'
    }
    return audioRef.current
  }, [])

  // Play a single translation ayah
  const playAyah = useCallback((ayahNum: number) => {
    if (!enabledRef.current || !edition.translationAudioFolder) return
    const url = translationAudioUrl(edition, activeSurah.number, ayahNum)
    if (!url) return

    const audio = getAudio()
    audio.src = url
    audio.load()
    setPlayingAyah(ayahNum)
    setStatus('loading')

    audio.play()
      .then(() => setStatus('playing'))
      .catch(() => setStatus('error'))

    audio.onended = () => {
      setStatus('idle')
      setPlayingAyah(null)
    }
    audio.onerror = () => {
      setStatus('error')
      setPlayingAyah(null)
    }
  }, [edition, activeSurah.number, getAudio])

  // Stop translation audio
  const stop = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.src = ''
    }
    setStatus('idle')
    setPlayingAyah(null)
  }, [])

  // Toggle enabled state
  const toggle = useCallback(() => {
    if (!hasAudio) return
    setEnabled((v) => {
      const next = !v
      enabledRef.current = next
      if (!next) stop()
      return next
    })
  }, [hasAudio, stop])

  // Stop when surah changes
  useEffect(() => {
    stop()
  }, [activeSurah.number, stop])

  // Stop when main player stops
  useEffect(() => {
    if (!isMainPlaying) stop()
  }, [isMainPlaying, stop])

  return { enabled, hasAudio, toggle, playAyah, stop, playingAyah, status }
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export default function ListenPage() {
  const {
    currentSurah,
    currentReciter,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    playbackRate,
    repeat,
    volume,
    isMuted,
    errorMessage,
    playSurah,
    togglePlay,
    stop,
    seek,
    next,
    previous,
    setPlaybackRate,
    toggleRepeat,
    setReciter,
    setVolume,
    toggleMute,
    retry,
  } = usePlayer()

  const [searchQuery,  setSearchQuery]  = useState('')
  const [filterPlace,  setFilterPlace]  = useState<'all' | 'Makkah' | 'Madinah'>('all')

  const activeSurah: Surah = currentSurah || SURAHS[0]
  const activeEdition       = useActiveEdition()
  const translation         = useTranslationAudio(activeEdition, activeSurah, isPlaying)

  const filteredSurahs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return SURAHS.filter((s) => {
      if (filterPlace !== 'all' && s.revelationPlace !== filterPlace) return false
      if (!q) return true
      return (
        s.nameTransliterated.toLowerCase().includes(q) ||
        s.nameTranslated.toLowerCase().includes(q) ||
        s.nameArabic.includes(q) ||
        String(s.number) === q
      )
    })
  }, [searchQuery, filterPlace])

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0

  return (
    <div className="page-container page-bottom-safe py-6">

      {/* ── Page header ── */}
      <div className="mb-8 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Radio className="size-3.5 animate-pulse" aria-hidden="true" />
            Tilawa Quran Audio Station
          </div>
          <h1 className="mt-2 font-serif text-fluid-2xl font-bold text-foreground">
            Listen to the Holy Quran
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            114 Surahs · High-quality CDN · Multiple reciters &amp; translations
          </p>
        </div>

        {/* ── NOW PLAYING INFO STRIP (top-right) ── */}
        <div className="flex flex-col gap-1.5 self-start rounded-xl border border-border bg-card p-3 text-xs sm:min-w-[220px]">
          {/* Reciter */}
          <div className="flex items-center gap-2">
            <Mic className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Reciter</p>
              <p className="truncate font-semibold text-foreground">{currentReciter.nameEnglish}</p>
              <p className="truncate text-muted-foreground" lang="ar" dir="rtl">{currentReciter.nameArabic}</p>
            </div>
          </div>

          <div className="border-t border-border/60" />

          {/* Translation */}
          <div className="flex items-center gap-2">
            <Languages className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Translation</p>
              <p className="truncate font-semibold text-foreground">{activeEdition.label}</p>
              <p className="truncate text-muted-foreground">{activeEdition.translator}</p>
            </div>
          </div>

          {/* Audio availability badge */}
          {activeEdition.translationAudioFolder ? (
            <span className="inline-flex items-center gap-1 self-start rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              <Headphones className="size-2.5" aria-hidden="true" />
              Translation audio available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 self-start rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              Text only · No audio recording
            </span>
          )}
        </div>
      </div>

      {/* ── Now Playing deck ── */}
      <div className="mb-10 overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-md">

        {/* Reciter selector */}
        <div className="border-b border-border/70 bg-muted/40 px-4 py-3 sm:px-6">
          <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Mic className="size-3.5" aria-hidden="true" />
            Choose Reciter
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-0.5" role="group" aria-label="Select reciter">
            {RECITERS.map((r: Reciter) => {
              const active = r.id === currentReciter.id
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setReciter(r)}
                  aria-pressed={active}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? 'border border-primary bg-primary text-primary-foreground shadow-sm'
                      : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {r.nameEnglish}
                  {active && <Check className="size-3" aria-hidden="true" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Error banner */}
        {errorMessage && (
          <div className="flex items-center justify-between gap-3 border-b border-destructive/20 bg-destructive/15 px-4 py-2.5 text-xs text-destructive sm:px-6">
            <div className="flex items-center gap-2">
              <Info className="size-4 shrink-0" aria-hidden="true" />
              {errorMessage}
            </div>
            <button
              type="button"
              onClick={retry}
              className="inline-flex items-center gap-1 rounded bg-destructive px-2.5 py-1 font-medium text-destructive-foreground hover:opacity-90 active:scale-95"
            >
              <RefreshCw className="size-3" />
              Retry
            </button>
          </div>
        )}

        {/* Player body */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">

            {/* Arabic surah name */}
            <span lang="ar" dir="rtl" className="mb-1 block font-serif text-5xl font-bold text-primary sm:text-6xl">
              {activeSurah.nameArabic}
            </span>
            <h2 className="text-fluid-xl font-bold text-foreground">
              Surah {activeSurah.nameTransliterated}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeSurah.nameTranslated} · {activeSurah.ayahCount} Verses · {activeSurah.revelationPlace}
            </p>

            {/* Animated equaliser bars */}
            <div className="my-6 flex h-8 items-end justify-center gap-1" aria-hidden="true">
              {[4, 8, 12, 16, 20, 24, 20, 16, 12, 8, 4, 10, 18, 14, 6].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(6, (h * 1.3) % 28)}px` : '4px',
                    animationDelay: `${(i % 5) * 120}ms`,
                  }}
                />
              ))}
            </div>

            {/* Scrubber */}
            <div className="w-full max-w-xl">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={1}
                value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label={`Seek — ${formatTime(currentTime)} of ${formatTime(duration)}`}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted outline-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--primary) ${progressPercent}%, transparent 0%)`,
                }}
              />
              <div className="mt-1.5 flex justify-between font-mono text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
              </div>
            </div>

            {/* Playback controls */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <button
                type="button" onClick={toggleRepeat} aria-pressed={repeat}
                title={repeat ? 'Repeat: ON' : 'Repeat: OFF'}
                className={`tap-target rounded-full border transition-colors ${repeat ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}
              >
                <Repeat className="size-4" />
              </button>

              <button type="button" onClick={previous} aria-label="Previous Surah"
                className="tap-target rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted active:scale-95">
                <ChevronLeft className="size-5" />
              </button>

              <button type="button" onClick={() => seek(Math.max(0, currentTime - 10))} aria-label="Rewind 10s"
                className="tap-target rounded-full text-muted-foreground transition-colors hover:bg-muted">
                <RotateCcw className="size-4" />
              </button>

              {/* Main play/pause */}
              <button
                type="button" onClick={togglePlay}
                aria-label={isPlaying ? 'Pause recitation' : 'Play recitation'}
                className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 press-effect"
              >
                {isLoading
                  ? <span className="size-7 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" aria-hidden="true" />
                  : isPlaying
                    ? <Pause className="size-7" />
                    : <Play className="size-7 translate-x-0.5 fill-current" />
                }
              </button>

              <button type="button" onClick={stop} aria-label="Stop"
                className="tap-target rounded-full border border-destructive/40 bg-destructive/10 text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground active:scale-95">
                <Square className="size-4 fill-current" />
              </button>

              <button type="button" onClick={() => seek(Math.min(duration || Infinity, currentTime + 10))} aria-label="Forward 10s"
                className="tap-target rounded-full text-muted-foreground transition-colors hover:bg-muted">
                <RotateCw className="size-4" />
              </button>

              <button type="button" onClick={next} aria-label="Next Surah"
                className="tap-target rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted active:scale-95">
                <ChevronRight className="size-5" />
              </button>

              <button
                type="button"
                onClick={() => { const r=[0.75,1,1.25,1.5]; setPlaybackRate(r[(r.indexOf(playbackRate)+1)%r.length]) }}
                aria-label={`Speed: ${playbackRate}x`}
                className="tap-target min-w-[2.75rem] rounded-full border border-border text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted"
              >
                {playbackRate}x
              </button>
            </div>

            {/* Controls row: volume + translation picker + translation audio toggle + read-along */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:gap-5">

              {/* Volume */}
              <div className="flex items-center gap-2">
                <button type="button" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="text-muted-foreground hover:text-foreground">
                  {isMuted || volume === 0 ? <VolumeX className="size-4 text-destructive" /> : <Volume2 className="size-4" />}
                </button>
                <input type="range" min={0} max={1} step={0.05} value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume"
                  className="h-1.5 w-20 cursor-pointer appearance-none rounded-lg bg-muted accent-primary" />
              </div>

              {/* Translation picker */}
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-[11px] text-muted-foreground">Translation:</span>
                <TranslationPicker mode="listen" />
              </div>

              {/* Translation audio toggle — only shown when selected edition has audio */}
              {activeEdition.translationAudioFolder ? (
                <button
                  type="button"
                  onClick={translation.toggle}
                  aria-pressed={translation.enabled}
                  title={translation.enabled ? 'Disable translation audio after each Arabic ayah' : 'Play translation audio after each Arabic ayah'}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    translation.enabled
                      ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Headphones className="size-3.5" aria-hidden="true" />
                  {translation.enabled ? 'Translation Audio ON' : 'Translation Audio OFF'}
                </button>
              ) : (
                /* Greyed-out badge when no audio available */
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground opacity-60" title={`${activeEdition.label} has no audio recording`}>
                  <Headphones className="size-3.5" aria-hidden="true" />
                  No translation audio
                </span>
              )}

              {/* Read-along link */}
              <Link
                href={`/read/${activeSurah.number}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <BookOpen className="size-3.5" aria-hidden="true" />
                Read {activeSurah.nameTransliterated}
              </Link>
            </div>

            {/* Translation audio status indicator */}
            {translation.enabled && translation.playingAyah !== null && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400" aria-live="polite">
                <Headphones className="size-3.5 animate-pulse" aria-hidden="true" />
                Playing translation — Ayah {translation.playingAyah}
              </div>
            )}
            {translation.enabled && translation.status === 'error' && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive" aria-live="polite">
                <Info className="size-3.5" aria-hidden="true" />
                Translation audio unavailable for this ayah
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Frequently Listened ── */}
      <section className="mb-10">
        <div className="mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            Frequently Listened Surahs
          </h2>
          <p className="text-xs text-muted-foreground">
            Tap any surah to stream in the voice of {currentReciter.nameEnglish}.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
          {POPULAR_SURAHS.map((item) => {
            const s = SURAHS[item.number - 1]
            if (!s) return null
            const isCurrent     = activeSurah.number === s.number
            const isPlayingThis = isCurrent && isPlaying
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => playSurah(s)}
                className={`group flex flex-col items-start rounded-xl border p-3 text-start transition-all ${
                  isCurrent
                    ? 'border-primary bg-primary/10 ring-1 ring-primary/30'
                    : 'border-border bg-card hover:border-primary/40 hover:bg-muted/50'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">#{s.number}</span>
                  <span className={`flex size-6 items-center justify-center rounded-full transition-colors ${isPlayingThis ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'}`}>
                    {isPlayingThis ? <Pause className="size-3" /> : <Play className="size-3 translate-x-0.5 fill-current" />}
                  </span>
                </div>
                <p className="mt-2 w-full truncate text-sm font-medium text-foreground">{s.nameTransliterated}</p>
                <span lang="ar" dir="rtl" className="font-serif text-sm text-primary">{s.nameArabic}</span>
                <span className="mt-1 w-full truncate text-[11px] text-muted-foreground">{item.tag}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── All 114 Surahs ── */}
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Headphones className="size-4 text-primary" aria-hidden="true" />
              All 114 Surahs ({filteredSurahs.length})
            </h2>
            <p className="text-xs text-muted-foreground">Select a surah to play, or open in Read for text.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-lg border border-border bg-card p-0.5 text-xs">
              {(['all', 'Makkah', 'Madinah'] as const).map((p) => (
                <button key={p} type="button" onClick={() => setFilterPlace(p)} aria-pressed={filterPlace === p}
                  className={`rounded-md px-2.5 py-1 font-medium transition-colors ${filterPlace === p ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  {p === 'all' ? 'All' : p}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute start-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search surah name or number…"
                aria-label="Search surahs"
                className="h-9 w-full rounded-lg border border-border bg-card ps-8 pe-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSurahs.map((surah) => {
            const isCurrent     = activeSurah.number === surah.number
            const isPlayingThis = isCurrent && isPlaying
            return (
              <div key={surah.number}
                className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${isCurrent ? 'border-primary/50 bg-primary/5' : 'border-border bg-card hover:border-border/80 hover:bg-muted/40'}`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <button type="button" onClick={() => playSurah(surah)}
                    aria-label={`${isPlayingThis ? 'Pause' : 'Play'} Surah ${surah.nameTransliterated}`}
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-all ${isPlayingThis ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground'}`}>
                    {isPlayingThis ? <Pause className="size-4" /> : <Play className="size-4 translate-x-0.5 fill-current" />}
                  </button>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-foreground">
                      <span className="text-xs text-muted-foreground">#{surah.number}</span>
                      <span className="truncate">{surah.nameTransliterated}</span>
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{surah.nameTranslated} · {surah.ayahCount} ayat</p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1 ps-2">
                  <span lang="ar" dir="rtl" className="font-serif text-lg text-primary">{surah.nameArabic}</span>
                  <Link href={`/read/${surah.number}`}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-primary">
                    <BookOpen className="size-3" aria-hidden="true" />
                    Read
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
