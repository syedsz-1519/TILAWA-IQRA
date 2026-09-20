'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Volume2, BookOpen, AlertCircle } from 'lucide-react'
import { getTajweedRule, getTajweedCategories } from '@/lib/tajweed'

interface RuleDetailPageProps {
  params: {
    category: string
    ruleId: string
  }
}

export default function RuleDetailPage({ params }: RuleDetailPageProps) {
  const { ruleId } = params
  const rule = getTajweedRule(ruleId)
  const [selectedExample, setSelectedExample] = useState(0)

  if (!rule) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Rule not found</h1>
          <Link href="/iqra" className="text-primary hover:underline">
            Back to IQRA Mode
          </Link>
        </div>
      </div>
    )
  }

  const categories = getTajweedCategories()
  const categoryName = categories.find((c) => c.id === rule.category)?.name

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-transparent sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/iqra"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{rule.name}</h1>
              <p className="text-sm text-muted-foreground">{categoryName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        {/* Rule Overview */}
        <section className="mb-8">
          <div className="rounded-lg border border-border p-6 bg-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">{rule.name}</h2>
                <p className="text-3xl text-primary font-arabic">{rule.nameArabic}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                rule.difficulty === 'beginner'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30'
                  : rule.difficulty === 'intermediate'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30'
              }`}>
                {rule.difficulty.charAt(0).toUpperCase() + rule.difficulty.slice(1)}
              </span>
            </div>
            <p className="text-lg text-foreground mb-2">{rule.description}</p>
            <p className="text-muted-foreground italic">{rule.descriptionArabic}</p>
          </div>
        </section>

        {/* Rules */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Key Rules</h2>
          <div className="space-y-3">
            {rule.rules.map((r, idx) => (
              <div key={idx} className="flex gap-3 rounded-lg border border-border p-4 bg-card">
                <div className="text-xl font-bold text-primary min-w-fit">{idx + 1}.</div>
                <p className="text-foreground">{r}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Exceptions */}
        {rule.exceptions.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Exceptions</h2>
            <div className="space-y-3">
              {rule.exceptions.map((exc, idx) => (
                <div key={idx} className="flex gap-3 rounded-lg border border-yellow-200 bg-yellow-50/50 p-4 dark:border-yellow-900/30 dark:bg-yellow-950/20">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5 dark:text-yellow-500" />
                  <p className="text-foreground">{exc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Examples */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Examples ({rule.examples.length})</h2>

          <div className="space-y-6">
            {rule.examples.map((example, idx) => (
              <div
                key={idx}
                className={`rounded-lg border p-6 cursor-pointer transition-all ${
                  selectedExample === idx
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedExample(idx)}
              >
                {/* Ayah Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    {example.surah} {example.ayah}
                  </span>
                  {example.audioUrl && (
                    <button className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      <Volume2 className="h-4 w-4" />
                      Listen
                    </button>
                  )}
                </div>

                {/* Arabic Text */}
                <p className="text-4xl font-arabic text-primary mb-4 leading-loose">
                  {example.arabicText}
                </p>

                {/* Transliteration */}
                <p className="text-lg text-foreground mb-2 italic font-mono">
                  {example.transliteration}
                </p>

                {/* Explanation */}
                {selectedExample === idx && (
                  <div className="mt-4 p-4 rounded-lg bg-muted">
                    <p className="text-sm font-medium text-foreground">{example.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Visual Guide */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Visual Guide</h2>
          <div className="rounded-lg border border-border p-6 bg-card font-mono text-sm whitespace-pre-wrap overflow-x-auto">
            <code className="text-foreground">{rule.visualGuide}</code>
          </div>
        </section>

        {/* Mnemonic Device */}
        {rule.mnemonicDevice && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Mnemonic Device</h2>
            <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-6">
              <p className="text-lg font-semibold text-primary italic">"{rule.mnemonicDevice}"</p>
            </div>
          </section>
        )}

        {/* Common Mistakes */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Common Mistakes</h2>
          <div className="space-y-3">
            {rule.commonMistakes.map((mistake, idx) => (
              <div key={idx} className="flex gap-3 rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-900/30 dark:bg-red-950/20">
                <div className="text-lg font-bold text-red-600 flex-shrink-0 dark:text-red-400">✗</div>
                <p className="text-foreground">{mistake}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <section className="flex gap-4 mt-12">
          <Link
            href="/iqra"
            className="flex-1 rounded-lg border border-border px-6 py-3 text-center font-medium hover:bg-muted transition-colors"
          >
            Back to Rules
          </Link>
          <button className="flex-1 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors">
            Mark as Mastered
          </button>
        </section>
      </div>
    </div>
  )
}
