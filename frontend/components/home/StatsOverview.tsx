'use client'

import { useEffect, useState } from 'react'
import { Flame, BookOpen, Zap, Calendar } from 'lucide-react'
import { useStreaks } from '@/hooks/use-streaks'
import { cn } from '@/lib/utils'

interface StatsData {
  currentStreak: number
  totalXP: number
  totalAyahRead: number
  daysActive: number
}

export function StatsOverview({ userId }: { userId?: string }) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const { currentStreak, totalXP } = useStreaks(userId || null)

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Get reading stats from localStorage
        const totalAyahRead = parseInt(localStorage.getItem('tilawa_total_ayah_read') || '0')
        const firstReadDate = localStorage.getItem('tilawa_first_read_date')
        const daysActive = firstReadDate
          ? Math.floor((Date.now() - new Date(firstReadDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
          : 0

        setStats({
          currentStreak: currentStreak || 0,
          totalXP: totalXP || 0,
          totalAyahRead,
          daysActive: Math.max(daysActive, 0),
        })
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [currentStreak, totalXP])

  if (loading || !stats) {
    return <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  }

  const statItems = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: stats.currentStreak,
      unit: 'days',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      icon: Zap,
      label: 'Total XP',
      value: stats.totalXP,
      unit: 'points',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
    {
      icon: BookOpen,
      label: 'Ayah Read',
      value: stats.totalAyahRead,
      unit: 'ayahs',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: Calendar,
      label: 'Active Days',
      value: stats.daysActive,
      unit: 'days',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {statItems.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <div
            key={idx}
            className={cn(
              'rounded-lg border border-border p-3 transition-all duration-200 hover:border-primary/50 hover:shadow-sm md:p-4',
              stat.bg
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-muted-foreground md:text-sm">
                {stat.label}
              </span>
              <Icon className={cn('size-4 md:size-5', stat.color)} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold md:text-3xl">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.unit}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
