'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Users, Trophy, Heart } from 'lucide-react'

interface Story {
  id: string
  title: string
  arabicTitle: string
  prophet: string
  description: string
  surah: number
  lessons: string[]
  category: 'prophet' | 'companion' | 'miracle'
  icon: string
}

const STORIES: Story[] = [
  {
    id: 'story-001',
    title: 'Prophet Adam - The First Human',
    arabicTitle: 'آدم عليه السلام',
    prophet: 'Adam (عليه السلام)',
    description: 'The creation of Adam, his placement in Paradise, and his journey after being sent to Earth',
    surah: 2,
    lessons: ['Humility', 'Repentance', 'Divine Mercy', 'Human Dignity'],
    category: 'prophet',
    icon: '👨',
  },
  {
    id: 'story-002',
    title: 'Prophet Noah - The Preacher of Patience',
    arabicTitle: 'نوح عليه السلام',
    prophet: 'Noah (عليه السلام)',
    description: 'Noah preached for 950 years and only 80 people believed, yet he never lost faith',
    surah: 71,
    lessons: ['Patience', 'Perseverance', 'Faith in Difficulty', 'Divine Support'],
    category: 'prophet',
    icon: '⛵',
  },
  {
    id: 'story-003',
    title: 'Prophet Ibrahim - The Friend of Allah',
    arabicTitle: 'إبراهيم عليه السلام',
    prophet: 'Ibrahim (عليه السلام)',
    description: 'Breaking idols, willing to sacrifice his son, building the Kaaba - ultimate obedience',
    surah: 21,
    lessons: ['Obedience', 'Testing', 'Sacrifice', 'Leadership'],
    category: 'prophet',
    icon: '⛩️',
  },
  {
    id: 'story-004',
    title: 'Prophet Musa - The Liberator',
    arabicTitle: 'موسى عليه السلام',
    prophet: 'Musa (عليه السلام)',
    description: 'Freeing the Israelites from Pharaoh, receiving the Torah, trials in the desert',
    surah: 28,
    lessons: ['Leadership', 'Courage', 'Divine Support', 'Miracles'],
    category: 'prophet',
    icon: '📜',
  },
  {
    id: 'story-005',
    title: 'Prophet Isa - The Miracle Worker',
    arabicTitle: 'عيسى عليه السلام',
    prophet: 'Isa (عليه السلام)',
    description: 'Born miraculously to Maryam, performed miracles, preached with wisdom',
    surah: 19,
    lessons: ['Miracles', 'Wisdom', 'Compassion', 'Divine Grace'],
    category: 'prophet',
    icon: '✨',
  },
  {
    id: 'story-006',
    title: 'The People of the Cave',
    arabicTitle: 'أصحاب الكهف',
    prophet: 'Young Believers',
    description: 'Young believers who fled persecution and slept in a cave for centuries',
    surah: 18,
    lessons: ['Faith', 'Steadfastness', 'Divine Protection', 'Resurrection'],
    category: 'companion',
    icon: '⛰️',
  },
  {
    id: 'story-007',
    title: 'The Elephant Army',
    arabicTitle: 'أصحاب الفيل',
    prophet: 'Divine Protection',
    description: 'Abraha sent an elephant army to destroy the Kaaba, but Allah protected it',
    surah: 105,
    lessons: ['Divine Protection', 'Power of Allah', 'Sacred House', 'Miracles'],
    category: 'miracle',
    icon: '🐘',
  },
  {
    id: 'story-008',
    title: 'Dhul-Qarnayn - The Builder',
    arabicTitle: 'ذو القرنين',
    prophet: 'Dhul-Qarnayn',
    description: 'A righteous ruler who built a wall against Gog and Magog using divine wisdom',
    surah: 18,
    lessons: ['Leadership', 'Justice', 'Technology', 'Gratitude'],
    category: 'companion',
    icon: '🧱',
  },
]

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'prophet' | 'companion' | 'miracle'>('all')

  const filtered = selectedCategory === 'all' ? STORIES : STORIES.filter((s) => s.category === selectedCategory)

  const categories = [
    { id: 'all', label: 'All Stories', count: STORIES.length },
    { id: 'prophet', label: 'Prophets', count: STORIES.filter((s) => s.category === 'prophet').length },
    { id: 'companion', label: 'Companions', count: STORIES.filter((s) => s.category === 'companion').length },
    { id: 'miracle', label: 'Miracles', count: STORIES.filter((s) => s.category === 'miracle').length },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/2 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">📖</div>
            <div>
              <h1 className="text-3xl font-bold">Stories of the Quran</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Inspiring narratives of prophets, companions, and divine miracles
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <div key={cat.id} className="rounded-lg bg-card border border-border p-3">
                <div className="text-2xl font-bold">{cat.count}</div>
                <div className="text-xs text-muted-foreground">{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border sticky top-0 z-30 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:bg-muted'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="group rounded-lg border border-border p-6 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{story.icon}</div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  story.category === 'prophet'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
                    : story.category === 'companion'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30'
                }`}>
                  {story.category}
                </span>
              </div>

              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-1">
                {story.title}
              </h3>
              <p className="text-sm font-arabic text-muted-foreground mb-2">{story.arabicTitle}</p>
              <p className="text-xs text-muted-foreground mb-3">{story.prophet}</p>
              <p className="text-sm text-foreground mb-3 line-clamp-2">{story.description}</p>

              <div className="flex flex-wrap gap-1">
                {story.lessons.slice(0, 2).map((lesson) => (
                  <span key={lesson} className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                    {lesson}
                  </span>
                ))}
                {story.lessons.length > 2 && (
                  <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                    +{story.lessons.length - 2} more
                  </span>
                )}
              </div>

              <div className="mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Read story →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
