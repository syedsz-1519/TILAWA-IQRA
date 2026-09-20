'use client'

import Link from 'next/link'
import { ChevronLeft, Copy, Volume2, Bookmark } from 'lucide-react'
import { getDuaCategory, getDuasByCategory, getDuaTranslation } from '@/lib/dua-data'
import { useLanguage } from '@/lib/language-context'

interface CategoryPageProps {
  params: {
    categoryId: string
  }
}

export default function DuaCategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = params
  const { currentLanguage } = useLanguage()

  const category = getDuaCategory(categoryId as any)
  const duas = getDuasByCategory(categoryId as any)

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link href="/dua-library" className="text-primary hover:underline">
            Back to Dua Library
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dua-library"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{category.name}</h1>
              <p className="text-sm text-muted-foreground">{category.arabicName}</p>
            </div>
            <div className="text-4xl">{category.icon}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        {/* Category Info */}
        <div className="mb-8 p-6 rounded-lg border border-border bg-card">
          <p className="text-foreground">{category.description}</p>
          <div className="mt-4 text-sm text-muted-foreground">
            <strong>{duas.length}</strong> duas in this category
          </div>
        </div>

        {/* Duas List */}
        <div className="space-y-4">
          {duas.map((dua) => {
            const translation = getDuaTranslation(dua.id, currentLanguage.code)
            return (
              <Link
                key={dua.id}
                href={`/dua-library/${dua.id}`}
                className="group rounded-lg border border-border p-6 hover:border-primary hover:bg-primary/5 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    {dua.timing && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {dua.timing}
                      </span>
                    )}
                    {dua.source && (
                      <span className="text-xs text-muted-foreground ml-2">Source: {dua.source}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded hover:bg-muted transition-colors">
                      <Volume2 className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-muted transition-colors">
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-muted transition-colors">
                      <Bookmark className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                <p className="text-2xl font-arabic text-right leading-relaxed mb-2 text-foreground group-hover:text-primary transition-colors">
                  {dua.arabicText}
                </p>

                {/* Transliteration */}
                <p className="text-xs italic font-mono text-muted-foreground mb-2">
                  {dua.transliteration}
                </p>

                {/* Translation */}
                {translation && (
                  <p className="text-sm text-foreground mb-3 line-clamp-2">{translation.meaning}</p>
                )}

                {/* Benefits */}
                <div className="flex flex-wrap gap-1.5">
                  {dua.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="px-2 py-1 rounded text-xs bg-primary/10 text-primary font-medium"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Empty State */}
        {duas.length === 0 && (
          <div className="rounded-lg border border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">No duas found in this category</p>
            <Link href="/dua-library" className="text-primary hover:underline">
              Browse other categories
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
