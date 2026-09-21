'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Info,
  Loader2,
  Mic,
  Music2,
  Pause,
  Play,
  Radio,
  RefreshCw,
  Repeat,
  RotateCcw,
  RotateCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Square,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { usePlayer } from '@/components/player/player-provider'
import { RECITERS, SURAHS, type Reciter, type Surah } from '@/lib/quran'

const POPULAR_SURAHS = [
  { number: 1, tag: 'The Opening' },
  { number: 2, tag: 'Ayat al-Kursi' },
  { number: 18, tag: 'Friday Sunnah' },
  { number: 36, tag: 'Heart of Quran' },
  { number: 55, tag: 'The Beneficent' },
  { number: 56, tag: 'The Inevitable' },
  { number: 67, tag: 'Protection from Grave' },
  { number: 112, tag: 'Tawhid' },
  { number: 113, tag: 'Seek Refuge' },
  { number: 114, tag: 'Mankind' },
]

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

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

  const [searchQuery, setSearchQuery] = useState('')
  const [filterPlace, setFilterPlace] = useState<'all' | 'Makkah' | 'Madinah'>('all')

  const activeSurah: Surah = currentSurah || SURAHS[0]

  const filteredSurahs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return SURAHS.filter((s) => {
      const matchesFilter = filterPlace === 'all' || s.revelationPlace === filterPlace
      if (!matchesFilter) return false
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
    <div className="mx-auto max-w-6xl px-4 py-8 pb-36">
      {/* Top Header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Radio className="size-3.5 animate-pulse" />
            <span>Tilawa Quran Audio Station</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-serif">
            Listen to the Holy Quran
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete high-definition 114 Surahs recitation with verified global CDNs.
          </p>
        </div>

        {/* Quick reciter badge */}
        <div className="flex items-center gap-2 self-start rounded-xl border border-border bg-card p-2 text-xs sm:self-auto">
          <Mic className="size-4 text-primary shrink-0" />
          <div className="min-w-0">
            <span className="text-[11px] text-muted-foreground block">Current Qari:</span>
            <span className="font-semibold text-foreground truncate block">
              {currentReciter.nameEnglish}
            </span>
          </div>
        </div>
      </div>

      {/* Main Now Playing Deck */}
      <div className="mb-10 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-b from-card via-card to-card/90 shadow-md">
        {/* Reciter selector bar */}
        <div className="border-b border-border/70 bg-muted/40 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Mic className="size-3.5" />
              Choose Reciter (قراء القرآن):
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {RECITERS.map((r) => {
                const active = r.id === currentReciter.id
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setReciter(r)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      active
                        ? 'border border-primary bg-primary text-primary-foreground shadow-xs'
                        : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <span>{r.nameEnglish}</span>
                    {active && <Check className="size-3" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="flex items-center justify-between gap-3 bg-destructive/15 px-4 py-2.5 text-xs text-destructive border-b border-destructive/20 sm:px-6">
            <div className="flex items-center gap-2">
              <Info className="size-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={retry}
              className="inline-flex items-center gap-1 rounded bg-destructive px-2.5 py-1 font-medium text-destructive-foreground hover:opacity-90 active:scale-95"
            >
              <RefreshCw className="size-3" />
              Retry Stream
            </button>
          </div>
        )}

        {/* Deck Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            {/* Arabic Surah Title */}
            <div className="relative mb-2">
              <span
                lang="ar"
                dir="rtl"
                className="block font-serif text-5xl font-bold tracking-wide text-primary sm:text-6xl drop-shadow-xs"
              >
                {activeSurah.nameArabic}
              </span>
            </div>

            {/* Transliteration and English Meaning */}
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Surah {activeSurah.nameTransliterated}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeSurah.nameTranslated} · {activeSurah.ayahCount} Verses · {activeSurah.revelationPlace}
            </p>

            {/* Animated Sound Equalizer Waves */}
            <div className="my-6 flex items-end justify-center gap-1 h-8" aria-label="Audio wave">
              {[4, 8, 12, 16, 20, 24, 20, 16, 12, 8, 4, 10, 18, 14, 6].map((height, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying
                      ? 'bg-primary animate-pulse'
                      : 'bg-muted-foreground/30'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(6, (height * 1.3) % 28)}px` : '4px',
                    animationDelay: `${(i % 5) * 120}ms`,
                  }}
                />
              ))}
            </div>

            {/* Scrubber Timeline */}
            <div className="w-full max-w-xl">
              <div className="relative flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={1}
                  value={currentTime}
                  onChange={(e) => seek(Number(e.target.value))}
                  aria-label="Seek within Surah"
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted outline-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--primary) ${progressPercent}%, transparent 0%)`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-xs font-mono text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
              </div>
            </div>

            {/* Primary Audio Player Controls */}
            <div className="mt-6 flex items-center justify-center gap-3 sm:gap-5">
              {/* Loop button */}
              <button
                type="button"
                onClick={toggleRepeat}
                title={repeat ? 'Surah repeat: ON' : 'Surah repeat: OFF'}
                className={`flex size-10 items-center justify-center rounded-full border transition-colors ${
                  repeat
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Repeat className="size-4" />
              </button>

              {/* Previous Surah */}
              <button
                type="button"
                onClick={previous}
                title="Previous Surah"
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>

              {/* Seek -10s */}
              <button
                type="button"
                onClick={() => seek(Math.max(0, currentTime - 10))}
                title="Rewind 10 seconds"
                className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <RotateCcw className="size-4" />
              </button>

              {/* Central Large Play / Pause Button */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause recitation' : 'Play recitation'}
                className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <Loader2 className="size-7 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="size-7" />
                ) : (
                  <Play className="size-7 translate-x-0.5 fill-current" />
                )}
              </button>

              {/* Full Stop Button */}
              <button
                type="button"
                onClick={stop}
                title="Stop audio completely (روکیں)"
                className="flex size-10 items-center justify-center rounded-full border border-destructive/40 bg-destructive/10 text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground active:scale-95"
              >
                <Square className="size-4 fill-current" />
              </button>

              {/* Seek +10s */}
              <button
                type="button"
                onClick={() => seek(Math.min(duration || Infinity, currentTime + 10))}
                title="Fast forward 10 seconds"
                className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <RotateCw className="size-4" />
              </button>

              {/* Next Surah */}
              <button
                type="button"
                onClick={next}
                title="Next Surah"
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
              >
                <ChevronRight className="size-5" />
              </button>

              {/* Playback speed switcher */}
              <button
                type="button"
                onClick={() => {
                  const rates = [0.75, 1, 1.25, 1.5]
                  const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length]
                  setPlaybackRate(nextRate)
                }}
                title="Playback speed"
                className="flex size-10 items-center justify-center rounded-full border border-border text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {playbackRate}x
              </button>
            </div>

            {/* Volume & Read Along Action Row */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground">
              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="size-4 text-destructive" />
                  ) : (
                    <Volume2 className="size-4" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Recitation volume"
                  className="h-1.5 w-20 cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
                />
              </div>

              {/* Read Along Button */}
              <Link
                href={`/read/${activeSurah.number}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <BookOpen className="size-3.5" />
                <span>Read & Follow Surah {activeSurah.nameTransliterated}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Most Listened Surahs Quick-Picks */}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              Frequently Listened Surahs
            </h3>
            <p className="text-xs text-muted-foreground">
              Tap any surah to start streaming immediately in the voice of {currentReciter.nameEnglish}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
          {POPULAR_SURAHS.map((item) => {
            const s = SURAHS[item.number - 1]
            if (!s) return null
            const isCurrent = activeSurah.number === s.number
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
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    #{s.number}
                  </span>
                  <span
                    className={`flex size-6 items-center justify-center rounded-full transition-colors ${
                      isPlayingThis
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'
                    }`}
                  >
                    {isPlayingThis ? (
                      <Pause className="size-3" />
                    ) : (
                      <Play className="size-3 translate-x-0.5 fill-current" />
                    )}
                  </span>
                </div>
                <p className="mt-2 font-medium text-foreground text-sm truncate w-full">
                  {s.nameTransliterated}
                </p>
                <span lang="ar" dir="rtl" className="font-serif text-sm text-primary">
                  {s.nameArabic}
                </span>
                <span className="mt-1 text-[11px] text-muted-foreground truncate w-full">
                  {item.tag}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* All 114 Surahs Directory */}
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Headphones className="size-4 text-primary" />
              All 114 Surahs ({filteredSurahs.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Select any Surah to play or read along with translation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter pills */}
            <div className="inline-flex rounded-lg border border-border bg-card p-0.5 text-xs">
              {(['all', 'Makkah', 'Madinah'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFilterPlace(p)}
                  className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                    filterPlace === p
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {p === 'all' ? 'All' : p}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute start-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by surah name or #..."
                className="h-9 w-full rounded-lg border border-border bg-card ps-8 pe-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Surah List */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSurahs.map((surah) => {
            const isCurrent = activeSurah.number === surah.number
            const isPlayingThis = isCurrent && isPlaying
            return (
              <div
                key={surah.number}
                className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
                  isCurrent
                    ? 'border-primary/50 bg-primary/5'
                    : 'border-border bg-card hover:border-border/80 hover:bg-muted/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Play Button */}
                  <button
                    type="button"
                    onClick={() => playSurah(surah)}
                    aria-label={`${isPlayingThis ? 'Pause' : 'Play'} Surah ${surah.nameTransliterated}`}
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                      isPlayingThis
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    {isPlayingThis ? (
                      <Pause className="size-4" />
                    ) : (
                      <Play className="size-4 translate-x-0.5 fill-current" />
                    )}
                  </button>

                  {/* Title & Info */}
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-foreground">
                      <span className="text-xs text-muted-foreground">#{surah.number}</span>
                      <span className="truncate">{surah.nameTransliterated}</span>
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {surah.nameTranslated} · {surah.ayahCount} ayat
                    </p>
                  </div>
                </div>

                {/* Arabic Name & Read link */}
                <div className="flex flex-col items-end gap-1 ps-2 shrink-0">
                  <span lang="ar" dir="rtl" className="font-serif text-lg text-primary">
                    {surah.nameArabic}
                  </span>
                  <Link
                    href={`/read/${surah.number}`}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <BookOpen className="size-3" />
                    <span>Read</span>
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
