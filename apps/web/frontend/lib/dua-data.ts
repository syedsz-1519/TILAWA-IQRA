/**
 * TILAWA Dua Library
 * Authentic Islamic Duas from Quran and Sunnah
 */

export type DuaCategory = 
  | 'morning-evening'
  | 'prayer'
  | 'daily-life'
  | 'forgiveness'
  | 'guidance'
  | 'health'
  | 'family'
  | 'wealth'
  | 'hardship'
  | 'travel'
  | 'learning'
  | 'gratitude'
  | 'protection'
  | 'ramadan'

export interface Dua {
  id: string
  category: DuaCategory
  arabicText: string
  transliteration: string
  benefits: string[]
  timing?: string
  source?: string
  featured: boolean
  frequency?: number
}

export interface DuaTranslation {
  duaId: string
  language: string
  meaning: string
  explanation?: string
}

export interface DuaCategory_Info {
  id: DuaCategory
  name: string
  arabicName: string
  description: string
  icon: string
  order: number
}

// Dua Categories
export const DUA_CATEGORIES: DuaCategory_Info[] = [
  {
    id: 'morning-evening',
    name: 'Morning & Evening Duas',
    arabicName: 'أدعية الصباح والمساء',
    description: 'Duas to start and end your day with divine protection',
    icon: '🌅',
    order: 1,
  },
  {
    id: 'prayer',
    name: 'Prayer Duas',
    arabicName: 'أدعية الصلاة',
    description: 'Duas related to prayer and worship',
    icon: '🕌',
    order: 2,
  },
  {
    id: 'daily-life',
    name: 'Daily Life',
    arabicName: 'أدعية الحياة اليومية',
    description: 'Duas for everyday situations and activities',
    icon: '📅',
    order: 3,
  },
  {
    id: 'forgiveness',
    name: 'Forgiveness & Repentance',
    arabicName: 'أدعية الاستغفار والتوبة',
    description: 'Duas for seeking Allah\'s forgiveness',
    icon: '🙏',
    order: 4,
  },
  {
    id: 'guidance',
    name: 'Guidance & Wisdom',
    arabicName: 'أدعية الهداية والحكمة',
    description: 'Duas for seeking divine guidance and wisdom',
    icon: '💡',
    order: 5,
  },
  {
    id: 'health',
    name: 'Health & Healing',
    arabicName: 'أدعية الصحة والشفاء',
    description: 'Duas for good health and recovery',
    icon: '⚕️',
    order: 6,
  },
  {
    id: 'family',
    name: 'Family & Relationships',
    arabicName: 'أدعية الأسرة والعلاقات',
    description: 'Duas for family harmony and good relationships',
    icon: '👨‍👩‍👧‍👦',
    order: 7,
  },
  {
    id: 'wealth',
    name: 'Wealth & Provision',
    arabicName: 'أدعية الرزق والمال',
    description: 'Duas for sustenance and provision from Allah',
    icon: '💰',
    order: 8,
  },
  {
    id: 'hardship',
    name: 'Hardship & Difficulties',
    arabicName: 'أدعية الكرب والشدائد',
    description: 'Duas during difficult times and trials',
    icon: '💪',
    order: 9,
  },
  {
    id: 'travel',
    name: 'Travel & Journey',
    arabicName: 'أدعية السفر والرحلة',
    description: 'Duas for safe travels and journeys',
    icon: '✈️',
    order: 10,
  },
  {
    id: 'learning',
    name: 'Knowledge & Learning',
    arabicName: 'أدعية العلم والتعلم',
    description: 'Duas for seeking knowledge and understanding',
    icon: '📚',
    order: 11,
  },
  {
    id: 'gratitude',
    name: 'Gratitude & Thanks',
    arabicName: 'أدعية الشكر والحمد',
    description: 'Duas for expressing gratitude to Allah',
    icon: '🙌',
    order: 12,
  },
  {
    id: 'protection',
    name: 'Protection & Safety',
    arabicName: 'أدعية الحماية والأمان',
    description: 'Duas for protection from harm and evil',
    icon: '🛡️',
    order: 13,
  },
  {
    id: 'ramadan',
    name: 'Ramadan Duas',
    arabicName: 'أدعية رمضان',
    description: 'Special duas for the blessed month of Ramadan',
    icon: '🌙',
    order: 14,
  },
]

