import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { QuranReader } from '@/components/quran-reader'
import { SURAHS } from '@/lib/quran'

interface Props {
  params: Promise<{ surah: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { surah } = await params
  const num = Number(surah)
  const s = SURAHS.find((x) => x.number === num)
  if (!s) return { title: 'Read Quran - TILAWA' }
  return {
    title: `Surah ${s.nameTransliterated} - Read Quran - TILAWA`,
    description: `Read Surah ${s.nameTransliterated} (${s.nameTranslated}) with Arabic text and translation, and follow along with recitation.`,
  }
}

export default async function SurahReaderPage({ params }: Props) {
  const { surah } = await params
  const num = Number(surah)
  const s = SURAHS.find((x) => x.number === num)
  if (!s) notFound()

  return (
    <>
      <SiteHeader />
      <main className="pb-16 pt-8">
        <header className="mx-auto mb-6 w-full max-w-3xl px-4 text-center">
          <p className="text-sm font-medium text-primary">
            Surah {s.number} &middot; {s.revelationPlace} &middot; {s.ayahCount} ayahs
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-foreground text-balance">
            {s.nameTransliterated}
          </h1>
          <p lang="ar" dir="rtl" className="mt-2 text-4xl text-primary">
            {s.nameArabic}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{s.nameTranslated}</p>
        </header>
        <QuranReader surahNumber={s.number} />
      </main>
    </>
  )
}
