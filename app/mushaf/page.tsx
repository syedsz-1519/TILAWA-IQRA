import { SiteHeader } from '@/components/site-header'
import { PageHero } from '@/components/page-hero'
import { BookOpen } from 'lucide-react'
import { SURAHS } from '@/lib/quran'
import Link from 'next/link'

export const metadata = {
  title: 'Mushaf Reader | TILAWA',
  description: 'Read the Quran with translations and Yasser Al-Dosari audio',
}

export default function MushafPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <PageHero
          icon={BookOpen}
          eyebrow="Read & Reflect"
          title="Mushaf Reader"
          description="Browse all 114 surahs with translations and verse-by-verse recitation"
        />

        <section className="mx-auto max-w-5xl px-4 py-16">
          <div className="mb-8 text-center">
            <p className="text-lg text-muted-foreground">Click any surah to read and listen with full verse translations</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SURAHS.map((surah) => (
              <Link
                key={surah.number}
                href={`/mushaf/${surah.number}`}
                className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:bg-card/80"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-muted-foreground">Surah {surah.number}</div>
                    <h3 className="text-lg font-semibold group-hover:text-primary">{surah.nameTransliterated}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{surah.ayahs} verses</p>
                  </div>
                  <div className="text-right">
                    <p lang="ar" className="text-xl font-serif text-primary">{surah.nameArabic}</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{surah.revelationPlace}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
