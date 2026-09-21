'use client'

import { useEffect, useState } from 'react'
import { Award, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  unlocked: boolean
  unlockedAt?: string
  requirement: string
}

export function AchievementsBadges({ currentStreak, totalXP }: { currentStreak: number; totalXP: number }) {
  const [badges, setBadges] = useState<Badge[]>([])

  useEffect(() => {
    const generateBadges = (): Badge[] => {
      return [
        {
          id: 'first-read',
          name: 'First Step',
          description: 'Read your first ayah',
          icon: '📖',
          color: 'from-blue-500 to-cyan-500',
          unlocked: totalXP > 0,
          requirement: 'Read 1 ayah',
        },
        {
          id: '3-day-streak',
          name: 'On Fire',
          description: 'Maintain 3-day streak',
          icon: '🔥',
          color: 'from-orange-500 to-red-500',
          unlocked: currentStreak >= 3,
          requirement: '3 day streak',
        },
        {
          id: '7-day-streak',
          name: 'Week Warrior',
          description: 'Maintain 7-day streak',
          icon: '⚡',
          color: 'from-yellow-500 to-amber-500',
          unlocked: currentStreak >= 7,
          requirement: '7 day streak',
        },
        {
          id: '30-day-streak',
          name: 'Month Master',
          description: 'Maintain 30-day streak',
          icon: '💎',
          color: 'from-blue-500 to-purple-500',
          unlocked: currentStreak >= 30,
          requirement: '30 day streak',
        },
        {
          id: '100xp',
          name: 'XP Collector',
          description: 'Earn 100 XP points',
          icon: '💰',
          color: 'from-emerald-500 to-teal-500',
          unlocked: totalXP >= 100,
          requirement: '100 XP earned',
        },
        {
          id: '500xp',
          name: 'XP Master',
          description: 'Earn 500 XP points',
          icon: '🏆',
          color: 'from-purple-500 to-pink-500',
          unlocked: totalXP >= 500,
          requirement: '500 XP earned',
        },
        {
          id: '100-day-streak',
          name: 'Quranic Legend',
          description: 'Maintain 100-day streak',
          icon: '👑',
          color: 'from-gold to-yellow-600',
          unlocked: currentStreak >= 100,
          requirement: '100 day streak',
        },
      ]
    }

    setBadges(generateBadges())
  }, [currentStreak, totalXP])

  const unlockedCount = badges.filter((b) => b.unlocked).length
  const totalCount = badges.length

  return (
    <div className="rounded-xl border border-border bg-card p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="size-5 text-primary" />
          <h3 className="text-lg font-semibold">Achievements</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{unlockedCount}</p>
          <p className="text-xs text-muted-foreground">of {totalCount} badges</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 space-y-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {totalCount - unlockedCount} badge{totalCount - unlockedCount === 1 ? '' : 's'} remaining
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-4 gap-2 md:gap-3 lg:grid-cols-7">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="group relative"
            title={badge.unlocked ? `${badge.name}: ${badge.description}` : `Locked: ${badge.requirement}`}
          >
            <div
              className={cn(
                'relative flex flex-col items-center gap-2 rounded-lg border p-2 transition-all duration-300 md:p-3',
                badge.unlocked
                  ? `border-${badge.color.split('-')[1]}-500/50 bg-gradient-to-br ${badge.color} bg-opacity-10`
                  : 'border-muted bg-muted/50'
              )}
            >
              {/* Badge Icon */}
              <div className={cn(
                'text-2xl transition-transform group-hover:scale-110 md:text-3xl',
                !badge.unlocked && 'opacity-30 grayscale'
              )}>
                {badge.icon}
              </div>

              {/* Lock Icon for Locked Badges */}
              {!badge.unlocked && (
                <Lock className="absolute top-1 right-1 size-3 text-muted-foreground" />
              )}

              {/* Badge Name */}
              <p className={cn(
                'text-center text-xs font-semibold leading-tight',
                badge.unlocked ? 'text-foreground' : 'text-muted-foreground'
              )}>
                {badge.name}
              </p>
            </div>

            {/* Hover Tooltip */}
            <div className="invisible absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 z-10">
              {badge.unlocked ? badge.description : badge.requirement}
            </div>
          </div>
        ))}
      </div>

      {/* Motivation */}
      <div className="mt-6 rounded-lg border border-border/50 bg-primary/5 p-3 text-center">
        <p className="text-sm font-semibold text-primary">
          {unlockedCount === totalCount
            ? '🎉 Congratulations! You\'ve unlocked all badges!'
            : `${totalCount - unlockedCount} more badge${totalCount - unlockedCount === 1 ? '' : 's'} to collect!`}
        </p>
      </div>
    </div>
  )
}
