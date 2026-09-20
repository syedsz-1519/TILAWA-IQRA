'use client'

import { useState, useContext } from 'react'
import Link from 'next/link'
import { Search, Bookmark, Copy, Volume2 } from 'lucide-react'
import {
  getDuaCategories,
  getDuaStats,
  getFeaturedDuas,
  getDuaTranslation,
} from '@/lib/dua-data'
import { LanguageContext } from '@/lib/language-context'

export default function DuaLibraryPage() {
  const { currentLanguage } = useContext(LanguageContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'featured' | 'categories'>('featured')

  const categories = getDuaCategories()
  const stats = getDuaStats()
  const featuredDuas = getFeaturedDuas()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/2 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🤲</div>
            <div>
              <h1 className="text-3xl font-bold">Dua Library</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Authentic Islamic Duas from Quran and Sunnah in {currentLanguage.name}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-2xl font-bold">{stats.totalDuas}</div>
              <div className="text-xs text-muted-foreground">Total Duas</div>
            </div>
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-2xl font-bold">{stats.totalCategories}</div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
            <div className="rounded-lg bg-primary/10 border border-primary/20 p-3">
              <div className="text-2xl font-bold text-primary">{stats.featuredDuas}</div>
              <div className="text-xs text-primary/70">Featured Duas</div>
            </div>
            <div className="rounded-lg bg-card border border-border p-3">
              <div className="text-2xl font-bold">{stats.averageBenefitsPerDua}</div>
              <div className="text-xs text-muted-foreground">Avg Benefits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="border-b border-border sticky top-0 z-30 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex gap-4 mb-4">
            {(['featured', 'categories'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'featured' && '⭐ Featured Duas'}
                {tab === 'categories' && '📂 By Category'}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search duas by keyword, benefit, or transliteration..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Featured Tab */}
        {activeTab === 'featured' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Featured & Most Used Duas</h2>
            <div className="space-y-4">
              {featuredDuas.map((dua) => {
                const translation = getDuaTranslation(dua.id, currentLanguage.code)
                return (
                  <Link
                    key={dua.id}
                    href={`/dua-library/${dua.id}`}
                    className="group rounded-lg border border-border p-6 hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        {dua.timing && (
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                            {dua.timing}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded hover:bg-muted transition-colors">
                          <Volume2 className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 rounded hover:bg-muted transition-colors">
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 rounded hover:bg-muted transition-colors">
                          <Bookmark className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    <p className="text-3xl font-arabic text-right leading-relaxed mb-3 text-foreground group-hover:text-primary transition-colors">
                      {dua.arabicText}
                    </p>

                    {/* Transliteration */}
                    <p className="text-sm italic font-mono text-muted-foreground mb-3">
                      {dua.transliteration}
                    </p>

                    {/* Translation */}
                    {translation && (
                      <p className="text-sm text-foreground mb-3 line-clamp-2">{translation.meaning}</p>
                    )}

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
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
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/dua-library/category/${category.id}`}
                  className="group rounded-lg border border-border p-6 hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs font-arabic text-muted-foreground mb-2">{category.arabicName}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{category.description}</p>
                  <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty Search State */}
        {searchQuery && (
          <div className="rounded-lg border border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">Searching for "{searchQuery}"...</p>
            <p className="text-sm text-muted-foreground">Results will appear as you type</p>
          </div>
        )}
      </div>
    </div>
  )
}
