// Curated educational content for Iqra Mode.
// Sources: widely accepted accounts from Sahih al-Bukhari, Sahih Muslim,
// and classical works of Ulum al-Quran (e.g., al-Itqan by as-Suyuti).

export type TimelineEvent = {
  period: string
  title: string
  description: string
}

export type FactCard = {
  title: string
  arabic?: string
  description: string
}

// ---------------------------------------------------------------------------
// Section 1: Nuzool-e-Quran (The Revelation of the Quran)
// ---------------------------------------------------------------------------

export const nuzoolIntro =
  'Nuzool-e-Quran refers to the descent (revelation) of the Quran from Allah to the Prophet Muhammad ﷺ. The Quran was not revealed all at once — it descended in stages over approximately 23 years, responding to events, questions, and the needs of the growing Muslim community.'

export const nuzoolStages: FactCard[] = [
  {
    title: 'Stage 1 — Al-Lawh al-Mahfuz',
    arabic: 'اللوح المحفوظ',
    description:
      'The Quran existed first in the Preserved Tablet (al-Lawh al-Mahfuz) with Allah. "Nay, this is a Glorious Quran, inscribed in a Preserved Tablet" (Surah Al-Buruj 85:21-22).',
  },
  {
    title: 'Stage 2 — Bayt al-Izzah',
    arabic: 'بيت العزة',
    description:
      'The Quran was sent down in its entirety to Bayt al-Izzah (the House of Honor) in the lowest heaven on Laylat al-Qadr. "Indeed, We sent it down during the Night of Decree" (Surah Al-Qadr 97:1).',
  },
  {
    title: 'Stage 3 — Gradual revelation',
    arabic: 'التنزيل المنجم',
    description:
      'From the lowest heaven, the Angel Jibreel (Gabriel) عليه السلام brought the Quran to the Prophet ﷺ gradually over ~23 years — 13 years in Makkah and 10 years in Madinah — ayah by ayah and surah by surah.',
  },
]

export const nuzoolFacts: FactCard[] = [
  {
    title: 'The first revelation',
    arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    description:
      'The first verses revealed were the opening of Surah Al-Alaq (96:1-5), beginning with "Iqra" — "Read in the name of your Lord who created." They were revealed in the Cave of Hira on Jabal an-Nur near Makkah, when the Prophet ﷺ was 40 years old, during Ramadan (circa 610 CE).',
  },
  {
    title: 'Laylat al-Qadr',
    arabic: 'لَيْلَةُ الْقَدْرِ',
    description:
      'The Night of Decree, in the last ten nights of Ramadan, marks the start of revelation. Worship on this night is described as better than a thousand months (Surah Al-Qadr 97:3).',
  },
  {
    title: 'Makki and Madani surahs',
    description:
      'Surahs revealed before the Hijrah are called Makki — typically short, powerful verses about tawheed, the hereafter, and stories of earlier prophets. Surahs revealed after the Hijrah are Madani — generally longer, covering law, society, family, and relations with other communities. Roughly 86 surahs are classified Makki and 28 Madani.',
  },
  {
    title: 'Why gradual revelation?',
    description:
      'The Quran itself answers: "so that We may strengthen your heart thereby, and We have recited it with measured recitation" (Surah Al-Furqan 25:32). Gradual revelation made memorization easy, answered real events as they happened, and allowed laws (like the prohibition of alcohol) to be established in stages.',
  },
  {
    title: 'The final revelation',
    description:
      'Among the last verses revealed: "This day I have perfected for you your religion and completed My favor upon you" (Surah Al-Ma\u2019idah 5:3), revealed during the Farewell Pilgrimage, roughly 81 days before the Prophet\u2019s ﷺ passing.',
  },
  {
    title: 'Modes of revelation (wahy)',
    description:
      'Revelation came in different forms: true dreams, the ringing of a bell (described as the hardest), and Jibreel appearing in human form or his true form. The Prophet ﷺ would repeat the verses and the companions memorized and wrote them down immediately.',
  },
]

// ---------------------------------------------------------------------------
// Section 2: History of the Quran (compilation & preservation)
// ---------------------------------------------------------------------------

