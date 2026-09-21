import type { Metadata } from 'next'
import { Brain, CalendarCheck, Repeat2, Target } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Hifz — Quran Memorization | TILAWA',
  description:
    'Structured Quran memorization plans, the Sabaq–Sabqi–Manzil revision system, and short surahs to begin your hifz journey.',
}

const plans = [
  {
    name: 'Gentle Start',
    target: 'Juz Amma (Juz 30)',
    pace: '3–5 lines per day',
    duration: 'Approx. 6–9 months',
    detail:
      'Begin with the short Makkan surahs you hear most often in salah — An-Nas through An-Naba. Short verses, strong rhythm, and high familiarity make this the classic starting point.',
  },
  {
    name: 'Steady Build',
    target: 'Juz 30 + Juz 29 + Surah Al-Mulk & Ya-Sin',
    pace: 'Half a page per day',
    duration: 'Approx. 12–18 months',
    detail:
      'Adds beloved surahs with immense virtue — Al-Mulk (protection in the grave) and Ya-Sin — while building the daily discipline of new memorization plus structured revision.',
  },
  {
    name: 'Full Hifz Track',
    target: 'Complete Quran (604 pages)',
    pace: 'One page per day + revision',
    duration: 'Approx. 3–5 years',
    detail:
      'The traditional madrasa pace. One new page daily, with revision load growing as your memorized portion grows. Requires a teacher or hifz partner for tasmee (recitation checking).',
  },
]

const method = [
  {
    icon: Target,
    title: 'Sabaq — New Lesson',
    body: 'The new portion you memorize today. Read it 10–20 times while looking, listen to Yasser Al-Dosari recite it, then recite from memory until flawless. Quality over quantity — never move on with weak sabaq.',
  },
  {
    icon: Repeat2,
    title: 'Sabqi — Recent Revision',
    body: 'The last 7–30 days of memorization. This is the most fragile memory and needs daily repetition. Recite your sabqi every day before starting new sabaq — it should take priority when time is short.',
  },
  {
    icon: CalendarCheck,
    title: 'Manzil — Long-Term Revision',
    body: 'Your older, established memorization. Divide it into 7 portions and cycle through one portion daily, completing a full review every week — the same weekly manzil system used by huffaz worldwide.',
  },
]

const tips = [
  'Memorize right after Fajr when the mind is freshest — this is the time-tested habit of huffaz.',
  'Always memorize from the same mushaf print (e.g. the 15-line Madani mushaf) so your visual memory locks onto page layout.',
  'Listen to the same reciter repeatedly — consistency of melody anchors your audio memory. Use the TILAWA player on repeat mode.',
  'Understand the meaning of what you memorize. Connected meaning is far stronger than sound alone.',
  'Recite your new lesson in your salah the same day — retrieval under pressure cements it.',
  'Never skip revision for new memorization. The Prophet ﷺ said the Quran escapes faster than a hobbled camel — daily revision is the tether.',
]

export default function HifzPage() {
  return (
    <>
      <main className="pb-32">
        <PageHero
          icon={Brain}
          eyebrow="Hifz — Memorization"
          title="Memorize the Quran, one firm step at a time"
          arabic="وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ"
          description='"And We have certainly made the Quran easy for remembrance, so is there any who will remember?" (Al-Qamar 54:17). Choose a plan, follow the Sabaq–Sabqi–Manzil system, and let recitation audio anchor your memory.'
        />

        <section aria-labelledby="plans-heading" className="mx-auto max-w-6xl px-4 py-12">
          <h2 id="plans-heading" className="text-2xl font-semibold tracking-tight">
            Memorization plans
          </h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
            Pick the pace that matches your life. Every plan pairs new memorization with structured
            revision.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <dl className="flex flex-col gap-1 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Target</dt>
                    <dd className="text-end font-medium">{plan.target}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Pace</dt>
                    <dd className="text-end font-medium">{plan.pace}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Duration</dt>
                    <dd className="text-end font-medium">{plan.duration}</dd>
                  </div>
                </dl>
                <p className="text-sm leading-relaxed text-muted-foreground">{plan.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="method-heading" className="border-y border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 id="method-heading" className="text-2xl font-semibold tracking-tight">
              The Sabaq–Sabqi–Manzil system
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
              The three-tier revision method used in traditional hifz schools for centuries.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {method.map((step) => {
                const Icon = step.icon
                return (
                  <article key={step.title} className="flex flex-col gap-3 rounded-xl border border-border bg-background p-6">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section aria-labelledby="tips-heading" className="mx-auto max-w-6xl px-4 py-12">
          <h2 id="tips-heading" className="text-2xl font-semibold tracking-tight">
            Proven hifz habits
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {tips.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
