'use client'

import Link from 'next/link'
import { BookOpenText, Brain, Heart, Compass } from 'lucide-react'

const tiles = [
  {
    title: 'Read Quran',
    description: 'Arabic text & translations',
    icon: BookOpenText,
    href: '/read',
    tileClass: 'tile-quran',
    iconClass: 'text-primary',
  },
  {
    title: 'Tajweed',
    description: 'Learn recitation rules',
    icon: Brain,
    href: '/tajweed',
    tileClass: 'tile-tajweed',
    iconClass: 'text-purple-500 dark:text-purple-400',
  },
  {
    title: 'Dua & Adhkar',
    description: 'Daily supplications',
    icon: Heart,
    href: '/dua-library',
    tileClass: 'tile-dua',
    iconClass: 'text-accent',
  },
  {
    title: 'Qibla',
    description: 'Prayer direction finder',
    icon: Compass,
    href: '/qibla',
    tileClass: 'tile-qibla',
    iconClass: 'text-teal-600 dark:text-teal-400',
  },
]

export function QuickAccessGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {tiles.map((tile) => {
        const Icon = tile.icon
        return (
          <Link
            key={tile.href}
            href={tile.href}
            className={`
              group card-sacred press-effect
              flex flex-col justify-between gap-6 p-5
              ${tile.tileClass}
              border-transparent
              hover:border-primary/20
            `}
          >
            <div>
              <h3 className="text-sm font-semibold text-foreground">{tile.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{tile.description}</p>
            </div>
            <Icon
              className={`size-7 ${tile.iconClass} transition-transform duration-[var(--duration-base)] group-hover:scale-110`}
              aria-hidden="true"
            />
          </Link>
        )
      })}
    </div>
  )
}
