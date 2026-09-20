'use client'

import Link from 'next/link'
import { ChevronLeft, Share2, Bookmark, Copy } from 'lucide-react'
import { getHadithById, getHadithTranslation, getCollection } from '@/lib/hadith-data'
import { useLanguage } from '@/lib/language-context'

interface HadithDetailPageProps {
  params: {
    collectionId: string
    hadithId: string
  }
}

export default function HadithDetailPage({ params }: HadithDetailPageProps) {
  const { collectionId, hadithId } = params
  const { currentLanguage } = useLanguage()

  const hadith = getHadithById(hadithId)
  const collection = getCollection(collectionId as any)
  const translation = hadith ? getHadithTranslation(hadith.id, currentLanguage.code) : undefined

  if (!hadith || !collection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hadith not found</h1>
          <Link href="/hadith-library" className="text-primary hover:underline">
            Back to Hadith Library
          </Link>
        </div>
      </div>
    )
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Sahih':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 border-green-200 dark:border-green-900/50'
      case 'Hasan':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 border-blue-200 dark:border-blue-900/50'
      case 'Daif':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-900/50'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getGradeDescription = (grade: string) => {
    switch (grade) {
      case 'Sahih':
        return 'Authentic - This hadith meets the highest standards of authenticity'
      case 'Hasan':
        return 'Good - This hadith is acceptable and has been cited by scholars'
      case 'Daif':
        return 'Weak - This hadith has weaknesses in its chain of narration'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-4 md:px-8">
          <div className="flex items-center justify-between">
            <Link
              href={`/hadith-library/${collectionId}`}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-lg font-bold">{collection.name}</h1>
              <p className="text-xs text-muted-foreground">Hadith {hadith.bookNumber}:{hadith.hadithNumber}</p>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        {/* Grade & Metadata */}
        <div className={`mb-6 p-6 rounded-lg border ${getGradeColor(hadith.grade)}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold">Grade: {hadith.grade}</span>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-black/10 transition-colors dark:hover:bg-white/10">
                <Bookmark className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-black/10 transition-colors dark:hover:bg-white/10">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-black/10 transition-colors dark:hover:bg-white/10">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-sm">{getGradeDescription(hadith.grade)}</p>
        </div>

        {/* Arabic Text */}
        <div className="mb-8 p-6 rounded-lg border border-border bg-card">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Arabic Text</h2>
          <p className="text-4xl font-arabic text-right leading-relaxed text-foreground">
            {hadith.arabicText}
          </p>
        </div>

        {/* Translation */}
        {translation && (
          <div className="mb-8 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">
              Translation ({currentLanguage.name})
            </h2>
            <p className="text-lg leading-relaxed text-foreground mb-4">{translation.text}</p>

            {translation.commentary && (
              <>
                <hr className="my-4 border-border" />
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Commentary</h3>
                  <p className="text-sm text-foreground italic">{translation.commentary}</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Narrators & Isnad */}
        <div className="mb-8 p-6 rounded-lg border border-border bg-card">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Narrator (Raawi)</h2>
          <p className="text-lg font-semibold text-foreground mb-2">{hadith.narrator}</p>
          <p className="text-sm text-muted-foreground">
            This hadith was transmitted by {hadith.narrator.split('(')[0].trim()}, one of the most reliable companions.
          </p>
        </div>

        {/* Topic & Keywords */}
        <div className="mb-8 p-6 rounded-lg border border-border bg-card">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Topic</h2>
          <p className="text-lg font-semibold text-primary mb-4">{hadith.topic}</p>

          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {hadith.keywords.map((kw) => (
              <Link
                key={kw}
                href={`/hadith-library?search=${encodeURIComponent(kw)}`}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
              >
                {kw}
              </Link>
            ))}
          </div>
        </div>

        {/* Collection Info */}
        <div className="mb-8 p-6 rounded-lg border border-border bg-card">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">From Collection</h2>
          <div className="flex items-start gap-4">
            <div className="text-4xl">{collection.icon}</div>
            <div>
              <p className="text-lg font-semibold">{collection.name}</p>
              <p className="text-sm text-primary font-arabic mb-2">{collection.arabicName}</p>
              <p className="text-sm text-muted-foreground">By: {collection.author}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {collection.totalHadiths.toLocaleString()} total hadiths in this collection
              </p>
            </div>
          </div>
        </div>

        {/* Fiqh Application */}
        <div className="mb-8 p-6 rounded-lg border border-border bg-primary/5">
          <h2 className="text-lg font-semibold text-foreground mb-3">🎯 Practical Application</h2>
          <p className="text-sm text-foreground leading-relaxed">
            This hadith teaches important principles that Muslims apply in their daily lives. Understanding the
            context and chain of narration helps scholars derive correct rulings for contemporary issues.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-12">
          <Link
            href={`/hadith-library/${collectionId}`}
            className="flex-1 rounded-lg border border-border px-6 py-3 text-center font-medium hover:bg-muted transition-colors"
          >
            Back to Collection
          </Link>
          <button className="flex-1 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors">
            Mark as Studied
          </button>
        </div>
      </div>
    </div>
  )
}
