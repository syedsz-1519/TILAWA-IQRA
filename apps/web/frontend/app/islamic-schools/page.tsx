'use client'

import { useState } from 'react'
import { BookOpen, Users, Landmark } from 'lucide-react'

interface School {
  id: string
  name: string
  arabicName: string
  founder: string
  foundYear: number
  followers: string
  description: string
  principles: string[]
  icon: string
  color: string
}

const SCHOOLS: School[] = [
  {
    id: 'school-001',
    name: 'Hanafi School',
    arabicName: 'مذهب الحنفي',
    founder: 'Imam Abu Hanifa',
    foundYear: 700,
    followers: '~40% of Muslims',
    description:
      'Known for extensive use of reason and juristic reasoning. Emphasizes individual opinion in Islamic law.',
    principles: [
      'Quranic interpretation with reason',
      'Extensive use of Qiyas (analogy)',
      'Juristic preference (Istihsan)',
      'Flexibility in application',
    ],
    icon: '⚖️',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30',
  },
  {
    id: 'school-002',
    name: 'Maliki School',
    arabicName: 'مذهب المالكي',
    founder: 'Imam Malik ibn Anas',
    foundYear: 795,
    followers: '~25% of Muslims',
    description: 'Emphasizes the practices of Medina and the welfare of people. Conservative in approach.',
    principles: [
      'Practices of Medina (Amal)',
      'Juristic preference',
      'Public interest (Maslaha)',
      'Strong Hadith foundation',
    ],
    icon: '📖',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30',
  },
  {
    id: 'school-003',
    name: 'Shafi\'i School',
    arabicName: 'مذهب الشافعي',
    founder: 'Imam Shafi\'i',
    foundYear: 820,
    followers: '~25% of Muslims',
    description: 'Balanced approach between opinion and strict adherence to Hadith. Founder of Usul al-Fiqh.',
    principles: [
      'Systematic methodology (Usul)',
      'Balanced Hadith usage',
      'Qiyas with strict conditions',
      'Clear juristic methodology',
    ],
    icon: '📚',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30',
  },
  {
    id: 'school-004',
    name: 'Hanbali School',
    arabicName: 'مذهب الحنبلي',
    founder: 'Imam Ahmad ibn Hanbal',
    foundYear: 855,
    followers: '~10% of Muslims',
    description: 'Strictest adherence to Quran and Hadith. Conservative and literal in interpretation.',
    principles: [
      'Strict Quran adherence',
      'Emphasis on authentic Hadith',
      'Limited use of opinion',
      'Conservative jurisprudence',
    ],
    icon: '📖',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30',
  },
  {
    id: 'school-005',
    name: 'Jafari School',
    arabicName: 'مذهب الجعفري',
    founder: 'Imam Jafar As-Sadiq',
    foundYear: 765,
    followers: '~10% of Muslims',
    description: 'Developed from teachings of Imam Jafar As-Sadiq. Emphasizes reason and rational interpretation.',
    principles: [
      'Reason as source of law (Aql)',
      'Ijtihad importance',
      'Community welfare focus',
      'Rational jurisprudence',
    ],
    icon: '💡',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30',
  },
]

export default function IslamicSchoolsPage() {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(SCHOOLS[0])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/2 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🏛️</div>
            <div>
              <h1 className="text-3xl font-bold">Ways of Islam</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Schools of Islamic Jurisprudence (Madhabs) - Unity in Diversity
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* School Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {SCHOOLS.map((school) => (
            <button
              key={school.id}
              onClick={() => setSelectedSchool(school)}
              className={`rounded-lg border-2 p-6 transition-all text-left ${
                selectedSchool?.id === school.id
                  ? `border-primary ${school.color}`
                  : 'border-border hover:border-primary'
              }`}
            >
              <div className="text-4xl mb-3">{school.icon}</div>
              <div className="font-semibold text-lg">{school.name}</div>
              <div className="text-sm font-arabic text-muted-foreground mb-2">{school.arabicName}</div>
              <div className="text-xs text-muted-foreground">Founded: {school.foundYear} CE</div>
              <div className="text-xs text-muted-foreground">By: {school.founder}</div>
            </button>
          ))}
        </div>

        {/* Detailed View */}
        {selectedSchool && (
          <div className="space-y-6">
            {/* Header Card */}
            <div className={`rounded-lg border border-border p-8 ${selectedSchool.color}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedSchool.name}</h2>
                  <p className="text-xl font-arabic opacity-75 mb-3">{selectedSchool.arabicName}</p>
                  <p className="text-lg opacity-90">Founded by {selectedSchool.founder}</p>
                </div>
                <div className="text-6xl">{selectedSchool.icon}</div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-current border-opacity-20">
                <div>
                  <div className="text-sm opacity-75">Founded</div>
                  <div className="text-2xl font-bold">{selectedSchool.foundYear}</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Followers</div>
                  <div className="text-lg font-semibold">{selectedSchool.followers}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-lg border border-border p-6">
              <p className="text-foreground leading-relaxed text-lg">{selectedSchool.description}</p>
            </div>

            {/* Principles */}
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Core Principles
              </h3>
              <ul className="space-y-3">
                {selectedSchool.principles.map((principle, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary font-bold">●</span>
                    <span className="text-foreground">{principle}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Islamic Teaching */}
            <div className="rounded-lg border border-border p-6 bg-primary/5">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-primary" />
                Islamic Significance
              </h3>
              <p className="text-foreground leading-relaxed mb-4">
                These five schools of jurisprudence represent the diversity and flexibility within Islamic law. While
                differing in methodology and application, they all aim to interpret Islamic law according to the Quran
                and Sunnah. This diversity is considered a blessing (Ikhtilaf-e-Ummah) that allows Muslims to choose
                the school most suited to their circumstances.
              </p>
              <div className="bg-background rounded p-3 border-l-4 border-primary">
                <p className="text-sm italic">
                  "The differences of my Ummah are a mercy" - Prophet Muhammad (ﷺ)
                </p>
              </div>
            </div>

            {/* Comparison Info */}
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Unity in Diversity
              </h3>
              <p className="text-foreground leading-relaxed">
                Although these schools differ in their approach to Islamic jurisprudence, they all share the same
                foundational sources (Quran and Sunnah) and basic Islamic principles. The existence of multiple schools
                demonstrates the richness of Islamic jurisprudence and provides flexibility for different regions and
                cultures to follow Islam according to their needs and circumstances. This unity in diversity has been
                one of Islam's greatest strengths throughout history.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
