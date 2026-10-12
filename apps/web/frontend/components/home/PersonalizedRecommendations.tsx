'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────────────────
   PersonalizedRecommendations
   IMPORTANT: All card colour classes are static strings — dynamic Tailwind
   class interpolation (e.g. `from-${color}`) is never generated at build time.
   Each theme is a complete pre-defined class set in CARD_THEMES.
───────────────────────────────────────────────────────────────────────────── */

const CARD_THEMES = {
  continue:
    'bg-sky-50 border-sky-200/60 dark:bg-sky-950/30 dark:border-sky-800/40 hover:border-sky-400/60 dark:hover:border-sky-600/60',
  streak:
    'bg-amber-50 border-amber-200/60 dark:bg-amber-950/30 dark:border-amber-800/40 hover:border-amber-400/60 dark:hover:border-amber-600/60',
  explore:
    'bg-emerald-50 border-emerald-200/60 dark:bg-emerald-950/30 dark:border-emerald-800/40 hover:border-emerald-400/60 dark:hover:border-emerald-600/60',
  dua:
    'bg-violet-50 border-violet-200/60 dark:bg-violet-950/30 dark:border-violet-800/40 hover:border-violet-400/60 dark:hover:border-violet-600/60',
} as const

type ThemeKey = keyof typeof CARD_THEMES

interface Recommendation {
  id: ThemeKey
  title: string
  description: string
  action: string
  link: string
  emoji: string
}

export function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = () => {
      try {
        const readingProgress = localStorage.getItem('tilawa_reading_progress')
        const currentStreak   = parseInt(localStorage.getItem('tilawa_streak') || '0')
        const totalAyahRead   = parseInt(localStorage.getItem('tilawa_total_ayah_read') || '0')

        const recs: Recommendation[] = []

        if (readingProgress) {
          recs.push({
            id: 'continue',
            title: 'Continue Your Journey',
            description: 'Pick up where you left off',
            action: 'Resume Reading',
            link: '/read',
            emoji: '📖',
          })
        }

        if (currentStreak > 0 && currentStreak < 7) {
          recs.push({
            id: 'streak',
            title: `${currentStreak} Day Streak`,
            description: 'Keep the momentum — read today',
            action: 'Read Now',
            link: '/read',
            emoji: '🔥',
          })
        }

        if (totalAyahRead < 50) {
          recs.push({
            id: 'explore',
            title: 'Explore Tajweed',
            description: 'Learn proper Quranic recitation',
            action: 'Learn Tajweed',
            link: '/tajweed',
            emoji: '🎵',
          })
        }

        recs.push({
          id: 'dua',
          title: 'Daily Dua & Adhkar',
          description: 'Spiritual practice for today',
          action: 'View Adhkar',
          link: '/dua-adhkar',
          emoji: '🤲',
        })

        setRecommendations(recs.slice(0, 3))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading || recommendations.length === 0) return null

  return (
    <section aria-label="Recommended for you">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-fluid-lg font-semibold text-foreground">Recommended For You</h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {recommendations.map((rec) => (
          <Link
            key={rec.id}
            href={rec.link}
            className={`
              group relative flex flex-col gap-3 overflow-hidden
              rounded-2xl border p-4 transition-all duration-200 press
              ${CARD_THEMES[rec.id]}
            `}
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl" role="img" aria-hidden="true">{rec.emoji}</span>
              <ArrowRight
                className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>

            <div>
              <h4 className="text-fluid-sm font-semibold text-foreground leading-snug">
                {rec.title}
              </h4>
              <p className="mt-0.5 text-fluid-xs text-muted-foreground">
                {rec.description}
              </p>
            </div>

            <span className="inline-block rounded-lg bg-background/60 px-2.5 py-1 text-[0.6875rem] font-semibold text-foreground transition-colors group-hover:bg-background/90">
              {rec.action}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
