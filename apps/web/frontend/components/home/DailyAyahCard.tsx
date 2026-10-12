'use client'

import { useState } from 'react'
import { Volume2, Share2, BookmarkPlus, BookOpen } from 'lucide-react'

interface DailyAyahCardProps {
  ayah?: {
    surahNumber: number
    ayahNumber: number
    arabic: string
    translation: string
    surahName: string
  }
  loading?: boolean
  onAyahTap?: () => void
}

export function DailyAyahCard({ ayah, loading, onAyahTap }: DailyAyahCardProps) {
  const [showTranslation, setShowTranslation] = useState(false)

  if (loading) {
    return (
      <div className="space-y-3" aria-label="Loading daily ayah" aria-busy="true">
        <div className="skeleton h-6 w-40 rounded" />
        <div className="skeleton h-32 w-full rounded-2xl" />
      </div>
    )
  }

  if (!ayah) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
        Failed to load daily ayah
      </div>
    )
  }

  return (
    <div className="card-sacred overflow-hidden">
      {/* Coloured accent strip at top */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }} />

      <div className="p-6 md:p-8">
        {/* Label row */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Ayah of the Day
          </p>
          <p className="text-xs text-muted-foreground">
            {ayah.surahName} · {ayah.surahNumber}:{ayah.ayahNumber}
          </p>
        </div>

        {/* Arabic text — uses the quran-text utility for fluid sizing */}
        <div
          lang="ar"
          dir="rtl"
          className="quran-text mb-6 text-center text-foreground"
        >
          {ayah.arabic}
        </div>

        {/* Translation (collapsible) */}
        {showTranslation && (
          <div className="mb-5 rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-sm leading-relaxed text-foreground/90 italic">{ayah.translation}</p>
          </div>
        )}

        {/* Action row — icon-first compact buttons for small screens */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowTranslation(!showTranslation)}
            className="tap-target rounded-lg border border-border bg-card px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary press-effect"
          >
            {showTranslation ? 'Hide' : 'Translation'}
          </button>

          <div className="flex gap-2">
            {[
              { Icon: Volume2, label: 'Listen',   title: 'Listen to this ayah'  },
              { Icon: Share2,   label: 'Share',   title: 'Share this ayah'      },
              { Icon: BookmarkPlus, label: 'Save', title: 'Bookmark this ayah'  },
              { Icon: BookOpen, label: 'Tafseer', title: 'Read tafseer'         },
            ].map(({ Icon, label, title }) => (
              <button
                key={label}
                type="button"
                onClick={(e) => { e.stopPropagation(); onAyahTap?.() }}
                title={title}
                aria-label={title}
                className="tap-target rounded-lg border border-border bg-card transition-colors hover:border-primary/40 hover:bg-muted press-effect"
              >
                <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
