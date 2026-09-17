'use client'

import { useState } from 'react'
import { Brain, BookOpen } from 'lucide-react'
import { TajweedLearnTab } from '@/components/tajweed/TajweedLearnTab'
import { TajweedPracticeTab } from '@/components/tajweed/TajweedPracticeTab'

export default function TajweedPage() {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn')

  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex items-center gap-3">
            <Brain className="size-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Tajweed Rules</h1>
              <p className="text-sm text-muted-foreground">Master the rules of Quranic recitation</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-6xl border-t border-border px-4">
          <div className="flex gap-2 py-2 md:gap-4">
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all ${
                activeTab === 'learn'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="size-4" />
              Learn
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all ${
                activeTab === 'practice'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Brain className="size-4" />
              Practice
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {activeTab === 'learn' && <TajweedLearnTab />}
        {activeTab === 'practice' && <TajweedPracticeTab />}
      </div>
    </main>
  )
}
