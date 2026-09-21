// History of Quran (Tarikh-e-Quran) content
// Source: data/Tarikh_e_Quran-8e3f92.docx — "From the First Revelation to the Final Compiled Book"

export interface ArabicQuote {
  arabic: string
  transliteration: string
  translation: string
  source: string
}

export interface HistorySection {
  id: string
  number: number
  titleEn: string
  titleUr: string
  subtitle: string
  paragraphs: string[]
  facts?: { label: string; value: string }[]
  list?: string[]
  quote?: ArabicQuote
}

export const heroStats = [
  { value: '23', label: 'Years of Revelation' },
  { value: '3', label: 'Stages of Compilation' },
  { value: '6,236', label: 'Ayaat' },
  { value: '114', label: 'Surahs' },
  { value: '1000+', label: 'Huffaz among the Sahabah' },
]

export const historySections: HistorySection[] = [
  {
    id: 'pehli-wahi',
    number: 1,
    titleEn: 'The First Revelation',
    titleUr: 'Pehli Wahi — پہلی وحی',
    subtitle: 'The extraordinary night that changed history forever',
    paragraphs: [
      'Before prophethood, Muhammad ﷺ would spend long periods in seclusion (khalwah) in the Cave of Hira on Jabal al-Noor near Makkah, devoting himself to worship and deep reflection, away from the distractions of the world.',
      'Suddenly the angel Jibra\u2019eel (AS) appeared and commanded: "Iqra" (Read!). The Prophet ﷺ replied that he could not read. Jibra\u2019eel embraced him firmly, released him, and repeated the command — three times — until the first words of divine revelation descended.',
    ],
    facts: [
      { label: 'Place', value: 'Jabal al-Noor (Cave of Hira), Makkah al-Mukarramah' },
      { label: 'Occasion', value: 'The month of Ramadan, 610 CE' },
      { label: 'Age of the Prophet ﷺ', value: '40 years' },
      { label: 'State', value: 'Engaged in seclusion and worship' },
    ],
    quote: {
      arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
      transliteration: "Iqra' bismi rabbika alladhi khalaq",
      translation: 'Read in the name of your Lord who created',
      source: 'Surah Al-Alaq (96:1) — The first revelation, 610 CE',
    },
  },
  {
    id: 'makki-madani',
    number: 2,
    titleEn: 'Makki & Madani Revelation',
    titleUr: 'Makki aur Madani Daur',
    subtitle: 'Two eras, two styles — one divine message across 23 years',
    paragraphs: [
      'The Quran was revealed gradually over 23 years. The Makki period (610–622 CE, 13 years) addressed the polytheists of Makkah with short, powerful, and stirring verses on tawheed, the hereafter, and the stories of the prophets — often beginning with "Ya ayyuhan-nas" (O mankind).',
      'The Madani period (622–632 CE, 10 years) addressed the Muslims and the People of the Book with longer, detailed, legislative verses on law, society, and treaties — often beginning with "Ya ayyuhal-ladhina amanu" (O you who believe).',
      'During the Prophet\u2019s ﷺ lifetime the Quran was written down but not yet gathered in one place. More than 40 scribes (Kuttab-e-Wahi) recorded the revelation as it descended.',
    ],
    list: [
      'Flat stones (Laukh / Hajarah)',
      'Fresh palm branches (Usub al-Nakhl)',
      'Bones of camels and horses (Azam)',
      'Camel hide (Adeem)',
      'Pieces of cloth (Riqaa)',
      'Silver tablets (Alwah min Fidda)',
    ],
  },
  {
    id: 'aakhri-wahi',
    number: 3,
    titleEn: 'The Final Revelation',
    titleUr: 'Aakhri Wahi',
    subtitle: 'The completion of the divine message',
    paragraphs: [
      'According to the well-known position of the scholars, the final verse of the Quran was revealed at Arafah during the Farewell Pilgrimage (Hujjat ul-Wada\u2019) on 9 Dhul Hijjah, 10 AH (18 March 632 CE).',
      'The Prophet ﷺ asked the gathering: "Have I conveyed the message? O Allah, bear witness." He passed away only 81 days later, on 12 Rabi ul-Awwal 11 AH. Upon hearing this verse, Umar (RA) wept — sensing that the completion of the religion signalled the approaching departure of the Messenger ﷺ.',
      'During the Prophet\u2019s ﷺ era the Quran was preserved by two mutually confirming methods: memorization (hifz) by over a thousand Companions, and writing (kitabah) by 40+ scribes. Every Ramadan the Prophet ﷺ recited the entire Quran to Jibra\u2019eel — and twice in his final year (Dour-e-Akheer).',
    ],
    quote: {
      arabic: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي',
      transliteration: "Al-yawma akmaltu lakum deenakum wa atmamtu 'alaykum ni'mati",
      translation: 'This day I have perfected for you your religion and completed My favour upon you',
      source: "Surah Al-Ma'idah (5:3) — Day of Arafah, 9 Dhul Hijjah, 10 AH (632 CE)",
    },
  },
  {
    id: 'pehla-jamaa',
    number: 4,
    titleEn: 'The First Compilation',
    titleUr: "Pehla Jamaa' — Abu Bakr (RA) ka Daur",
    subtitle: '632–634 CE | The first caliph orders the Quran gathered into one collection',
    paragraphs: [
      'After the Prophet\u2019s ﷺ passing, the false prophet Musaylimah rebelled. At the Battle of Yamama (633 CE) more than 1,200 Muslims were martyred — among them over 70 huffaz. Umar (RA) urged Abu Bakr (RA) to gather the Quran in one place before more of its carriers were lost.',
      'Abu Bakr (RA) initially hesitated: "How can I do something the Messenger of Allah ﷺ did not do?" But Allah opened his heart to it, and he entrusted the task to Zaid ibn Thabit (RA) — the foremost scribe of revelation — who said the task felt heavier than being asked to move a mountain.',
      'Zaid (RA) applied the strictest methodology: he accepted only what was written down with two witnesses AND confirmed by the memory of the huffaz, and only what had been dictated as revelation in the Prophet\u2019s ﷺ presence. The final two verses of Surah At-Tawbah were found in writing only with Khuzaymah al-Ansari (RA), whose testimony the Prophet ﷺ had declared equal to two men.',
    ],
    facts: [
      { label: 'Result', value: 'The Quran gathered for the first time into Suhuf (sheets)' },
      { label: 'Custody', value: 'Kept by Abu Bakr (RA), then Umar (RA), then Umm ul-Mu\u2019mineen Hafsa (RA)' },
      { label: 'Legacy', value: 'These Suhuf later became the foundation of the Uthmani Mushaf' },
    ],
    quote: {
      arabic: 'كَيْفَ أَفْعَلُ شَيْئًا لَمْ يَفْعَلْهُ رَسُولُ اللَّهِ ﷺ',
      transliteration: "Kayfa af'alu shay'an lam yaf'alhu Rasoolullahi ﷺ",
      translation: 'How can I do something the Messenger of Allah ﷺ did not do?',
      source: 'The first response of Abu Bakr (RA) — Sahih Bukhari',
    },
  },
  {
    id: 'doosra-jamaa',
    number: 5,
    titleEn: 'The Standardization',
    titleUr: "Doosra Jamaa' — Uthman (RA) ka Daur",
    subtitle: "644–656 CE | 'Jaami' ul-Quran' — one standard Mushaf for the whole Ummah",
    paragraphs: [
      'Hudhayfa ibn al-Yaman (RA), campaigning with the armies of Syria and Iraq, saw Muslims disputing over differing recitations — Iraq following Ibn Mas\u2019ood (RA), Syria following Ubayy ibn Ka\u2019b (RA), Madinah following Zaid ibn Thabit (RA). He rushed to Uthman (RA): "O Commander of the Faithful, save this Ummah before they differ over the Book as the Jews and Christians did!"',
      'Uthman (RA) consulted the Companions and, by consensus, formed a committee headed by Zaid ibn Thabit (RA) with Abdullah ibn Zubayr, Sa\u2019eed ibn al-\u2019As, and Abdur-Rahman ibn al-Harith (RA). The Suhuf of Hafsa (RA) served as the foundation; where dialects differed, the Qurayshi form was preferred; only mutawatir (mass-transmitted) readings were accepted; and dots and vowel marks were omitted so the valid readings could all be accommodated.',
      'Five to nine copies were prepared and dispatched with a teacher-reciter to Makkah, Madinah (the Mushaf-e-Imam), Kufa, Basra, and Damascus — and by some reports Bahrain and Yemen. Divergent private copies were destroyed to prevent confusion. The Mushaf-e-Uthmani remains the standard to this day.',
    ],
  },
  {
    id: 'aham-sahaba',
    number: 6,
    titleEn: 'The Key Companions',
    titleUr: "Jamaa'-e-Quran ke Aham Sahaba",
    subtitle: 'The blessed personalities behind the preservation',
    paragraphs: [
      'Zaid ibn Thabit (RA) is the central figure: chosen as a scribe of revelation at just 17, present at the Prophet\u2019s ﷺ final review of the Quran, leader of both compilations, and instructed by the Prophet ﷺ to learn the Torah\u2019s script and Syriac.',
    ],
    list: [
      'Zaid ibn Thabit (RA) — scribe of revelation, led both the first and second compilations',
      'Abu Bakr Siddiq (RA) — gave the first command to gather the Quran',
      'Umar ibn al-Khattab (RA) — first proposed the compilation and safeguarded the Suhuf',
      'Uthman ibn Affan (RA) — "Jaami\u2019 ul-Quran", standardized the Mushaf for the whole world',
      'Hafsa bint Umar (RA) — trusted custodian of the Suhuf between the two compilations',
      'Ali ibn Abi Talib (RA) — scribe of revelation who upheld the Uthmani Mushaf in his caliphate',
    ],
  },
  {
    id: 'qiraat',
    number: 8,
    titleEn: 'The Science of Qira\u2019at',
    titleUr: "Ilm-e-Qira'at",
    subtitle: 'Seven ahruf, ten canonical readings — all traced to the Prophet ﷺ',
    paragraphs: [
      'The Quran was revealed upon seven ahruf (modes), from which the famous canonical Qira\u2019at emerged — each with an unbroken chain of transmission to the Prophet ﷺ: Nafi\u2019 (Madinah), Ibn Katheer (Makkah), Abu Amr (Basra), Ibn Aamir (Sham), Asim (Kufa), Hamza (Kufa), and Kisai (Kufa).',
      'Today the riwayah of Hafs \u2019an Asim is the most widespread in the world, while Warsh \u2019an Nafi\u2019 is recited across North and West Africa.',
    ],
    quote: {
      arabic: 'إِنَّ هَذَا الْقُرْآنَ أُنْزِلَ عَلَى سَبْعَةِ أَحْرُفٍ',
      transliteration: "Inna haadhal Qur'ana unzila 'alaa sab'ati ahruf",
      translation: 'Indeed, this Quran was revealed upon seven ahruf',
      source: 'Sahih Bukhari & Sahih Muslim — Mutawatir hadith',
    },
  },
  {
    id: 'hifazat',
    number: 9,
    titleEn: 'The Divine Promise of Preservation',
    titleUr: 'Hifazat-e-Quran — Allah ka Wada',
    subtitle: 'A promise being fulfilled for over 1,400 years',
    paragraphs: [
      'The Quran is the only book in history preserved letter-for-letter for over fourteen centuries. More than ten million huffaz across the world carry it in their hearts; children still memorize it completely by the age of seven to nine; and every Ramadan it is recited in full in Taraweeh across the globe. Every hafiz\u2019s chain of transmission (isnad) reaches back to the Prophet ﷺ himself.',
    ],
    quote: {
      arabic: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
      transliteration: 'Innaa nahnu nazzalnad-dhikra wa innaa lahu la-haafizoon',
      translation: 'Indeed, it is We who sent down the Reminder, and indeed, We will be its Guardian',
      source: "Surah Al-Hijr (15:9) — Allah's promise, fulfilled to this day",
    },
  },
]

