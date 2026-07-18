import { Hero } from '@/components/hero'
import { SurahBrowser } from '@/components/surah-browser'
import { Features } from '@/components/features'
import { DEFAULT_RECITER } from '@/lib/quran'

export default function Page() {
  return (
    <>
      <main className="pb-28">
        <Hero />
        <SurahBrowser />
        <Features />
      </main>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 pb-32 text-center">
          <p lang="ar" dir="rtl" className="font-serif text-lg text-primary">
            وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
          </p>
          <p className="text-sm text-muted-foreground">
            &quot;And recite the Quran with measured recitation.&quot; — Al-Muzzammil 73:4
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            TILAWA · Recitation by {DEFAULT_RECITER.nameEnglish} · Audio via EveryAyah archives
          </p>
        </div>
      </footer>
    </>
  )
}
