'use client'

import { useState, useContext } from 'react'
import Link from 'next/link'
import { Search, BookOpen, Filter } from 'lucide-react'
import { getHadithCollections, getHadithStats, HADITH_TOPICS } from '@/lib/hadith-data'
import { LanguageContext } from '@/lib/language-context'

export default function HadithLibraryPage() {
  const { currentLanguage } = useContext(LanguageContext)
  const [activeTab, setActiveTab] = useState<'collections' | 'topics' | 'search'>('collections')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState<'all' | 'Sahih' | 'Hasan' | 'Daif'>('all')

  const collections = getHadithCollections()
  const stats = getHadithStats()

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Sahih':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30'
      case 'Hasan':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
      case 'Daif':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/2 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">📖</div>
            <div>
              <h1 className="text-3xl font-bold">Hadith Library</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Authentic Hadiths from 6 major collections with translations in {currentLanguage.name}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-2xl font-bold">{stats.totalHadiths.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Hadiths</div>
            </div>
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-2xl font-bold">{stats.totalCollections}</div>
              <div className="text-xs text-muted-foreground">Collections</div>
            </div>
            <div className="rounded-lg bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-900/30 p-3">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                {stats.sahihHadiths}
              </div>
              <div className="text-xs text-green-600 dark:text-green-300">Sahih</div>
            </div>
            <div className="rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/30 p-3">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {stats.hasanHadiths}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-300">Hasan</div>
            </div>
            <div className="rounded-lg bg-yellow-50 border border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900/30 p-3">
              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                {stats.daifHadiths}
              </div>
              <div className="text-xs text-yellow-600 dark:text-yellow-300">Daif</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border sticky top-0 z-30 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex gap-4">
            {(['collections', 'topics', 'search'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'collections' && 'Collections'}
                {tab === 'topics' && 'By Topic'}
                {tab === 'search' && 'Search'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Collections Tab */}
        {activeTab === 'collections' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Hadith Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/hadith-library/${collection.id}`}
                  className="group rounded-lg border border-border p-6 hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{collection.icon}</div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        collection.verified ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : ''
                      }`}
                    >
                      Verified
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-sm font-arabic text-muted-foreground mb-2">{collection.arabicName}</p>
                  <p className="text-xs text-muted-foreground mb-3">By: {collection.author}</p>
                  <p className="text-sm text-foreground mb-4 line-clamp-2">{collection.description}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{collection.totalHadiths.toLocaleString()} Hadiths</span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Topics Tab */}
        {activeTab === 'topics' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Browse by Topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {HADITH_TOPICS.map((topic) => (
                <Link
                  key={topic}
                  href={`/hadith-library/topic/${topic.replace(/\s+/g, '-').toLowerCase()}`}
                  className="rounded-lg border border-border p-4 hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium group-hover:text-primary transition-colors">{topic}</span>
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Search Hadiths</h2>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by keyword, topic, or narrator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {(['all', 'Sahih', 'Hasan', 'Daif'] as const).map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedGrade === grade
                        ? `${getGradeColor(grade === 'all' ? 'Sahih' : grade)}`
                        : 'border border-border hover:bg-muted'
                    }`}
                  >
                    {grade === 'all' ? 'All Grades' : grade}
                  </button>
                ))}
              </div>

              {searchQuery ? (
                <div className="mt-6 space-y-4">
                  <p className="text-sm text-muted-foreground">Searching for "{searchQuery}"...</p>
                  {/* Search results would go here */}
                  <div className="rounded-lg border border-dashed border-border p-8 text-center">
                    <p className="text-muted-foreground">Results will appear here</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-8 text-center mt-6">
                  <p className="text-muted-foreground">Enter a search query to find hadiths</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
