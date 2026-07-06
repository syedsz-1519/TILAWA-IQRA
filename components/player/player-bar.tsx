'use client'

import { Loader2, Pause, Play, Repeat, SkipBack, SkipForward } from 'lucide-react'
import { usePlayer } from './player-provider'
import { DEFAULT_RECITER } from '@/lib/quran'

const RATES = [0.75, 1, 1.25, 1.5]

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function PlayerBar() {
  const {
    currentSurah,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    playbackRate,
    repeat,
    togglePlay,
    seek,
    next,
    previous,
    setPlaybackRate,
    toggleRepeat,
  } = usePlayer()

  if (!currentSurah) return null

  const cycleRate = () => {
    const idx = RATES.indexOf(playbackRate)
    setPlaybackRate(RATES[(idx + 1) % RATES.length])
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Scrubber */}
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={1}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        aria-label="Seek within recitation"
        className="absolute -top-[7px] left-0 h-3 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-muted [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
        style={{
          background: `linear-gradient(to right, var(--primary) ${duration ? (currentTime / duration) * 100 : 0}%, transparent 0%)`,
          backgroundSize: '100% 4px',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="mx-auto flex h-18 max-w-6xl items-center gap-3 px-4 py-2 sm:gap-4">
        {/* Surah info */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">{currentSurah.number}</span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              <span lang="ar" dir="rtl" className="font-serif text-base">
                {currentSurah.nameArabic}
              </span>
              <span className="text-muted-foreground"> · {currentSurah.nameTransliterated}</span>
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {DEFAULT_RECITER.nameEnglish} · {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={cycleRate}
            aria-label={`Playback speed ${playbackRate}x`}
            className="hidden h-9 min-w-12 items-center justify-center rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
          >
            {playbackRate}x
          </button>
          <button
            type="button"
            onClick={previous}
            aria-label="Previous surah"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <SkipBack className="size-5" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="size-5" />
            ) : (
              <Play className="ms-0.5 size-5" />
            )}
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next surah"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <SkipForward className="size-5" />
          </button>
          <button
            type="button"
            onClick={toggleRepeat}
            aria-label={repeat ? 'Disable repeat' : 'Repeat this surah'}
            aria-pressed={repeat}
            className={`flex size-9 items-center justify-center rounded-md transition-colors hover:bg-muted ${
              repeat ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Repeat className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
