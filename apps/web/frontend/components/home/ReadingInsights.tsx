'use client'

import { useEffect, useState } from 'react'
import { Brain, TrendingUp, Clock, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Insight {
  id: string
  type: 'tip' | 'achievement' | 'reminder' | 'info'
  title: string
  description: string
  icon: React.ReactNode
  action?: string
  color: string
}

export function ReadingInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [activeInsight, setActiveInsight] = useState(0)

  useEffect(() => {
    const generateInsights = (): Insight[] => {
      const hour = new Date().getHours()
      const insightsList: Insight[] = []

      // Time-based greeting
      if (hour < 12) {
        insightsList.push({
          id: 'morning',
          type: 'tip',
          title: '🌅 Morning Read',
          description: 'Start your day with mindful Quranic reading. Studies show morning reading improves focus.',
          icon: <Clock className="size-5" />,
          color: 'from-amber-500 to-orange-500',
        })
      } else if (hour < 17) {
        insightsList.push({
          id: 'afternoon',
          type: 'tip',
          title: '☀️ Afternoon Session',
          description: 'Mid-day reading helps maintain momentum. Try reading 5-10 ayahs.',
          icon: <TrendingUp className="size-5" />,
          color: 'from-yellow-500 to-amber-500',
        })
      } else {
        insightsList.push({
          id: 'evening',
          type: 'tip',
          title: '🌙 Evening Reflection',
          description: 'Reflect on today\'s reading before evening prayer. This deepens comprehension.',
          icon: <Brain className="size-5" />,
          color: 'from-purple-500 to-indigo-500',
        })
      }

      // XP reminder
      insightsList.push({
        id: 'xp-boost',
        type: 'reminder',
        title: '⚡ XP Boost Ready',
        description: 'Daily reading gives you 10 XP points. Don\'t miss out on your rewards!',
        icon: <Zap className="size-5" />,
        color: 'from-emerald-500 to-teal-500',
      })

      // Tajweed tip
      insightsList.push({
        id: 'tajweed',
        type: 'info',
        title: '🎵 Tajweed Tip',
        description: 'Remember: Proper pronunciation enhances understanding and spiritual benefit.',
        icon: <Brain className="size-5" />,
        color: 'from-cyan-500 to-blue-500',
      })

      // Streak motivation
      insightsList.push({
        id: 'streak',
        type: 'achievement',
        title: '🔥 Streak Milestone',
        description: 'Keep reading daily to build a strong habit and unlock more badges!',
        icon: <TrendingUp className="size-5" />,
        color: 'from-red-500 to-pink-500',
      })

      return insightsList
    }

    setInsights(generateInsights())
  }, [])

  if (insights.length === 0) {
    return null
  }

  const current = insights[activeInsight]

  return (
    <div className="rounded-xl border border-border bg-card p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Today's Insights</h3>
        <div className="flex gap-1">
          {insights.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveInsight(idx)}
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-all',
                idx === activeInsight ? 'w-4 bg-primary' : 'bg-muted-foreground/30'
              )}
              aria-label={`Insight ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Insight Card */}
      <div
        className={cn(
          'relative overflow-hidden rounded-lg border border-border bg-gradient-to-br p-4 md:p-6 transition-all duration-300',
          `from-${current.color.split(' ')[1]} to-${current.color.split(' ')[3]}`
        )}
      >
        {/* Gradient Overlay */}
        <div
          className={cn(
            'absolute inset-0 opacity-10 transition-opacity',
            `bg-gradient-to-br ${current.color}`
          )}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-background/20 p-2 backdrop-blur-sm">
                {current.icon}
              </div>
              <h4 className="text-lg font-semibold leading-tight">{current.title}</h4>
            </div>

            {/* Type Badge */}
            <span className={cn(
              'text-xs font-semibold uppercase rounded px-2 py-1',
              {
                'bg-blue-500/20 text-blue-700 dark:text-blue-200': current.type === 'tip',
                'bg-amber-500/20 text-amber-700 dark:text-amber-200': current.type === 'reminder',
                'bg-emerald-500/20 text-emerald-700 dark:text-emerald-200': current.type === 'info',
                'bg-purple-500/20 text-purple-700 dark:text-purple-200': current.type === 'achievement',
              }
            )}>
              {current.type}
            </span>
          </div>

          <p className="mb-4 text-sm leading-relaxed">{current.description}</p>

          {current.action && (
            <button className="rounded-lg bg-background/40 px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-background/60 backdrop-blur-sm">
              {current.action}
            </button>
          )}
        </div>
      </div>

      {/* Navigation Hint */}
      <p className="mt-3 text-center text-xs text-muted-foreground">
        {insights.length > 1 && `${activeInsight + 1} of ${insights.length} insights`}
      </p>
    </div>
  )
}
