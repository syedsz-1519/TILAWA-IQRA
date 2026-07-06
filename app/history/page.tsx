import type { Metadata } from 'next'
import { Landmark } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { PageHero } from '@/components/page-hero'
import {
  heroStats,
  historySections,
  historyTimeline,
  closingNote,
} from '@/lib/tarikh-quran'

export const metadata: Metadata = {
  title: 'History of Quran — Tarikh-e-Quran | TILAWA',
  description:
    'The complete journey of the Holy Quran: from the first revelation in the Cave of Hira to the standardized Mushaf-e-Uthmani. Tarikh-e-Quran on TILAWA.',
}

export default function HistoryOfQuranPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-32">
        <PageHero
          icon={Landmark}
          eyebrow="Tarikh-e-Quran"
          title="History of Quran"
          arabic="تاریخِ قرآن"
          description="From the first revelation to the final compiled book — the complete, meticulously preserved journey of the Word of Allah across 23 years of revelation and two great compilations."
        />

        {/* Hero stats */}
        <section aria-label="Key figures" className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-card p-4 text-center"
              >
                <p className="font-serif text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sections */}
        <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-16 px-4">
          {historySections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                {section.titleUr}
              </p>
              <h2
                id={`${section.id}-title`}
                className="mt-1 text-balance font-serif text-3xl font-bold text-foreground"
              >
                {section.titleEn}
              </h2>
              <p className="mt-2 text-pretty text-muted-foreground">{section.subtitle}</p>

              <div className="mt-6 flex flex-col gap-4">
                {section.paragraphs.map((para, i) => (
                  <p key={i} className="leading-relaxed text-foreground/90">
                    {para}
                  </p>
                ))}
              </div>

              {section.quote && (
                <figure className="mt-8 rounded-lg border border-primary/30 bg-primary/5 p-6 text-center">
                  <p lang="ar" dir="rtl" className="text-2xl leading-loose text-foreground">
                    {section.quote.arabic}
                  </p>
                  <p className="mt-3 text-sm italic text-muted-foreground">
                    {section.quote.transliteration}
                  </p>
                  <blockquote className="mt-2 font-medium text-foreground">
                    {'"'}
                    {section.quote.translation}
                    {'"'}
                  </blockquote>
                  <figcaption className="mt-3 text-xs text-primary">
                    {section.quote.source}
                  </figcaption>
                </figure>
              )}

              {section.facts && (
                <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                  {section.facts.map((fact) => (
                    <div key={fact.label} className="rounded-lg border border-border bg-card p-4">
                      <dt className="text-xs font-medium uppercase tracking-wide text-primary">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-foreground">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {section.list && (
                <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm leading-relaxed text-foreground"
                    >
                      <span aria-hidden="true" className="mt-0.5 text-primary">
                        {'\u2726'}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Timeline */}
        <section
          aria-labelledby="timeline-title"
          className="mx-auto mt-20 max-w-3xl px-4"
        >
          <h2
            id="timeline-title"
            className="text-balance text-center font-serif text-3xl font-bold text-foreground"
          >
            The Complete Timeline
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            From the first revelation to the Mushaf-e-Uthmani
          </p>
          <ol className="relative mt-10 flex flex-col gap-0 border-s-2 border-primary/30 ps-6">
            {historyTimeline.map((event) => (
              <li key={`${event.period}-${event.event}`} className="relative pb-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -start-[31px] top-1 size-3 rounded-full border-2 border-primary bg-background"
                />
                <p className="text-sm font-semibold text-primary">{event.period}</p>
                <h3 className="mt-0.5 font-medium text-foreground">{event.event}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{event.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Closing */}
        <section aria-label="Closing note" className="mx-auto mt-20 max-w-3xl px-4 text-center">
          <p lang="ar" dir="rtl" className="text-2xl leading-loose text-primary">
            {closingNote.arabic}
          </p>
          <p className="mt-4 text-pretty italic text-muted-foreground">{closingNote.text}</p>
        </section>
      </main>
    </>
  )
}
