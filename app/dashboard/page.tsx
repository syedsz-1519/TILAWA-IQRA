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
  CheckCircle2,
  Circle,
  TrendingUp,
  Zap,
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
  { arabic: 'البقرة', name: 'Al-Baqarah', pct: 85, level: 'Expert', color: 'text-emerald-600 dark:text-emerald-400' },
  { arabic: 'الملك', name: 'Al-Mulk', pct: 40, level: 'Novice', color: 'text-amber-600 dark:text-amber-400' },
  { arabic: 'الكهف', name: 'Al-Kahf', pct: 62, level: 'Intermediate', color: 'text-blue-600 dark:text-blue-400' },
]

const DAILY_GOALS = [
  { id: 'quran', label: 'Read 1 page of Quran' },
  { id: 'salah', label: 'All 5 prayers on time' },
  { id: 'dhikr', label: '100x SubhanAllah' },
  { id: 'hadith', label: 'Read 1 hadith' },
]

const LEVEL_COLORS = [
  { min: 0,    max: 500,  label: 'Seeker',    color: 'text-slate-500' },
  { min: 500,  max: 1500, label: 'Learner',   color: 'text-emerald-600 dark:text-emerald-400' },
  { min: 1500, max: 3000, label: 'Reciter',   color: 'text-blue-600 dark:text-blue-400' },
  { min: 3000, max: 6000, label: 'Hafiz',     color: 'text-violet-600 dark:text-violet-400' },
  { min: 6000, max: Infinity, label: 'Imam',  color: 'text-amber-600 dark:text-amber-400' },
]

function ProgressRing({ pct, color }: { pct: number; color: string }) {
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
        className="stroke-primary transition-all duration-700"
        strokeDasharray={c}
        strokeDashoffset={c - (pct / 100) * c}
      />
    </svg>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  gradient,
}: {
  icon: React.ElementType
  label: string
  value: string
  sub: string
  gradient: string
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-border bg-card p-6 animate-fade-in-up`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30`}
      />
      <div className="relative flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="size-5 text-primary" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      <p className="relative mt-3 text-sm text-muted-foreground">{sub}</p>
    </section>
  )
}

