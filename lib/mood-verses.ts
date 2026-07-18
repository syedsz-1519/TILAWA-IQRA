export type MoodVerse = {
  arabic: string
  translation: string
  reference: string
  surahNumber: number
  reflection: string
}

export type Mood = {
  id: string
  label: string
  verses: MoodVerse[]
}

export const moods: Mood[] = [
  {
    id: 'anxious',
    label: 'Anxious',
    verses: [
      {
        arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
        translation: 'Verily, in the remembrance of Allah do hearts find rest.',
        reference: 'Ar-Ra’d 13:28',
        surahNumber: 13,
        reflection:
          'Anxiety pulls the heart in every direction; dhikr gathers it back to one center. Recitation itself is the highest remembrance.',
      },
      {
        arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
        translation: 'And whoever relies upon Allah — then He is sufficient for him.',
        reference: 'At-Talaq 65:3',
        surahNumber: 65,
        reflection:
          'Tawakkul does not remove the storm, it removes the fear of drowning. Sufficiency from Allah outweighs every plan you could make alone.',
      },
    ],
  },
  {
    id: 'sad',
    label: 'Sad',
    verses: [
      {
        arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا * إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        translation: 'For indeed, with hardship comes ease. Indeed, with hardship comes ease.',
        reference: 'Ash-Sharh 94:5–6',
        surahNumber: 94,
        reflection:
          'The verse is repeated so the heart hears it twice: the ease is not after the hardship — it is with it, already unfolding.',
      },
      {
        arabic: 'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا',
        translation: 'Do not grieve; indeed Allah is with us.',
        reference: 'At-Tawbah 9:40',
        surahNumber: 9,
        reflection:
          'Spoken in the cave at the moment of greatest danger. Companionship of Allah is the answer to grief, not the absence of difficulty.',
      },
    ],
  },
  {
    id: 'grateful',
    label: 'Grateful',
    verses: [
      {
        arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
        translation: 'If you are grateful, I will surely increase you.',
        reference: 'Ibrahim 14:7',
        surahNumber: 14,
        reflection:
          'Gratitude is the only investment with a guaranteed return promised by Allah Himself. Name the blessing, and watch it grow.',
      },
      {
        arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
        translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
        reference: 'Al-Baqarah 2:152',
        surahNumber: 2,
        reflection:
          'The most astonishing trade in existence: your remembrance of Allah is answered by His remembrance of you.',
      },
    ],
  },
  {
    id: 'afraid',
    label: 'Afraid',
    verses: [
      {
        arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
        translation: 'Sufficient for us is Allah, and He is the best Disposer of affairs.',
        reference: 'Aal-Imran 3:173',
        surahNumber: 3,
        reflection:
          'The words of Ibrahim (AS) thrown into the fire and of the believers facing an army. Fear shrinks when measured against the One you trust.',
      },
      {
        arabic: 'وَاللَّهُ غَالِبٌ عَلَىٰ أَمْرِهِ وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يَعْلَمُونَ',
        translation: 'And Allah is predominant over His affair, but most people do not know.',
        reference: 'Yusuf 12:21',
        surahNumber: 12,
        reflection:
          'Yusuf (AS) was thrown in a well, sold, and imprisoned — and every step was carrying him to the palace. The plan holds even when you cannot see it.',
      },
    ],
  },
  {
    id: 'hopeful',
    label: 'Seeking hope',
    verses: [
      {
        arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
        translation:
          'Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah.',
        reference: 'Az-Zumar 39:53',
        surahNumber: 39,
        reflection:
          'Called the most hopeful verse in the Quran. Allah addresses the sinner as "My servant" — the relationship survives the sin.',
      },
      {
        arabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ',
        translation: 'And when My servants ask you concerning Me — indeed I am near.',
        reference: 'Al-Baqarah 2:186',
        surahNumber: 2,
        reflection:
          'Every other question in the Quran is answered with "say" (qul) — this one Allah answers directly: I am near. No intermediary between you and Him.',
      },
    ],
  },
  {
    id: 'lost',
    label: 'Feeling lost',
    verses: [
      {
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        translation: 'Guide us to the straight path.',
        reference: 'Al-Fatihah 1:6',
        surahNumber: 1,
        reflection:
          'The dua Allah taught us to make at least seventeen times a day. Asking for guidance is itself the first step of being guided.',
      },
      {
        arabic: 'وَمَن يَعْتَصِم بِاللَّهِ فَقَدْ هُدِيَ إِلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',
        translation: 'And whoever holds firmly to Allah has been guided to a straight path.',
        reference: 'Aal-Imran 3:101',
        surahNumber: 3,
        reflection:
          'Guidance is described as something already given — hold firmly, and you are on the path, even when it does not feel like it.',
      },
    ],
  },
]
