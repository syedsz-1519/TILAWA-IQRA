'use client'

import {
  AlertCircle,
  Loader2,
  Mic,
  Pause,
  Play,
  RefreshCw,
  Repeat,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { usePlayer } from './player-provider'
import { RECITERS } from '@/lib/quran'

const RATES = [0.75, 1, 1.25, 1.5]

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function PlayerBar() {
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
    togglePlay,
    seek,
    next,
    previous,
    setPlaybackRate,
    toggleRepeat,
    setReciter,
    setVolume,
    toggleMute,
    closePlayer,
    retry,
  } = usePlayer()

  const [showReciters, setShowReciters] = useState(false)
  const [showVolume, setShowVolume] = useState(false)

  if (!currentSurah) return null

  const cycleRate = () => {
    const idx = RATES.indexOf(playbackRate)
    setPlaybackRate(RATES[(idx + 1) % RATES.length])
  }

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0

  return (
    <div
      role="region"
      aria-label="Quran recitation audio player"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85 shadow-lg"
    >
      {/* Error notification banner */}
      {errorMessage && (
        <div className="flex items-center justify-between gap-2 bg-destructive/15 px-4 py-2 text-xs font-medium text-destructive border-b border-destructive/20">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={retry}
            className="flex items-center gap-1 rounded bg-destructive px-2 py-0.5 text-xs text-destructive-foreground hover:opacity-90"
          >
            <RefreshCw className="size-3" />
            Retry
          </button>
        </div>
      )}

      {/* Reciter quick selector menu */}
      {showReciters && (
        <div className="mx-auto max-w-6xl px-4 pt-3">
          <div className="rounded-lg border border-border bg-card p-3 shadow-md">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Choose Reciter</span>
              <button
                type="button"
                onClick={() => setShowReciters(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close reciter list"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {RECITERS.map((r) => {
                const isSelected = r.id === currentReciter.id
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setReciter(r)
                      setShowReciters(false)
                    }}
                    className={`flex items-center justify-between rounded-md border p-2 text-start text-xs transition-colors ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'border-border hover:bg-muted text-foreground'
                    }`}
                  >
                    <span className="truncate">{r.nameEnglish}</span>
                    <span lang="ar" dir="rtl" className="font-serif ms-2 shrink-0">
                      {r.nameArabic}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Scrubber */}
      <div className="relative w-full">
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={1}
          value={currentTime}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek within recitation"
          className="absolute -top-[6px] left-0 h-3 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-muted [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          style={{
            backgroundImage: `linear-gradient(to right, var(--primary) ${progressPercent}%, transparent 0%)`,
            backgroundSize: '100% 3px',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      <div className="mx-auto flex h-18 max-w-6xl items-center gap-3 px-4 py-2 sm:gap-4">
        {/* Surah and Reciter info */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-sm">
            <span>{currentSurah.number}</span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium flex items-baseline gap-1.5">
              <span lang="ar" dir="rtl" className="font-serif text-base text-primary">
                {currentSurah.nameArabic}
              </span>
              <span className="text-foreground">· {currentSurah.nameTransliterated}</span>
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <button
                type="button"
                onClick={() => setShowReciters((v) => !v)}
                className="hover:text-primary underline underline-offset-2 flex items-center gap-1 truncate"
                title="Change reciter"
              >
                <Mic className="size-3 shrink-0" />
                <span className="truncate">{currentReciter.nameEnglish}</span>
              </button>
              <span>·</span>
              <span className="shrink-0 font-mono">
                {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : '--:--'}
              </span>
            </div>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Speed */}
          <button
            type="button"
            onClick={cycleRate}
            aria-label={`Playback speed ${playbackRate}x`}
            className="hidden h-9 min-w-11 items-center justify-center rounded-md px-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
            title="Playback Speed"
          >
            {playbackRate}x
          </button>

          {/* Volume toggle & slider */}
          <div className="relative hidden items-center md:flex">
            <button
              type="button"
              onClick={toggleMute}
              onMouseEnter={() => setShowVolume(true)}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </button>
            {showVolume && (
              <div
                onMouseLeave={() => setShowVolume(false)}
                className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center rounded-md border border-border bg-card p-2 shadow-lg"
              >
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume slider"
                  className="h-1.5 w-20 cursor-pointer accent-primary"
                />
              </div>
            )}
          </div>

          {/* Previous Surah */}
          <button
            type="button"
            onClick={previous}
            aria-label="Previous surah"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Previous Surah"
          >
            <SkipBack className="size-5" />
          </button>

          {/* Play / Pause / Loading */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="size-5" />
            ) : (
              <Play className="ms-0.5 size-5" />
            )}
          </button>

          {/* Next Surah */}
          <button
            type="button"
            onClick={next}
            aria-label="Next surah"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Next Surah"
          >
            <SkipForward className="size-5" />
          </button>

          {/* Repeat */}
          <button
            type="button"
            onClick={toggleRepeat}
            aria-label={repeat ? 'Disable repeat' : 'Repeat this surah'}
            aria-pressed={repeat}
            className={`flex size-9 items-center justify-center rounded-md transition-colors hover:bg-muted ${
              repeat ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
            }`}
            title={repeat ? 'Repeat Enabled' : 'Repeat Surah'}
          >
            <Repeat className="size-4" />
          </button>

          {/* Dismiss / Close Player */}
          <button
            type="button"
            onClick={closePlayer}
            aria-label="Close audio player"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ms-1"
            title="Close player"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
