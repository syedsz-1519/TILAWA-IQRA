'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { usePlayer } from '@/components/player/player-provider'
import { RECITERS } from '@/lib/quran'
import { cn } from '@/lib/utils'

const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun, hint: 'Warm parchment tones for daytime reading' },
  { value: 'dark', label: 'Dark', icon: Moon, hint: 'Deep forest palette, easy on the eyes at night' },
  { value: 'system', label: 'System', icon: Monitor, hint: 'Follow your device preference automatically' },
]

const speedOptions = [0.75, 1, 1.25, 1.5]

export function SettingsPanel() {
  const { theme, setTheme } = useTheme()
  const {
    playbackRate,
    setPlaybackRate,
    repeat,
    toggleRepeat,
    currentReciter,
    setReciter,
  } = usePlayer()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="theme-heading" className="rounded-xl border border-border bg-card p-6">
        <h2 id="theme-heading" className="text-lg font-semibold">
          Appearance
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Choose how TILAWA looks. Your preference is saved on this device.
        </p>
        <div role="radiogroup" aria-label="Theme" className="mt-4 grid gap-3 sm:grid-cols-3">
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
                  'flex flex-col items-start gap-2 rounded-lg border p-4 text-start transition-colors',
                  active
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background hover:border-primary/40',
                )}
              >
                <span
                  className={cn(
                    'flex size-9 items-center justify-center rounded-md',
                    active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium">{option.label}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{option.hint}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="playback-heading" className="rounded-xl border border-border bg-card p-6">
        <h2 id="playback-heading" className="text-lg font-semibold">
          Playback
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Defaults for the recitation player.
        </p>

        <div className="mt-4 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Playback speed</span>
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

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Repeat surah</span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                Loop the current surah — ideal for memorization sessions
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

      <section aria-labelledby="reciter-heading" className="rounded-xl border border-border bg-card p-6">
        <h2 id="reciter-heading" className="text-lg font-semibold">
          Reciter
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          The voice of your recitation experience.
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {RECITERS.map((reciter) => {
            const isSelected = currentReciter.id === reciter.id
            return (
              <li key={reciter.id}>
                <button
                  type="button"
                  onClick={() => setReciter(reciter)}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-lg border p-4 text-start transition-colors',
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border bg-background hover:border-primary/40 hover:bg-muted/50',
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {reciter.nameEnglish}
                    </span>
                    <span className="text-xs text-muted-foreground">{reciter.riwayah}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span lang="ar" dir="rtl" className="font-serif text-base text-primary">
                      {reciter.nameArabic}
                    </span>
                    {isSelected ? (
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                        Select
                      </span>
                    )}
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Select from renowned reciters with high-speed CDN audio streaming and automatic fallback mirrors.
        </p>
      </section>
    </div>
  )
}
