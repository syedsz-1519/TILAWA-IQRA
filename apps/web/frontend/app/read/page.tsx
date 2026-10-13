import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpenText } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SURAHS } from '@/lib/quran'

export const metadata: Metadata = {
  title: 'Read Quran - TILAWA',
  description:
    'Read the Holy Quran with Arabic text and translations in 18+ languages including Kanzul Imaan, English, Roman Urdu, Urdu, Hindi, Bengali, Tamil and more. Follow along with the recitation of Sheikh Yasser Ad-Dussary.',
}

export default function ReadQuranPage() {
  return (
    <>
      <main className="page-bottom-safe">
        <PageHero
          icon={BookOpenText}
          eyebrow="Read Quran"
          title="Recite, read, and understand"
          description="The complete Holy Quran in Uthmani Arabic script. Switch between Translation mode - each ayah paired with its meaning in English, Roman Urdu, Urdu and more Indian languages - and Arabic-only Mushaf mode to read the pure Arabic and learn to recite. Tap any surah to begin."
        />
        <section className="page-container" aria-label="All surahs">
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SURAHS.map((s) => (
              <li key={s.number}>
                <Link
                  href={`/read/${s.number}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/50 press-effect"
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
                  <span lang="ar" dir="rtl" className="arabic-ui text-primary shrink-0">
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