export default function DashboardPage() {
  const [streak, setStreak] = useState(0)
  const [xp, setXp] = useState(0)
  const [reflection, setReflection] = useState('')
  const [saved, setSaved] = useState(false)
  const [goals, setGoals] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setStreak(Number(localStorage.getItem('tilawa-streak') || 1))
    setXp(Number(localStorage.getItem('tilawa-xp') || 0))
    setReflection(localStorage.getItem('tilawa-reflection') || '')
    try {
      setGoals(JSON.parse(localStorage.getItem('tilawa-daily-goals') || '{}'))
    } catch {
      // ignore
    }
  }, [])

  function saveReflection() {
    localStorage.setItem('tilawa-reflection', reflection)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function toggleGoal(id: string) {
    const next = { ...goals, [id]: !goals[id] }
    setGoals(next)
    localStorage.setItem('tilawa-daily-goals', JSON.stringify(next))
  }

  const level = LEVEL_COLORS.find((l) => xp >= l.min && xp < l.max) ?? LEVEL_COLORS[0]
  const goalsCompleted = Object.values(goals).filter(Boolean).length

  return (
    <main className="min-h-screen bg-background pb-32">
      {/* Dashboard Header */}
      <div className="relative overflow-hidden border-b border-border bg-card bg-islamic-pattern px-4 py-10 md:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 size-80 opacity-10"
          style={{
            background: 'radial-gradient(circle, oklch(0.78 0.13 165) 0%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary animate-fade-in">
            Daily Discovery
          </p>
          <h1 className="mt-1 text-3xl font-bold text-balance md:text-4xl animate-fade-in-up">
            Mastery &amp; Momentum
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground animate-fade-in-up animation-delay-100">
            Assalamu Alaikum! Here&apos;s your spiritual progress at a glance.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        {/* Ayat + Hadith of the day */}
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-6 animate-fade-in-up">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                ✦ Ayat of the Day
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

          <section className="rounded-2xl border border-border bg-card p-6 animate-fade-in-up animation-delay-100">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                ✦ Hadith of the Day
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
          <StatCard
            icon={Flame}
            label="Current Streak"
            value={`${streak} Days`}
            sub={`${Math.min(Math.round((streak / 30) * 100), 100)}% toward 30-day goal 🔥`}
            gradient="from-orange-500/20 to-red-500/20"
          />
          <StatCard
            icon={Star}
            label="Total XP"
            value={`${xp} XP`}
            sub={`Level: ${Math.floor(xp / 500) + 1} · ${level.label}`}
            gradient="from-amber-500/20 to-yellow-500/20"
          />
          <StatCard
            icon={Target}
            label="Avg Accuracy"
            value="—"
            sub="Complete practice sessions to unlock"
            gradient="from-emerald-500/20 to-teal-500/20"
          />
        </div>

        {/* Daily Goals */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6 animate-fade-in-up">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Zap className="size-5 text-primary" aria-hidden="true" />
              <h2 className="font-semibold">Today&apos;s Goals</h2>
            </div>
            <span className="text-xs text-muted-foreground">
              {goalsCompleted} / {DAILY_GOALS.length} done
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${(goalsCompleted / DAILY_GOALS.length) * 100}%` }}
            />
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {DAILY_GOALS.map((goal) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => toggleGoal(goal.id)}
                aria-pressed={goals[goal.id] || false}
                className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm font-medium transition-all ${
                  goals[goal.id]
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border bg-background text-foreground hover:border-primary/30 hover:bg-muted'
                }`}
              >
                {goals[goal.id] ? (
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                ) : (
                  <Circle className="size-5 shrink-0 text-muted-foreground" />
                )}
                {goal.label}
              </button>
            ))}
          </div>
        </section>

        {/* Tajweed Rules Mastery */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6 animate-fade-in-up">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Brain className="size-5 text-primary" aria-hidden="true" />
              <h2 className="font-semibold">Tajweed Rules Mastery</h2>
            </div>
            <Link
              href="/tajweed"
              className="text-xs font-medium text-primary hover:underline"
            >
              Study now →
            </Link>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-0 rounded-full bg-primary transition-all duration-700" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">0 of 8 Rules mastered</p>
        </section>

        {/* Practice / Quiz action cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            href="/tajweed"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                <Mic2 className="size-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">Practice Tajweed</h3>
                <p className="text-sm text-muted-foreground">Learn the 8 essential rules</p>
              </div>
            </div>
            <ChevronRight
              className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <Link
            href="/tajweed-quiz"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                <Award className="size-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">Tajweed Quiz</h3>
                <p className="text-sm text-muted-foreground">Test your tajweed knowledge</p>
              </div>
            </div>
            <ChevronRight
              className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Surah progress */}
        <div className="mt-10 flex items-center gap-2">
          <TrendingUp className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Surah Progress
          </h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {SURAH_PROGRESS.map((s, i) => (
            <section
              key={s.name}
              className="rounded-2xl border border-border bg-card p-6 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p lang="ar" dir="rtl" className="text-2xl text-foreground">
                    {s.arabic}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.name}</p>
                </div>
                <div className="relative">
                  <ProgressRing pct={s.pct} color={s.color} />
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {s.pct}%
                  </span>
                </div>
              </div>
              <p className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${s.color}`}>
                <Award className="size-3.5" aria-hidden="true" />
                Mastery Level: {s.level}
              </p>
              <Link
                href="/read"
                className="mt-4 block rounded-xl border border-border py-2.5 text-center text-sm font-medium transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                Start Recitation
              </Link>
            </section>
          ))}
        </div>

        {/* Daily Reflection */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-primary" aria-hidden="true" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
              Daily Reflection
            </h2>
          </div>
          <p className="mt-4 text-lg font-medium text-balance">
            &quot;What is one hidden blessing Allah granted you today that you almost overlooked?&quot;
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your reflection here... (Stored privately on your device)"
            rows={4}
            className="mt-4 w-full resize-y rounded-xl border border-border bg-background p-4 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={saveReflection}
              className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all ${
                saved
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                  : 'border-primary/40 bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {saved ? '✓ Saved!' : 'Save Reflection'}
            </button>
          </div>
        </section>

        {/* Quote card */}
        <section className="mt-6 rounded-2xl border border-border bg-card px-6 py-12 text-center bg-islamic-pattern">
          <p lang="ar" dir="rtl" className="text-2xl leading-loose text-foreground">
            إِنَّ هَـٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ
          </p>
          <p className="mt-3 font-serif italic text-muted-foreground">
            &ldquo;Verily, this Quran guides to that which is most right.&rdquo;
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Al-Isra 17:9</p>
        </section>
      </div>
    </main>
  )
}
