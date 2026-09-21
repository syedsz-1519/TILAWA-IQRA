'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Volume2, Zap } from 'lucide-react'
import { getTajweedCategories, getAllTajweedRules, Difficulty } from '@/lib/tajweed'

export default function IQRAPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all')
  const categories = getTajweedCategories()
  const allRules = getAllTajweedRules()

  // Filter rules by difficulty
  const filteredRules =
    selectedDifficulty === 'all'
      ? allRules
      : allRules.filter((rule) => rule.difficulty === selectedDifficulty)

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-700 border-green-200'
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200'
      case 'advanced':
        return 'bg-red-500/10 text-red-700 border-red-200'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl">📖</div>
            <div>
              <h1 className="text-3xl font-bold">IQRA Mode</h1>
              <p className="text-muted-foreground text-sm mt-1">Learn Tajweed & Proper Quran Recitation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {/* Tajweed Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tajweed Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/iqra/tajweed/${category.id}`}
                className="group rounded-lg border border-border p-4 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                <div className="mt-3 text-xs font-medium text-primary">
                  {allRules.filter((r) => r.category === category.id).length} Rules →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Difficulty Filter */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Tajweed Rules</h2>
            <div className="flex gap-2">
              {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDifficulty === diff
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border hover:bg-muted'
                  }`}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Rules List */}
          <div className="space-y-4">
            {filteredRules.map((rule) => (
              <Link
                key={rule.id}
                href={`/iqra/tajweed/${rule.category}/${rule.id}`}
                className="group rounded-lg border border-border p-5 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {rule.name}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(rule.difficulty)}`}>
                        {rule.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{rule.examples.length} Examples</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Volume2 className="h-3 w-3" />
                        Audio Guide
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl ml-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    {rule.nameArabic}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
