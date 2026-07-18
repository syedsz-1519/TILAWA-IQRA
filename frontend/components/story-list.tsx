'use client'

import { Play } from 'lucide-react'
import { SURAHS } from '@/lib/quran'
import { usePlayer } from '@/components/player/player-provider'

type Story = {
  prophet: string
  arabic: string
  summary: string
  keySurahs: number[]
  lesson: string
}

const stories: Story[] = [
  {
    prophet: 'Adam (AS)',
    arabic: 'آدم عليه السلام',
    summary:
      "The first human, created by Allah's own hand and honored above the angels, who were commanded to prostrate to him. Deceived by Iblis in the Garden, he ate from the forbidden tree — then was taught the words of repentance and forgiven, becoming the first prophet.",
    keySurahs: [2, 7, 20],
    lesson:
      'Sin is not the end of the story — repentance is. Adam fell and was forgiven; Iblis refused and was cursed. The difference was humility.',
  },
  {
    prophet: 'Nuh (AS)',
    arabic: 'نوح عليه السلام',
    summary:
      'He called his people to Allah for 950 years, facing mockery generation after generation. Commanded to build the Ark on dry land, he was saved with the believers when the flood came — while his own son was among the drowned.',
    keySurahs: [71, 11, 23],
    lesson:
      'Success in dawah is measured by faithfulness, not numbers. Nine and a half centuries of rejection did not make Nuh (AS) a failure.',
  },
  {
    prophet: 'Ibrahim (AS)',
    arabic: 'إبراهيم عليه السلام',
    summary:
      "The friend of Allah (Khalilullah) who reasoned his way from the stars to the Creator, smashed his people's idols, and was thrown into a fire that Allah commanded to be cool and safe. He raised the foundations of the Kaaba with his son Ismail and was tested with the command of sacrifice.",
    keySurahs: [21, 37, 14, 2],
    lesson:
      "Complete submission transforms every trial. The fire became coolness, the sacrifice became a ransom, and one family's obedience became the qiblah of the world.",
  },
  {
    prophet: 'Yusuf (AS)',
    arabic: 'يوسف عليه السلام',
    summary:
      'The only story told as one continuous narrative in a single surah. Betrayed by his brothers, thrown in a well, sold into slavery, falsely imprisoned — then raised to the treasury of Egypt, where he forgave the very brothers who wronged him.',
    keySurahs: [12],
    lesson:
      '"Indeed, whoever fears Allah and is patient — Allah does not allow the reward of the doers of good to be lost" (12:90). Every setback in the story was secretly a step upward.',
  },
  {
    prophet: 'Musa (AS)',
    arabic: 'موسى عليه السلام',
    summary:
      "The most frequently mentioned prophet in the Quran. Saved from Pharaoh's slaughter as an infant by being placed in the river, he returned decades later to confront the greatest tyrant on earth with his brother Harun, split the sea by Allah's command, and received the Torah at Mount Tur.",
    keySurahs: [20, 28, 26, 79],
    lesson:
      'When his people said "We are surely overtaken," Musa (AS) replied: "No! Indeed, with me is my Lord; He will guide me" (26:62). Certainty in Allah outweighs every Pharaoh.',
  },
  {
    prophet: 'Isa (AS)',
    arabic: 'عيسى عليه السلام',
    summary:
      "Born of the virgin Maryam by Allah's word alone, he spoke from the cradle to defend his mother's honor, healed the blind and the leper, and gave life to the dead — all by Allah's permission. He was neither killed nor crucified, but raised up by Allah.",
    keySurahs: [19, 3, 5],
    lesson:
      'Miracles point to the One who sends them. Isa (AS) himself declared: "Indeed, Allah is my Lord and your Lord, so worship Him" (19:36).',
  },
  {
    prophet: 'Muhammad ﷺ',
    arabic: 'محمد ﷺ',
    summary:
      'The final messenger, sent as a mercy to all the worlds. Orphaned young, known as al-Amin (the trustworthy) before revelation, he received the Quran over 23 years, endured persecution and exile, and returned to Makkah in forgiveness rather than vengeance.',
    keySurahs: [47, 33, 48, 93],
    lesson:
      '"And indeed, you are of a magnificent character" (68:4). His life is the Quran lived — the complete example of every teaching in this app.',
  },
]

export function StoryList() {
  const { playSurah } = usePlayer()

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {stories.map((story) => (
        <article key={story.prophet} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xl font-semibold">{story.prophet}</h2>
            <span lang="ar" dir="rtl" className="text-lg text-primary">
              {story.arabic}
            </span>
          </div>
          <p className="leading-relaxed text-muted-foreground">{story.summary}</p>
          <div className="rounded-lg bg-muted p-4">
            <h3 className="text-sm font-semibold">Lesson</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{story.lesson}</p>
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Listen to the key surahs</h3>
            <div className="flex flex-wrap gap-2">
              {story.keySurahs.map((num) => {
                const surah = SURAHS.find((s) => s.number === num)
                if (!surah) return null
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => playSurah(surah)}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    <Play className="size-3" aria-hidden="true" />
                    {surah.number}. {surah.nameTransliterated}
                  </button>
                )
              })}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
