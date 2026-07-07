import { SiteHeader } from '@/components/site-header'
import { PageHero } from '@/components/page-hero'
import { Zap } from 'lucide-react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Dashboard | TILAWA',
  description: 'Track your Quran learning journey with streaks and XP',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <PageHero
          icon={Zap}
          eyebrow="Your Progress"
          title="Learning Dashboard"
          description="Track your Quran memorization journey with daily streaks and XP rewards"
        />

        <section className="mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Streaks Card */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Current Streak</h3>
              </div>
              <div className="text-4xl font-bold text-primary">42</div>
              <p className="mt-2 text-sm text-muted-foreground">days in a row</p>
            </div>

            {/* XP Card */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Total XP</h3>
              </div>
              <div className="text-4xl font-bold text-primary">3,450</div>
              <p className="mt-2 text-sm text-muted-foreground">experience points</p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold">Features Coming Soon</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Mushaf Reader', desc: 'Read & bookmark verses' },
                { title: 'Tajweed Quiz', desc: 'Master pronunciation rules' },
                { title: 'Nafs Tracker', desc: 'Track daily habits' },
                { title: 'Hifz Challenges', desc: 'Memorization milestones' },
                { title: 'Battles', desc: 'Recitation competitions' },
                { title: 'Mood Verses', desc: 'Verses for every mood' },
              ].map((f) => (
                <div key={f.title} className="rounded-lg border border-border bg-card/50 p-4">
                  <h4 className="font-semibold">{f.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
