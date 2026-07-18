import { Mic, BookOpen, Trophy, Sparkles, Repeat, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  {
    icon: Mic,
    title: 'Tajweed Rules',
    href: '/tajweed',
    description:
      'Master noon sakinah, madd, qalqalah, and the articulation points of every Arabic letter.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    badge: null,
  },
  {
    icon: BookOpen,
    title: 'Guided Memorization',
    href: '/hifz',
    description:
      'Structured hifz plans with the Sabaq–Sabqi–Manzil revision system, from short surahs to a full khatm.',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    badge: null,
  },
  {
    icon: Repeat,
    title: 'Listen & Repeat',
    href: '/#listen',
    description:
      'Loop any surah in the voice of Yasser Al-Dosari with adjustable speed to shadow the recitation.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    badge: null,
  },
  {
    icon: Trophy,
    title: 'Battles & Leaderboards',
    href: '/battles',
    description:
      'Friendly recitation duels, hifz face-offs, and weekly tournaments with community rankings.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    badge: 'Live',
  },
  {
    icon: Sparkles,
    title: 'Mood Verse Suggester',
    href: '/mood',
    description:
      'Share how you feel and receive relevant ayat with translation and a short reflection.',
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-100 dark:bg-rose-900/30',
    badge: null,
  },
  {
    icon: Users,
    title: 'Stories of the Prophets',
    href: '/stories',
    description:
      'The best of stories, told from the Quran itself — with key surahs to read and listen to.',
    gradient: 'from-cyan-500/20 to-sky-500/20',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    badge: null,
  },
] as const

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Feature Suite
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to grow your recitation
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
            TILAWA combines beautiful audio with structured learning tools designed for every
            level — from beginner to hafiz.
          </p>
        </div>

        {/* Feature Cards */}
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <li
              key={feature.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Link
                href={feature.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Gradient bg on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  aria-hidden="true"
                />

                {/* Badge */}
                {feature.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    {feature.badge}
                  </span>
                )}

                {/* Icon */}
                <span
                  className={`relative flex size-12 items-center justify-center rounded-xl ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className={`size-6 ${feature.iconColor}`} aria-hidden="true" />
                </span>

                {/* Content */}
                <h3 className="relative mt-5 flex items-center gap-2 text-lg font-semibold">
                  {feature.title}
                  <ArrowRight
                    className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
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
