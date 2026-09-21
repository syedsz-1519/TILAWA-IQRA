'use client'

import { useEffect, useState } from 'react'
import { RotateCw, Volume2, Share2, BookmarkPlus, BookOpen } from 'lucide-react'

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
      <div className="animate-pulse">
        <div className="h-40 rounded-2xl bg-muted" />
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
    <div
      onClick={onAyahTap}
      className="group cursor-pointer rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-amber-50 to-orange-50 p-8 transition-all hover:border-primary/60 hover:shadow-lg dark:from-amber-950/20 dark:to-orange-950/20"
    >
      {/* Label */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Ayah of the Day
        </p>
        <p className="text-xs text-muted-foreground">
          {ayah.surahName} {ayah.surahNumber}:{ayah.ayahNumber}
        </p>
      </div>

      {/* Arabic text */}
      <div
        lang="ar"
        dir="rtl"
        className="mb-6 text-center text-3xl leading-relaxed text-foreground font-serif"
        style={{ fontFamily: "'Amiri Quran', 'KFGQPC Uthmanic Script HAFS', serif" }}
      >
        {ayah.arabic}
      </div>

      {/* Translation toggle */}
      {showTranslation && (
        <div className="mb-6 rounded-lg border border-border bg-card/50 p-4">
          <p className="text-sm leading-relaxed text-foreground italic">{ayah.translation}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowTranslation(!showTranslation)
          }}
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
        >
          {showTranslation ? 'Hide' : 'Show'} Translation
        </button>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAyahTap?.()
            }}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold transition-colors hover:bg-muted"
            title="Listen to this ayah"
          >
            <Volume2 className="size-4" />
            Listen
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onAyahTap?.()
            }}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold transition-colors hover:bg-muted"
            title="Share this ayah"
          >
            <Share2 className="size-4" />
            Share
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onAyahTap?.()
            }}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold transition-colors hover:bg-muted"
            title="Save this ayah"
          >
            <BookmarkPlus className="size-4" />
            Save
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onAyahTap?.()
            }}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold transition-colors hover:bg-muted"
            title="Read tafseer"
          >
            <BookOpen className="size-4" />
            Tafseer
          </button>
        </div>
      </div>
    </div>
  )
}
