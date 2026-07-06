import { Mic, BookOpen, Trophy, Sparkles, Repeat, Users } from 'lucide-react'

const FEATURES = [
  {
    icon: Mic,
    title: 'AI Tajweed Feedback',
    description:
      'Recite into your microphone and receive instant, ayah-by-ayah feedback on makharij and tajweed rules.',
  },
  {
    icon: BookOpen,
    title: 'Guided Memorization',
    description:
      'Spaced-repetition hifz plans that adapt to your pace, from short surahs to a full khatm.',
  },
  {
    icon: Repeat,
    title: 'Listen & Repeat',
    description:
      'Loop any surah in the voice of Yasser Al-Dosari with adjustable speed to shadow the recitation.',
  },
  {
    icon: Trophy,
    title: 'Streaks & Progress',
    description:
      'Daily goals, streak tracking, and juz-by-juz progress that keep your practice consistent.',
  },
  {
    icon: Sparkles,
    title: 'Mood Verse Suggester',
    description:
      'Share how you feel and receive relevant ayat with translation and tafsir context.',
  },
  {
    icon: Users,
    title: 'Recitation Circles',
    description:
      'Join friendly recitation battles and study circles to stay motivated together.',
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
          TILAWA combines beautiful audio with AI-powered learning tools designed for every level.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="rounded-xl border border-border bg-background p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-medium">{feature.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
