'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getHifzDecks, getHifzStats, getDifficultyColor, HIFZ_DECKS } from '@/lib/hifz-data'
import { Flame, BookOpen, Target, Trophy, Play, Plus } from 'lucide-react'

export default function HifzStudioPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced' | 'master'>('all')

  const decks = getHifzDecks()

  // Filter by difficulty
  let filtered = decks
  if (selectedDifficulty !== 'all') {
    filtered = filtered.filter((d) => d.difficulty === selectedDifficulty)
  }

  // Mock progress data for stats
  const mockProgress = {
    totalCards: 145,
    masteredCards: 32,
    learningCards: 28,
    newCards: 85,
    streak: 7,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/2 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">📇</div>
            <div>
              <h1 className="text-3xl font-bold">Hifz Card Studio</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Spaced repetition flashcard system for Quranic memorization
              </p>
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="rounded-lg bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-xs text-muted-foreground">Streak</span>
              </div>
              <div className="text-2xl font-bold">{mockProgress.streak}</div>
              <div className="text-xs text-muted-foreground">days</div>
            </div>

            <div className="rounded-lg bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-900/30 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-600">Mastered</span>
              </div>
              <div className="text-2xl font-bold text-green-700">{mockProgress.masteredCards}</div>
            </div>

            <div className="rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/30 p-4">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span className="text-xs text-blue-600">Learning</span>
              </div>
              <div className="text-2xl font-bold text-blue-700">{mockProgress.learningCards}</div>
            </div>

            <div className="rounded-lg bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">New</span>
              </div>
              <div className="text-2xl font-bold">{mockProgress.newCards}</div>
            </div>

            <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-xs text-primary">Total</span>
              </div>
              <div className="text-2xl font-bold text-primary">{mockProgress.totalCards}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Filter:</span>
            <div className="flex gap-2">
              {(['all', 'beginner', 'intermediate', 'advanced', 'master'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    selectedDifficulty === diff
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border hover:bg-muted'
                  }`}
                >
                  {diff === 'all' && 'All Levels'}
                  {diff === 'beginner' && '⭐ Beginner'}
                  {diff === 'intermediate' && '📚 Intermediate'}
                  {diff === 'advanced' && '🎓 Advanced'}
                  {diff === 'master' && '👑 Master'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <h2 className="text-2xl font-bold mb-6">Available Memorization Decks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((deck) => (
            <div
              key={deck.id}
              className="group rounded-lg border border-border p-6 hover:border-primary hover:bg-primary/5 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-2xl mb-2">{deck.icon}</div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {deck.name}
                  </h3>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
                    deck.difficulty
                  )}`}
                >
                  {deck.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{deck.description}</p>

              {/* Stats */}
              <div className="space-y-2 mb-4 p-3 rounded-lg bg-muted/50">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Cards:</span>
                  <span className="font-semibold">{deck.totalCards}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Est. Time:</span>
                  <span className="font-semibold">{deck.estimatedTime}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Surahs:</span>
                  <span className="font-semibold">{deck.surahRange[0]}-{deck.surahRange[1]}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link
                  href={`/hifz-studio/${deck.id}`}
                  className="flex-1 rounded-lg border border-primary bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Study
                </Link>
                <button className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="rounded-lg border border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">No decks found at this difficulty level</p>
            <button
              onClick={() => setSelectedDifficulty('all')}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Show All Decks
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 p-6 rounded-lg border border-border bg-muted/30">
          <h3 className="text-lg font-semibold mb-3">💡 How the Spaced Repetition System Works</h3>
          <div className="space-y-2 text-sm text-foreground">
            <p>
              • <strong>New Cards:</strong> Cards you haven't studied yet
            </p>
            <p>
              • <strong>Learning:</strong> Cards you're actively learning through repetition
            </p>
            <p>
              • <strong>Review:</strong> Cards you've learned, coming up for periodic review
            </p>
            <p>
              • <strong>Mastered:</strong> Cards you've memorized and can recall instantly
            </p>
            <p>
              The system uses the SM-2 algorithm to optimize review intervals, ensuring you review cards
              right before you're about to forget them.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
