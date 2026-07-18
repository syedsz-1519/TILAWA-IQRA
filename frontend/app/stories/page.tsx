import type { Metadata } from 'next'
import { ScrollText } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { StoryList } from '@/components/story-list'

export const metadata: Metadata = {
  title: 'Stories — Prophets in the Quran | TILAWA',
  description:
    'Stories of the Prophets as told in the Quran — Adam, Nuh, Ibrahim, Yusuf, Musa, Isa, and Muhammad ﷺ — with key surahs and lessons.',
}

export default function StoriesPage() {
  return (
    <>
      <main className="pb-32">
        <PageHero
          icon={ScrollText}
          eyebrow="Stories — Qasas al-Anbiya"
          title="Stories of the Prophets, from the Quran itself"
          arabic="نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ"
          description='"We relate to you the best of stories" (Yusuf 12:3). Each story below is drawn from the Quranic narrative, with the key surahs to read and listen to, and the lessons scholars draw from them.'
        />
        <section aria-label="Prophet stories" className="mx-auto max-w-6xl px-4 py-12">
          <StoryList />
        </section>
      </main>
    </>
  )
}
