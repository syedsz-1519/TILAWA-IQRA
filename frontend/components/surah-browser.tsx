'use client'

import { useMemo, useState } from 'react'
import { Pause, Play, Search } from 'lucide-react'
import { usePlayer } from '@/components/player/player-provider'
import { SURAHS } from '@/lib/quran'

export function SurahBrowser() {
  const [query, setQuery] = useState('')
  const { currentSurah, isPlaying, playSurah } = usePlayer()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SURAHS
    return SURAHS.filter(
      (s) =>
        s.nameTransliterated.toLowerCase().includes(q) ||
        s.nameTranslated.toLowerCase().includes(q) ||
        s.nameArabic.includes(q) ||
        String(s.number) === q,
    )
  }, [query])

  return (
    <section id="listen" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">The Noble Quran</h2>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            114 surahs recited by Yasser Al-Dosari. Tap any surah to listen.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search surah name or number"
            aria-label="Search surahs"
            className="h-10 w-full rounded-lg border border-input bg-card ps-9 pe-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground">
          No surahs match &quot;{query}&quot;
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((surah) => {
            const isCurrent = currentSurah?.number === surah.number
            const isCurrentlyPlaying = isCurrent && isPlaying
            return (
              <li key={surah.number}>
                <button
                  type="button"
                  onClick={() => playSurah(surah)}
                  aria-label={`${isCurrentlyPlaying ? 'Pause' : 'Play'} Surah ${surah.nameTransliterated}`}
                  className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-start transition-colors ${
                    isCurrent
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border bg-card hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  <span
                    className={`relative flex size-11 shrink-0 rotate-45 items-center justify-center rounded-lg transition-colors ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground'
                    }`}
                  >
                    <span className="-rotate-45 text-sm font-semibold">
                      {isCurrent ? (
                        isCurrentlyPlaying ? (
                          <Pause className="size-4" aria-hidden="true" />
                        ) : (
                          <Play className="size-4" aria-hidden="true" />
                        )
                      ) : (
                        surah.number
                      )}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate font-medium">{surah.nameTransliterated}</span>
                      <span lang="ar" dir="rtl" className="shrink-0 font-serif text-xl text-primary">
                        {surah.nameArabic}
                      </span>
                    </span>
                    <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="truncate">{surah.nameTranslated}</span>
                      <span aria-hidden="true">·</span>
                      <span className="shrink-0">{surah.ayahCount} ayat</span>
                      <span aria-hidden="true">·</span>
                      <span className="shrink-0">{surah.revelationPlace}</span>
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
