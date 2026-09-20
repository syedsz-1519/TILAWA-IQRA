'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getRulesByCategory, getTajweedCategories } from '@/lib/tajweed'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params
  const rules = getRulesByCategory(category as any)
  const categories = getTajweedCategories()
  const categoryInfo = categories.find((c) => c.id === category)

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link href="/iqra" className="text-primary hover:underline">
            Back to IQRA Mode
          </Link>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-700 border-green-200'
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200'
      case 'advanced':
        return 'bg-red-500/10 text-red-700 border-red-200'
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200'
    }
  }

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
              <h1 className="text-3xl font-bold">{categoryInfo.name}</h1>
              <p className="text-muted-foreground text-sm mt-1">{categoryInfo.description}</p>
            </div>
            <div className="ml-auto text-4xl">{categoryInfo.icon}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-lg border border-border p-4 bg-card text-center">
            <div className="text-2xl font-bold">{rules.length}</div>
            <div className="text-sm text-muted-foreground">Total Rules</div>
          </div>
          <div className="rounded-lg border border-border p-4 bg-card text-center">
            <div className="text-2xl font-bold">
              {rules.filter((r) => r.difficulty === 'beginner').length}
            </div>
            <div className="text-sm text-muted-foreground">Beginner Rules</div>
          </div>
          <div className="rounded-lg border border-border p-4 bg-card text-center">
            <div className="text-2xl font-bold">
              {rules.reduce((sum, r) => sum + r.examples.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Examples</div>
          </div>
        </div>

        {/* Rules List */}
        <div className="space-y-4">
          {rules.map((rule) => (
            <Link
              key={rule.id}
              href={`/iqra/tajweed/${category}/${rule.id}`}
              className="group rounded-lg border border-border p-5 hover:border-primary hover:bg-primary/5 transition-all block"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {rule.name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(rule.difficulty)}`}>
                      {rule.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{rule.examples.length} examples</span>
                    <span>•</span>
                    <span>Order: {rule.order}</span>
                  </div>
                </div>
                <div className="text-3xl ml-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  {rule.nameArabic}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {rules.length === 0 && (
          <div className="rounded-lg border border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">No rules found in this category</p>
            <Link href="/iqra" className="text-primary hover:underline">
              Back to IQRA Mode
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
