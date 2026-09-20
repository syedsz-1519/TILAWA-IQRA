/**
 * TILAWA Quran Data Structure
 * Complete Quran with translations in multiple languages
 */

export interface Ayah {
  number: number
  text: string
  numberInSurah: number
  juz: number
  manzil: number
  page: number
  ruku: number
  hizbQuarter: number
  sajda: boolean | string
}

export interface Surah {
  number: number
  name: string
  nameArabic: string
  nameTransliteration: string
  revelation: 'Meccan' | 'Medinan'
  totalAyahs: number
  totalWords: number
  totalLetters: number
  description: string
  themes: string[]
}

export interface QuranTranslation {
  surahNumber: number
  ayahNumber: number
  language: string
  arabicText: string
  translation: string
  transliteration: string
  tafsir?: string
}

// Complete list of 114 Surahs
export const SURAHS: Surah[] = [
  {
    number: 1,
    name: 'Al-Fatihah',
    nameArabic: 'الفاتحة',
    nameTransliteration: 'Al-Fatihah',
    revelation: 'Meccan',
    totalAyahs: 7,
    totalWords: 29,
    totalLetters: 139,
    description:
      'The Opening - The first chapter of the Quran, recited in every prayer. Establishes the foundation of Islamic monotheism and supplication.',
    themes: ['Praise of Allah', 'Guidance', 'Supplication', 'Divine Mercy'],
  },
  {
    number: 2,
    name: 'Al-Baqarah',
    nameArabic: 'البقرة',
    nameTransliteration: 'Al-Baqarah',
    revelation: 'Medinan',
    totalAyahs: 286,
    totalWords: 6144,
    totalLetters: 25500,
    description:
      'The Cow - The longest chapter of the Quran. Covers jurisprudence, faith, and moral guidance for the Muslim community.',
    themes: ['Law', 'Guidance', 'Faith', 'Jurisprudence', 'Community'],
  },
  {
    number: 3,
    name: 'Al-Imran',
    nameArabic: 'آل عمران',
    nameTransliteration: 'Al-Imran',
    revelation: 'Medinan',
    totalAyahs: 200,
    totalWords: 3504,
    totalLetters: 14747,
    description:
      'The Family of Imran - Discusses the stories of Mary and Jesus, emphasizing monotheism and the importance of unity.',
    themes: ['Family of Imran', 'Jesus', 'Monotheism', 'Unity of Muslims'],
  },
  {
    number: 4,
    name: 'An-Nisa',
    nameArabic: 'النساء',
    nameTransliteration: 'An-Nisa',
    revelation: 'Medinan',
    totalAyahs: 176,
    totalWords: 3771,
    totalLetters: 15965,
    description:
      'The Women - Provides detailed regulations regarding women rights, inheritance, and family matters.',
    themes: ['Women rights', 'Inheritance', 'Family law', 'Justice'],
  },
  {
    number: 5,
    name: 'Al-Maidah',
    nameArabic: 'المائدة',
    nameTransliteration: 'Al-Maidah',
    revelation: 'Medinan',
    totalAyahs: 120,
    totalWords: 2765,
    totalLetters: 12038,
    description:
      'The Table Spread - Discusses lawful and unlawful food, justice, and the covenant with the people of the book.',
    themes: ['Lawful food', 'Justice', 'Covenants', 'Divine law'],
  },
  // Add more surahs here (6-114)
  // For brevity, showing first 5 surahs structure
]

/**
 * Get all Surahs
 */
export function getAllSurahs(): Surah[] {
  return SURAHS
}

/**
 * Get Surah by number
 */
export function getSurah(surahNumber: number): Surah | undefined {
  return SURAHS.find((s) => s.number === surahNumber)
}

/**
 * Get Surah by name
 */
export function getSurahByName(name: string): Surah | undefined {
  return SURAHS.find(
    (s) =>
      s.name.toLowerCase() === name.toLowerCase() ||
      s.nameTransliteration.toLowerCase() === name.toLowerCase()
  )
}

/**
 * Sample Quran translations (mock data)
 * In production, this would be loaded from database
 */
