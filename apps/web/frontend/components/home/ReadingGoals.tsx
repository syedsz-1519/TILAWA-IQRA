'use client'

import { useEffect, useState } from 'react'
import { Target, CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Goal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  icon: string
  color: string
}

export function ReadingGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGoals = async () => {
      try {
        // Get data from localStorage
        const totalAyahRead = parseInt(localStorage.getItem('tilawa_total_ayah_read') || '0')
        const todayAyahRead = parseInt(localStorage.getItem('tilawa_today_ayah_read') || '0')
        const thisWeekAyahRead = parseInt(localStorage.getItem('tilawa_week_ayah_read') || '0')

        const goals: Goal[] = [
          {
            id: 'daily',
            title: 'Daily Reading',
            target: 10,
            current: todayAyahRead,
            unit: 'ayahs',
            icon: '📖',
            color: 'bg-blue-500',
          },
          {
            id: 'weekly',
            title: 'Weekly Target',
            target: 50,
            current: thisWeekAyahRead,
            unit: 'ayahs',
            icon: '📚',
            color: 'bg-emerald-500',
          },
          {
            id: 'milestone',
            title: 'XP Milestone',
            target: 1000,
            current: Math.min(parseInt(localStorage.getItem('tilawa_total_xp') || '0'), 1000),
            unit: 'XP',
            icon: '⭐',
            color: 'bg-amber-500',
          },
        ]

        setGoals(goals)
      } finally {
        setLoading(false)
      }
    }

    loadGoals()
  }, [])

  if (loading) {
    return <div className="h-32 animate-pulse rounded-lg bg-muted" />
  }

  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-4 md:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Target className="size-5 text-primary" />
        <h3 className="text-lg font-semibold">Today's Reading Goals</h3>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          const percentage = Math.min((goal.current / goal.target) * 100, 100)
          const isComplete = goal.current >= goal.target

          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{goal.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{goal.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {goal.current} / {goal.target} {goal.unit}
                    </p>
                  </div>
                </div>
                {isComplete ? (
                  <CheckCircle2 className="size-5 text-emerald-500" />
                ) : (
                  <Circle className="size-5 text-muted-foreground" />
                )}
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    'h-full transition-all duration-300',
                    isComplete ? 'bg-emerald-500' : 'bg-primary'
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 rounded-lg bg-background/50 p-3 text-center">
        <p className="text-xs text-muted-foreground">
          🎯 Complete all goals to earn a <span className="font-semibold text-primary">Golden Badge!</span>
        </p>
      </div>
    </div>
  )
}
