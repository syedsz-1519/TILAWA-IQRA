export interface TajweedRule {
  id: string
  name: string
  arabicName: string
  color: string
  description: string
  application: string
  examples: Array<{
    arabic: string
    explanation: string
  }>
}

export const tajweedRules: TajweedRule[] = [
  {
    id: 'ikhfa',
    name: 'Ikhfa (Concealment)',
    arabicName: 'الإخفاء',
    color: '#9333EA', // Purple
    description:
      'Ikhfa means to hide or conceal. When noon or tanween is followed by one of the 15 ikhfa letters, it is pronounced with a nasal sound but not fully clear, creating a middle ground between idgham and izhar.',
    application:
      'When you see noon or tanween followed by ث، ج، ش، ق، س، د، ط، ز، ف، ت، ك، ل، ن، ب، or ظ—pronounce the noon with a nasal sound that is neither fully clear nor fully merged.',
    examples: [
      {
        arabic: 'مِنْ شَاءَ',
        explanation:
          'The noon is concealed with a nasal sound before the sheen ش',
      },
      {
        arabic: 'إِنَّ اللَّهَ',
        explanation:
          'The tanween is concealed before the lam ل',
      },
      {
        arabic: 'عَن قَرِيبٍ',
        explanation:
          'The noon is concealed before the qaf ق with a nasal sound',
      },
    ],
  },
  {
    id: 'idgham',
    name: 'Idgham (Merging)',
    arabicName: 'الإدغام',
    color: '#DC2626', // Red
    description:
      'Idgham means to merge two sounds into one. When noon or tanween is followed by one of the yaʾ, waaw, laam, or raaʾ letters, the noon/tanween is merged into the following letter.',
    application:
      'When noon or tanween is followed by ي، و، ل، or ن—merge the noon into the following letter so it becomes one emphasized sound.',
    examples: [
      {
        arabic: 'وَمِن يَعْمَل',
        explanation:
          'The noon merges into the yaʾ ي, creating a single merged sound',
      },
      {
        arabic: 'كُلٌّ وَاحِد',
        explanation:
          'The tanween merges into the waaw و, pronounced as one sound',
      },
      {
        arabic: 'أَن لَّا',
        explanation:
          'The noon merges into the laam ل with emphasis and length',
      },
    ],
  },
  {
    id: 'iqlab',
    name: 'Iqlab (Transformation)',
    arabicName: 'الإقلاب',
    color: '#EA580C', // Orange
    description:
      'Iqlab means to transform. When noon or tanween comes before the letter ba (ب), the noon is transformed into a meem (م) and pronounced with a nasal sound.',
    application:
      'When noon or tanween is followed by ب—pronounce it as a meem (م) with a subtle nasal quality, not a full meem sound.',
    examples: [
      {
        arabic: 'أَنْبَأَهُمْ',
        explanation:
          'The noon is transformed into a meem before the ba ب',
      },
      {
        arabic: 'نَّبِيّ',
        explanation:
          'The tanween becomes a meem before the ba ب',
      },
    ],
  },
  {
    id: 'izhar',
    name: 'Izhar (Clearness)',
    arabicName: 'الإظهار',
    color: '#15803D', // Green
    description:
      'Izhar means to make clear or manifest. When noon or tanween is followed by one of the throat letters (ء، ه، ع، ح، غ، خ), the noon must be pronounced clearly and distinctly with no merging or concealment.',
    application:
      'When noon or tanween is followed by ء، ه، ع، ح، غ، or خ—pronounce the noon clearly and separately, without any connection to the following letter.',
    examples: [
      {
        arabic: 'مِنْ هَاهُنَا',
        explanation:
          'The noon is clear before the haa ه at the beginning of a new word',
      },
      {
        arabic: 'وَإِنْ أَحَد',
        explanation:
          'The noon is pronounced clearly before the ain ع',
      },
      {
        arabic: 'صِنْوَان',
        explanation:
          'The noon is clear before the waaw و as a different letter',
      },
    ],
  },
  {
    id: 'qalqalah',
    name: 'Qalqalah (Vibration)',
    arabicName: 'القلقلة',
    color: '#2563EB', // Blue
    description:
      'Qalqalah means a vibration or echo. When any of the five qalqalah letters (ق، ط، ب، ج، د) have a sukun (no vowel) at the end of a word or before another letter, they are pronounced with a slight echo or vibration.',
    application:
      'When ق، ط، ب، ج، or د have a sukun—pronounce them with a bouncy, vibrant echo that seems to repeat the sound slightly.',
    examples: [
      {
        arabic: 'بِسْمِ',
        explanation:
          'The ba ب with sukun has a qalqalah vibration at the end',
      },
      {
        arabic: 'الْحَمْدُ',
        explanation:
          'The dal د with sukun vibrates slightly',
      },
      {
        arabic: 'تَقُومُ',
        explanation:
          'The ta ت with sukun has a subtle bouncy echo',
      },
    ],
  },
  {
    id: 'madd',
    name: 'Madd (Lengthening)',
    arabicName: 'المد',
    color: '#0891B2', // Cyan
    description:
      'Madd means to lengthen or stretch. When an alef, waaw, or yaʾ comes with a specific vowel, the sound is prolonged for 2-6 counts depending on the type of madd.',
    application:
      'Hold the madd letter for the appropriate count: natural madd (2 counts), madd with hamza (4-5 counts), madd with sukun (4-5 counts).',
    examples: [
      {
        arabic: 'آمَن',
        explanation:
          'Natural madd on the alef—hold for 2 counts: "aaamen"',
      },
      {
        arabic: 'قَآئِمُون',
        explanation:
          'Madd with hamza—extend the alef sound for 4-5 counts',
      },
      {
        arabic: 'السّمَاء',
        explanation:
          'Madd with hamza on the final alef—lengthen appropriately',
      },
    ],
  },
  {
    id: 'ghunnah',
    name: 'Ghunnah (Nasalization)',
    arabicName: 'الغنة',
    color: '#8B5CF6', // Violet
    description:
      'Ghunnah means a nasal sound. When noon or meem have a damma, damma, or sukun, they are pronounced with a nasal resonance, adding a nasal quality to the sound.',
    application:
      'When pronouncing noon or meem with sukun or vowels—add a nasal "ng" quality to the sound, as if pronouncing through the nose.',
    examples: [
      {
        arabic: 'مِنْ',
        explanation:
          'The noon has ghunnah—pronounced with nasal resonance: "minn"',
      },
      {
        arabic: 'نِعْمَة',
        explanation:
          'The noon with sukun carries ghunnah with a nasal quality',
      },
      {
        arabic: 'مِيم',
        explanation:
          'The meem carries ghunnah throughout its sound',
      },
    ],
  },
  {
    id: 'tafkheem',
    name: 'Tafkheem (Heaviness)',
    arabicName: 'التفخيم',
    color: '#D97706', // Amber
    description:
      'Tafkheem means to make heavy or emphatic. Certain letters are pronounced with the back of the tongue raised and pulled back, creating a heavier, deeper sound.',
    application:
      'When pronouncing the emphasized letters ص، ض، ط، ظ—raise the back of your tongue and deepen the sound, making it heavier and more resonant than normal letters.',
    examples: [
      {
        arabic: 'الصَّلَاة',
        explanation:
          'The sad ص is pronounced with tafkheem—a heavier, emphatic sound',
      },
      {
        arabic: 'الضَّالُّون',
        explanation:
          'The dad ض is pronounced with emphasis and depth',
      },
      {
        arabic: 'الطَّارِق',
        explanation:
          'The ta ط is emphasized with a deeper resonance',
      },
    ],
  },
]
