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
    return <div className="h-16 animate-pulse rounded-xl bg-muted" />
  }

  if (!progress) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
        Start reading to track your progress
      </div>
    )
  }

  return (
    <Link
      href={`/read-quran?surah=${progress.surahNumber}&ayah=${progress.ayahNumber}`}
      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:bg-muted"
    >
      <div className="flex items-center gap-3">
        <BookMarked className="size-5 text-primary" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Continue Reading
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {progress.surahName} {progress.surahNumber}:{progress.ayahNumber}
          </p>
        </div>
      </div>
      <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
