import type { Metadata } from 'next'
import { Swords, Trophy, Users, Zap } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Battles — Recitation Challenges | TILAWA',
  description:
    'Friendly Quran recitation and memorization challenges: daily duels, weekly tournaments, and community leaderboards.',
}

const modes = [
  {
    icon: Zap,
    name: 'Daily Duel',
    detail:
      'A quick 5-round head-to-head: identify the surah from a short recitation clip, complete the verse, or spot the tajweed rule. First to three wins.',
    status: 'Coming soon',
  },
  {
    icon: Users,
    name: 'Hifz Face-Off',
    detail:
      'Both reciters are given the same starting verse and must continue from memory. AI scoring checks accuracy word by word. Best for revision partners.',
    status: 'Coming soon',
  },
  {
    icon: Trophy,
    name: 'Weekly Tournament',
    detail:
      'A bracket of 16 competing on a themed set — Juz Amma week, Ya-Sin week, or the surahs of the Prophets. Winners earn badges on the community leaderboard.',
    status: 'Coming soon',
  },
]

const leaderboard = [
  { rank: 1, name: 'Aisha K.', points: 2840, streak: 42, badge: 'Hafizah in progress' },
  { rank: 2, name: 'Yusuf R.', points: 2710, streak: 38, badge: 'Juz Amma champion' },
  { rank: 3, name: 'Fatima S.', points: 2650, streak: 35, badge: 'Tajweed master' },
  { rank: 4, name: 'Omar A.', points: 2400, streak: 29, badge: 'Daily reciter' },
  { rank: 5, name: 'Zainab M.', points: 2210, streak: 27, badge: 'Rising star' },
]

const etiquette = [
  'Battles are for encouragement, never showing off — intention (niyyah) comes first.',
  'Every battle begins with isti\u2019adhah and basmalah, just like any recitation.',
  'Losing a round while reciting sincerely is still worship — every letter carries reward.',
  'Correct your opponent gently. The Prophet ﷺ said: "The best of you are those who learn the Quran and teach it."',
]

export default function BattlesPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-32">
        <PageHero
          icon={Swords}
          eyebrow="Battles — Community Challenges"
          title="Compete in good, grow in Quran"
          arabic="فَاسْتَبِقُوا الْخَيْرَاتِ"
          description='"So race to all that is good" (Al-Baqarah 2:148). Friendly recitation duels and memorization face-offs that turn revision into motivation — with adab at the center of every match.'
        />

        <section aria-labelledby="modes-heading" className="mx-auto max-w-6xl px-4 py-12">
          <h2 id="modes-heading" className="text-2xl font-semibold tracking-tight">
            Battle modes
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {modes.map((mode) => {
              const Icon = mode.icon
              return (
                <article key={mode.name} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                      {mode.status}
                    </span>
                  </div>
                  <h3 className="font-semibold">{mode.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{mode.detail}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section aria-labelledby="leaderboard-heading" className="border-y border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 id="leaderboard-heading" className="text-2xl font-semibold tracking-tight">
              Community leaderboard
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Preview of the season leaderboard. Live rankings launch with battle modes.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[560px] border-collapse bg-background text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="p-4 text-start font-semibold">
                      Rank
                    </th>
                    <th scope="col" className="p-4 text-start font-semibold">
                      Reciter
                    </th>
                    <th scope="col" className="p-4 text-start font-semibold">
                      Points
                    </th>
                    <th scope="col" className="p-4 text-start font-semibold">
                      Streak
                    </th>
                    <th scope="col" className="p-4 text-start font-semibold">
                      Badge
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((row) => (
                    <tr key={row.rank} className="border-b border-border last:border-0">
                      <td className="p-4 font-semibold text-primary">#{row.rank}</td>
                      <td className="p-4 font-medium">{row.name}</td>
                      <td className="p-4">{row.points.toLocaleString()}</td>
                      <td className="p-4">{row.streak} days</td>
                      <td className="p-4 text-muted-foreground">{row.badge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section aria-labelledby="adab-heading" className="mx-auto max-w-6xl px-4 py-12">
          <h2 id="adab-heading" className="text-2xl font-semibold tracking-tight">
            Adab of battles
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {etiquette.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
