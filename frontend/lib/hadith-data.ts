/**
 * TILAWA Hadith Library
 * Authentic Hadiths from major collections
 */

export type HadithCollection = 'sahih-bukhari' | 'sahih-muslim' | 'tirmidhi' | 'abu-dawood' | 'nasai' | 'ibn-majah'

export interface Hadith {
  id: string
  collection: HadithCollection
  bookNumber: number
  hadithNumber: number
  arabicText: string
  narrator: string
  topic: string
  grade: 'Sahih' | 'Hasan' | 'Daif'
  keywords: string[]
}

export interface HadithTranslation {
  hadithId: string
  language: string
  text: string
  commentary?: string
}

export interface HadithCollection_Info {
  id: HadithCollection
  name: string
  arabicName: string
  author: string
  totalHadiths: number
  description: string
  icon: string
  verified: boolean
}

// Hadith Collections Information
export const HADITH_COLLECTIONS: HadithCollection_Info[] = [
  {
    id: 'sahih-bukhari',
    name: "Sahih Al-Bukhari",
    arabicName: 'صحيح البخاري',
    author: 'Imam Muhammad ibn Ismail Al-Bukhari',
    totalHadiths: 7563,
    description:
      'The most authentic collection of Hadith. Imam Bukhari spent 16 years collecting hadiths from 900,000 traditions.',
    icon: '📕',
    verified: true,
  },
  {
    id: 'sahih-muslim',
    name: "Sahih Muslim",
    arabicName: 'صحيح مسلم',
    author: 'Imam Muslim ibn Al-Hajjaj',
    totalHadiths: 7563,
    description:
      'Second most authentic Hadith collection. Compiled by Muslim ibn Al-Hajjaj with strict authentication criteria.',
    icon: '📗',
    verified: true,
  },
  {
    id: 'tirmidhi',
    name: "Jami at-Tirmidhi",
    arabicName: 'جامع الترمذي',
    author: 'Abu Isa Muhammad At-Tirmidhi',
    totalHadiths: 3956,
    description:
      'Important Hadith collection with classifications of hadith authenticity. Includes grades like "Sahih" and "Hasan".',
    icon: '📙',
    verified: true,
  },
  {
    id: 'abu-dawood',
    name: "Sunan Abu Dawood",
    arabicName: 'سنن أبي داود',
    author: 'Abu Dawood Sulaiman ibn Al-Ash\'ath',
    totalHadiths: 5274,
    description:
      'Comprehensive collection focused on Islamic jurisprudence. Contains rulings on various aspects of Islamic law.',
    icon: '📕',
    verified: true,
  },
  {
    id: 'nasai',
    name: "Sunan An-Nasai",
    arabicName: 'سنن النسائي',
    author: 'Ahmad ibn Shuaib An-Nasai',
    totalHadiths: 5761,
    description:
      'Known for meticulous verification. An-Nasai was famous for remembering over 100,000 hadiths.',
    icon: '📗',
    verified: true,
  },
  {
    id: 'ibn-majah',
    name: "Sunan Ibn Majah",
    arabicName: 'سنن ابن ماجه',
    author: 'Abu Abdullah Muhammad ibn Yazeed Ibn Majah',
    totalHadiths: 4332,
    description:
      'The sixth major Hadith collection. Completes the "Sihah As-Sitta" (Six Canonical Hadith Collections).',
    icon: '📙',
    verified: true,
  },
]

// Sample Hadiths (in production, load from database)
export const SAMPLE_HADITHS: Hadith[] = [
  {
    id: 'hadith-001',
    collection: 'sahih-bukhari',
    bookNumber: 1,
    hadithNumber: 1,
    arabicText:
      'عن عمر بن الخطاب رضي الله عنه قال: سمعت رسول الله صلى الله عليه وسلم يقول: "الأعمال بالنيات، وإنما لكل امرئ ما نوى"',
    narrator: 'Umar ibn Al-Khattab (رضي الله عنه)',
    topic: 'Intention and Deeds',
    grade: 'Sahih',
    keywords: ['intention', 'deeds', 'niyyah', 'actions'],
  },
  {
    id: 'hadith-002',
    collection: 'sahih-bukhari',
    bookNumber: 2,
    hadithNumber: 25,
    arabicText:
      'عن أبي هريرة رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: "من آمن بالله واليوم الآخر فليقل خيراً أو ليصمت"',
    narrator: 'Abu Hurairah (رضي الله عنه)',
    topic: 'Speech and Silence',
    grade: 'Sahih',
    keywords: ['speech', 'good words', 'silence', 'faith'],
  },
  {
    id: 'hadith-003',
    collection: 'sahih-muslim',
    bookNumber: 1,
    hadithNumber: 1,
    arabicText:
      'عن معاوية بن الحكم السلمي قال: كنت أصلي مع رسول الله صلى الله عليه وسلم فعطس رجل من القوم فقلت: يرحمك الله، فرماني القوم بأبصارهم...',
    narrator: 'Muawiyah ibn Al-Hakam As-Sulami (رضي الله عنه)',
    topic: 'Prayer Etiquette',
    grade: 'Sahih',
    keywords: ['prayer', 'etiquette', 'salah', 'manners'],
  },
  {
    id: 'hadith-004',
    collection: 'tirmidhi',
    bookNumber: 40,
    hadithNumber: 2305,
    arabicText:
      'عن أبي هريرة قال: قال رسول الله صلى الله عليه وسلم: "إن الله لا ينظر إلى أجسادكم ولا إلى صوركم ولكن ينظر إلى قلوبكم وأعمالكم"',
    narrator: 'Abu Hurairah (رضي الله عنه)',
    topic: 'Divine Judgment',
    grade: 'Hasan',
    keywords: ['heart', 'deeds', 'judgment', 'God\'s sight'],
  },
  {
    id: 'hadith-005',
    collection: 'abu-dawood',
    bookNumber: 2,
    hadithNumber: 1140,
    arabicText:
      'عن أبي سعيد الخدري قال: كنا مع رسول الله صلى الله عليه وسلم فقال: "من تصبح في السوق فهو من الجائعين"',
    narrator: 'Abu Said Al-Khudri (رضي الله عنه)',
    topic: 'Seeking Provision',
    grade: 'Daif',
    keywords: ['work', 'livelihood', 'provision', 'sustenance'],
  },
]

