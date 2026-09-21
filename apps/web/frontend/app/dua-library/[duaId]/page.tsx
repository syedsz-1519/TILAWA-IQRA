'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Copy, Volume2, Bookmark, Share2, Check } from 'lucide-react'
import { getDuaById, getDuaTranslation, getDuaCategory } from '@/lib/dua-data'
import { useLanguage } from '@/lib/language-context'
import { useState } from 'react'

interface DuaDetailPageProps {
  params: {
    duaId: string
  }
}

export default function DuaDetailPage({ params }: DuaDetailPageProps) {
  const { duaId } = params
  const { currentLanguage } = useLanguage()
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)

  const dua = getDuaById(duaId)
  const category = dua ? getDuaCategory(dua.category) : undefined
  const translation = dua ? getDuaTranslation(dua.id, currentLanguage.code) : undefined

  if (!dua || !category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Dua not found</h1>
          <Link href="/dua-library" className="text-primary hover:underline">
            Back to Dua Library
          </Link>
        </div>
      </div>
    )
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(dua.arabicText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-4 md:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/dua-library"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-lg font-bold">{category.name}</h1>
              <p className="text-xs text-muted-foreground">{category.arabicName}</p>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        {/* Category & Timing Info */}
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-2xl">{category.icon}</span>
          <span className="text-sm font-medium text-muted-foreground">{category.name}</span>
          {dua.timing && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                {dua.timing}
              </span>
            </>
          )}
          {dua.source && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">Source: {dua.source}</span>
            </>
          )}
        </div>

        {/* Arabic Text - Large Display */}
        <div className="mb-8 p-8 rounded-lg border border-border bg-card">
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs font-medium text-muted-foreground">Arabic Text (Dua)</span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className={`p-2 rounded transition-colors ${
                  copied ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'hover:bg-muted'
                }`}
                title="Copy"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
              <button className="p-2 rounded hover:bg-muted transition-colors" title="Listen">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded transition-colors ${
                  bookmarked ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                }`}
                title="Bookmark"
              >
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-5xl font-arabic text-right leading-relaxed text-foreground">
            {dua.arabicText}
          </p>
        </div>

        {/* Transliteration */}
        <div className="mb-8 p-6 rounded-lg border border-border bg-muted/30">
          <h2 className="text-sm font-semibold text-muted-foreground mb-2">Transliteration</h2>
          <p className="text-sm italic font-mono text-foreground">{dua.transliteration}</p>
        </div>

        {/* Translation & Meaning */}
        {translation && (
          <div className="mb-8 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">
              Meaning ({currentLanguage.name})
            </h2>
            <p className="text-lg leading-relaxed text-foreground mb-4">{translation.meaning}</p>

            {translation.explanation && (
              <>
                <hr className="my-4 border-border" />
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Explanation</h3>
                <p className="text-sm text-foreground italic">{translation.explanation}</p>
              </>
            )}
          </div>
        )}

        {/* Benefits */}
        <div className="mb-8 p-6 rounded-lg border border-primary/20 bg-primary/5">
          <h2 className="text-lg font-semibold text-foreground mb-3">Benefits & Effects 🌟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dua.benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border">
                <span className="text-primary">✓</span>
                <span className="text-sm font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* When to Recite */}
        {dua.timing && (
          <div className="mb-8 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground mb-2">⏰ When to Recite</h2>
            <p className="text-sm text-foreground">{dua.timing}</p>
          </div>
        )}

        {/* Frequency Recommendation */}
        {dua.frequency && (
          <div className="mb-8 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground mb-2">📿 Recommended Frequency</h2>
            <p className="text-sm text-foreground">
              Recite <strong>{dua.frequency} time{dua.frequency > 1 ? 's' : ''}</strong> for maximum benefit
            </p>
          </div>
        )}

        {/* How to Use This Dua */}
        <div className="mb-8 p-6 rounded-lg border border-border bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-3">💡 How to Use</h2>
          <ol className="space-y-2 text-sm text-foreground list-decimal list-inside">
            <li>Find a quiet place and perform ablution (Wudu)</li>
            <li>Face the Qibla (direction of Kaaba)</li>
            <li>Raise your hands in supplication</li>
            <li>Recite the dua with sincerity and concentration</li>
            <li>Have full faith in Allah's mercy and response</li>
          </ol>
        </div>

        {/* Islamic Teaching */}
        <div className="mb-8 p-6 rounded-lg border border-border bg-muted/30">
          <h2 className="text-lg font-semibold text-foreground mb-2">📖 Islamic Teaching</h2>
          <p className="text-sm text-foreground italic">
            "And when My servants ask you, (O Muhammad), concerning Me - indeed I am near. I respond to the
            invocation of the supplicant when he calls upon Me. So let them respond to Me (by obedience) and believe
            in Me that they may be (rightly) guided." - Quran 2:186
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <Link
            href="/dua-library"
            className="flex-1 rounded-lg border border-border px-6 py-3 text-center font-medium hover:bg-muted transition-colors"
          >
            ← Back to Duas
          </Link>
          <button className="flex-1 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Bookmark className="h-5 w-5" />
            {bookmarked ? 'Bookmarked' : 'Save to Collection'}
          </button>
          <button className="rounded-lg border border-border px-4 py-3 text-center font-medium hover:bg-muted transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
