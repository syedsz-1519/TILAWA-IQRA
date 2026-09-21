'use client'

import { useEffect, useState } from 'react'
import { Flame, Trophy, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StreakLevel {
  level: string
  threshold: number
  icon: string
  color: string
  title: string
  description: string
}

export function StudyStreakBadge({ currentStreak }: { currentStreak: number }) {
  const [streakLevel, setStreakLevel] = useState<StreakLevel | null>(null)
  const [nextMilestone, setNextMilestone] = useState(0)

  useEffect(() => {
    const levels: StreakLevel[] = [
      {
        level: 'beginner',
        threshold: 0,
        icon: '🌱',
        color: 'from-green-500 to-emerald-500',
        title: 'Getting Started',
        description: 'Welcome to your Quranic journey',
      },
      {
        level: 'active',
        threshold: 3,
        icon: '🔥',
        color: 'from-orange-500 to-red-500',
        title: 'On Fire!',
        description: 'Great momentum - keep it up',
      },
      {
        level: 'dedicated',
        threshold: 7,
        icon: '⚡',
        color: 'from-yellow-500 to-amber-500',
        title: 'Dedicated Reader',
        description: 'A week of consistent reading',
      },
      {
        level: 'committed',
        threshold: 30,
        icon: '💎',
        color: 'from-blue-500 to-purple-500',
        title: 'Committed Scholar',
        description: 'A month of dedication',
      },
      {
        level: 'master',
        threshold: 100,
        icon: '👑',
        color: 'from-purple-500 to-pink-500',
        title: 'Quranic Master',
        description: '100 days of excellence',
      },
    ]

    const currentLevel = levels.reduce((prev, level) => {
      return currentStreak >= level.threshold ? level : prev
    }, levels[0])

    setStreakLevel(currentLevel)

    // Calculate next milestone
    const nextLevel = levels.find((l) => l.threshold > currentStreak)
    setNextMilestone(nextLevel?.threshold || levels[levels.length - 1].threshold)
  }, [currentStreak])

  if (!streakLevel) return null

  const daysToNext = Math.max(0, nextMilestone - currentStreak)

  return (
    <div className={cn(
      'relative overflow-hidden rounded-xl border border-border bg-gradient-to-br p-6 shadow-lg',
      `${streakLevel.color}`
    )}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 size-40 rounded-full bg-white/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 size-40 rounded-full bg-white/20 blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase text-white/80">Your Achievement</p>
            <h2 className="text-3xl font-bold text-white">{streakLevel.title}</h2>
          </div>
          <div className="text-6xl drop-shadow-lg">{streakLevel.icon}</div>
        </div>

        <p className="mb-4 text-sm text-white/90">{streakLevel.description}</p>

        {/* Streak Stats */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Flame className="size-4 text-white" />
              <span className="text-xs font-semibold text-white/80">Current Streak</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-white">{currentStreak}</p>
            <p className="text-xs text-white/60">days in a row</p>
          </div>

          <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Trophy className="size-4 text-white" />
              <span className="text-xs font-semibold text-white/80">To Next Badge</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-white">{daysToNext}</p>
            <p className="text-xs text-white/60">days to go</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-white/80">
            <span>Progress to Next Milestone</span>
            <span>{Math.min(currentStreak, nextMilestone)} / {nextMilestone}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${Math.min((currentStreak / nextMilestone) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/10 p-3 text-sm text-white backdrop-blur-sm">
          <Sparkles className="size-4 shrink-0" />
          <p className="text-sm">
            {daysToNext === 0
              ? '🎉 You\'ve unlocked a new badge! Keep reading to reach the next level!'
              : `${daysToNext} more day${daysToNext === 1 ? '' : 's'} until your next achievement!`}
          </p>
        </div>
      </div>
    </div>
  )
}
