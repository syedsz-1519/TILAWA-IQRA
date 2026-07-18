'use client'

import Link from 'next/link'
import { BookOpenText, Headphones, Play, Sparkles } from 'lucide-react'
import { usePlayer } from '@/components/player/player-provider'
import { SURAHS, DEFAULT_RECITER } from '@/lib/quran'

const STATS = [
  { value: '114', label: 'Surahs' },
  { value: '6,236', label: 'Ayaat' },
  { value: '30', label: 'Juz' },
  { value: '∞', label: 'Barakah' },
]

export function Hero() {
  const { playSurah } = usePlayer()

  return (
    <section className="relative overflow-hidden border-b border-border bg-card bg-islamic-pattern">
      {/* Ambient gradient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[600px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, oklch(0.78 0.13 165 / 40%) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 size-80 rounded-full opacity-10"
        style={{
          background:
            'radial-gradient(circle, oklch(0.78 0.11 85 / 60%) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-20 text-center sm:py-28">
        {/* Bismillah */}
        <div className="animate-fade-in">
          <p
            lang="ar"
            dir="rtl"
            className="font-serif text-3xl leading-relaxed text-primary sm:text-4xl animate-float"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* Badge */}
        <div className="animate-fade-in-up animation-delay-100">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <Sparkles className="size-3" aria-hidden="true" />
            AI-Powered Quranic Learning
          </span>
        </div>

        {/* Headline */}
        <div className="animate-fade-in-up animation-delay-200">
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Learn, listen, and{' '}
            <span className="text-shimmer">perfect your recitation</span>
          </h1>
        </div>

        {/* Description */}
        <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground animate-fade-in-up animation-delay-300">
          Stream the complete Quran in the voice of{' '}
          <span className="font-medium text-foreground">{DEFAULT_RECITER.nameEnglish}</span>{' '}
          <span lang="ar" dir="rtl" className="font-serif">
            ({DEFAULT_RECITER.nameArabic})
          </span>
          , Imam of Masjid al-Haram — then practice with AI-powered tajweed feedback.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row animate-fade-in-up animation-delay-400">
          <button
            type="button"
            onClick={() => playSurah(SURAHS[0])}
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
            <Play className="size-4" aria-hidden="true" />
            Play Al-Fatihah
          </button>
          <Link
            href="/read"
            className="flex items-center gap-2 rounded-xl border border-border bg-background px-7 py-3.5 font-semibold transition-all hover:border-primary/40 hover:bg-muted hover:scale-105"
          >
            <BookOpenText className="size-4" aria-hidden="true" />
            Read Quran
          </Link>
          <a
            href="#listen"
            className="flex items-center gap-2 rounded-xl border border-border bg-background px-7 py-3.5 font-semibold transition-all hover:border-primary/40 hover:bg-muted hover:scale-105"
          >
            <Headphones className="size-4" aria-hidden="true" />
            Browse 114 Surahs
          </a>
        </div>

        {/* Riwayah note */}
        <p className="text-xs text-muted-foreground animate-fade-in-up animation-delay-500">
          Riwayah: {DEFAULT_RECITER.riwayah} · Free forever · No ads · No account needed
        </p>

        {/* Stats bar */}
        <div className="w-full animate-fade-in-up animation-delay-600">
          <div className="mx-auto mt-4 grid max-w-2xl grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-card px-4 py-5"
              >
                <span className="text-2xl font-bold text-primary sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
