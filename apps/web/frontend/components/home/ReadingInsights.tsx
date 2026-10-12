'use client'

import { useEffect, useState } from 'react'
import { Brain, TrendingUp, Clock, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─────────────────────────────────────────────────────────────────────────────
   ReadingInsights — auto-rotating insight carousel.
   All colour classes are static strings — no dynamic Tailwind interpolation.
───────────────────────────────────────────────────────────────────────────── */

const INSIGHT_THEMES = {
  morning:
    'bg-amber-50 border-amber-200/60 dark:bg-amber-950/30 dark:border-amber-800/40',
  afternoon:
    'bg-yellow-50 border-yellow-200/60 dark:bg-yellow-950/30 dark:border-yellow-800/40',
  evening:
    'bg-violet-50 border-violet-200/60 dark:bg-violet-950/30 dark:border-violet-800/40',
  'xp-boost':
    'bg-emerald-50 border-emerald-200/60 dark:bg-emerald-950/30 dark:border-emerald-800/40',
  tajweed:
    'bg-sky-50 border-sky-200/60 dark:bg-sky-950/30 dark:border-sky-800/40',
  streak:
    'bg-rose-50 border-rose-200/60 dark:bg-rose-950/30 dark:border-rose-800/40',
} as const

type InsightId = keyof typeof INSIGHT_THEMES

interface Insight {
  id: InsightId
  type: 'tip' | 'achievement' | 'reminder' | 'info'
  title: string
  description: string
  icon: React.ReactNode
}

const TYPE_BADGE: Record<Insight['type'], string> = {
  tip:         'bg-sky-100      text-sky-700      dark:bg-sky-900/40   dark:text-sky-300',
  reminder:    'bg-amber-100    text-amber-700    dark:bg-amber-900/40 dark:text-amber-300',
  info:        'bg-emerald-100  text-emerald-700  dark:bg-emerald-900/40 dark:text-emerald-300',
  achievement: 'bg-violet-100   text-violet-700   dark:bg-violet-900/40 dark:text-violet-300',
}

export function ReadingInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [activeInsight, setActiveInsight] = useState(0)

  useEffect(() => {
    const hour = new Date().getHours()
    const list: Insight[] = []

    if (hour < 12) {
      list.push({
        id: 'morning',
        type: 'tip',
        title: '🌅 Morning Read',
        description: 'Start your day with mindful Quranic reading. Morning reading improves focus and retention.',
        icon: <Clock className="size-5" />,
      })
    } else if (hour < 17) {
      list.push({
        id: 'afternoon',
        type: 'tip',
        title: '☀️ Afternoon Session',
        description: 'Mid-day reading helps maintain momentum. Try 5–10 ayahs.',
        icon: <TrendingUp className="size-5" />,
      })
    } else {
      list.push({
        id: 'evening',
        type: 'tip',
        title: '🌙 Evening Reflection',
        description: "Reflect on today's reading before evening prayer — it deepens comprehension.",
        icon: <Brain className="size-5" />,
      })
    }

    list.push({
      id: 'xp-boost',
      type: 'reminder',
      title: '⚡ XP Boost Ready',
      description: "Daily reading gives you 10 XP points. Don't miss your streak reward!",
      icon: <Zap className="size-5" />,
    })

    list.push({
      id: 'tajweed',
      type: 'info',
      title: '🎵 Tajweed Tip',
      description: 'Proper pronunciation enhances understanding and spiritual benefit of recitation.',
      icon: <Brain className="size-5" />,
    })

    list.push({
      id: 'streak',
      type: 'achievement',
      title: '🔥 Build Your Streak',
      description: 'Read daily to build a strong habit and unlock achievement badges.',
      icon: <TrendingUp className="size-5" />,
    })

    setInsights(list)
  }, [])

  if (insights.length === 0) return null

  const current = insights[activeInsight]

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-token-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-fluid-lg font-semibold text-foreground">Today's Insights</h3>
        <div className="flex gap-1" role="tablist" aria-label="Insight navigation">
          {insights.map((ins, idx) => (
            <button
              key={ins.id}
              role="tab"
              aria-selected={idx === activeInsight}
              onClick={() => setActiveInsight(idx)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-200',
                idx === activeInsight ? 'w-4 bg-primary' : 'w-1.5 bg-muted-foreground/30'
              )}
              aria-label={`Insight ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div
        className={cn(
          'relative overflow-hidden rounded-xl border p-4 transition-all duration-200 md:p-5',
          INSIGHT_THEMES[current.id]
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-background/40 p-2 text-foreground backdrop-blur-sm">
              {current.icon}
            </div>
            <h4 className="text-fluid-base font-semibold text-foreground leading-tight">
              {current.title}
            </h4>
          </div>
          <span className={cn('shrink-0 rounded px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide', TYPE_BADGE[current.type])}>
            {current.type}
          </span>
        </div>

        <p className="mt-3 text-fluid-sm leading-relaxed text-foreground/80">
          {current.description}
        </p>
      </div>

      {insights.length > 1 && (
        <p className="mt-2 text-center text-[0.6875rem] text-muted-foreground">
          {activeInsight + 1} of {insights.length}
        </p>
      )}
    </div>
  )
}
