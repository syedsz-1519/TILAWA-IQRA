import type { Metadata } from 'next'
import Link from 'next/link'
import { Mic2, AlertTriangle, Award, LayoutDashboard } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Tajweed — Rules of Recitation | TILAWA',
  description:
    'Learn the essential rules of tajweed: noon sakinah, meem sakinah, madd, qalqalah, and the articulation points of Arabic letters.',
}

const ruleGroups = [
  {
    name: 'Noon Sakinah & Tanween',
    arabic: 'النون الساكنة والتنوين',
    intro: 'What happens when a noon with sukoon (نْ) or tanween meets the next letter.',
    rules: [
      {
        title: 'Izhar (Clarity)',
        detail:
          'Pronounce the noon clearly with no nasalization when followed by a throat letter: ء هـ ع ح غ خ. Example: مِنْ هَادٍ.',
      },
      {
        title: 'Idgham (Merging)',
        detail:
          'Merge the noon into the next letter when followed by ي ر م ل و ن (remembered as يرملون). With ي ن م و the merge keeps ghunnah (nasal sound). Example: مِن رَّبِّهِمْ.',
      },
      {
        title: 'Iqlab (Conversion)',
        detail:
          'Convert the noon sound into a light meem with ghunnah when followed by ب. Example: مِنْ بَعْدِ pronounced "mim-baʿdi".',
      },
      {
        title: 'Ikhfa (Hiding)',
        detail:
          'Hide the noon between izhar and idgham with ghunnah when followed by the remaining 15 letters. Example: مِن قَبْلُ.',
      },
    ],
  },
  {
    name: 'Meem Sakinah',
    arabic: 'الميم الساكنة',
    intro: 'Three rules for a meem with sukoon (مْ).',
    rules: [
      {
        title: 'Ikhfa Shafawi',
        detail: 'Hide the meem with ghunnah when followed by ب. Example: تَرْمِيهِم بِحِجَارَةٍ.',
      },
      {
        title: 'Idgham Shafawi',
        detail: 'Merge into a following م with ghunnah. Example: لَهُم مَّا يَشَاءُونَ.',
      },
      {
        title: 'Izhar Shafawi',
        detail: 'Pronounce clearly before all other letters. Example: الْحَمْدُ لِلَّهِ.',
      },
    ],
  },
  {
    name: 'Madd (Elongation)',
    arabic: 'المدود',
    intro: 'How long to stretch the vowel letters ا و ي.',
    rules: [
      {
        title: 'Madd Tabee-ee (Natural)',
        detail: 'The default stretch of 2 counts when no hamzah or sukoon follows. Example: قَالَ.',
      },
      {
        title: 'Madd Muttasil (Connected)',
        detail: 'Stretch 4–5 counts when hamzah follows in the same word. Example: جَاءَ.',
      },
      {
        title: 'Madd Munfasil (Separated)',
        detail:
          'Stretch 4–5 counts when hamzah begins the next word. Example: يَا أَيُّهَا (recited continuously).',
      },
      {
        title: 'Madd Lazim (Obligatory)',
        detail:
          'Stretch 6 counts when a permanent sukoon or shaddah follows. Example: الضَّالِّينَ in Al-Fatihah.',
      },
    ],
  },
  {
    name: 'Qalqalah (Echoing)',
    arabic: 'القلقلة',
    intro: 'A bouncing echo on five letters when they carry sukoon.',
    rules: [
      {
        title: 'The Qalqalah letters',
        detail: 'ق ط ب ج د — remembered by the phrase قُطْبُ جَدٍّ (qutbu jadd).',
      },
      {
        title: 'Minor (Sughra)',
        detail: 'A light bounce mid-word or mid-verse. Example: يَجْعَلُونَ.',
      },
      {
        title: 'Major (Kubra)',
        detail:
          'A stronger bounce when stopping on a qalqalah letter at the end of a verse. Example: stopping on الْفَلَقِ.',
      },
    ],
  },
]

