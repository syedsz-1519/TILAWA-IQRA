'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─────────────────────────────────────────────────────────────────────────────
   StudyTipsCarousel — auto-rotating tip cards.
   All card colour classes are static — no dynamic Tailwind interpolation.
───────────────────────────────────────────────────────────────────────────── */

const DIFFICULTY_THEME = {
  beginner:     'bg-emerald-50 border-emerald-200/60 dark:bg-emerald-950/30 dark:border-emerald-800/40',
  intermediate: 'bg-amber-50   border-amber-200/60   dark:bg-amber-950/30   dark:border-amber-800/40',
  advanced:     'bg-violet-50  border-violet-200/60  dark:bg-violet-950/30  dark:border-violet-800/40',
} as const

const DIFFICULTY_BADGE = {
  beginner:     'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  intermediate: 'bg-amber-100   text-amber-700   dark:bg-amber-900/40   dark:text-amber-300',
  advanced:     'bg-violet-100  text-violet-700  dark:bg-violet-900/40  dark:text-violet-300',
} as const

type Difficulty = keyof typeof DIFFICULTY_THEME

interface Tip {
  id: string
  title: string
  description: string
  category: string
  emoji: string
  difficulty: Difficulty
}

const TIPS: Tip[] = [
  {
    id: 'tip-1',
    emoji: '🌙',
    title: 'Night Study Sessions',
    description: 'Many scholars recommend studying the Quran after Isha prayer when the mind is calm.',
    category: 'Timing',
    difficulty: 'beginner',
  },
  {
    id: 'tip-2',
    emoji: '🎵',
    title: 'Tajweed Practice',
    description: 'Practice proper pronunciation daily. Even 10 minutes of focused tajweed improves recitation.',
    category: 'Technique',
    difficulty: 'intermediate',
  },
  {
    id: 'tip-3',
    emoji: '📖',
    title: 'Consistent Reading',
    description: 'Read the same passage multiple times. Repetition strengthens memory and understanding.',
    category: 'Memory',
    difficulty: 'beginner',
  },
  {
    id: 'tip-4',
    emoji: '📝',
    title: 'Reflection & Notes',
    description: 'Write down reflections and insights. This deepens understanding and creates personal connections.',
    category: 'Learning',
    difficulty: 'intermediate',
  },
  {
    id: 'tip-5',
    emoji: '👥',
    title: 'Study Groups',
    description: 'Learning with others provides different perspectives and maintains motivation.',
    category: 'Community',
    difficulty: 'beginner',
  },
  {
    id: 'tip-6',
    emoji: '🎯',
    title: 'Set Daily Goals',
    description: 'Aim for 5–10 ayahs daily. Consistency beats speed in Quranic learning.',
    category: 'Planning',
    difficulty: 'beginner',
  },
]

export function StudyTipsCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = () => setCurrent((p) => (p + 1) % TIPS.length)
  const retreat = () => setCurrent((p) => (p - 1 + TIPS.length) % TIPS.length)

  // Auto-play with prefers-reduced-motion guard
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || prefersReduced) return

    timerRef.current = setTimeout(advance, 5000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, paused])

  const tip = TIPS[current]

  return (
    <div
      className="rounded-2xl border border-border bg-card p-4 shadow-token-sm md:p-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={()    => setPaused(true)}
      onBlur={()     => setPaused(false)}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-5 text-primary" aria-hidden="true" />
          <h3 className="text-fluid-lg font-semibold text-foreground">Study Tips</h3>
        </div>
        <span className="text-fluid-xs text-muted-foreground">
          {current + 1} / {TIPS.length}
        </span>
      </div>

      {/* Tip card */}
      <div
        className={cn(
          'relative overflow-hidden rounded-xl border p-5 transition-all duration-200',
          DIFFICULTY_THEME[tip.difficulty]
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-3xl" role="img" aria-hidden="true">{tip.emoji}</span>
          <div className="flex flex-col items-end gap-1.5">
            <span className={cn('rounded px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide', DIFFICULTY_BADGE[tip.difficulty])}>
              {tip.difficulty}
            </span>
            <span className="text-[0.6875rem] font-medium text-muted-foreground">{tip.category}</span>
          </div>
        </div>
        <h4 className="mt-3 text-fluid-base font-bold text-foreground">{tip.title}</h4>
        <p className="mt-1.5 text-fluid-sm leading-relaxed text-foreground/80">{tip.description}</p>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          onClick={retreat}
          className="touch-target rounded-xl border border-border bg-card transition-colors hover:bg-muted press"
          aria-label="Previous tip"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex gap-1.5" role="tablist" aria-label="Tips navigation">
          {TIPS.map((t, idx) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={idx === current}
              onClick={() => setCurrent(idx)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-200',
                idx === current ? 'w-4 bg-primary' : 'w-1.5 bg-muted-foreground/30'
              )}
              aria-label={`Go to tip ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={advance}
          className="touch-target rounded-xl border border-border bg-card transition-colors hover:bg-muted press"
          aria-label="Next tip"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
