'use client'

import Link from 'next/link'
import { ChevronRight, BookMarked, Bookmark } from 'lucide-react'

interface ContinueReadingCardProps {
  progress?: {
    surahNumber: number
    ayahNumber: number
    surahName: string
  }
  loading?: boolean
}

export function ContinueReadingCard({ progress, loading }: ContinueReadingCardProps) {
  if (loading) {
    return (
      <div aria-busy="true" aria-label="Loading reading progress">
        <div className="skeleton h-20 w-full rounded-2xl" />
      </div>
    )
  }

  /* ── Empty state ── */
  if (!progress) {
    return (
      <div className="card-sacred flex flex-col items-center gap-3 p-6 text-center sm:flex-row sm:text-left">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-xl"
          style={{ background: 'linear-gradient(135deg, var(--tile-quran-from), var(--tile-quran-to))' }}
        >
          <Bookmark className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Begin your reading journey</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Your last position will be saved automatically.
          </p>
        </div>
        <Link
          href="/read"
          className="sm:ml-auto tap-target rounded-xl border border-primary/40 bg-primary/10 px-4 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 press-effect shrink-0"
        >
          Start Reading
        </Link>
      </div>
    )
  }

  /* ── Resume state ── */
  return (
    <Link
      href={`/read/${progress.surahNumber}`}
      className="group card-sacred press-effect flex items-center gap-4 p-5"
      aria-label={`Continue reading ${progress.surahName}, ayah ${progress.ayahNumber}`}
    >
      {/* Icon */}
      <div
        className="flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-[var(--duration-base)] group-hover:scale-105"
        style={{ background: 'linear-gradient(135deg, var(--tile-quran-from), var(--tile-quran-to))' }}
      >
        <BookMarked className="size-5 text-primary" aria-hidden="true" />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Continue Reading
        </p>
        <p className="mt-0.5 truncate text-sm font-bold text-foreground">
          {progress.surahName}
        </p>
        <p className="text-xs text-muted-foreground">
          Surah {progress.surahNumber} · Ayah {progress.ayahNumber}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight
        className="size-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-base)] group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  )
}
