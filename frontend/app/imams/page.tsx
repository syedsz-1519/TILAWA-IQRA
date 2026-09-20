'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, Heart, BookOpen } from 'lucide-react'

interface Imam {
  id: string
  name: string
  arabicName: string
  order: number
  title: string
  birth: string
  death: string
  contributions: string[]
  schoolOfThought: string
  icon: string
}

const IMAMS: Imam[] = [
  {
    id: 'imam-001',
    name: 'Imam Ali ibn Abi Talib',
    arabicName: 'الإمام علي بن أبي طالب',
    order: 1,
    title: 'Cousin and Son-in-law of Prophet Muhammad',
    birth: '600 CE',
    death: '661 CE',
    contributions: [
      'First male to accept Islam',
      'Established Islamic jurisprudence principles',
      'Champion of justice and virtue',
      'Master of Arabic rhetoric',
      'Spiritual guide for Muslims',
    ],
    schoolOfThought: 'Foundation of Islamic knowledge and wisdom',
    icon: '🗡️',
  },
  {
    id: 'imam-002',
    name: 'Imam Hassan ibn Ali',
    arabicName: 'الإمام حسن بن علي',
    order: 2,
    title: 'Grandson of Prophet Muhammad',
    birth: '625 CE',
    death: '670 CE',
    contributions: [
      'Peaceful peacemaker during civil conflicts',
      'Exemplified wisdom and patience',
      'Preserved Islamic teachings',
      'Known for generous character',
      'Spiritual authority',
    ],
    schoolOfThought: 'Peace, reconciliation, and wisdom',
    icon: '☮️',
  },
  {
    id: 'imam-003',
    name: 'Imam Hussein ibn Ali',
    arabicName: 'الإمام حسين بن علي',
    order: 3,
    title: 'Grandson of Prophet Muhammad',
    birth: '626 CE',
    death: '680 CE',
    contributions: [
      'Ultimate sacrifice for Islamic principles',
      'Martyrdom at Karbala',
      'Exemplified courage and honor',
      'Symbol of resistance against tyranny',
      'Spiritual inspiration for millions',
    ],
    schoolOfThought: 'Sacrifice, dignity, and standing for truth',
    icon: '💚',
  },
  {
    id: 'imam-004',
    name: 'Imam Ali ibn Hussein (Zayn Al-Abidin)',
    arabicName: 'الإمام علي بن الحسين (زين العابدين)',
    order: 4,
    title: 'Son of Imam Hussein',
    birth: '659 CE',
    death: '712 CE',
    contributions: [
      'Spiritual devotion and worship',
      'Reconciliation after Karbala',
      'Known for compassion and mercy',
      'Wrote "Sahifah As-Sajjadiyyah" (prayers)',
      'Healing influence on Islamic community',
    ],
    schoolOfThought: 'Devotion, prayer, and spiritual healing',
    icon: '🤲',
  },
  {
    id: 'imam-005',
    name: 'Imam Muhammad al-Baqir',
    arabicName: 'الإمام محمد الباقر',
    order: 5,
    title: 'Son of Imam Ali ibn Hussein',
    birth: '677 CE',
    death: '732 CE',
    contributions: [
      'Profound Islamic scholar and teacher',
      'Explained Quranic sciences deeply',
      'Established jurisprudence principles',
      'Influenced Islamic philosophy',
      'Trained numerous scholars',
    ],
    schoolOfThought: 'Deep knowledge and Quranic understanding',
    icon: '📚',
  },
]

export default function ImamsPage() {
  const [selectedImam, setSelectedImam] = useState<Imam | null>(IMAMS[0])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/2 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl">💫</div>
            <div>
              <h1 className="text-3xl font-bold">The Ahle Bait</h1>
              <p className="text-muted-foreground text-sm mt-1">
                The Household of Prophet Muhammad - 5 Righteous Imams
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Imam Selection Timeline */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Spiritual Lineage</h2>
          <div className="space-y-3">
            {IMAMS.map((imam, idx) => (
              <button
                key={imam.id}
                onClick={() => setSelectedImam(imam)}
                className={`w-full rounded-lg border-2 p-4 transition-all text-left ${
                  selectedImam?.id === imam.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{imam.icon}</div>
                    <div>
                      <div className="font-semibold">{imam.order}. {imam.name}</div>
                      <div className="text-xs text-muted-foreground font-arabic">{imam.arabicName}</div>
                      <div className="text-xs text-muted-foreground mt-1">{imam.title}</div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {imam.birth} - {imam.death}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed View */}
        {selectedImam && (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="rounded-lg border border-border p-8 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedImam.name}</h2>
                  <p className="text-xl font-arabic text-primary mb-3">{selectedImam.arabicName}</p>
                  <p className="text-lg text-foreground">{selectedImam.title}</p>
                </div>
                <div className="text-6xl">{selectedImam.icon}</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Birth</div>
                  <div className="text-lg font-semibold">{selectedImam.birth}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Death</div>
                  <div className="text-lg font-semibold">{selectedImam.death}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Age</div>
                  <div className="text-lg font-semibold">
                    {parseInt(selectedImam.death) - parseInt(selectedImam.birth)} years
                  </div>
                </div>
              </div>
            </div>

            {/* Contributions */}
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Major Contributions
              </h3>
              <ul className="space-y-3">
                {selectedImam.contributions.map((contribution, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary font-bold text-lg">✨</span>
                    <span className="text-foreground">{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* School of Thought */}
            <div className="rounded-lg border border-border p-6 bg-primary/5">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                School of Thought & Philosophy
              </h3>
              <p className="text-foreground leading-relaxed">{selectedImam.schoolOfThought}</p>
            </div>

            {/* Islamic Significance */}
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Islamic Significance
              </h3>
              <p className="text-foreground leading-relaxed mb-4">
                {selectedImam.name} represents the spiritual continuation of Prophet Muhammad's teachings and guidance.
                Their lives exemplify Islamic virtues of knowledge, piety, justice, and compassion. Their wisdom and
                spiritual authority have inspired Muslims throughout history.
              </p>
              <div className="bg-muted rounded p-3 border-l-4 border-primary">
                <p className="text-sm italic">
                  The Ahle Bait are the blessed household of the Prophet, chosen by Allah for spiritual leadership and
                  guidance of the Muslim community.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="mt-8 p-6 rounded-lg border border-border bg-muted/30">
          <h3 className="font-semibold mb-2">About Ahle Bait</h3>
          <p className="text-sm text-foreground leading-relaxed">
            The Ahle Bait (People of the House) refers to the family of Prophet Muhammad (peace be upon him). Recognized
            for their spiritual authority, Islamic knowledge, and exemplary character, they serve as role models for
            Islamic guidance and continue to inspire Muslims in living according to Islamic principles.
          </p>
        </div>
      </div>
    </div>
  )
}
