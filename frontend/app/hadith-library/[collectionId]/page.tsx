'use client'

import { useState, useContext } from 'react'
import Link from 'next/link'
import { ChevronLeft, Search, Filter } from 'lucide-react'
import { getCollection, getHadithsByCollection, SAMPLE_HADITHS } from '@/lib/hadith-data'
import { LanguageContext } from '@/lib/language-context'

interface CollectionPageProps {
  params: {
    collectionId: string
  }
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { collectionId } = params
  const { currentLanguage } = useContext(LanguageContext)

  const collection = getCollection(collectionId as any)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState<'all' | 'Sahih' | 'Hasan' | 'Daif'>('all')
  const [selectedTopic, setSelectedTopic] = useState<string | 'all'>('all')

  if (!collection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
          <Link href="/hadith-library" className="text-primary hover:underline">
            Back to Hadith Library
          </Link>
        </div>
      </div>
    )
  }

  let hadiths = getHadithsByCollection(collectionId as any)

  // Filter by grade
  if (selectedGrade !== 'all') {
    hadiths = hadiths.filter((h) => h.grade === selectedGrade)
  }

  // Filter by topic
  if (selectedTopic !== 'all') {
    hadiths = hadiths.filter((h) => h.topic === selectedTopic)
  }

  // Search
  if (searchQuery) {
    hadiths = hadiths.filter(
      (h) =>
        h.arabicText.includes(searchQuery) ||
        h.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.narrator.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Get unique topics from collection
  const topics = Array.from(new Set(getHadithsByCollection(collectionId as any).map((h) => h.topic)))

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
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/hadith-library"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{collection.name}</h1>
              <p className="text-sm text-muted-foreground">By: {collection.author}</p>
            </div>
            <div className="text-4xl">{collection.icon}</div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search in this collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as any)}
                className="rounded border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Grades</option>
                <option value="Sahih">Sahih</option>
                <option value="Hasan">Hasan</option>
                <option value="Daif">Daif</option>
              </select>

              {topics.length > 0 && (
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="rounded border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Topics</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              )}

              <div className="flex-1" />
              <div className="text-sm text-muted-foreground pt-1">
                {hadiths.length} of {getHadithsByCollection(collectionId as any).length} hadiths
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        {/* Collection Info */}
        <div className="mb-8 p-6 rounded-lg border border-border bg-card">
          <h2 className="text-2xl font-bold mb-2">{collection.name}</h2>
          <p className="text-sm font-arabic text-primary mb-3">{collection.arabicName}</p>
          <p className="text-foreground mb-4">{collection.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Author</div>
              <div className="font-semibold">{collection.author}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Hadiths</div>
              <div className="font-semibold">{collection.totalHadiths.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Hadiths List */}
        <div className="space-y-4">
          {hadiths.map((hadith) => (
            <Link
              key={hadith.id}
              href={`/hadith-library/${collection.id}/${hadith.id}`}
              className="group rounded-lg border border-border p-6 hover:border-primary hover:bg-primary/5 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded">
                    {hadith.bookNumber}:{hadith.hadithNumber}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(hadith.grade)}`}>
                    {hadith.grade}
                  </span>
                </div>
              </div>

              {/* Arabic Text */}
              <p className="text-right font-arabic text-lg leading-relaxed mb-3 text-foreground">
                {hadith.arabicText}
              </p>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{hadith.narrator}</span>
                <span>{hadith.topic}</span>
              </div>

              {/* Keywords */}
              {hadith.keywords.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {hadith.keywords.slice(0, 3).map((kw) => (
                    <span key={kw} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                      {kw}
                    </span>
                  ))}
                  {hadith.keywords.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                      +{hadith.keywords.length - 3}
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {hadiths.length === 0 && (
          <div className="rounded-lg border border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">No hadiths found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedGrade('all')
                setSelectedTopic('all')
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
