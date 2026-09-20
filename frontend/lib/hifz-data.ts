/**
 * TILAWA Hifz Card Studio
 * Quranic memorization with flashcard system
 */

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'master'
export type CardStatus = 'new' | 'learning' | 'review' | 'mastered' | 'expired'

export interface HifzCard {
  id: string
  surah: number
  ayahStart: number
  ayahEnd: number
  arabicText: string
  transliteration: string
  meaning: string
  difficulty: DifficultyLevel
  order: number
}

export interface HifzProgress {
  cardId: string
  userId?: string
  status: CardStatus
  attempts: number
  correctAttempts: number
  lastReviewed?: Date
  nextReviewDate?: Date
  interval: number
  easeFactor: number
}

export interface HifzDeck {
  id: string
  name: string
  description: string
  surahRange: [number, number]
  totalCards: number
  icon: string
  difficulty: DifficultyLevel
  estimatedTime: string
}

export interface HifzSession {
  id: string
  deckId: string
  startTime: Date
  endTime?: Date
  cardsReviewed: number
  correctCount: number
  accuracy: number
}

// Predefined Hifz Decks by Surah Groups
export const HIFZ_DECKS: HifzDeck[] = [
  {
    id: 'juz-30',
    name: 'Juz 30 - The Short Surahs',
    description: 'Perfect for beginners. Short, beautiful, frequently recited surahs',
    surahRange: [78, 114],
    totalCards: 45,
    icon: '⭐',
    difficulty: 'beginner',
    estimatedTime: '2-3 weeks',
  },
  {
    id: 'juz-29',
    name: 'Juz 29 - Al-Mujadala to Ad-Duha',
    description: 'Medium length surahs with important Islamic teachings',
    surahRange: [58, 77],
    totalCards: 38,
    icon: '📚',
    difficulty: 'beginner',
    estimatedTime: '3-4 weeks',
  },
  {
    id: 'juz-1-5',
    name: 'Juz 1-5 - Al-Fatihah to An-Nisa',
    description: 'Comprehensive Islamic guidance, law, and stories',
    surahRange: [1, 5],
    totalCards: 120,
    icon: '🎓',
    difficulty: 'intermediate',
    estimatedTime: '3-4 months',
  },
  {
    id: 'yaseen-mulk',
    name: 'Popular Surahs - Yaseen & Al-Mulk',
    description: 'Most frequently read surahs with beautiful meanings',
    surahRange: [36, 67],
    totalCards: 35,
    icon: '💫',
    difficulty: 'beginner',
    estimatedTime: '2-3 weeks',
  },
  {
    id: 'daily-duas',
    name: 'Daily Surahs - Essential for Every Muslim',
    description: 'Surahs recommended to recite daily',
    surahRange: [1, 7],
    totalCards: 28,
    icon: '🌅',
    difficulty: 'beginner',
    estimatedTime: '2 weeks',
  },
  {
    id: 'quarter-quran',
    name: 'Quarter Quran Challenge',
    description: 'Memorize 1/4 of the Quran',
    surahRange: [1, 28],
    totalCards: 200,
    icon: '🏆',
    difficulty: 'advanced',
    estimatedTime: '6-9 months',
  },
  {
    id: 'half-quran',
    name: 'Half Quran Challenge',
    description: 'Memorize 1/2 of the Quran - Major milestone',
    surahRange: [1, 57],
    totalCards: 400,
    icon: '👑',
    difficulty: 'advanced',
    estimatedTime: '12-18 months',
  },
  {
    id: 'full-quran',
    name: 'Full Quran Memorization',
    description: 'Complete memorization of all 114 Surahs (Hafiz)',
    surahRange: [1, 114],
    totalCards: 6236,
    icon: '🌟',
    difficulty: 'master',
    estimatedTime: '2-3 years',
  },
]

