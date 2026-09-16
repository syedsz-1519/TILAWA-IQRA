'use client'

import Link from 'next/link'
import { BookOpenText, Headphones, Pause, Play, Square } from 'lucide-react'
import { usePlayer } from '@/components/player/player-provider'
import { SURAHS } from '@/lib/quran'

export function Hero() {
  const { playSurah, stop, currentReciter, currentSurah, isPlaying } = usePlayer()
  const isFatihahPlaying = currentSurah?.number === 1 && isPlaying

  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-24">
        <p
          lang="ar"
          dir="rtl"
          className="font-serif text-3xl leading-relaxed text-primary sm:text-4xl"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Learn, listen, and perfect your recitation
        </h1>
        <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Stream the complete Quran in the voice of{' '}
          <span className="font-medium text-foreground">{currentReciter.nameEnglish}</span>{' '}
          <span lang="ar" dir="rtl" className="font-serif">
            ({currentReciter.nameArabic})
          </span>
          {' '}— then practice with AI-powered tajweed feedback.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => (isFatihahPlaying ? stop() : playSurah(SURAHS[0]))}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-98"
          >
            {isFatihahPlaying ? (
              <Pause className="size-4" aria-hidden="true" />
            ) : (
              <Play className="size-4" aria-hidden="true" />
            )}
            {isFatihahPlaying ? 'Pause Al-Fatihah' : 'Play Al-Fatihah'}
          </button>
          {isFatihahPlaying && (
            <button
              type="button"
              onClick={stop}
              className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-5 py-3 font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground active:scale-98"
              title="Stop recitation"
            >
              <Square className="size-4 fill-current" aria-hidden="true" />
              <span>Stop</span>
            </button>
          )}
          <Link
            href="/read"
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-medium transition-colors hover:bg-muted"
          >
            <BookOpenText className="size-4" aria-hidden="true" />
            Read Quran
          </Link>
          <a
            href="#listen"
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-medium transition-colors hover:bg-muted"
          >
            <Headphones className="size-4" aria-hidden="true" />
            Browse all 114 surahs
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          Riwayah: {currentReciter.riwayah} · Free forever · No ads
        </p>
      </div>
    </section>
  )
}