const makharij = [
  { area: 'Al-Jawf (Oral cavity)', letters: 'ا و ي', note: 'The empty space of the mouth and throat — the three madd letters.' },
  { area: 'Al-Halq (Throat)', letters: 'ء هـ ع ح غ خ', note: 'Deepest, middle, and nearest parts of the throat.' },
  { area: 'Al-Lisan (Tongue)', letters: '18 letters', note: 'The largest group — from ق at the back of the tongue to ث at the tip.' },
  { area: 'Ash-Shafatan (Lips)', letters: 'ف ب م و', note: 'Letters formed with one or both lips.' },
  { area: 'Al-Khayshum (Nasal passage)', letters: 'Ghunnah', note: 'The nasal sound accompanying noon and meem in specific rules.' },
]

export default function TajweedPage() {
  return (
    <>
      <main className="pb-32">
        <PageHero
          icon={Mic2}
          eyebrow="Tajweed — Rules of Recitation"
          title="Recite the Quran as it was revealed"
          arabic="وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا"
          description='"And recite the Quran with measured recitation" (Al-Muzzammil 73:4). Tajweed gives every letter its right — its articulation point and its attributes. Learn the core rules, then hear them applied in Yasser Al-Dosari&apos;s recitation.'
        />

        <section className="mx-auto max-w-6xl px-4 pt-12">
          {/* Common struggles callout */}
          <div className="flex flex-col gap-4 rounded-xl border border-destructive/30 bg-card p-6 md:flex-row md:items-start">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="size-5 text-destructive" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-semibold">Common Modern Struggles (You&apos;re Not Alone!)</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                <li>
                  <strong className="text-foreground">Qalb vs Kalb:</strong> Pronouncing ق (Qaf) as
                  ك (Kaf) changes &ldquo;Heart&rdquo; to &ldquo;Dog&rdquo;.
                </li>
                <li>
                  <strong className="text-foreground">Ha vs Haa:</strong> Mixing ح (sharp Ha) with
                  هـ (soft Haa) is the #1 mistake for non-Arabs.
                </li>
                <li>
                  <strong className="text-foreground">The Heavy &lsquo;Dhad&rsquo;:</strong>{' '}
                  Struggling with ض? It takes time! Keep practicing the side-of-tongue position.
                </li>
              </ul>
            </div>
          </div>

          {/* Action cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href="/tajweed-quiz"
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Award className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">Take Quiz</h3>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Test knowledge
                </p>
              </div>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <LayoutDashboard className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">Dashboard</h3>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Track progress
                </p>
              </div>
            </Link>
            <Link
              href="/read"
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mic2 className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">Practice</h3>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Recite a verse
                </p>
              </div>
            </Link>
          </div>
        </section>

        <section aria-labelledby="rules-heading" className="mx-auto max-w-6xl px-4 py-12">
          <h2 id="rules-heading" className="text-2xl font-semibold tracking-tight">
            Core rule groups
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {ruleGroups.map((group) => (
              <article key={group.name} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold">{group.name}</h3>
                  <span lang="ar" dir="rtl" className="text-lg text-primary">
                    {group.arabic}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{group.intro}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.rules.map((rule) => (
                    <li key={rule.title} className="rounded-lg bg-muted p-4">
                      <h4 className="text-sm font-semibold">{rule.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {rule.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="makharij-heading" className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 id="makharij-heading" className="text-2xl font-semibold tracking-tight">
              Makharij — articulation points
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
              Every Arabic letter emerges from one of five regions. Mastering these is the
              foundation of correct pronunciation.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[560px] border-collapse bg-background text-sm">
                <thead>
                  <tr className="border-b border-border text-start">
                    <th scope="col" className="p-4 text-start font-semibold">
                      Region
                    </th>
                    <th scope="col" className="p-4 text-start font-semibold">
                      Letters
                    </th>
                    <th scope="col" className="p-4 text-start font-semibold">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {makharij.map((row) => (
                    <tr key={row.area} className="border-b border-border last:border-0">
                      <th scope="row" className="p-4 text-start font-medium">
                        {row.area}
                      </th>
                      <td lang="ar" dir="rtl" className="p-4 text-start text-base text-primary">
                        {row.letters}
                      </td>
                      <td className="p-4 leading-relaxed text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