// Sample Hifz Cards (in production, load from database)
export const SAMPLE_HIFZ_CARDS: HifzCard[] = [
  {
    id: 'card-001',
    surah: 1,
    ayahStart: 1,
    ayahEnd: 7,
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾',
    transliteration: 'Surah Al-Fatihah (The Opening)',
    meaning: 'In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, the Lord of the worlds...',
    difficulty: 'beginner',
    order: 1,
  },
  {
    id: 'card-002',
    surah: 112,
    ayahStart: 1,
    ayahEnd: 4,
    arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾',
    transliteration: 'Surah Al-Ikhlas (Sincere Faith)',
    meaning: 'Say: He is Allah, the One and Only! Allah, the Eternal, Absolute...',
    difficulty: 'beginner',
    order: 2,
  },
  {
    id: 'card-003',
    surah: 113,
    ayahStart: 1,
    ayahEnd: 5,
    arabicText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾',
    transliteration: 'Surah Al-Falaq (The Dawn)',
    meaning: 'Say: I seek refuge with the Lord of the Dawn, from the evil of what He has created...',
    difficulty: 'beginner',
    order: 3,
  },
  {
    id: 'card-004',
    surah: 36,
    ayahStart: 1,
    ayahEnd: 12,
    arabicText: 'يس ﴿١﴾ وَالْقُرْآنِ الْحَكِيمِ ﴿٢﴾ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ﴿٣﴾',
    transliteration: 'Surah Yaseen (Ya Seen)',
    meaning: 'Ya Seen. By the Quran, full of wisdom, you are indeed one of the messengers...',
    difficulty: 'intermediate',
    order: 4,
  },
  {
    id: 'card-005',
    surah: 67,
    ayahStart: 1,
    ayahEnd: 13,
    arabicText: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ﴿١﴾',
    transliteration: 'Surah Al-Mulk (The Dominion)',
    meaning: 'Blessed is He in Whose hands is the kingdom, and He has power over all things...',
    difficulty: 'intermediate',
    order: 5,
  },
]

// Spaced Repetition Algorithm Constants (SM-2)
export const SM2_CONSTANTS = {
  INITIAL_EASE: 2.5,
  MIN_EASE: 1.3,
  EASY_BONUS: 0.1,
  HARD_PENALTY: 0.2,
  NEW_INTERVAL: 1,
  INTERVALS: [1, 3, 7, 14, 30, 60, 120, 365], // days
}

/**
 * Get all Hifz decks
 */
export function getHifzDecks(): HifzDeck[] {
  return HIFZ_DECKS
}

/**
 * Get deck by ID
 */
export function getHifzDeck(id: string): HifzDeck | undefined {
  return HIFZ_DECKS.find((d) => d.id === id)
}

/**
 * Get cards by deck
 */
export function getCardsByDeck(deckId: string): HifzCard[] {
  const deck = getHifzDeck(deckId)
  if (!deck) return []

  const [startSurah, endSurah] = deck.surahRange
  return SAMPLE_HIFZ_CARDS.filter((c) => c.surah >= startSurah && c.surah <= endSurah)
}

/**
 * Get card by ID
 */
export function getHifzCardById(id: string): HifzCard | undefined {
  return SAMPLE_HIFZ_CARDS.find((c) => c.id === id)
}

/**
 * Calculate next review date using SM-2 algorithm
 */
export function calculateNextReview(
  progress: HifzProgress,
  quality: 0 | 1 | 2 | 3 | 4 | 5 // 0-5 rating
): { nextDate: Date; interval: number; easeFactor: number } {
  let { interval, easeFactor } = progress
  let nextInterval = interval

  // SM-2 Algorithm
  if (quality < 3) {
    // Failed - restart learning
    nextInterval = 1
    easeFactor = Math.max(SM2_CONSTANTS.MIN_EASE, easeFactor - SM2_CONSTANTS.HARD_PENALTY)
  } else {
    // Passed
    if (interval === 0) {
      nextInterval = 1
    } else if (interval === 1) {
      nextInterval = 3
    } else {
      nextInterval = Math.round(interval * easeFactor)
    }
    easeFactor += quality > 4 ? SM2_CONSTANTS.EASY_BONUS : 0
  }

  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + nextInterval)

  return { nextDate, interval: nextInterval, easeFactor }
}

/**
 * Get statistics for user's memorization
 */
export interface HifzStats {
  totalCards: number
  newCards: number
  learningCards: number
  reviewCards: number
  masteredCards: number
  dailyGoal: number
  streak: number
}

export function getHifzStats(progress: Record<string, HifzProgress>): HifzStats {
  const statuses = Object.values(progress)

  return {
    totalCards: Object.keys(progress).length,
    newCards: statuses.filter((p) => p.status === 'new').length,
    learningCards: statuses.filter((p) => p.status === 'learning').length,
    reviewCards: statuses.filter((p) => p.status === 'review').length,
    masteredCards: statuses.filter((p) => p.status === 'mastered').length,
    dailyGoal: 5,
    streak: 0,
  }
}

/**
 * Get difficulty color
 */
export function getDifficultyColor(difficulty: DifficultyLevel): string {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30'
    case 'intermediate':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
    case 'advanced':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30'
    case 'master':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

/**
 * Get status color
 */
export function getStatusColor(status: CardStatus): string {
  switch (status) {
    case 'new':
      return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30'
    case 'learning':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'
    case 'review':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
    case 'mastered':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30'
    case 'expired':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
