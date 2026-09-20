'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Crown, Users, Scroll, BookOpen } from 'lucide-react'

interface Khalif {
  id: string
  name: string
  arabicName: string
  order: number
  reignStart: number
  reignEnd: number
  age: string
  achievements: string[]
  challenges: string[]
  icon: string
  color: string
}

const KHALIFHS: Khalif[] = [
  {
    id: 'khalif-001',
    name: 'Abu Bakr As-Siddiq',
    arabicName: 'أبو بكر الصديق',
    order: 1,
    reignStart: 632,
    reignEnd: 634,
    age: 'Elderly (50s)',
    achievements: [
      'First Caliph of Islam',
      'Completed Quranic standardization',
      'Unified Arabia',
      'Preserved Islamic sciences',
      'Established government system',
    ],
    challenges: ['Political resistance', 'Religious apostasy', 'Tribal divisions'],
    icon: '👑',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30',
  },
  {
    id: 'khalif-002',
    name: 'Umar ibn Al-Khattab',
    arabicName: 'عمر بن الخطاب',
    order: 2,
    reignStart: 634,
    reignEnd: 644,
    age: 'Middle Age',
    achievements: [
      'Established Islamic jurisprudence',
      'Expanded Islamic Empire',
      'Conqueror of Jerusalem',
      'Just administration',
      'Economic prosperity',
    ],
    challenges: ['Military campaigns', 'Vast territories', 'Social justice'],
    icon: '⚔️',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30',
  },
  {
    id: 'khalif-003',
    name: 'Uthman ibn Affan',
    arabicName: 'عثمان بن عفان',
    order: 3,
    reignStart: 644,
    reignEnd: 656,
    age: 'Senior',
    achievements: [
      'Standardized Quran copies',
      'Continued expansions',
      'Administrative reforms',
      'Built Islamic institutions',
      'Generous philanthropist',
    ],
    challenges: ['Political opposition', 'Administrative issues', 'Tribal conflicts'],
    icon: '📖',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30',
  },
  {
    id: 'khalif-004',
    name: 'Ali ibn Abi Talib',
    arabicName: 'علي بن أبي طالب',
    order: 4,
    reignStart: 656,
    reignEnd: 661,
    age: 'Middle Age',
    achievements: [
      'Cousin of Prophet Muhammad',
      'Islamic jurisprudence pioneer',
      'Spiritual guide',
      'Supported knowledge',
      'Courageous leader',
    ],
    challenges: ['Internal conflicts', 'Political divisions', 'Civil strife'],
    icon: '🗡️',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30',
  },
]

export default function KhalifhsPage() {
  const [selectedKhalif, setSelectedKhalif] = useState<Khalif | null>(KHALIFHS[0])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/2 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl">👑</div>
            <div>
              <h1 className="text-3xl font-bold">Sunnate-E-Rasool</h1>
              <p className="text-muted-foreground text-sm mt-1">
                The Rightly Guided Caliphs - Khulafa-e-Rashideen (4 Caliphs)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Khalif Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {KHALIFHS.map((khalif) => (
            <button
              key={khalif.id}
              onClick={() => setSelectedKhalif(khalif)}
              className={`rounded-lg border-2 p-4 transition-all text-left ${
                selectedKhalif?.id === khalif.id
                  ? `border-primary ${khalif.color}`
                  : 'border-border hover:border-primary'
              }`}
            >
              <div className="text-3xl mb-2">{khalif.icon}</div>
              <div className="font-semibold">{khalif.order}. {khalif.name}</div>
              <div className="text-xs text-muted-foreground font-arabic">{khalif.arabicName}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {khalif.reignStart}-{khalif.reignEnd} CE
              </div>
            </button>
          ))}
        </div>

        {/* Detailed View */}
        {selectedKhalif && (
          <div className="space-y-6">
            {/* Header Card */}
            <div className={`rounded-lg border border-border p-6 ${selectedKhalif.color}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedKhalif.name}</h2>
                  <p className="text-lg font-arabic opacity-75">{selectedKhalif.arabicName}</p>
                </div>
                <div className="text-5xl">{selectedKhalif.icon}</div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm opacity-75">Order</div>
                  <div className="text-2xl font-bold">#{selectedKhalif.order}</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Reign</div>
                  <div className="text-2xl font-bold">{selectedKhalif.reignEnd - selectedKhalif.reignStart} years</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Start</div>
                  <div className="text-2xl font-bold">{selectedKhalif.reignStart}</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">End</div>
                  <div className="text-2xl font-bold">{selectedKhalif.reignEnd}</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Major Achievements
              </h3>
              <ul className="space-y-2">
                {selectedKhalif.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                Challenges Faced
              </h3>
              <ul className="space-y-2">
                {selectedKhalif.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-orange-500 font-bold">•</span>
                    <span className="text-foreground">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Islamic Teaching */}
            <div className="rounded-lg border border-border bg-muted/30 p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Islamic Principles Exemplified
              </h3>
              <p className="text-foreground leading-relaxed mb-4">
                The reign of {selectedKhalif.name} demonstrates Islamic principles of leadership, justice, and
                community service. Their exemplary governance established the foundation for Islamic civilization
                and continues to inspire Muslim leaders today.
              </p>
              <div className="bg-background rounded p-3 border-l-4 border-primary">
                <p className="text-sm italic">
                  "The best of my ummah is my generation, then those who come after them, then those who come after
                  them." - Prophet Muhammad (ﷺ)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 p-6 rounded-lg border border-border bg-primary/5">
          <h3 className="font-semibold mb-2">About Khulafa-e-Rashideen</h3>
          <p className="text-sm text-foreground">
            The "Rightly Guided Caliphs" are the first four caliphs of Islam who were chosen for their piety,
            knowledge, and wisdom. Their period (632-661 CE) is considered the golden age of Islamic governance,
            where Islamic principles of justice, consultation, and community welfare were exemplified.
          </p>
        </div>
      </div>
    </div>
  )
}
