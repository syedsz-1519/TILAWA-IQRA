import type { Metadata } from 'next'
import { HeartHandshake } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { MoodExplorer } from '@/components/mood-explorer'

export const metadata: Metadata = {
  title: 'Mood Verses — Quranic Guidance | TILAWA',
  description:
    'Select how you feel and receive Quranic verses with translation and reflection — for anxiety, sadness, gratitude, fear, hope, and more.',
}

export default function MoodPage() {
  return (
    <>
      <main className="pb-32">
        <PageHero
          icon={HeartHandshake}
          eyebrow="Mood Verses"
          title="The Quran speaks to how you feel"
          arabic="وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ"
          description='"And We send down of the Quran that which is healing and mercy for the believers" (Al-Isra 17:82). Choose your state of heart and receive verses with translation and a short reflection — then listen to the full surah.'
        />
        <section aria-label="Mood verse explorer" className="mx-auto max-w-6xl px-4 py-12">
          <MoodExplorer />
        </section>
      </main>
    </>
  )
}