// Hadith Topics
export const HADITH_TOPICS = [
  'Intention and Deeds',
  'Prayer and Salah',
  'Fasting and Ramadan',
  'Charity and Zakat',
  'Hajj',
  'Manners and Etiquette',
  'Family and Marriage',
  'Knowledge and Learning',
  'Forgiveness and Mercy',
  'Justice and Rights',
  'Truthfulness',
  'Modesty',
  'Patience',
  'Gratitude',
  'Fear of Allah',
  'Divine Judgment',
  'Resurrection',
  'Paradise and Hell',
  'Prophethood',
  'Companions',
]

/**
 * Get all Hadith collections
 */
export function getHadithCollections(): HadithCollection_Info[] {
  return HADITH_COLLECTIONS
}

/**
 * Get collection by ID
 */
export function getCollection(id: HadithCollection): HadithCollection_Info | undefined {
  return HADITH_COLLECTIONS.find((c) => c.id === id)
}

/**
 * Get sample hadiths by collection
 */
export function getHadithsByCollection(collection: HadithCollection): Hadith[] {
  return SAMPLE_HADITHS.filter((h) => h.collection === collection)
}

/**
 * Get hadiths by topic
 */
export function getHadithsByTopic(topic: string): Hadith[] {
  return SAMPLE_HADITHS.filter((h) => h.topic.toLowerCase() === topic.toLowerCase())
}

/**
 * Get hadiths by grade
 */
export function getHadithsByGrade(grade: 'Sahih' | 'Hasan' | 'Daif'): Hadith[] {
  return SAMPLE_HADITHS.filter((h) => h.grade === grade)
}

/**
 * Search hadiths by keyword (Arabic or English topic)
 */
export function searchHadiths(keyword: string): Hadith[] {
  const lower = keyword.toLowerCase()
  return SAMPLE_HADITHS.filter(
    (h) =>
      h.arabicText.includes(keyword) ||
      h.topic.toLowerCase().includes(lower) ||
      h.narrator.toLowerCase().includes(lower) ||
      h.keywords.some((k) => k.toLowerCase().includes(lower))
  )
}

/**
 * Get hadith by ID
 */
export function getHadithById(id: string): Hadith | undefined {
  return SAMPLE_HADITHS.find((h) => h.id === id)
}

/**
 * Sample hadith translations (in production, from database)
 */
export const HADITH_TRANSLATIONS: Record<string, Record<string, HadithTranslation>> = {
  en: {
    'hadith-001': {
      hadithId: 'hadith-001',
      language: 'en',
      text: 'On the authority of Umar ibn Al-Khattab (may Allah be pleased with him), who said: I heard the Messenger of Allah (peace be upon him) say: "Actions are but by intentions, and verily every man shall have but that which he intended."',
      commentary:
        'This hadith is the foundation of Islamic jurisprudence. It teaches that the correctness of an action depends on the purity of intention.',
    },
    'hadith-002': {
      hadithId: 'hadith-002',
      language: 'en',
      text: 'On the authority of Abu Hurairah (may Allah be pleased with him), the Prophet (peace be upon him) said: "Whoever believes in Allah and the Last Day should speak good or keep silent."',
      commentary:
        'This hadith teaches the importance of guarding one\'s tongue and speaking only what is beneficial.',
    },
  },
  ur: {
    'hadith-001': {
      hadithId: 'hadith-001',
      language: 'ur',
      text: 'حضرت عمر بن خطاب (رضی اللہ عنہ) سے روایت ہے کہ رسول اللہ (صلی اللہ علیہ وسلم) نے فرمایا: "اعمال کا دار و مدار نیتوں پر ہے، اور ہر شخص کو وہی ملے گا جس کی اس نے نیت کی"',
    },
  },
  hi: {
    'hadith-001': {
      hadithId: 'hadith-001',
      language: 'hi',
      text: 'हज़रत उमर इब्न खत्ताब (रजि॰) से रिवायत है कि रसूल अल्लाह (सल्ल॰) ने फ़रमाया: "सभी कर्म नीयत पर निर्भर हैं, और हर व्यक्ति को वही मिलेगा जिसकी उसने नीयत की"',
    },
  },
}

/**
 * Get hadith translation
 */
export function getHadithTranslation(hadithId: string, language: string): HadithTranslation | undefined {
  return HADITH_TRANSLATIONS[language]?.[hadithId]
}

/**
 * Hadith Statistics
 */
export interface HadithStats {
  totalHadiths: number
  totalCollections: number
  sahihHadiths: number
  hasanHadiths: number
  daifHadiths: number
}

export function getHadithStats(): HadithStats {
  return {
    totalHadiths: HADITH_COLLECTIONS.reduce((sum, c) => sum + c.totalHadiths, 0),
    totalCollections: HADITH_COLLECTIONS.length,
    sahihHadiths: SAMPLE_HADITHS.filter((h) => h.grade === 'Sahih').length,
    hasanHadiths: SAMPLE_HADITHS.filter((h) => h.grade === 'Hasan').length,
    daifHadiths: SAMPLE_HADITHS.filter((h) => h.grade === 'Daif').length,
  }
}
