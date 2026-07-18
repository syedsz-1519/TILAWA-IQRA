import { Mic, BookOpen, Trophy, Sparkles, Repeat, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  {
    icon: Mic,
    title: 'Tajweed Rules',
    href: '/tajweed',
    description:
      'Master noon sakinah, madd, qalqalah, and the articulation points of every Arabic letter.',
  },
  {
    icon: BookOpen,
    title: 'Guided Memorization',
    href: '/hifz',
    description:
      'Structured hifz plans with the Sabaq–Sabqi–Manzil revision system, from short surahs to a full khatm.',
  },
  {
    icon: Repeat,
    title: 'Listen & Repeat',
    href: '/#listen',
    description:
      'Loop any surah in the voice of Yasser Al-Dosari with adjustable speed to shadow the recitation.',
  },
  {
    icon: Trophy,
    title: 'Battles & Leaderboards',
    href: '/battles',
    description:
      'Friendly recitation duels, hifz face-offs, and weekly tournaments with community rankings.',
  },
  {
    icon: Sparkles,
    title: 'Mood Verse Suggester',
    href: '/mood',
    description:
      'Share how you feel and receive relevant ayat with translation and a short reflection.',
  },
  {
    icon: Users,
    title: 'Stories of the Prophets',
    href: '/stories',
    description:
      'The best of stories, told from the Quran itself — with key surahs to read and listen to.',
  },
] as const

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          Everything you need to grow your recitation
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center leading-relaxed text-muted-foreground">
          TILAWA combines beautiful audio with structured learning tools designed for every level.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li key={feature.title}>
              <Link
                href={feature.href}
                className="group flex h-full flex-col rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/40"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 flex items-center gap-1.5 font-medium">
                  {feature.title}
                  <ArrowRight
                    className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