// Sample Duas (in production, load from database)
export const SAMPLE_DUAS: Dua[] = [
  {
    id: 'dua-001',
    category: 'morning-evening',
    arabicText: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ الْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'Asbahna wa asbahul mulku lillah, alhamdulillahi la ilaha illallahu wahdahu la sharika lahu lahu al-mulku wa lahu al-hamd wa huwa ala kulli shayin qadir',
    benefits: ['Protection', 'Blessing', 'Daily Remembrance'],
    timing: 'Early Morning',
    source: 'Tirmidhi & Abu Dawood',
    featured: true,
    frequency: 1,
  },
  {
    id: 'dua-002',
    category: 'forgiveness',
    arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِرِضَاكَ مِنْ سَخَطِكَ وَبِمُعَافَاتِكَ مِنْ عُقُوبَتِكَ وَأَعُوذُ بِكَ مِنْكَ لَا أُحْصِي ثَنَاءً عَلَيْكَ أَنْتَ كَمَا أَثْنَيْتَ عَلَىٰ نَفْسِكَ',
    transliteration: 'Allahumma inni aozobi biridaka min sakhatika wa bimouafatika min oqoobatika wa aozobi bika minka la ohsee thanaan alaika anta kama athnaita ala nafsika',
    benefits: ['Forgiveness', 'Mercy', 'Divine Pleasure'],
    timing: 'Anytime',
    source: 'Muslim',
    featured: true,
    frequency: 3,
  },
  {
    id: 'dua-003',
    category: 'guidance',
    arabicText: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَىٰ وَالتُّقَىٰ وَالْعَفَافَ وَالْغِنَىٰ',
    transliteration: 'Allahumma inni as aluka al-huda wa al-tuqa wa al-afaf wa al-ghina',
    benefits: ['Guidance', 'Piety', 'Contentment', 'Independence'],
    timing: 'Daily',
    source: 'Muslim',
    featured: true,
    frequency: 2,
  },
  {
    id: 'dua-004',
    category: 'health',
    arabicText: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ اشْفِ أَنْتَ الشَّافِي لَا شَافِيَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma rabba al-nas adhib al-bas ishfi anta al-shafi la shafi illa anta',
    benefits: ['Healing', 'Recovery', 'Health'],
    timing: 'When Sick',
    source: 'Bukhari & Muslim',
    featured: true,
  },
  {
    id: 'dua-005',
    category: 'family',
    arabicText: 'اللَّهُمَّ أَصْلِحْ ذَاتَ بَيْنِنَا وَأَلِّفْ بَيْنَ قُلُوبِنَا وَاهْدِنَا سُبُلَ السَّلَامِ',
    transliteration: 'Allahumma aslih dhat bainina wa allif baina quloobina wahdina subul al-salam',
    benefits: ['Family Harmony', 'Love', 'Unity', 'Peace'],
    timing: 'Anytime',
    source: 'Abu Dawood & Tirmidhi',
    featured: true,
  },
  {
    id: 'dua-006',
    category: 'learning',
    arabicText: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا',
    transliteration: 'Allahumma inni as aluka ilman nafi an wa rizqan tayyiban wa amalan mutaqabbalan',
    benefits: ['Knowledge', 'Beneficial Learning', 'Good Provision', 'Accepted Deeds'],
    timing: 'Daily',
    source: 'Ibn Majah',
    featured: true,
    frequency: 2,
  },
  {
    id: 'dua-007',
    category: 'protection',
    arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخَوْفِ وَالْجُوعِ وَخَوْفِ الدِّينِ',
    transliteration: 'Allahumma inni azozu bika mina al-khawf wa al-joo wa khawf al-din',
    benefits: ['Protection', 'Safety', 'Security', 'Peace of Mind'],
    timing: 'Anytime',
    source: 'Abu Dawood',
    featured: true,
  },
  {
    id: 'dua-008',
    category: 'wealth',
    arabicText: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ فَإِنَّهُ لَا يَمْلِكُ الْغِنَىٰ وَلَا الْفَقْرَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma inni as aluka min fadlika wa rahmatika fa inahu la yamliku al-ghina wa la al-faqr illa anta',
    benefits: ['Provision', 'Sustenance', 'Wealth', 'Abundance'],
    timing: 'Anytime',
    source: 'Abu Dawood',
    featured: true,
  },
]

