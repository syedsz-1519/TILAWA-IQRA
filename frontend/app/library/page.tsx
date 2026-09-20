'use client'

import { useState, useContext } from 'react'
import Link from 'next/link'
import { Search, BookOpen, Filter, Volume2, Globe } from 'lucide-react'
import { getAllSurahs, getQuranStats, Surah } from '@/lib/quran-data'
import { LanguageContext } from '@/lib/language-context'

export default function QuranLibraryPage() {
  const { currentLanguage } = useContext(LanguageContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [revelation, setRevelation] = useState<'all' | 'Meccan' | 'Medinan'>('all')
  const [sortBy, setSortBy] = useState<'number' | 'length'>('number')

  const surahs = getAllSurahs()
  const stats = getQuranStats()

  // Filter surahs
  let filtered = surahs
  if (revelation !== 'all') {
    filtered = filtered.filter((s) => s.revelation === revelation)
  }
  if (searchQuery) {
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nameArabic.includes(searchQuery) ||
        s.nameTransliteration.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Sort surahs
  if (sortBy === 'length') {
    filtered = [...filtered].sort((a, b) => b.totalAyahs - a.totalAyahs)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/2 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">📚</div>
            <div>
              <h1 className="text-3xl font-bold">Quran Library</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Complete Quranic text with translations in {currentLanguage.name}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-2xl font-bold">{stats.totalSurahs}</div>
              <div className="text-xs text-muted-foreground">Surahs</div>
            </div>
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-2xl font-bold">{stats.totalAyahs.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Ayahs</div>
            </div>
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-2xl font-bold">{stats.totalWords.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Words</div>
            </div>
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-2xl font-bold">{stats.juzCount}</div>
              <div className="text-xs text-muted-foreground">Juz (Parts)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="border-b border-border sticky top-0 z-30 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search Surah by name, Arabic, or transliteration..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Revelation:</span>
                <select
                  value={revelation}
                  onChange={(e) => setRevelation(e.target.value as any)}
                  className="rounded border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All</option>
                  <option value="Meccan">Meccan</option>
                  <option value="Medinan">Medinan</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="number">Surah Number</option>
                  <option value="length">Length (Longest First)</option>
                </select>
              </div>

              <div className="flex-1" />

              <div className="text-sm text-muted-foreground">
                Showing {filtered.length} of {surahs.length} Surahs
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Surahs Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((surah) => (
            <Link
              key={surah.number}
              href={`/library/${surah.number}?lang=${currentLanguage.code}`}
              className="group rounded-lg border border-border p-5 hover:border-primary hover:bg-primary/5 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-primary">{surah.number}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      surah.revelation === 'Meccan'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
                    }`}>
                      {surah.revelation}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {surah.name}
                  </h3>
                </div>
                <div className="text-2xl font-arabic text-right opacity-75 group-hover:opacity-100">
                  {surah.nameArabic}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {surah.description}
              </p>

              {/* Themes */}
              {surah.themes.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {surah.themes.slice(0, 2).map((theme, idx) => (
                    <span key={idx} className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                      {theme}
                    </span>
                  ))}
                  {surah.themes.length > 2 && (
                    <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                      +{surah.themes.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{surah.totalAyahs} Ayahs</span>
                <span>{surah.totalWords} Words</span>
              </div>

              {/* Arrow */}
              <div className="mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Read →
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="rounded-lg border border-border p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No Surahs found</p>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setRevelation('all')
                setSortBy('number')
              }}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
