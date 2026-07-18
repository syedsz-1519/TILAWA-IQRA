'use client'

import { useState } from 'react'
import { BookMarked, Search, Library } from 'lucide-react'

const TOPICS = [
  'Anxiety & Overthinking',
  'Discipline & Habits',
  'Dealing with Parents',
  'Financial Stress',
  'Social Media & Gaze',
]

const HADITHS = [
  {
    topic: 'Discipline & Habits',
    text: 'The best of you are those who learn the Quran and teach it.',
    source: 'Sahih al-Bukhari 5027',
  },
  {
    topic: 'Anxiety & Overthinking',
    text: 'How wonderful is the affair of the believer, for all his affairs are good. If something good happens to him, he is thankful, and that is good for him. If something bad happens to him, he bears it with patience, and that is good for him.',
    source: 'Sahih Muslim 2999',
  },
  {
    topic: 'Dealing with Parents',
    text: 'Paradise lies at the feet of your mother.',
    source: 'Sunan an-Nasai 3104',
  },
  {
    topic: 'Financial Stress',
    text: 'Richness is not having many possessions, but richness is being content with oneself.',
    source: 'Sahih al-Bukhari 6446',
  },
  {
    topic: 'Social Media & Gaze',
    text: 'Part of the perfection of one\u2019s Islam is his leaving that which does not concern him.',
    source: 'Jami at-Tirmidhi 2317',
  },
  {
    topic: 'Anxiety & Overthinking',
    text: 'If you were to rely upon Allah with reliance due to Him, He would provide for you just as He provides for the birds. They go out in the morning with empty stomachs and return full.',
    source: 'Jami at-Tirmidhi 2344',
  },
]

const DUAS = [
  {
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    title: 'Dua for Ease',
    translation: 'My Lord, expand for me my breast and ease for me my task.',
    ref: 'Surah Taha 20:25-26',
  },
  {
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    title: 'Dua for Good in Both Worlds',
    translation: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
    ref: 'Surah Al-Baqarah 2:201',
  },
  {
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
    title: 'Dua Against Anxiety and Sorrow',
    translation: 'O Allah, I seek refuge in You from anxiety and sorrow.',
    ref: 'Sahih al-Bukhari 6369',
  },
]

export default function HadithDuaPage() {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState<string | null>(null)

  const filtered = HADITHS.filter((h) => {
    const matchQuery = query === '' || h.text.toLowerCase().includes(query.toLowerCase())
    const matchTopic = !topic || h.topic === topic
    return matchQuery && matchTopic
  })

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Prophetic Traditions
        </p>
        <h1 className="mt-1 text-3xl font-bold text-balance md:text-4xl">Hadith Library</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Explore authentic narrations and teachings of the Prophet Muhammad (ﷺ). Search the
          collection and browse by topic.
        </p>

        {/* Search bar */}
        <div className="mt-8 flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3.5">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hadith text (e.g. fasting, intention, prayer)..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search hadith"
          />
          <span className="shrink-0 text-xs text-muted-foreground">{filtered.length} results</span>
        </div>

        {/* Topic pills */}
        <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Curated for Modern Struggles
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(topic === t ? null : t)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                topic === t
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-foreground hover:bg-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Collection card */}
        <div className="mt-8 max-w-sm rounded-xl border border-primary/40 bg-card p-6">
          <div className="flex items-start justify-between gap-3">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Library className="size-5 text-primary" aria-hidden="true" />
            </span>
            <span className="rounded-md bg-muted px-3 py-1.5 text-xs font-semibold">
              7,563 HADITHS
            </span>
          </div>
          <h2 className="mt-4 text-lg font-bold">Sahih al-Bukhari</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            The most authentic compilation of prophetic traditions.
          </p>
        </div>

        {/* Hadith list */}
        <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Now Browsing
        </p>
        <h2 className="mt-1 text-xl font-bold">
          {topic ? topic : 'Sahih Collections'}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {filtered.map((h) => (
            <article key={h.source} className="rounded-xl border border-border bg-card p-6">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {h.topic}
              </span>
              <p className="mt-4 leading-relaxed text-foreground">&ldquo;{h.text}&rdquo;</p>
              <p className="mt-4 text-sm font-medium text-primary">{h.source}</p>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground">No hadith match your search.</p>
          )}
        </div>

        {/* Duas */}
        <div className="mt-14 flex items-center gap-2">
          <BookMarked className="size-5 text-primary" aria-hidden="true" />
          <h2 className="text-xl font-bold">Duas from the Quran &amp; Sunnah</h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {DUAS.map((d) => (
            <article key={d.title} className="rounded-xl border border-border bg-card p-6">
              <p lang="ar" dir="rtl" className="text-xl leading-loose text-foreground">
                {d.arabic}
              </p>
              <h3 className="mt-4 font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
                {d.translation}
              </p>
              <p className="mt-3 text-xs font-medium text-primary">{d.ref}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