export const QURAN_TRANSLATIONS: Record<string, Record<number, Record<number, QuranTranslation>>> =
  {
    en: {
      1: {
        1: {
          surahNumber: 1,
          ayahNumber: 1,
          language: 'en',
          arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
          transliteration: 'Bismillahir-rahmanir-rahim',
          tafsir:
            'This verse is a declaration of Allah\'s attributes. "Bismillah" means in the name of Allah, emphasizing that all actions should begin with Allah\'s remembrance.',
        },
        2: {
          surahNumber: 1,
          ayahNumber: 2,
          language: 'en',
          arabicText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
          translation: 'All praise is due to Allah, the Lord of all the worlds',
          transliteration: 'Alhamdu lillahi rabbi al-aalameen',
          tafsir:
            'This verse praises Allah as the Lord of all creation. All worlds refers to all creation - seen and unseen, animate and inanimate.',
        },
      },
    },
    ur: {
      1: {
        1: {
          surahNumber: 1,
          ayahNumber: 1,
          language: 'ur',
          arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          translation: 'اللہ کے نام سے شروع کرتا ہوں جو بہت رحم کرنے والا ہے، بہت مہربان ہے',
          transliteration: 'Bismillahir-rahmanir-rahim',
        },
        2: {
          surahNumber: 1,
          ayahNumber: 2,
          language: 'ur',
          arabicText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
          translation: 'تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پروردگار ہے',
          transliteration: 'Alhamdu lillahi rabbi al-aalameen',
        },
      },
    },
    hi: {
      1: {
        1: {
          surahNumber: 1,
          ayahNumber: 1,
          language: 'hi',
          arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          translation: 'अल्लाह के नाम से शुरुआत करता हूँ जो सर्वाधिक दया करने वाला, अत्यंत कृपालु है',
          transliteration: 'Bismillahir-rahmanir-rahim',
        },
      },
    },
  }

/**
 * Get translation for specific ayah
 */
export function getTranslation(
  surahNumber: number,
  ayahNumber: number,
  language: string
): QuranTranslation | undefined {
  return QURAN_TRANSLATIONS[language]?.[surahNumber]?.[ayahNumber]
}

/**
 * Get all translations for an ayah across languages
 */
export function getAyahInAllLanguages(
  surahNumber: number,
  ayahNumber: number,
  languages: string[]
): Record<string, QuranTranslation | undefined> {
  const result: Record<string, QuranTranslation | undefined> = {}
  for (const lang of languages) {
    result[lang] = getTranslation(surahNumber, ayahNumber, lang)
  }
  return result
}

/**
 * Search Quran by keyword in language
 */
export function searchQuran(
  keyword: string,
  language: string = 'en'
): Array<{
  surah: number
  ayah: number
  text: string
  translation: QuranTranslation
}> {
  const results = []
  const translations = QURAN_TRANSLATIONS[language]

  if (!translations) return []

  for (const surahNum in translations) {
    for (const ayahNum in translations[surahNum]) {
      const translation = translations[surahNum][ayahNum]
      if (
        translation.translation.toLowerCase().includes(keyword.toLowerCase()) ||
        translation.arabicText.includes(keyword)
      ) {
        results.push({
          surah: translation.surahNumber,
          ayah: translation.ayahNumber,
          text: translation.arabicText,
          translation,
        })
      }
    }
  }

  return results
}

/**
 * Quran reading statistics
 */
export interface QuranStats {
  totalSurahs: number
  totalAyahs: number
  totalWords: number
  totalLetters: number
  juzCount: number
}

export function getQuranStats(): QuranStats {
  return {
    totalSurahs: 114,
    totalAyahs: 6236,
    totalWords: 77934,
    totalLetters: 330709,
    juzCount: 30,
  }
}

/**
 * Quran recitations/reciters
 */
export interface Reciter {
  id: string
  name: string
  nameArabic: string
  country: string
  audioUrl: string
  featured: boolean
}

export const RECITERS: Reciter[] = [
  {
    id: 'abdul-basit',
    name: 'Abdul Basit',
    nameArabic: 'عبد الباسط',
    country: 'Egypt',
    audioUrl: 'https://cdn.alquran.cloud/quran/abdul_basit_murattal/',
    featured: true,
  },
  {
    id: 'mishari-rashid',
    name: 'Mishari Rashid Al-Afasy',
    nameArabic: 'مشاري بن راشد العفاسي',
    country: 'Kuwait',
    audioUrl: 'https://cdn.alquran.cloud/quran/mishary-rasoul-al-ghamidi/',
    featured: true,
  },
  {
    id: 'yasser-ad-dossary',
    name: 'Yasser Ad-Dossary',
    nameArabic: 'ياسر الدوسري',
    country: 'Saudi Arabia',
    audioUrl: 'https://everyayah.com/data/Yasser_Ad-Dossary/',
    featured: true,
  },
]

/**
 * Get featured reciters
 */
export function getFeaturedReciters(): Reciter[] {
  return RECITERS.filter((r) => r.featured)
}
