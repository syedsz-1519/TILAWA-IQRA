/**
 * Navigation registry — single source of truth for sidebar groups,
 * mobile bottom tabs, and the feature grid on the home page.
 *
 * Groups:
 *   Quran        — Read, Listen, Iqra Mode, Quran Library
 *   Learn        — Tajweed, Tajweed Quiz, Hifz, Hifz Card Studio, Zaid AI Bot
 *   Hadith & Dua — Hadith Library, Dua Library
 *   Explore      — Stories, History of Quran, Counselor, Nafs Tracker,
 *                  Mood Verses, Battles, Sunnate-E-Rasool, The Ahle Bait,
 *                  Ways of Islam
 *
 * Old routes preserved via redirects — see app/hadith-dua/page.tsx.
 */

import {
  BookOpen,
  BookOpenText,
  Brain,
  Flame,
  Headphones,
  Heart,
  HeartHandshake,
  Landmark,
  LayoutDashboard,
  MessageSquare,
  Mic2,
  ScrollText,
  Settings,
  Swords,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  title: string
  href: string
  description: string
  icon: LucideIcon
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: 'Home',
    items: [
      {
        title: 'Dashboard',
        href: '/',
        description: 'From Iqra to Tilawa',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: 'Quran',
    items: [
      {
        title: 'Read Quran',
        href: '/read',
        description: 'Text-first reading with 9 Urdu editions, English and more',
        icon: BookOpenText,
      },
      {
        title: 'Listen Quran',
        href: '/listen',
        description: 'Full-surah audio · 6 world-class reciters',
        icon: Headphones,
      },
      {
        title: 'Iqra Mode',
        href: '/iqra',
        description: 'Structured Quran reading and learning',
        icon: BookOpen,
      },
      {
        title: 'Quran Library',
        href: '/library',
        description: 'Complete Quran with translations in 15+ languages',
        icon: BookOpen,
      },
    ],
  },
  {
    label: 'Learn',
    items: [
      {
        title: 'Tajweed',
        href: '/tajweed',
        description: 'Rules of beautiful recitation',
        icon: Mic2,
      },
      {
        title: 'Tajweed Quiz',
        href: '/tajweed-quiz',
        description: 'Test your tajweed knowledge',
        icon: Brain,
      },
      {
        title: 'Hifz',
        href: '/hifz',
        description: 'Memorisation tracker and goals',
        icon: Flame,
      },
      {
        title: 'Hifz Card Studio',
        href: '/hifz-studio',
        description: 'Spaced-repetition flashcards for memorisation',
        icon: BookOpen,
      },
      {
        title: 'Zaid AI Bot',
        href: '/zaid-ai',
        description: 'AI-powered Quranic learning assistant',
        icon: MessageSquare,
      },
    ],
  },
  {
    label: 'Hadith & Dua',
    items: [
      {
        title: 'Hadith Library',
        href: '/hadith-library',
        description: 'Authentic hadiths from 6 major collections',
        icon: ScrollText,
      },
      {
        title: 'Dua Library',
        href: '/dua-library',
        description: 'Authentic duas from the Quran and Sunnah',
        icon: Heart,
      },
    ],
  },
  {
    label: 'Explore',
    items: [
      {
        title: 'History of Quran',
        href: '/history',
        description: 'Tarikh-e-Quran and Nuzool-e-Quran',
        icon: Landmark,
      },
      {
        title: 'Stories of the Prophets',
        href: '/stories',
        description: 'Inspiring stories of prophets and companions',
        icon: ScrollText,
      },
      {
        title: 'Ayah Counselor',
        href: '/counselor',
        description: 'Quranic guidance for life challenges',
        icon: Brain,
      },
      {
        title: 'Nafs Tracker',
        href: '/nafs-tracker',
        description: 'Track your spiritual practices',
        icon: Heart,
      },
      {
        title: 'Mood Verses',
        href: '/mood',
        description: 'Quranic guidance for how you feel',
        icon: HeartHandshake,
      },
      {
        title: 'Battles',
        href: '/battles',
        description: 'Recitation challenges and ranks',
        icon: Swords,
      },
      {
        title: 'Sunnate-E-Rasool',
        href: '/khaliphs',
        description: 'The 4 Rightly Guided Caliphs',
        icon: Landmark,
      },
      {
        title: 'The Ahle Bait',
        href: '/imams',
        description: 'Household of the Prophet — 5 Imams',
        icon: Heart,
      },
      {
        title: 'Ways of Islam',
        href: '/islamic-schools',
        description: 'Schools of Islamic jurisprudence',
        icon: BookOpen,
      },
    ],
  },
]

/** Flat list for places that need all items (home feature grid, etc.). */
export const navItems: NavItem[] = navGroups.flatMap((g) => g.items)

export const settingsItem: NavItem = {
  title: 'Settings',
  href: '/settings',
  description: 'Theme, playback, and app preferences',
  icon: Settings,
}
