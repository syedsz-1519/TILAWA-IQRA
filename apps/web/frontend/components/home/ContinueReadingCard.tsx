'use client'

import Link from 'next/link'
import { ChevronRight, BookMarked } from 'lucide-react'

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
      <div
        className="h-20 animate-pulse rounded-2xl bg-muted"
        aria-busy="true"
        aria-label="Loading reading progress"
      />
    )
  }

  if (!progress) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 px-5 py-6 text-center text-fluid-sm text-muted-foreground">
        Start reading to track your progress.
      </div>
    )
  }

  return (
    <Link
      href={`/read/${progress.surahNumber}?ayah=${progress.ayahNumber}`}
      className="
        group flex items-center justify-between gap-4
        rounded-2xl border border-border bg-card
        px-5 py-4 shadow-token-sm
        transition-all duration-200 hover:shadow-token-md hover:border-primary/40
        press
      "
      aria-label={`Continue reading ${progress.surahName}, ayah ${progress.ayahNumber}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <BookMarked className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-fluid-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Continue Reading
          </p>
          <p className="mt-0.5 text-fluid-sm font-semibold text-foreground truncate">
            {progress.surahName}{' '}
            <span className="font-normal text-muted-foreground">
              {progress.surahNumber}:{progress.ayahNumber}
            </span>
          </p>
        </div>
      </div>
      <ChevronRight
        className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  )
}
