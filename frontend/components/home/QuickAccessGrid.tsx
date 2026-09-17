'use client'

import Link from 'next/link'
import { BookOpen, Brain, Heart, Compass } from 'lucide-react'

export function QuickAccessGrid() {
  const tiles = [
    {
      title: 'Read Quran',
      description: 'Arabic only, distraction-free',
      icon: BookOpen,
      href: '/read-quran',
      color: 'bg-blue-500/10 hover:bg-blue-500/20',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Tajweed',
      description: 'Learn recitation rules',
      icon: Brain,
      href: '/tajweed',
      color: 'bg-purple-500/10 hover:bg-purple-500/20',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Dua & Adhkar',
      description: 'Daily supplications',
      icon: Heart,
      href: '/dua-adhkar',
      color: 'bg-rose-500/10 hover:bg-rose-500/20',
      iconColor: 'text-rose-600',
    },
    {
      title: 'Qibla',
      description: 'Prayer direction finder',
      icon: Compass,
      href: '/qibla',
      color: 'bg-green-500/10 hover:bg-green-500/20',
      iconColor: 'text-green-600',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((tile) => {
        const Icon = tile.icon
        return (
          <Link
            key={tile.href}
            href={tile.href}
            className={`group flex flex-col items-start justify-between gap-4 rounded-xl border border-border p-6 transition-all ${tile.color}`}
          >
            <div className="flex items-start justify-between w-full">
              <div>
                <h3 className="font-semibold text-foreground">{tile.title}</h3>
                <p className="text-xs text-muted-foreground">{tile.description}</p>
              </div>
            </div>
            <Icon className={`size-6 ${tile.iconColor} transition-transform group-hover:scale-110`} />
          </Link>
        )
      })}
    </div>
  )
}
