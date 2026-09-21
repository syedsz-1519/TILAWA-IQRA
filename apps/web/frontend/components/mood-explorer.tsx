'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'
import { moods } from '@/lib/mood-verses'
import { SURAHS } from '@/lib/quran'
import { usePlayer } from '@/components/player/player-provider'
import { cn } from '@/lib/utils'

export function MoodExplorer() {
  const [selected, setSelected] = useState(moods[0])
  const { playSurah } = usePlayer()

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="How are you feeling?" className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <button
            key={mood.id}
            type="button"
            onClick={() => setSelected(mood)}
            aria-pressed={selected.id === mood.id}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              selected.id === mood.id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            {mood.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {selected.verses.map((verse) => {
          const surah = SURAHS.find((s) => s.number === verse.surahNumber)
          return (
            <article
              key={verse.reference}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
            >
              <p lang="ar" dir="rtl" className="text-2xl leading-loose text-foreground">
                {verse.arabic}
              </p>
              <div className="flex flex-col gap-1">
                <p className="leading-relaxed text-foreground">&ldquo;{verse.translation}&rdquo;</p>
                <p className="text-sm font-medium text-primary">{verse.reference}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{verse.reflection}</p>
              {surah && (
                <button
                  type="button"
                  onClick={() => playSurah(surah)}
                  className="mt-auto flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Play className="size-4" aria-hidden="true" />
                  Listen to Surah {surah.nameTransliterated}
                </button>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
