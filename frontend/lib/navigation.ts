import {
  Headphones,
  BookOpen,
  BookOpenText,
  Brain,
  Mic2,
  Swords,
  HeartHandshake,
  ScrollText,
  Landmark,
  Heart,
  Lightbulb,
  LayoutDashboard,
  Settings,
  MessageSquare,
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
    label: 'Core',
    items: [
      {
        title: 'Home',
        href: '/',
        description: 'From Iqra to Tilawa',
        icon: LayoutDashboard,
      },
      {
        title: 'Listen Quran',
        href: '/listen',
        description: 'Complete 114 Surahs audio recitation & station',
        icon: Headphones,
      },
      {
        title: 'Read Quran',
        href: '/read',
        description: 'English, Roman Urdu, and Urdu with read-along audio',
        icon: BookOpenText,
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
      {
        title: 'Hadith & Dua',
        href: '/hadith-dua',
        description: 'Authentic hadith and Quranic duas',
        icon: Lightbulb,
      },
    ],
  },
  {
    label: 'Learn',
    items: [
      {
        title: 'Zaid AI Bot',
        href: '/zaid-ai',
        description: 'AI-powered Quranic learning assistant',
        icon: MessageSquare,
      },
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
        description: 'Memorization plans and revision',
        icon: Brain,
      },
      {
        title: 'History of Quran',
        href: '/history',
        description: 'Tarikh-e-Quran and Nuzool-e-Quran',
        icon: Landmark,
      },
      {
        title: 'Stories',
        href: '/stories',
        description: 'Stories of the Prophets',
        icon: ScrollText,
      },
    ],
  },
  {
    label: 'Nafs Tools',
    items: [
      {
        title: 'Mood Verses',
        href: '/mood',
        description: 'Quranic guidance for how you feel',
        icon: HeartHandshake,
      },
      {
        title: 'Nafs Tracker',
        href: '/nafs-tracker',
        description: 'Track spiritual practices',
        icon: Heart,
      },
      {
        title: 'Battles',
        href: '/battles',
        description: 'Recitation challenges and ranks',
        icon: Swords,
      },
    ],
  },
]

/** Flat list for places that need all items (e.g. feature grids). */
export const navItems: NavItem[] = navGroups.flatMap((g) => g.items)

export const settingsItem: NavItem = {
  title: 'Settings',
  href: '/settings',
  description: 'Theme, playback, and app preferences',
  icon: Settings,
}
