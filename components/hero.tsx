'use client'

import { Headphones, Play } from 'lucide-react'
import { usePlayer } from '@/components/player/player-provider'
import { SURAHS, DEFAULT_RECITER } from '@/lib/quran'

export function Hero() {
  const { playSurah } = usePlayer()

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
          <span className="font-medium text-foreground">{DEFAULT_RECITER.nameEnglish}</span>{' '}
          <span lang="ar" dir="rtl" className="font-serif">
            ({DEFAULT_RECITER.nameArabic})
          </span>
          , Imam of Masjid al-Haram — then practice with AI-powered tajweed feedback.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => playSurah(SURAHS[0])}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Play className="size-4" aria-hidden="true" />
            Play Al-Fatihah
          </button>
          <a
            href="#listen"
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-medium transition-colors hover:bg-muted"
          >
            <Headphones className="size-4" aria-hidden="true" />
            Browse all 114 surahs
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          Riwayah: {DEFAULT_RECITER.riwayah} · Free forever · No ads
        </p>
      </div>
    </section>
  )
}
