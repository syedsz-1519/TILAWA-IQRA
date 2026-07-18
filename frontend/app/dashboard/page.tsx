'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Flame,
  Star,
  Target,
  Brain,
  Mic2,
  Award,
  ChevronRight,
} from 'lucide-react'

const AYAT_OF_DAY = {
  ref: 'Al-Baqarah [2:183]',
  arabic:
    'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
  translation:
    '"O believers! Fasting is prescribed for you—as it was for those before you—so perhaps you will become mindful of Allah."',
}

const HADITH_OF_DAY = {
  source: 'Sahih al-Bukhari',
  text: 'The best among you (Muslims) are those who learn the Quran and teach it.',
  narrator: 'Narrated Uthman ibn Affan (RA)',
}

const SURAH_PROGRESS = [
  { arabic: 'البقرة', name: 'Al-Baqarah', pct: 85, level: 'Expert', color: 'text-primary' },
  { arabic: 'الملك', name: 'Al-Mulk', pct: 40, level: 'Novice', color: 'text-accent-foreground' },
  { arabic: 'الكهف', name: 'Al-Kahf', pct: 62, level: 'Intermediate', color: 'text-primary' },
]

const REFLECTION_PROMPT =
  '"What is one hidden blessing Allah granted you today that you almost overlooked?"'

function ProgressRing({ pct }: { pct: number }) {
  const r = 26
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden="true">
      <circle cx="32" cy="32" r={r} fill="none" strokeWidth="5" className="stroke-muted" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-primary"
        strokeDasharray={c}
        strokeDashoffset={c - (pct / 100) * c}
      />
    </svg>
  )
}

export default function DashboardPage() {
  const [streak, setStreak] = useState(0)
  const [xp, setXp] = useState(0)
  const [reflection, setReflection] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setStreak(Number(localStorage.getItem('tilawa-streak') || 1))
    setXp(Number(localStorage.getItem('tilawa-xp') || 0))
    setReflection(localStorage.getItem('tilawa-reflection') || '')
  }, [])

  function saveReflection() {
    localStorage.setItem('tilawa-reflection', reflection)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        {/* Heading */}
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Daily Discovery
        </p>
        <h1 className="mt-1 text-3xl font-bold text-balance md:text-4xl">Mastery &amp; Momentum</h1>

        {/* Ayat + Hadith of the day */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <section className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Ayat of the Day
              </span>
              <span className="text-xs text-muted-foreground">{AYAT_OF_DAY.ref}</span>
            </div>
            <p lang="ar" dir="rtl" className="mt-5 text-2xl leading-loose text-foreground">
              {AYAT_OF_DAY.arabic}
            </p>
            <p className="mt-4 font-serif italic leading-relaxed text-muted-foreground">
              {AYAT_OF_DAY.translation}
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Hadith of the Day
              </span>
              <span className="text-xs text-muted-foreground">{HADITH_OF_DAY.source}</span>
            </div>
            <p className="mt-5 text-lg leading-relaxed text-foreground">
              &ldquo;{HADITH_OF_DAY.text}&rdquo;
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{HADITH_OF_DAY.narrator}</p>
          </section>
        </div>

        {/* Stat cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <section className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Flame className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Current Streak
                </p>
                <p className="text-2xl font-bold">
                  {streak} <span className="text-sm font-normal text-muted-foreground">Days</span>
                </p>
              </div>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min((streak / 30) * 100, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">of 30 day goal</p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Star className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total XP
                </p>
                <p className="text-2xl font-bold">
                  {xp} <span className="text-sm font-normal text-muted-foreground">XP</span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-primary">
              Level {Math.floor(xp / 500) + 1}
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Target className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Average Accuracy
                </p>
                <p className="text-2xl font-bold">
                  &mdash;<span className="text-sm font-normal text-muted-foreground"> %</span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">0 practice sessions</p>
          </section>
        </div>

        {/* Tajweed Rules Mastery bar */}
        <section className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Brain className="size-5 text-primary" aria-hidden="true" />
              <h2 className="font-semibold">Tajweed Rules Mastery</h2>
            </div>
            <span className="text-xs text-muted-foreground">0 of 8 Rules</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-0 rounded-full bg-primary" />
          </div>
        </section>

        {/* Practice / Quiz action cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            href="/tajweed"
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted"
          >
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Mic2 className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">Practice Tajweed</h3>
                <p className="text-sm text-muted-foreground">Record and analyze your recitation</p>
              </div>
            </div>
            <ChevronRight
              className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <Link
            href="/tajweed-quiz"
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted"
          >
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Award className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">Tajweed Quiz</h3>
                <p className="text-sm text-muted-foreground">
                  Test your knowledge of Tajweed rules
                </p>
              </div>
            </div>
            <ChevronRight
              className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Surah progress */}
        <h2 className="mt-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Surah Progress
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {SURAH_PROGRESS.map((s) => (
            <section key={s.name} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p lang="ar" dir="rtl" className="text-2xl text-foreground">
                    {s.arabic}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.name}</p>
                </div>
                <div className="relative">
                  <ProgressRing pct={s.pct} />
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {s.pct}%
                  </span>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary">
                <Award className="size-3.5" aria-hidden="true" />
                Mastery Level: {s.level}
              </p>
              <Link
                href="/read"
                className="mt-4 block rounded-lg border border-border py-2.5 text-center text-sm font-medium transition-colors hover:bg-muted"
              >
                Start Recitation
              </Link>
            </section>
          ))}
        </div>

        {/* Daily Reflection */}
        <section className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-primary" aria-hidden="true" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
              Daily Reflection
            </h2>
          </div>
          <p className="mt-4 text-lg font-medium text-balance">{REFLECTION_PROMPT}</p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your reflection here... (Stored privately on your device)"
            rows={4}
            className="mt-4 w-full resize-y rounded-lg border border-border bg-background p-4 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={saveReflection}
              className="rounded-lg border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              {saved ? 'Saved!' : 'Save Reflection'}
            </button>
          </div>
        </section>

        {/* Quote card */}
        <section className="mt-6 rounded-xl border border-border bg-card px-6 py-10 text-center">
          <BookOpen className="mx-auto size-5 text-primary" aria-hidden="true" />
          <p lang="ar" dir="rtl" className="mt-5 text-2xl leading-loose text-foreground">
            إِنَّ هَـٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ
          </p>
          <p className="mt-3 font-serif italic text-muted-foreground">
            &ldquo;Verily, this Quran guides to that which is most right.&rdquo;
          </p>
        </section>
      </div>
    </main>
  )
}
