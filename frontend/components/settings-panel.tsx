'use client'

import { Monitor, Moon, Settings, Sun, Type, Volume2, VolumeX } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { usePlayer } from '@/components/player/player-provider'
import { RECITERS } from '@/lib/quran'
import { FEATURED_TRANSLATORS, QURAN_LANGUAGES } from '@/lib/quran-languages'
import { KEYS, EVENTS, getFontSize, setFontSize, applyFontSize, type FontSize } from '@/lib/prefs'
import { cn } from '@/lib/utils'

const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun, hint: 'Warm parchment tones for daytime reading' },
  { value: 'dark', label: 'Dark', icon: Moon, hint: 'Deep forest palette, easy on the eyes at night' },
  { value: 'system', label: 'System', icon: Monitor, hint: 'Follows your device preference automatically' },
]

const speedOptions = [0.75, 1, 1.25, 1.5]

const fontSizeOptions: { value: FontSize; label: string; hint: string; arabicPreview: string }[] = [
  { value: 'sm', label: 'Small',  hint: 'Compact — fits more on screen',      arabicPreview: 'text-xl' },
  { value: 'md', label: 'Medium', hint: 'Default — balanced reading size',     arabicPreview: 'text-2xl' },
  { value: 'lg', label: 'Large',  hint: 'Larger Arabic text — easier on eyes', arabicPreview: 'text-3xl' },
]

export function SettingsPanel() {
  const { theme, setTheme } = useTheme()
  const { playbackRate, setPlaybackRate, repeat, toggleRepeat, currentReciter, setReciter } = usePlayer()

  const [mounted, setMounted] = useState(false)
  const [activeLangCode, setActiveLangCode] = useState<string>('')
  const [fontSize, setFontSizeState] = useState<FontSize>('md')

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
    setFontSize(size) // persists + applies CSS var
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ------------------------------------------------------------------ */}
      {/* Appearance                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="theme-heading" className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <h2 id="theme-heading" className="text-base font-semibold sm:text-lg">Appearance</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Choose how TILAWA looks. Saved on this device.
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
                <span className={cn('flex size-8 items-center justify-center rounded-md sm:size-9', active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium sm:text-sm">{option.label}</span>
                <span className="hidden text-xs leading-relaxed text-muted-foreground sm:block">{option.hint}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Font Size                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="fontsize-heading" className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Type className="size-4 text-muted-foreground" aria-hidden="true" />
          <h2 id="fontsize-heading" className="text-base font-semibold sm:text-lg">Font Size</h2>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Arabic and translation text size in the reader.
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
                  'flex flex-col items-start gap-2 rounded-lg border p-3 text-start transition-colors sm:p-4',
                  active ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/40',
                )}
              >
                {/* Arabic letter preview scaled per size */}
                <span className={cn('font-serif text-primary leading-none', opt.arabicPreview)} aria-hidden="true">
                  ا
                </span>
                <span className="text-xs font-medium sm:text-sm">{opt.label}</span>
                <span className="hidden text-xs leading-relaxed text-muted-foreground sm:block">{opt.hint}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Translation                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="translation-heading" className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <h2 id="translation-heading" className="text-base font-semibold sm:text-lg">Translation</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Your preferred translator — applied across all reading sessions.
        </p>

        <ul className="mt-4 flex flex-col gap-2" role="radiogroup" aria-label="Translation">
          {FEATURED_TRANSLATORS.map((t) => {
            const isSelected = mounted && activeLangCode === t.code
            return (
              <li key={t.code}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => selectTranslator(t.code)}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-start transition-colors sm:p-4',
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border bg-background hover:border-primary/40 hover:bg-muted/50',
                  )}
                >
                  {/* Left: name + description */}
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate text-sm font-semibold text-foreground">{t.nameEnglish}</span>
                    <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{t.description}</span>
                  </div>

                  {/* Right: native name + badges */}
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span
                      dir={t.nameNative === t.nameEnglish ? 'ltr' : 'rtl'}
                      className="font-serif text-sm text-primary"
                    >
                      {t.nameNative}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {t.hasAudio ? (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                          <Volume2 className="size-3" aria-hidden="true" />
                          Audio
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          <VolumeX className="size-3" aria-hidden="true" />
                          <span className="hidden sm:inline">Text only</span>
                          <span className="sm:hidden">Text</span>
                        </span>
                      )}
                      {isSelected ? (
                        <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground sm:px-3 sm:py-1 sm:text-xs">
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

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          More languages are available in the reader's language selector inside each surah.
        </p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Playback                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="playback-heading" className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <h2 id="playback-heading" className="text-base font-semibold sm:text-lg">Playback</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Defaults for the recitation player.
        </p>

        <div className="mt-4 flex flex-col gap-5">
          {/* Speed */}
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

          {/* Repeat toggle */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Repeat surah</span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                Loop the current surah — ideal for memorization
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={repeat}
              aria-label="Repeat surah"
              onClick={toggleRepeat}
              className={cn('relative h-6 w-11 shrink-0 rounded-full transition-colors', repeat ? 'bg-primary' : 'bg-muted')}
            >
              <span className={cn('absolute top-0.5 size-5 rounded-full bg-card shadow transition-all', repeat ? 'start-[22px]' : 'start-0.5')} />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Reciter                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="reciter-heading" className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <h2 id="reciter-heading" className="text-base font-semibold sm:text-lg">Reciter</h2>
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
                    'flex w-full items-center justify-between gap-2 rounded-lg border p-3 text-start transition-colors sm:gap-3 sm:p-4',
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border bg-background hover:border-primary/40 hover:bg-muted/50',
                  )}
                >
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold text-foreground">{reciter.nameEnglish}</span>
                    <span className="text-xs text-muted-foreground">{reciter.riwayah}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <span lang="ar" dir="rtl" className="font-serif text-sm text-primary sm:text-base">
                      {reciter.nameArabic}
                    </span>
                    {isSelected ? (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground sm:px-3 sm:py-1 sm:text-xs">
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
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          High-speed CDN streaming with automatic fallback mirrors.
        </p>
      </section>

    </div>
  )
}
