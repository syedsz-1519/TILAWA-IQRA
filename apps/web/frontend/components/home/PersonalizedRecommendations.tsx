'use client'

import { useEffect, useState } from 'react'
import { Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Recommendation {
  id: string
  title: string
  description: string
  action: string
  link: string
  icon: string
  color: string
}

export function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const readingProgress = localStorage.getItem('tilawa_reading_progress')
        const currentStreak = parseInt(localStorage.getItem('tilawa_streak') || '0')
        const totalAyahRead = parseInt(localStorage.getItem('tilawa_total_ayah_read') || '0')

        const recs: Recommendation[] = []

        // Recommendation 1: Continue Reading
        if (readingProgress) {
          recs.push({
            id: 'continue',
            title: 'Continue Your Journey',
            description: 'Pick up where you left off',
            action: 'Resume Reading',
            link: '/read',
            icon: '📖',
            color: 'from-blue-500 to-cyan-500',
          })
        }

        // Recommendation 2: Build Streak
        if (currentStreak > 0 && currentStreak < 7) {
          recs.push({
            id: 'streak',
            title: `${currentStreak} Day Streak!`,
            description: 'Keep the momentum going - read today',
            action: 'Read Now',
            link: '/read',
            icon: '🔥',
            color: 'from-orange-500 to-red-500',
          })
        }

        // Recommendation 3: Explore Features
        if (totalAyahRead < 50) {
          recs.push({
            id: 'explore',
            title: 'Explore Tajweed Rules',
            description: 'Learn proper Quranic recitation',
            action: 'Learn Tajweed',
            link: '/tajweed',
            icon: '🎵',
            color: 'from-emerald-500 to-teal-500',
          })
        }

        // Recommendation 4: Daily Dua
        recs.push({
          id: 'dua',
          title: 'Daily Dua & Adhkar',
          description: 'Spiritual practice for today',
          action: 'View Adhkar',
          link: '/dua-adhkar',
          icon: '🤲',
          color: 'from-purple-500 to-pink-500',
        })

        setRecommendations(recs.slice(0, 3)) // Show top 3
      } finally {
        setLoading(false)
      }
    }

    loadRecommendations()
  }, [])

  if (loading || recommendations.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="size-5 text-primary" />
        <h3 className="text-lg font-semibold">Recommended For You</h3>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {recommendations.map((rec) => (
          <Link key={rec.id} href={rec.link}>
            <div
              className={cn(
                'group relative overflow-hidden rounded-lg border border-border bg-gradient-to-br p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg',
                `from-${rec.color.split(' ')[1]} to-${rec.color.split(' ')[3]}`
              )}
            >
              {/* Gradient background */}
              <div
                className={cn(
                  'absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20',
                  `bg-gradient-to-br ${rec.color}`
                )}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-2xl">{rec.icon}</span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>

                <h4 className="font-semibold leading-tight">{rec.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{rec.description}</p>

                <div className="mt-3 inline-block rounded-md bg-background/50 px-2 py-1 text-xs font-semibold transition-colors group-hover:bg-background">
                  {rec.action}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
