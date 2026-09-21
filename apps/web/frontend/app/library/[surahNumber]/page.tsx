'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, Volume2, Bookmark, Share2, Download } from 'lucide-react'
import { getSurah, getTranslation, RECITERS } from '@/lib/quran-data'
import { useLanguage } from '@/lib/language-context'
import { LANGUAGES } from '@/lib/languages'

interface SurahPageProps {
  params: {
    surahNumber: string
  }
}

export default function SurahPage({ params }: SurahPageProps) {
  const { surahNumber } = params
  const searchParams = useSearchParams()
  const { currentLanguage } = useLanguage()

  const surah = getSurah(parseInt(surahNumber))
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0]?.id || 'abdul-basit')
  const [showTranslation, setShowTranslation] = useState(true)
  const [showTransliteration, setShowTransliteration] = useState(true)
  const [fontSize, setFontSize] = useState('lg')
  const [bookmarked, setBookmarked] = useState(false)

  if (!surah) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Surah not found</h1>
          <Link href="/library" className="text-primary hover:underline">
            Back to Library
          </Link>
        </div>
      </div>
    )
  }

  const nextSurah = surah.number < 114 ? surah.number + 1 : null
  const prevSurah = surah.number > 1 ? surah.number - 1 : null

  const fontSizeMap = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  }

  const fontSizeMapArabic = {
    sm: 'text-2xl',
    base: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
    '2xl': 'text-6xl',
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-4 md:px-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/library"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold">{surah.name}</h1>
              <p className="text-sm text-muted-foreground">{surah.revelation}</p>
            </div>
            <div className="w-10" />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2 text-sm">
            <select
              value={selectedReciter}
              onChange={(e) => setSelectedReciter(e.target.value)}
              className="rounded border border-border bg-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {RECITERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`px-2 py-1 rounded border transition-colors ${
                showTranslation
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
            >
              Translation
            </button>

            <button
              onClick={() => setShowTransliteration(!showTransliteration)}
              className={`px-2 py-1 rounded border transition-colors ${
                showTransliteration
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
            >
              Transliteration
            </button>

            <div className="flex-1" />

            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="rounded border border-border bg-background px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="sm">Size: Small</option>
              <option value="base">Size: Normal</option>
              <option value="lg">Size: Large</option>
              <option value="xl">Size: XL</option>
              <option value="2xl">Size: 2XL</option>
            </select>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded border transition-colors ${
                bookmarked
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        {/* Surah Info */}
        <div className="mb-8 p-6 rounded-lg border border-border bg-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Revelation</div>
              <div className="font-semibold">{surah.revelation}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Ayahs</div>
              <div className="font-semibold">{surah.totalAyahs}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Words</div>
              <div className="font-semibold">{surah.totalWords}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Letters</div>
              <div className="font-semibold">{surah.totalLetters}</div>
            </div>
          </div>

          {surah.themes.length > 0 && (
            <>
              <hr className="my-4 border-border" />
              <div>
                <div className="text-sm text-muted-foreground mb-2">Main Themes</div>
                <div className="flex flex-wrap gap-2">
                  {surah.themes.map((theme, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-sm">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {surah.description && (
            <>
              <hr className="my-4 border-border" />
              <div>
                <div className="text-sm text-muted-foreground mb-2">Description</div>
                <p className="text-sm leading-relaxed">{surah.description}</p>
              </div>
            </>
          )}
        </div>

        {/* Ayahs Section */}
        <div className="space-y-6 mb-8">
          {Array.from({ length: surah.totalAyahs }, (_, i) => i + 1).map((ayahNum) => (
            <div key={ayahNum} className="rounded-lg border border-border p-6 bg-card hover:border-primary/50 transition-colors">
              {/* Ayah Header */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                  {surah.number}:{ayahNum}
                </span>
                {selectedReciter && (
                  <button className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-border hover:bg-muted transition-colors">
                    <Volume2 className="h-3 w-3" />
                    Play
                  </button>
                )}
              </div>

              {/* Arabic Text */}
              <p className={`text-right leading-relaxed font-arabic mb-4 ${fontSizeMapArabic[fontSize as keyof typeof fontSizeMapArabic]}`}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ {/* Sample Arabic - in production, load from database */}
              </p>

              {/* Transliteration */}
              {showTransliteration && (
                <p className="text-sm italic text-muted-foreground mb-4 font-mono">
                  Bismillahir-rahmanir-rahim {/* Sample transliteration */}
                </p>
              )}

              {/* Translation */}
              {showTranslation && (
                <div className={`bg-muted/50 rounded p-3 ${fontSizeMap[fontSize as keyof typeof fontSizeMap]}`}>
                  <p>
                    In the name of Allah, the Most Gracious, the Most Merciful {/* Sample translation */}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Translated to: {currentLanguage.name}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          {prevSurah ? (
            <Link
              href={`/library/${prevSurah}`}
              className="flex-1 rounded-lg border border-border px-6 py-3 text-center font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous Surah
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          <Link
            href="/library"
            className="px-6 py-3 rounded-lg border border-border font-medium hover:bg-muted transition-colors"
          >
            Library
          </Link>

          {nextSurah ? (
            <Link
              href={`/library/${nextSurah}`}
              className="flex-1 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-center font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Next Surah
              <ChevronRight className="h-5 w-5" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </div>
  )
}
