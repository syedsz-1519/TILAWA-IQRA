'use client'

import { useState } from 'react'
import { Volume2, Share2, BookmarkPlus, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'

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

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div aria-busy="true" aria-label="Loading daily ayah" className="space-y-3">
        <div className="skeleton h-4 w-32 rounded" />
        <div className="skeleton h-48 w-full rounded-2xl" />
      </div>
    )
  }

  /* ── Error / empty state ── */
  if (!ayah) {
    return (
      <div className="card-sacred flex flex-col items-center gap-2 p-8 text-center">
        <p className="text-sm text-muted-foreground">Daily ayah unavailable — check your connection.</p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 shadow-[var(--shadow-card)]">
      {/* Gold-to-indigo gradient top bar */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent), var(--primary))' }}
        aria-hidden="true"
      />

      {/* Card body */}
      <div
        className="p-6 md:p-8"
        style={{
          background: 'linear-gradient(160deg, oklch(from var(--accent) l c h / 0.06) 0%, var(--card) 60%)',
        }}
      >
        {/* Header row */}
        <div className="mb-5 flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              Ayah of the Day
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {ayah.surahName} · {ayah.surahNumber}:{ayah.ayahNumber}
            </p>
          </div>
          {/* Action buttons — icon-only, 44px targets */}
          <div className="flex gap-1.5" role="group" aria-label="Ayah actions">
            {[
              { Icon: Volume2,      label: 'Listen to this ayah'  },
              { Icon: Share2,       label: 'Share this ayah'      },
              { Icon: BookmarkPlus, label: 'Bookmark this ayah'   },
              { Icon: BookOpen,     label: 'Read tafseer'         },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                type="button"
                onClick={(e) => { e.stopPropagation(); onAyahTap?.() }}
                aria-label={label}
                className="tap-target rounded-xl border border-border/60 bg-card/80 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-primary press-effect"
              >
                <Icon className="size-4" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        {/* Arabic ayah text — the spiritual focal point */}
        <blockquote
          lang="ar"
          dir="rtl"
          className="quran-text mb-6 text-center text-foreground"
          aria-label={`Arabic text: Surah ${ayah.surahName} ayah ${ayah.ayahNumber}`}
        >
          {ayah.arabic}
        </blockquote>

        {/* Translation toggle */}
        <div>
          <button
            type="button"
            onClick={() => setShowTranslation((v) => !v)}
            aria-expanded={showTranslation}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/80 px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary press-effect"
          >
            {showTranslation ? (
              <><ChevronUp className="size-3.5" aria-hidden="true" /> Hide Translation</>
            ) : (
              <><ChevronDown className="size-3.5" aria-hidden="true" /> Show Translation</>
            )}
          </button>

          {showTranslation && (
            <div className="mt-3 rounded-xl border border-border/50 bg-muted/40 p-4">
              <p className="text-sm leading-relaxed text-foreground/90 italic">
                &ldquo;{ayah.translation}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