export interface TimelineEvent {
  period: string
  event: string
  detail: string
}

export const historyTimeline: TimelineEvent[] = [
  { period: '610 CE', event: 'The First Revelation', detail: 'The first 5 verses of Surah Al-Alaq revealed in the Cave of Hira' },
  { period: '610–622 CE', event: 'The Makki Period', detail: '13 years — revelation of tawheed, the hereafter, and the stories of the prophets' },
  { period: '622 CE', event: 'Hijrah to Madinah', detail: 'The Prophet ﷺ migrates — the Madani period begins' },
  { period: '622–632 CE', event: 'The Madani Period', detail: '10 years — revelation of law, governance, and treaties' },
  { period: '632 CE', event: "Hujjat ul-Wada'", detail: "The final revelation — Surah Al-Ma'idah 5:3 at Arafah" },
  { period: '632 CE', event: 'Passing of the Prophet ﷺ', detail: '12 Rabi ul-Awwal — the Quran preserved in both memory and writing' },
  { period: '633 CE', event: 'Battle of Yamama', detail: '70+ huffaz martyred — the need for compilation becomes urgent' },
  { period: '633 CE', event: 'The First Compilation', detail: 'Abu Bakr (RA) commissions Zaid ibn Thabit (RA) to prepare the Suhuf' },
  { period: '634 CE', event: 'Suhuf passes to Umar (RA)', detail: 'Safeguarded after the passing of Abu Bakr (RA)' },
  { period: '644 CE', event: 'Suhuf passes to Hafsa (RA)', detail: 'Entrusted to the Mother of the Believers after Umar (RA)' },
  { period: '644–656 CE', event: 'The Second Compilation', detail: 'Uthman (RA) commissions the standard Mushaf' },
  { period: '~650 CE', event: 'The Mushaf-e-Uthmani', detail: 'Copies sent across the Islamic world — standardization complete' },
]

export const closingNote = {
  arabic: 'وَاللَّهُ يَعْصِمُكَ مِنَ النَّاسِ',
  text: 'SubhanAllah — this Quran is the Word of Allah, and its preservation is His promise.',
}