// Dua translations
export const DUA_TRANSLATIONS: Record<string, Record<string, DuaTranslation>> = {
  en: {
    'dua-001': {
      duaId: 'dua-001',
      language: 'en',
      meaning:
        'We have entered upon the morning and the whole kingdom belongs to Allah, the Lord of the worlds. O Allah, I ask You the good of this day - its conquests, its benefits, its light, its blessings, and its welfare. I seek refuge in You from its evil and the evil that is in it.',
      explanation:
        'This dua is recited in the morning to seek Allah\'s blessings and protection for the day ahead. It establishes the Islamic belief that all authority and provision come from Allah alone.',
    },
    'dua-002': {
      duaId: 'dua-002',
      language: 'en',
      meaning:
        'O Allah, I seek refuge in Your pleasure from Your anger, and in Your pardoning from Your punishment, and I seek refuge in You from You. I cannot enumerate Your praise, You are as You have praised Yourself.',
      explanation:
        'This powerful dua seeks Allah\'s mercy and forgiveness, acknowledging that we cannot comprehend His greatness and can only praise Him as He has praised Himself.',
    },
    'dua-003': {
      duaId: 'dua-003',
      language: 'en',
      meaning:
        'O Allah, I ask You for guidance, piety, chastity, and contentment.',
      explanation:
        'A concise yet comprehensive dua asking for the essentials of a good life: guidance in faith, righteousness, moral purity, and satisfaction with what Allah provides.',
    },
  },
  ur: {
    'dua-001': {
      duaId: 'dua-001',
      language: 'ur',
      meaning: 'ہم صبح کو بیدار ہوئے اور ساری بادشاہی اللہ کے لیے ہے، الحمد لله اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے کوئی شریک نہیں۔',
    },
  },
  hi: {
    'dua-001': {
      duaId: 'dua-001',
      language: 'hi',
      meaning: 'हम सुबह उठे और सारी बादशाही अल्लाह के लिए है, तमाम तारीफें अल्लाह के लिए हैं।',
    },
  },
}

/**
 * Get all Dua categories
 */
export function getDuaCategories(): DuaCategory_Info[] {
  return DUA_CATEGORIES.sort((a, b) => a.order - b.order)
}

/**
 * Get category by ID
 */
export function getDuaCategory(id: DuaCategory): DuaCategory_Info | undefined {
  return DUA_CATEGORIES.find((c) => c.id === id)
}

/**
 * Get duas by category
 */
export function getDuasByCategory(category: DuaCategory): Dua[] {
  return SAMPLE_DUAS.filter((d) => d.category === category)
}

/**
 * Get featured duas
 */
export function getFeaturedDuas(): Dua[] {
  return SAMPLE_DUAS.filter((d) => d.featured).sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
}

/**
 * Get dua by ID
 */
export function getDuaById(id: string): Dua | undefined {
  return SAMPLE_DUAS.find((d) => d.id === id)
}

/**
 * Get dua translation
 */
export function getDuaTranslation(duaId: string, language: string): DuaTranslation | undefined {
  return DUA_TRANSLATIONS[language]?.[duaId]
}

/**
 * Search duas
 */
export function searchDuas(query: string, language: string = 'en'): Dua[] {
  const lower = query.toLowerCase()
  return SAMPLE_DUAS.filter((d) => {
    const translation = getDuaTranslation(d.id, language)
    return (
      d.arabicText.includes(query) ||
      d.transliteration.toLowerCase().includes(lower) ||
      d.benefits.some((b) => b.toLowerCase().includes(lower)) ||
      translation?.meaning.toLowerCase().includes(lower)
    )
  })
}

/**
 * Dua Statistics
 */
export interface DuaStats {
  totalDuas: number
  totalCategories: number
  featuredDuas: number
  averageBenefitsPerDua: number
}

export function getDuaStats(): DuaStats {
  const featured = getFeaturedDuas()
  const avgBenefits = SAMPLE_DUAS.reduce((sum, d) => sum + d.benefits.length, 0) / SAMPLE_DUAS.length

  return {
    totalDuas: SAMPLE_DUAS.length,
    totalCategories: DUA_CATEGORIES.length,
    featuredDuas: featured.length,
    averageBenefitsPerDua: Math.round(avgBenefits * 10) / 10,
  }
}
