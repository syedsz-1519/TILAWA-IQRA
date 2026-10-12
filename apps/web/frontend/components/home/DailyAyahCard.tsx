'use client'

import { useState } from 'react'
import { Volume2, Share2, BookmarkPlus, BookOpen, ChevronDown } from 'lucide-react'

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
      <div className="animate-pulse space-y-3" aria-busy="true" aria-label="Loading daily ayah">
        <div className="h-6 w-32 rounded-full bg-muted" />
        <div className="h-20 rounded-2xl bg-muted" />
        <div className="h-4 w-48 rounded-full bg-muted" />
      </div>
    )
  }

  if (!ayah) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center text-fluid-sm text-muted-foreground">
        Failed to load today's ayah. Check your connection.
      </div>
    )
  }

  return (
    <article
      className="
        group rounded-2xl border-2 border-primary/20 bg-card
        shadow-token-md
        transition-all duration-200
        dark:border-primary/15
        dark:bg-card
      "
      aria-label={`Daily Ayah: ${ayah.surahName} ${ayah.surahNumber}:${ayah.ayahNumber}`}
    >
      {/* Amber-tinted header band */}
      <div className="flex items-center justify-between rounded-t-2xl bg-primary/8 px-5 py-3 dark:bg-primary/10">
        <p className="text-fluid-xs font-semibold uppercase tracking-widest text-primary">
          Ayah of the Day
        </p>
        <p className="text-fluid-xs text-muted-foreground">
          {ayah.surahName} {ayah.surahNumber}:{ayah.ayahNumber}
        </p>
      </div>

      {/* Arabic text */}
      <div className="px-5 py-6">
        <p
          className="quran-text quran-text--hero text-center text-foreground"
          lang="ar"
          dir="rtl"
        >
          {ayah.arabic}
        </p>
      </div>

      {/* Translation toggle + content */}
      <div className="border-t border-border/60 px-5 pb-5 pt-3">
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="
            flex w-full items-center justify-between gap-2
            text-fluid-xs font-semibold uppercase tracking-wider text-muted-foreground
            transition-colors hover:text-foreground
            py-1
          "
          aria-expanded={showTranslation}
          aria-controls="daily-ayah-translation"
        >
          <span>{showTranslation ? 'Hide' : 'Show'} Translation</span>
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${showTranslation ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        {showTranslation && (
          <div
            id="daily-ayah-translation"
            className="mt-3 rounded-xl bg-muted/50 px-4 py-3 text-fluid-sm leading-relaxed text-foreground italic"
          >
            {ayah.translation}
          </div>
        )}

        {/* Action row — icon+label buttons, 44px minimum tap target */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {/* Listen */}
          <button
            onClick={onAyahTap}
            className="
              touch-target flex items-center gap-1.5 rounded-xl
              border border-border bg-background px-3
              text-fluid-xs font-medium text-foreground
              transition-colors hover:bg-muted press
            "
            aria-label="Listen to this ayah"
          >
            <Volume2 className="size-4 text-primary" aria-hidden="true" />
            Listen
          </button>

          {/* Share */}
          <button
            onClick={onAyahTap}
            className="
              touch-target flex items-center gap-1.5 rounded-xl
              border border-border bg-background px-3
              text-fluid-xs font-medium text-foreground
              transition-colors hover:bg-muted press
            "
            aria-label="Share this ayah"
          >
            <Share2 className="size-4 text-primary" aria-hidden="true" />
            Share
          </button>

          {/* Save */}
          <button
            onClick={onAyahTap}
            className="
              touch-target flex items-center gap-1.5 rounded-xl
              border border-border bg-background px-3
              text-fluid-xs font-medium text-foreground
              transition-colors hover:bg-muted press
            "
            aria-label="Bookmark this ayah"
          >
            <BookmarkPlus className="size-4 text-primary" aria-hidden="true" />
            Save
          </button>

          {/* Tafseer */}
          <button
            onClick={onAyahTap}
            className="
              touch-target flex items-center gap-1.5 rounded-xl
              border border-border bg-background px-3
              text-fluid-xs font-medium text-foreground
              transition-colors hover:bg-muted press
            "
            aria-label="Read tafseer for this ayah"
          >
            <BookOpen className="size-4 text-primary" aria-hidden="true" />
            Tafseer
          </button>
        </div>
      </div>
    </article>
  )
}
