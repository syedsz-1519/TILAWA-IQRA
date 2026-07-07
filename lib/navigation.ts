import {
  Headphones,
  BookOpen,
  Brain,
  Mic2,
  Swords,
  HeartHandshake,
  ScrollText,
  Landmark,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  title: string
  href: string
  description: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  {
    title: 'Listen',
    href: '/#listen',
    description: 'Stream all 114 surahs recited by Yasser Al-Dosari',
    icon: Headphones,
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    description: 'Track streaks, XP, and progress (requires sign-in)',
    icon: Brain,
  },
  {
    title: 'Iqra Mode',
    href: '/iqra',
    description: 'Structured Quran reading and learning',
    icon: BookOpen,
  },
  {
    title: 'History of Quran',
    href: '/history',
    description: 'Tarikh-e-Quran: from the first revelation to the Mushaf-e-Uthmani',
    icon: Landmark,
  },
  {
    title: 'Hifz',
    href: '/hifz',
    description: 'Structured memorization plans and revision tracking',
    icon: Brain,
  },
  {
    title: 'Tajweed',
    href: '/tajweed',
    description: 'Learn the rules of beautiful recitation',
    icon: Mic2,
  },
  {
    title: 'Battles',
    href: '/battles',
    description: 'Friendly recitation challenges and leaderboards',
    icon: Swords,
  },
  {
    title: 'Mood Verses',
    href: '/mood',
    description: 'Quranic guidance for how you feel right now',
    icon: HeartHandshake,
  },
  {
    title: 'Stories',
    href: '/stories',
    description: 'Stories of the Prophets from the Quran',
    icon: ScrollText,
  },
]

export const settingsItem: NavItem = {
  title: 'Settings',
  href: '/settings',
  description: 'Theme, playback, and app preferences',
  icon: Settings,
}
