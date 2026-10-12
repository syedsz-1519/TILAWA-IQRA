'use client'

import { useEffect, useState } from 'react'
import { Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Recommendation {
  id: string
  title: string
  description: string
  action: string
  link: string
  icon: string
  /** Inline style gradient — avoids Tailwind JIT interpolation issues */
  gradientStyle: React.CSSProperties
}

// Static colour presets — no dynamic class interpolation
const GRADIENT_PRESETS: React.CSSProperties[] = [
  { background: 'linear-gradient(135deg, oklch(0.92 0.06 265), oklch(0.95 0.03 230))' },
  { background: 'linear-gradient(135deg, oklch(0.93 0.08 50), oklch(0.96 0.04 70))'  },
  { background: 'linear-gradient(135deg, oklch(0.91 0.07 160), oklch(0.94 0.04 145))' },
  { background: 'linear-gradient(135deg, oklch(0.92 0.07 300), oklch(0.95 0.04 280))' },
]

const DARK_GRADIENT_PRESETS: React.CSSProperties[] = [
  { background: 'linear-gradient(135deg, oklch(0.20 0.06 265), oklch(0.17 0.04 230))' },
  { background: 'linear-gradient(135deg, oklch(0.20 0.07 50), oklch(0.17 0.04 70))'   },
  { background: 'linear-gradient(135deg, oklch(0.19 0.06 160), oklch(0.17 0.04 145))' },
  { background: 'linear-gradient(135deg, oklch(0.20 0.06 300), oklch(0.17 0.04 280))' },
]

export function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const readingProgress = localStorage.getItem('tilawa_reading_progress')
        const currentStreak = parseInt(localStorage.getItem('tilawa_streak') || '0')
        const totalAyahRead = parseInt(localStorage.getItem('tilawa_total_ayah_read') || '0')

        const recs: Omit<Recommendation, 'gradientStyle'>[] = []

        if (readingProgress) {
          recs.push({
            id: 'continue',
            title: 'Continue Your Journey',
            description: 'Pick up where you left off',
            action: 'Resume Reading',
            link: '/read',
            icon: '📖',
          })
        }

        if (currentStreak > 0 && currentStreak < 7) {
          recs.push({
            id: 'streak',
            title: `${currentStreak} Day Streak!`,
            description: 'Keep the momentum going — read today',
            action: 'Read Now',
            link: '/read',
            icon: '🔥',
          })
        }

        if (totalAyahRead < 50) {
          recs.push({
            id: 'explore',
            title: 'Explore Tajweed Rules',
            description: 'Learn proper Quranic recitation',
            action: 'Learn Tajweed',
            link: '/tajweed',
            icon: '🎵',
          })
        }

        recs.push({
          id: 'dua',
          title: 'Daily Dua & Adhkar',
          description: 'Spiritual practice for today',
          action: 'View Adhkar',
          link: '/dua-library',
          icon: '🤲',
        })

        const presets = isDark ? DARK_GRADIENT_PRESETS : GRADIENT_PRESETS
        setRecommendations(
          recs.slice(0, 3).map((r, i) => ({
            ...r,
            gradientStyle: presets[i % presets.length],
          }))
        )
      } finally {
        setLoading(false)
      }
    }

    loadRecommendations()
  }, [isDark])

  if (loading || recommendations.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb className="size-4 text-primary" aria-hidden="true" />
        <h3 className="text-base font-semibold">Recommended For You</h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {recommendations.map((rec) => (
          <Link key={rec.id} href={rec.link} className="group card-sacred press-effect block overflow-hidden">
            <div className="p-4" style={rec.gradientStyle}>
              <div className="mb-3 flex items-start justify-between">
                <span className="text-2xl" aria-hidden="true">{rec.icon}</span>
                <ArrowRight
                  className="size-4 text-muted-foreground transition-transform duration-[var(--duration-base)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
              <h4 className="text-sm font-semibold leading-tight text-foreground">{rec.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{rec.description}</p>
              <div className="mt-3 inline-block rounded-md bg-background/60 px-2 py-1 text-xs font-semibold text-foreground">
                {rec.action}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
