import { SiteHeader } from '@/components/site-header'
import { PageHero } from '@/components/page-hero'
import { Heart } from 'lucide-react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Nafs Tracker | TILAWA',
  description: 'Track your spiritual practices and daily habits',
}

export default async function NafsTrackerPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  const habits = [
    { id: 'fajr', label: 'Fajr in Congregation', emoji: '🕌' },
    { id: 'tilawah', label: 'Daily Quran Reading', emoji: '📖' },
    { id: 'dua', label: 'Duas & Adhkar', emoji: '🤲' },
    { id: 'charity', label: 'Charity/Kindness', emoji: '💝' },
    { id: 'sleep', label: 'Early Sleep', emoji: '😴' },
    { id: 'reflection', label: 'Self Reflection', emoji: '🧘' },
  ]

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <PageHero
          icon={Heart}
          eyebrow="Spiritual Journey"
          title="Nafs Tracker"
          description="Monitor your spiritual practices and build consistent Islamic habits"
        />

        <section className="mx-auto max-w-5xl px-4 py-16">
          <div className="mb-12 rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Today&apos;s Habits</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => (
                <label
                  key={habit.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background/50 p-4 transition-all hover:bg-background"
                >
                  <input type="checkbox" className="h-5 w-5 cursor-pointer rounded" />
                  <span className="text-2xl">{habit.emoji}</span>
                  <span className="font-medium">{habit.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold">7-Day Streak</h3>
              <div className="flex gap-2">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-10 w-10 rounded-lg ${
                      i < 5 ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 font-semibold">Reflection</h3>
              <textarea
                placeholder="Today's thoughts and feelings..."
                className="w-full rounded-lg bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground"
                rows={3}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
