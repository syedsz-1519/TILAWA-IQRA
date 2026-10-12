'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Tip {
  id: string
  title: string
  description: string
  category: string
  emoji: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export function StudyTipsCarousel() {
  const [tips, setTips] = useState<Tip[]>([])
  const [currentTip, setCurrentTip] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    const tipsData: Tip[] = [
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
        description: 'Aim for 5-10 ayahs daily. Consistency beats speed in Quranic learning.',
        category: 'Planning',
        difficulty: 'beginner',
      },
    ]

    setTips(tipsData)
  }, [])

  useEffect(() => {
    if (!autoPlay || tips.length === 0) return

    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay, tips.length])

  if (tips.length === 0) return null

  const tip = tips[currentTip]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'from-emerald-500 to-teal-500'
      case 'intermediate':
        return 'from-amber-500 to-orange-500'
      case 'advanced':
        return 'from-purple-500 to-pink-500'
      default:
        return 'from-blue-500 to-cyan-500'
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-5 text-primary" />
          <h3 className="text-lg font-semibold">Study Tips</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {currentTip + 1} / {tips.length}
        </span>
      </div>

      {/* Tip Card */}
      <div
        className={cn(
          'relative overflow-hidden rounded-lg border border-border bg-gradient-to-br p-6 transition-all duration-300 md:min-h-48',
          `from-${getDifficultyColor(tip.difficulty).split(' ')[1]} to-${getDifficultyColor(tip.difficulty).split(' ')[3]}`
        )}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        {/* Gradient Overlay */}
        <div
          className={cn(
            'absolute inset-0 opacity-10',
            `bg-gradient-to-br ${getDifficultyColor(tip.difficulty)}`
          )}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-4 flex items-start justify-between">
            <span className="text-4xl">{tip.emoji}</span>
            <div className="flex flex-col items-end gap-2">
              <span className={cn(
                'text-xs font-semibold uppercase rounded px-2 py-1',
                {
                  'bg-emerald-500/20 text-emerald-700 dark:text-emerald-200': tip.difficulty === 'beginner',
                  'bg-amber-500/20 text-amber-700 dark:text-amber-200': tip.difficulty === 'intermediate',
                  'bg-purple-500/20 text-purple-700 dark:text-purple-200': tip.difficulty === 'advanced',
                }
              )}>
                {tip.difficulty}
              </span>
              <span className="text-xs font-medium text-background/70">{tip.category}</span>
            </div>
          </div>

          <h4 className="mb-2 text-xl font-bold text-background">{tip.title}</h4>
          <p className="text-sm leading-relaxed text-background/90">{tip.description}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          onClick={() => setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length)}
          className="rounded-lg border border-border bg-card p-2 transition-colors hover:bg-muted"
          aria-label="Previous tip"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Dots */}
        <div className="flex gap-1">
          {tips.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTip(idx)}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                idx === currentTip ? 'w-6 bg-primary' : 'bg-muted-foreground/30'
              )}
              aria-label={`Go to tip ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentTip((prev) => (prev + 1) % tips.length)}
          className="rounded-lg border border-border bg-card p-2 transition-colors hover:bg-muted"
          aria-label="Next tip"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Tap to pause auto-play
      </p>
    </div>
  )
}
