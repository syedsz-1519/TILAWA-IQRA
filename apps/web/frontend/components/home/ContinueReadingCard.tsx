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
    return <div className="skeleton h-16 w-full" aria-label="Loading reading progress" aria-busy="true" />
  }

  if (!progress) {
    return (
      <div className="card-sacred p-5 text-center text-sm text-muted-foreground">
        Start reading to track your progress
      </div>
    )
  }

  return (
    <Link
      href={`/read-quran?surah=${progress.surahNumber}&ayah=${progress.ayahNumber}`}
      className="group card-sacred press-effect flex items-center justify-between gap-4 p-5"
    >
      <div className="flex items-center gap-3">
        <BookMarked className="size-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Continue Reading
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {progress.surahName} {progress.surahNumber}:{progress.ayahNumber}
          </p>
        </div>
      </div>
      <ChevronRight
        className="size-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-base)] group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  )
}
