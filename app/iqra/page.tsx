import type { Metadata } from 'next'
import { BookOpen, Moon, ScrollText, Sparkles } from 'lucide-react'
import {
  historyFacts,
  historyIntro,
  historyTimeline,
  nuzoolFacts,
  nuzoolIntro,
  nuzoolStages,
} from '@/lib/iqra-content'

export const metadata: Metadata = {
  title: 'Iqra Mode — History of the Quran & Nuzool-e-Quran | TILAWA',
  description:
    'Learn how the Quran was revealed (Nuzool-e-Quran) and preserved through history — from the Cave of Hira to the mushaf in your hands.',
}

export default function IqraPage() {
  return (
    <>
      <main className="pb-40">
        {/* Page hero */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <p className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="size-4" aria-hidden="true" />
              Iqra Mode — Learn
            </p>
            <p lang="ar" dir="rtl" className="mb-4 text-4xl leading-relaxed text-primary sm:text-5xl">
              {'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ'}
            </p>
            <h1 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              The Story of the Quran
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              &ldquo;Read in the name of your Lord who created&rdquo; (96:1) — the very first word revealed
              was <em>Iqra</em>: Read. Begin your journey by understanding how the Quran descended and how
              it reached you, letter-perfect, fourteen centuries later.
            </p>
          </div>
        </section>

        {/* Nuzool-e-Quran */}
        <section id="nuzool" aria-labelledby="nuzool-heading" className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Moon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 id="nuzool-heading" className="text-2xl font-semibold tracking-tight">
                Nuzool-e-Quran <span lang="ar" className="text-primary">{'نزول القرآن'}</span>
              </h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{nuzoolIntro}</p>
            </div>
          </div>

          <h3 className="mb-4 text-lg font-semibold">The three stages of descent</h3>
          <div className="mb-12 grid gap-4 md:grid-cols-3">
            {nuzoolStages.map((stage) => (
              <article key={stage.title} className="rounded-xl border border-border bg-card p-5">
                {stage.arabic && (
                  <p lang="ar" dir="rtl" className="mb-2 text-xl text-primary">
                    {stage.arabic}
                  </p>
                )}
                <h4 className="font-semibold">{stage.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
              </article>
            ))}
          </div>

          <h3 className="mb-4 text-lg font-semibold">Key facts about the revelation</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {nuzoolFacts.map((fact) => (
              <article key={fact.title} className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-semibold">{fact.title}</h4>
                {fact.arabic && (
                  <p lang="ar" dir="rtl" className="mt-2 text-xl leading-relaxed text-primary">
                    {fact.arabic}
                  </p>
                )}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* History of the Quran */}
        <section
          id="history"
          aria-labelledby="history-heading"
          className="border-t border-border bg-card/50"
        >
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-10 flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ScrollText className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 id="history-heading" className="text-2xl font-semibold tracking-tight">
                  History of the Quran <span lang="ar" className="text-primary">{'تاريخ القرآن'}</span>
                </h2>
                <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{historyIntro}</p>
              </div>
            </div>

            <h3 className="mb-6 text-lg font-semibold">Timeline of preservation</h3>
            <ol className="relative mb-12 flex flex-col gap-8 border-s-2 border-primary/30 ps-6">
              {historyTimeline.map((event) => (
                <li key={event.title} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -start-[31px] top-1 size-3 rounded-full border-2 border-primary bg-background"
                  />
                  <p className="text-sm font-semibold text-primary">{event.period}</p>
                  <h4 className="mt-1 font-semibold">{event.title}</h4>
                  <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </li>
              ))}
            </ol>

            <div className="grid gap-4 md:grid-cols-3">
              {historyFacts.map((fact) => (
                <article key={fact.title} className="rounded-xl border border-border bg-background p-5">
                  <h4 className="font-semibold">{fact.title}</h4>
                  {fact.arabic && (
                    <p lang="ar" dir="rtl" className="mt-2 text-lg leading-relaxed text-primary">
                      {fact.arabic}
                    </p>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA back to listening */}
        <section className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight">
            Now hear it recited
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            The same words revealed in the Cave of Hira — recited beautifully by Sheikh Yasser Al-Dosari.
          </p>
          <a
            href="/#listen"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <BookOpen className="size-4" aria-hidden="true" />
            Start Listening
          </a>
        </section>
      </main>
    </>
  )
}
