import { SiteHeader } from '@/components/site-header'
import { PageHero } from '@/components/page-hero'
import { Lightbulb } from 'lucide-react'

export const metadata = {
  title: 'Hadith & Dua Library | TILAWA',
  description: 'Browse authentic hadith and duas for guidance',
}

export default function HadithDuaPage() {
  const hadiths = [
    {
      id: 1,
      title: 'The Best Among You',
      text: 'The best of you are those who learn the Quran and teach it.',
      source: 'Sahih Bukhari 5027',
    },
    {
      id: 2,
      title: 'Intercession of the Quran',
      text: 'The Quran will intercede for those who recited it.',
      source: 'Sahih Muslim 223',
    },
    {
      id: 3,
      title: 'Light from Allah',
      text: 'The Quran is a light (nur) from Allah and a guidance.',
      source: 'Al-Muwatta 932',
    },
  ]

  const duas = [
    {
      id: 1,
      arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
      title: 'Dua for Ease',
      translation: 'My Lord, expand for me my breast and ease for me my task',
      surah: 'Surah Taha 20:25-26',
    },
    {
      id: 2,
      arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً',
      title: 'Dua for Good in This Life & Hereafter',
      translation: 'Our Lord, give us good in this world and good in the hereafter',
      surah: 'Surah Al-Baqarah 2:201',
    },
    {
      id: 3,
      arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
      title: 'Tasbih',
      translation: 'Glory be to Allah and praise, Glory be to Allah the Mighty',
      surah: 'Authentic Dua',
    },
  ]

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <PageHero
          icon={Lightbulb}
          eyebrow="Guidance & Wisdom"
          title="Hadith & Dua Library"
          description="Explore authentic hadith and powerful duas for every occasion"
        />

        <section className="mx-auto max-w-5xl px-4 py-16">
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold">Authentic Hadith</h2>
            <div className="space-y-4">
              {hadiths.map((hadith) => (
                <div key={hadith.id} className="rounded-lg border border-border bg-card p-6">
                  <h3 className="mb-2 font-semibold">{hadith.title}</h3>
                  <p className="mb-3 text-muted-foreground italic">&quot;{hadith.text}&quot;</p>
                  <p className="text-sm text-muted-foreground">Source: {hadith.source}</p>
                  <button className="mt-3 text-sm font-medium text-primary hover:underline">
                    Save to Collection
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-8 text-2xl font-bold">Duas from the Quran</h2>
            <div className="space-y-4">
              {duas.map((dua) => (
                <div key={dua.id} className="rounded-lg border border-border bg-card p-6">
                  <h3 className="mb-2 font-semibold">{dua.title}</h3>
                  <p lang="ar" className="mb-3 text-right text-lg font-serif leading-relaxed text-primary">
                    {dua.arabic}
                  </p>
                  <p className="mb-2 italic text-muted-foreground">{dua.translation}</p>
                  <p className="text-sm text-muted-foreground">{dua.surah}</p>
                  <button className="mt-3 text-sm font-medium text-primary hover:underline">
                    Save to Collection
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
