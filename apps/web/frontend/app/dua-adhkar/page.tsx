'use client'

import { useState, useEffect } from 'react'
import { Heart, Plus, Minus, RotateCcw } from 'lucide-react'
import adhkarData from '@/data/adhkar.json'

interface DhikrProgress {
  id: string
  count: number
  targetCount: number
}

export default function DuaAdhkarPage() {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening' | 'general'>('morning')
  const [progress, setProgress] = useState<Map<string, DhikrProgress>>(new Map())

  // Load progress on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const savedDate = localStorage.getItem('tilawa_adhkar_date')
    const savedProgress = localStorage.getItem('tilawa_adhkar_progress')

    if (savedDate === today && savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress)
        setProgress(new Map(Object.entries(parsed)))
      } catch {
        initializeProgress()
      }
    } else {
      initializeProgress()
    }
  }, [])

  const initializeProgress = () => {
    const newProgress = new Map<string, DhikrProgress>()

    // Initialize all dhikrs with count=0
    adhkarData.morning.forEach((d) => {
      newProgress.set(d.id, { id: d.id, count: 0, targetCount: d.repeat })
    })

    adhkarData.evening.forEach((d) => {
      newProgress.set(d.id, { id: d.id, count: 0, targetCount: d.repeat })
    })

    adhkarData.general.forEach((category) => {
      category.items.forEach((d) => {
        newProgress.set(d.id, { id: d.id, count: 0, targetCount: d.repeat })
      })
    })

    setProgress(newProgress)
    saveProgress(newProgress)
  }

  const saveProgress = (prog: Map<string, DhikrProgress>) => {
    const today = new Date().toISOString().split('T')[0]
    const obj = Object.fromEntries(prog)
    localStorage.setItem('tilawa_adhkar_progress', JSON.stringify(obj))
    localStorage.setItem('tilawa_adhkar_date', today)
  }

  const incrementCount = (id: string) => {
    const current = progress.get(id)
    if (!current) return

    const updated = { ...current, count: Math.min(current.count + 1, current.targetCount) }
    const newProgress = new Map(progress)
    newProgress.set(id, updated)
    setProgress(newProgress)
    saveProgress(newProgress)
  }

  const decrementCount = (id: string) => {
    const current = progress.get(id)
    if (!current) return

    const updated = { ...current, count: Math.max(current.count - 1, 0) }
    const newProgress = new Map(progress)
    newProgress.set(id, updated)
    setProgress(newProgress)
    saveProgress(newProgress)
  }

  const resetToday = () => {
    initializeProgress()
  }

  const renderDhikrCard = (dhikr: any) => {
    const prog = progress.get(dhikr.id)
    const isComplete = prog && prog.count >= prog.targetCount
    const percentage = prog ? (prog.count / prog.targetCount) * 100 : 0

    return (
      <div key={dhikr.id} className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md">
        {/* Content */}
        <div className="mb-4">
          <p lang="ar" dir="rtl" className="mb-3 text-2xl leading-relaxed text-foreground font-serif">
            {dhikr.arabic}
          </p>
          <p className="mb-2 text-sm font-semibold text-muted-foreground">
            {dhikr.transliteration}
          </p>
          <p className="text-sm leading-relaxed text-foreground">
            {dhikr.translation}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {dhikr.category_ar || dhikr.category}
            </span>
            <span className={`text-xs font-bold ${isComplete ? 'text-green-600' : 'text-amber-600'}`}>
              {prog?.count || 0} / {dhikr.repeat}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full transition-all ${isComplete ? 'bg-green-500' : 'bg-primary'}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => decrementCount(dhikr.id)}
            disabled={(prog?.count || 0) === 0}
            className="flex items-center justify-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted disabled:opacity-50"
          >
            <Minus className="size-4" />
          </button>

          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-primary">{prog?.count || 0}</p>
          </div>

          <button
            onClick={() => incrementCount(dhikr.id)}
            disabled={isComplete}
            className="flex items-center justify-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted disabled:opacity-50"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center gap-3">
            <Heart className="size-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dua & Adhkar</h1>
              <p className="text-sm text-muted-foreground">Supplications and remembrance of Allah</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-4xl border-t border-border px-4">
          <div className="flex gap-2 py-2 md:gap-4">
            <button
              onClick={() => setActiveTab('morning')}
              className={`px-4 py-3 font-semibold transition-all ${
                activeTab === 'morning'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Morning
            </button>
            <button
              onClick={() => setActiveTab('evening')}
              className={`px-4 py-3 font-semibold transition-all ${
                activeTab === 'evening'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Evening
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-3 font-semibold transition-all ${
                activeTab === 'general'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              General
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Reset Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={resetToday}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
          >
            <RotateCcw className="size-4" />
            Reset Today
          </button>
        </div>

        {/* Dhikrs Grid */}
        <div className="space-y-4">
          {activeTab === 'morning' &&
            adhkarData.morning.map((dhikr) => renderDhikrCard(dhikr))}

          {activeTab === 'evening' &&
            adhkarData.evening.map((dhikr) => renderDhikrCard(dhikr))}

          {activeTab === 'general' &&
            adhkarData.general.map((category) => (
              <div key={category.category} className="space-y-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {category.category_ar} · {category.category}
                </h2>
                <div className="space-y-4">
                  {category.items.map((item) => renderDhikrCard(item))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
