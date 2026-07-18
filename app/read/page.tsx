import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpenText } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SURAHS } from '@/lib/quran'

export const metadata: Metadata = {
  title: 'Read Quran - TILAWA',
  description:
    'Read the Holy Quran with Arabic text and translations in English, Roman Urdu, Urdu and more. Follow along with the recitation of Sheikh Yasser Ad-Dussary.',
}

export default function ReadQuranPage() {
  return (
    <>
      <main className="pb-32">
        <PageHero
          icon={BookOpenText}
          eyebrow="Read Quran"
          title="Recite, read, and understand"
          description="The complete Holy Quran with Uthmani Arabic script and translations in your own language - English, Roman Urdu, and Urdu, with more Indian languages coming soon. Tap any surah to read verse by verse and follow along with the recitation."
        />
        <section className="mx-auto w-full max-w-5xl px-4" aria-label="All surahs">
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SURAHS.map((s) => (
              <li key={s.number}>
                <Link
                  href={`/read/${s.number}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                      {s.number}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{s.nameTransliterated}</p>
                      <p className="text-xs text-muted-foreground">
                        {s.nameTranslated} &middot; {s.ayahCount} ayahs
                      </p>
                    </div>
                  </div>
                  <span lang="ar" dir="rtl" className="text-xl text-primary">
                    {s.nameArabic}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  )
}