export const historyIntro =
  'From the first word revealed in the Cave of Hira to the printed mushaf in your hands, the Quran has been preserved through an unbroken chain of memorization and writing. This timeline traces how the Quran was recorded, compiled, and standardized.'

export const historyTimeline: TimelineEvent[] = [
  {
    period: '610 CE',
    title: 'The first revelation',
    description:
      'In the Cave of Hira, Jibreel عليه السلام delivers the first verses of Surah Al-Alaq to the Prophet Muhammad ﷺ. Revelation continues for the next 23 years.',
  },
  {
    period: '610–632 CE',
    title: 'Memorization and written recording',
    description:
      'The Prophet ﷺ dictated each new revelation to appointed scribes — including Zayd ibn Thabit, Ali ibn Abi Talib, and Ubayy ibn Ka\u2019b — who wrote on parchment, palm leaves, flat stones, and bone. Hundreds of companions (huffaz) memorized the entire Quran. Jibreel reviewed the whole Quran with the Prophet ﷺ every Ramadan, and twice in his final year.',
  },
  {
    period: '632–634 CE',
    title: 'First compilation under Abu Bakr (RA)',
    description:
      'After many huffaz were martyred at the Battle of Yamamah, Umar ibn al-Khattab (RA) urged Caliph Abu Bakr (RA) to compile the Quran into one volume. Zayd ibn Thabit (RA) led the task, verifying every verse against both written records and memorization by multiple witnesses. The compiled sheets (suhuf) were kept with Abu Bakr, then Umar, then Hafsah bint Umar (RA).',
  },
  {
    period: '~650 CE',
    title: 'Standardization under Uthman (RA)',
    description:
      'As Islam spread, differences in recitation dialects caused concern. Caliph Uthman (RA) commissioned Zayd ibn Thabit and a committee to produce standardized copies from Hafsah\u2019s suhuf, written in the Quraysh dialect. Master copies were sent to major cities (Makkah, Kufa, Basra, Damascus), and variant personal copies were retired. This is why the Quranic text is called the Uthmanic mushaf (Rasm Uthmani).',
  },
  {
    period: '~680–750 CE',
    title: 'Dots and diacritics',
    description:
      'To help non-Arab Muslims read correctly, scholars — beginning with Abu al-Aswad ad-Du\u2019ali and later Al-Khalil ibn Ahmad — added consonant dots (i\u2019jam) and vowel marks (tashkeel/harakat) to the script. The text itself remained unchanged.',
  },
  {
    period: '8th–15th centuries',
    title: 'The science of qira\u2019at and manuscripts',
    description:
      'The ten canonical recitations (qira\u2019at) — each with an unbroken chain to the Prophet ﷺ — were documented by scholars like Ibn Mujahid and Ibn al-Jazari. Magnificent manuscripts were produced across the Muslim world; early copies such as the Topkapi and Samarkand manuscripts survive today.',
  },
  {
    period: '1924 CE',
    title: 'The Cairo edition',
    description:
      'The Amiri (Cairo) edition standardized modern printing in the Hafs \u2018an \u2018Asim recitation, becoming the basis for most printed mushafs today.',
  },
  {
    period: 'Today',
    title: 'Digital preservation',
    description:
      'The Quran is the most memorized book on earth, with millions of huffaz. Digital mushafs, verified audio recitations (like Sheikh Yasser Al-Dosari\u2019s), and apps like TILAWA continue the same mission: preserving and teaching the Quran exactly as it was revealed.',
  },
]

export const historyFacts: FactCard[] = [
  {
    title: 'Divine promise of preservation',
    arabic: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
    description:
      '"Indeed, it is We who sent down the Reminder, and indeed, We will be its guardian" (Surah Al-Hijr 15:9).',
  },
  {
    title: 'Structure of the Quran',
    description:
      '114 surahs, over 6,200 ayat, divided into 30 juz (parts) and 7 manazil (stations) for easy reading over a month or a week.',
  },
  {
    title: 'Dual preservation',
    description:
      'The Quran is unique in being preserved both in writing (mushaf) and in the hearts of millions of memorizers (huffaz) — each generation verifying the other.',
  },
]
