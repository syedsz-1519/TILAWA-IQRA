export interface Surah {
  number: number
  nameArabic: string
  nameTransliterated: string
  nameTranslated: string
  ayahCount: number
  revelationPlace: 'Makkah' | 'Madinah'
}

export interface Reciter {
  id: string
  nameEnglish: string
  nameArabic: string
  riwayah: string
  cdnTemplate: string
  backupTemplate?: string
}

export const RECITERS: Reciter[] = [
  {
    id: 'yasser-al-dosari',
    nameEnglish: 'Yasser Al-Dosari',
    nameArabic: 'ياسر الدوسري',
    riwayah: "Hafs 'an 'Asim",
    cdnTemplate: 'https://server11.mp3quran.net/yasser/{surah}.mp3',
    backupTemplate: 'https://download.quranicaudio.com/quran/yasser_ad-dussary/{surah}.mp3',
  },
  {
    id: 'mishary-alafasy',
    nameEnglish: 'Mishary Rashid Alafasy',
    nameArabic: 'مشاري راشد العفاسي',
    riwayah: "Hafs 'an 'Asim",
    cdnTemplate: 'https://server8.mp3quran.net/afs/{surah}.mp3',
    backupTemplate: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/{surah}.mp3',
  },
  {
    id: 'abdul-rahman-al-sudais',
    nameEnglish: 'Abdul Rahman Al-Sudais',
    nameArabic: 'عبد الرحمن السديس',
    riwayah: "Hafs 'an 'Asim",
    cdnTemplate: 'https://server11.mp3quran.net/sds/{surah}.mp3',
    backupTemplate: 'https://download.quranicaudio.com/quran/abdul_rahmaan_as-sudays/{surah}.mp3',
  },
  {
    id: 'maher-al-muaiqly',
    nameEnglish: 'Maher Al-Muaiqly',
    nameArabic: 'ماهر المعيقلي',
    riwayah: "Hafs 'an 'Asim",
    cdnTemplate: 'https://server12.mp3quran.net/maher/{surah}.mp3',
    backupTemplate: 'https://download.quranicaudio.com/quran/maher_almu3aiqly/year1440/{surah}.mp3',
  },
  {
    id: 'saad-al-ghamdi',
    nameEnglish: 'Saad Al-Ghamdi',
    nameArabic: 'سعد الغامدي',
    riwayah: "Hafs 'an 'Asim",
    cdnTemplate: 'https://server7.mp3quran.net/s_gmd/{surah}.mp3',
    backupTemplate: 'https://download.quranicaudio.com/quran/sa3d_al-ghaamidi/complete/{surah}.mp3',
  },
  {
    id: 'abdul-basit',
    nameEnglish: 'Abdul Basit Abdul Samad',
    nameArabic: 'عبد الباسط عبد الصمد',
    riwayah: 'Murattal',
    cdnTemplate: 'https://server7.mp3quran.net/basit/{surah}.mp3',
    backupTemplate: 'https://download.quranicaudio.com/quran/abdulbaset_mujawwad/{surah}.mp3',
  },
]

export const DEFAULT_RECITER = RECITERS[0]

export function getSurahAudioUrl(surahNumber: number, reciter: Reciter = DEFAULT_RECITER): string {
  const padded = String(surahNumber).padStart(3, '0')
  return reciter.cdnTemplate.replace('{surah}', padded)
}

export function getSurahAudioUrls(surahNumber: number, reciter: Reciter = DEFAULT_RECITER): string[] {
  const padded = String(surahNumber).padStart(3, '0')
  const urls = [reciter.cdnTemplate.replace('{surah}', padded)]
  if (reciter.backupTemplate) {
    urls.push(reciter.backupTemplate.replace('{surah}', padded))
  }
  return urls
}

export const SURAHS: Surah[] = [
  { number: 1, nameArabic: 'الفاتحة', nameTransliterated: 'Al-Fatihah', nameTranslated: 'The Opening', ayahCount: 7, revelationPlace: 'Makkah' },
  { number: 2, nameArabic: 'البقرة', nameTransliterated: 'Al-Baqarah', nameTranslated: 'The Cow', ayahCount: 286, revelationPlace: 'Madinah' },
  { number: 3, nameArabic: 'آل عمران', nameTransliterated: "Aal-E-Imran", nameTranslated: 'The Family of Imran', ayahCount: 200, revelationPlace: 'Madinah' },
  { number: 4, nameArabic: 'النساء', nameTransliterated: 'An-Nisa', nameTranslated: 'The Women', ayahCount: 176, revelationPlace: 'Madinah' },
  { number: 5, nameArabic: 'المائدة', nameTransliterated: "Al-Ma'idah", nameTranslated: 'The Table Spread', ayahCount: 120, revelationPlace: 'Madinah' },
  { number: 6, nameArabic: 'الأنعام', nameTransliterated: "Al-An'am", nameTranslated: 'The Cattle', ayahCount: 165, revelationPlace: 'Makkah' },
  { number: 7, nameArabic: 'الأعراف', nameTransliterated: "Al-A'raf", nameTranslated: 'The Heights', ayahCount: 206, revelationPlace: 'Makkah' },
  { number: 8, nameArabic: 'الأنفال', nameTransliterated: 'Al-Anfal', nameTranslated: 'The Spoils of War', ayahCount: 75, revelationPlace: 'Madinah' },
  { number: 9, nameArabic: 'التوبة', nameTransliterated: 'At-Tawbah', nameTranslated: 'The Repentance', ayahCount: 129, revelationPlace: 'Madinah' },
  { number: 10, nameArabic: 'يونس', nameTransliterated: 'Yunus', nameTranslated: 'Jonah', ayahCount: 109, revelationPlace: 'Makkah' },
  { number: 11, nameArabic: 'هود', nameTransliterated: 'Hud', nameTranslated: 'Hud', ayahCount: 123, revelationPlace: 'Makkah' },
  { number: 12, nameArabic: 'يوسف', nameTransliterated: 'Yusuf', nameTranslated: 'Joseph', ayahCount: 111, revelationPlace: 'Makkah' },
  { number: 13, nameArabic: 'الرعد', nameTransliterated: "Ar-Ra'd", nameTranslated: 'The Thunder', ayahCount: 43, revelationPlace: 'Madinah' },
  { number: 14, nameArabic: 'إبراهيم', nameTransliterated: 'Ibrahim', nameTranslated: 'Abraham', ayahCount: 52, revelationPlace: 'Makkah' },
  { number: 15, nameArabic: 'الحجر', nameTransliterated: 'Al-Hijr', nameTranslated: 'The Rocky Tract', ayahCount: 99, revelationPlace: 'Makkah' },
  { number: 16, nameArabic: 'النحل', nameTransliterated: 'An-Nahl', nameTranslated: 'The Bee', ayahCount: 128, revelationPlace: 'Makkah' },
  { number: 17, nameArabic: 'الإسراء', nameTransliterated: 'Al-Isra', nameTranslated: 'The Night Journey', ayahCount: 111, revelationPlace: 'Makkah' },
  { number: 18, nameArabic: 'الكهف', nameTransliterated: 'Al-Kahf', nameTranslated: 'The Cave', ayahCount: 110, revelationPlace: 'Makkah' },
  { number: 19, nameArabic: 'مريم', nameTransliterated: 'Maryam', nameTranslated: 'Mary', ayahCount: 98, revelationPlace: 'Makkah' },
  { number: 20, nameArabic: 'طه', nameTransliterated: 'Taha', nameTranslated: 'Ta-Ha', ayahCount: 135, revelationPlace: 'Makkah' },
  { number: 21, nameArabic: 'الأنبياء', nameTransliterated: 'Al-Anbiya', nameTranslated: 'The Prophets', ayahCount: 112, revelationPlace: 'Makkah' },
  { number: 22, nameArabic: 'الحج', nameTransliterated: 'Al-Hajj', nameTranslated: 'The Pilgrimage', ayahCount: 78, revelationPlace: 'Madinah' },
  { number: 23, nameArabic: 'المؤمنون', nameTransliterated: "Al-Mu'minun", nameTranslated: 'The Believers', ayahCount: 118, revelationPlace: 'Makkah' },
  { number: 24, nameArabic: 'النور', nameTransliterated: 'An-Nur', nameTranslated: 'The Light', ayahCount: 64, revelationPlace: 'Madinah' },
  { number: 25, nameArabic: 'الفرقان', nameTransliterated: 'Al-Furqan', nameTranslated: 'The Criterion', ayahCount: 77, revelationPlace: 'Makkah' },
  { number: 26, nameArabic: 'الشعراء', nameTransliterated: "Ash-Shu'ara", nameTranslated: 'The Poets', ayahCount: 227, revelationPlace: 'Makkah' },
  { number: 27, nameArabic: 'النمل', nameTransliterated: 'An-Naml', nameTranslated: 'The Ant', ayahCount: 93, revelationPlace: 'Makkah' },
  { number: 28, nameArabic: 'القصص', nameTransliterated: 'Al-Qasas', nameTranslated: 'The Stories', ayahCount: 88, revelationPlace: 'Makkah' },
  { number: 29, nameArabic: 'العنكبوت', nameTransliterated: 'Al-Ankabut', nameTranslated: 'The Spider', ayahCount: 69, revelationPlace: 'Makkah' },
  { number: 30, nameArabic: 'الروم', nameTransliterated: 'Ar-Rum', nameTranslated: 'The Romans', ayahCount: 60, revelationPlace: 'Makkah' },
  { number: 31, nameArabic: 'لقمان', nameTransliterated: 'Luqman', nameTranslated: 'Luqman', ayahCount: 34, revelationPlace: 'Makkah' },
  { number: 32, nameArabic: 'السجدة', nameTransliterated: 'As-Sajdah', nameTranslated: 'The Prostration', ayahCount: 30, revelationPlace: 'Makkah' },
  { number: 33, nameArabic: 'الأحزاب', nameTransliterated: 'Al-Ahzab', nameTranslated: 'The Combined Forces', ayahCount: 73, revelationPlace: 'Madinah' },
  { number: 34, nameArabic: 'سبأ', nameTransliterated: 'Saba', nameTranslated: 'Sheba', ayahCount: 54, revelationPlace: 'Makkah' },
  { number: 35, nameArabic: 'فاطر', nameTransliterated: 'Fatir', nameTranslated: 'The Originator', ayahCount: 45, revelationPlace: 'Makkah' },
  { number: 36, nameArabic: 'يس', nameTransliterated: 'Ya-Sin', nameTranslated: 'Ya Sin', ayahCount: 83, revelationPlace: 'Makkah' },
  { number: 37, nameArabic: 'الصافات', nameTransliterated: 'As-Saffat', nameTranslated: 'Those Who Set the Ranks', ayahCount: 182, revelationPlace: 'Makkah' },
  { number: 38, nameArabic: 'ص', nameTransliterated: 'Sad', nameTranslated: 'The Letter Sad', ayahCount: 88, revelationPlace: 'Makkah' },
  { number: 39, nameArabic: 'الزمر', nameTransliterated: 'Az-Zumar', nameTranslated: 'The Troops', ayahCount: 75, revelationPlace: 'Makkah' },
  { number: 40, nameArabic: 'غافر', nameTransliterated: 'Ghafir', nameTranslated: 'The Forgiver', ayahCount: 85, revelationPlace: 'Makkah' },
  { number: 41, nameArabic: 'فصلت', nameTransliterated: 'Fussilat', nameTranslated: 'Explained in Detail', ayahCount: 54, revelationPlace: 'Makkah' },
  { number: 42, nameArabic: 'الشورى', nameTransliterated: 'Ash-Shura', nameTranslated: 'The Consultation', ayahCount: 53, revelationPlace: 'Makkah' },
  { number: 43, nameArabic: 'الزخرف', nameTransliterated: 'Az-Zukhruf', nameTranslated: 'The Ornaments of Gold', ayahCount: 89, revelationPlace: 'Makkah' },
  { number: 44, nameArabic: 'الدخان', nameTransliterated: 'Ad-Dukhan', nameTranslated: 'The Smoke', ayahCount: 59, revelationPlace: 'Makkah' },
  { number: 45, nameArabic: 'الجاثية', nameTransliterated: 'Al-Jathiyah', nameTranslated: 'The Crouching', ayahCount: 37, revelationPlace: 'Makkah' },
  { number: 46, nameArabic: 'الأحقاف', nameTransliterated: 'Al-Ahqaf', nameTranslated: 'The Wind-Curved Sandhills', ayahCount: 35, revelationPlace: 'Makkah' },
  { number: 47, nameArabic: 'محمد', nameTransliterated: 'Muhammad', nameTranslated: 'Muhammad', ayahCount: 38, revelationPlace: 'Madinah' },
  { number: 48, nameArabic: 'الفتح', nameTransliterated: 'Al-Fath', nameTranslated: 'The Victory', ayahCount: 29, revelationPlace: 'Madinah' },
  { number: 49, nameArabic: 'الحجرات', nameTransliterated: 'Al-Hujurat', nameTranslated: 'The Rooms', ayahCount: 18, revelationPlace: 'Madinah' },
  { number: 50, nameArabic: 'ق', nameTransliterated: 'Qaf', nameTranslated: 'The Letter Qaf', ayahCount: 45, revelationPlace: 'Makkah' },
  { number: 51, nameArabic: 'الذاريات', nameTransliterated: 'Adh-Dhariyat', nameTranslated: 'The Winnowing Winds', ayahCount: 60, revelationPlace: 'Makkah' },
  { number: 52, nameArabic: 'الطور', nameTransliterated: 'At-Tur', nameTranslated: 'The Mount', ayahCount: 49, revelationPlace: 'Makkah' },
  { number: 53, nameArabic: 'النجم', nameTransliterated: 'An-Najm', nameTranslated: 'The Star', ayahCount: 62, revelationPlace: 'Makkah' },
  { number: 54, nameArabic: 'القمر', nameTransliterated: 'Al-Qamar', nameTranslated: 'The Moon', ayahCount: 55, revelationPlace: 'Makkah' },
  { number: 55, nameArabic: 'الرحمن', nameTransliterated: 'Ar-Rahman', nameTranslated: 'The Beneficent', ayahCount: 78, revelationPlace: 'Madinah' },
  { number: 56, nameArabic: 'الواقعة', nameTransliterated: "Al-Waqi'ah", nameTranslated: 'The Inevitable', ayahCount: 96, revelationPlace: 'Makkah' },
  { number: 57, nameArabic: 'الحديد', nameTransliterated: 'Al-Hadid', nameTranslated: 'The Iron', ayahCount: 29, revelationPlace: 'Madinah' },
  { number: 58, nameArabic: 'المجادلة', nameTransliterated: 'Al-Mujadila', nameTranslated: 'The Pleading Woman', ayahCount: 22, revelationPlace: 'Madinah' },
  { number: 59, nameArabic: 'الحشر', nameTransliterated: 'Al-Hashr', nameTranslated: 'The Exile', ayahCount: 24, revelationPlace: 'Madinah' },
  { number: 60, nameArabic: 'الممتحنة', nameTransliterated: 'Al-Mumtahanah', nameTranslated: 'She That Is To Be Examined', ayahCount: 13, revelationPlace: 'Madinah' },
  { number: 61, nameArabic: 'الصف', nameTransliterated: 'As-Saf', nameTranslated: 'The Ranks', ayahCount: 14, revelationPlace: 'Madinah' },
  { number: 62, nameArabic: 'الجمعة', nameTransliterated: "Al-Jumu'ah", nameTranslated: 'The Congregation', ayahCount: 11, revelationPlace: 'Madinah' },
  { number: 63, nameArabic: 'المنافقون', nameTransliterated: 'Al-Munafiqun', nameTranslated: 'The Hypocrites', ayahCount: 11, revelationPlace: 'Madinah' },
  { number: 64, nameArabic: 'التغابن', nameTransliterated: 'At-Taghabun', nameTranslated: 'The Mutual Disillusion', ayahCount: 18, revelationPlace: 'Madinah' },
  { number: 65, nameArabic: 'الطلاق', nameTransliterated: 'At-Talaq', nameTranslated: 'The Divorce', ayahCount: 12, revelationPlace: 'Madinah' },
  { number: 66, nameArabic: 'التحريم', nameTransliterated: 'At-Tahrim', nameTranslated: 'The Prohibition', ayahCount: 12, revelationPlace: 'Madinah' },
  { number: 67, nameArabic: 'الملك', nameTransliterated: 'Al-Mulk', nameTranslated: 'The Sovereignty', ayahCount: 30, revelationPlace: 'Makkah' },
  { number: 68, nameArabic: 'القلم', nameTransliterated: 'Al-Qalam', nameTranslated: 'The Pen', ayahCount: 52, revelationPlace: 'Makkah' },
  { number: 69, nameArabic: 'الحاقة', nameTransliterated: 'Al-Haqqah', nameTranslated: 'The Reality', ayahCount: 52, revelationPlace: 'Makkah' },
  { number: 70, nameArabic: 'المعارج', nameTransliterated: "Al-Ma'arij", nameTranslated: 'The Ascending Stairways', ayahCount: 44, revelationPlace: 'Makkah' },
  { number: 71, nameArabic: 'نوح', nameTransliterated: 'Nuh', nameTranslated: 'Noah', ayahCount: 28, revelationPlace: 'Makkah' },
  { number: 72, nameArabic: 'الجن', nameTransliterated: 'Al-Jinn', nameTranslated: 'The Jinn', ayahCount: 28, revelationPlace: 'Makkah' },
  { number: 73, nameArabic: 'المزمل', nameTransliterated: 'Al-Muzzammil', nameTranslated: 'The Enshrouded One', ayahCount: 20, revelationPlace: 'Makkah' },
  { number: 74, nameArabic: 'المدثر', nameTransliterated: 'Al-Muddaththir', nameTranslated: 'The Cloaked One', ayahCount: 56, revelationPlace: 'Makkah' },
  { number: 75, nameArabic: 'القيامة', nameTransliterated: 'Al-Qiyamah', nameTranslated: 'The Resurrection', ayahCount: 40, revelationPlace: 'Makkah' },
  { number: 76, nameArabic: 'الإنسان', nameTransliterated: 'Al-Insan', nameTranslated: 'The Man', ayahCount: 31, revelationPlace: 'Madinah' },
  { number: 77, nameArabic: 'المرسلات', nameTransliterated: 'Al-Mursalat', nameTranslated: 'The Emissaries', ayahCount: 50, revelationPlace: 'Makkah' },
  { number: 78, nameArabic: 'النبأ', nameTransliterated: 'An-Naba', nameTranslated: 'The Tidings', ayahCount: 40, revelationPlace: 'Makkah' },
  { number: 79, nameArabic: 'النازعات', nameTransliterated: "An-Nazi'at", nameTranslated: 'Those Who Drag Forth', ayahCount: 46, revelationPlace: 'Makkah' },
  { number: 80, nameArabic: 'عبس', nameTransliterated: 'Abasa', nameTranslated: 'He Frowned', ayahCount: 42, revelationPlace: 'Makkah' },
  { number: 81, nameArabic: 'التكوير', nameTransliterated: 'At-Takwir', nameTranslated: 'The Overthrowing', ayahCount: 29, revelationPlace: 'Makkah' },
  { number: 82, nameArabic: 'الانفطار', nameTransliterated: 'Al-Infitar', nameTranslated: 'The Cleaving', ayahCount: 19, revelationPlace: 'Makkah' },
  { number: 83, nameArabic: 'المطففين', nameTransliterated: 'Al-Mutaffifin', nameTranslated: 'The Defrauding', ayahCount: 36, revelationPlace: 'Makkah' },
  { number: 84, nameArabic: 'الانشقاق', nameTransliterated: 'Al-Inshiqaq', nameTranslated: 'The Sundering', ayahCount: 25, revelationPlace: 'Makkah' },
  { number: 85, nameArabic: 'البروج', nameTransliterated: 'Al-Buruj', nameTranslated: 'The Mansions of the Stars', ayahCount: 22, revelationPlace: 'Makkah' },
  { number: 86, nameArabic: 'الطارق', nameTransliterated: 'At-Tariq', nameTranslated: 'The Nightcomer', ayahCount: 17, revelationPlace: 'Makkah' },
  { number: 87, nameArabic: 'الأعلى', nameTransliterated: "Al-A'la", nameTranslated: 'The Most High', ayahCount: 19, revelationPlace: 'Makkah' },
  { number: 88, nameArabic: 'الغاشية', nameTransliterated: 'Al-Ghashiyah', nameTranslated: 'The Overwhelming', ayahCount: 26, revelationPlace: 'Makkah' },
  { number: 89, nameArabic: 'الفجر', nameTransliterated: 'Al-Fajr', nameTranslated: 'The Dawn', ayahCount: 30, revelationPlace: 'Makkah' },
  { number: 90, nameArabic: 'البلد', nameTransliterated: 'Al-Balad', nameTranslated: 'The City', ayahCount: 20, revelationPlace: 'Makkah' },
  { number: 91, nameArabic: 'الشمس', nameTransliterated: 'Ash-Shams', nameTranslated: 'The Sun', ayahCount: 15, revelationPlace: 'Makkah' },
  { number: 92, nameArabic: 'الليل', nameTransliterated: 'Al-Layl', nameTranslated: 'The Night', ayahCount: 21, revelationPlace: 'Makkah' },
  { number: 93, nameArabic: 'الضحى', nameTransliterated: 'Ad-Duhaa', nameTranslated: 'The Morning Hours', ayahCount: 11, revelationPlace: 'Makkah' },
  { number: 94, nameArabic: 'الشرح', nameTransliterated: 'Ash-Sharh', nameTranslated: 'The Relief', ayahCount: 8, revelationPlace: 'Makkah' },
  { number: 95, nameArabic: 'التين', nameTransliterated: 'At-Tin', nameTranslated: 'The Fig', ayahCount: 8, revelationPlace: 'Makkah' },
  { number: 96, nameArabic: 'العلق', nameTransliterated: 'Al-Alaq', nameTranslated: 'The Clot', ayahCount: 19, revelationPlace: 'Makkah' },
  { number: 97, nameArabic: 'القدر', nameTransliterated: 'Al-Qadr', nameTranslated: 'The Power', ayahCount: 5, revelationPlace: 'Makkah' },
  { number: 98, nameArabic: 'البينة', nameTransliterated: 'Al-Bayyinah', nameTranslated: 'The Clear Proof', ayahCount: 8, revelationPlace: 'Madinah' },
  { number: 99, nameArabic: 'الزلزلة', nameTransliterated: 'Az-Zalzalah', nameTranslated: 'The Earthquake', ayahCount: 8, revelationPlace: 'Madinah' },
  { number: 100, nameArabic: 'العاديات', nameTransliterated: 'Al-Adiyat', nameTranslated: 'The Courser', ayahCount: 11, revelationPlace: 'Makkah' },
  { number: 101, nameArabic: 'القارعة', nameTransliterated: "Al-Qari'ah", nameTranslated: 'The Calamity', ayahCount: 11, revelationPlace: 'Makkah' },
  { number: 102, nameArabic: 'التكاثر', nameTransliterated: 'At-Takathur', nameTranslated: 'The Rivalry in World Increase', ayahCount: 8, revelationPlace: 'Makkah' },
  { number: 103, nameArabic: 'العصر', nameTransliterated: 'Al-Asr', nameTranslated: 'The Declining Day', ayahCount: 3, revelationPlace: 'Makkah' },
  { number: 104, nameArabic: 'الهمزة', nameTransliterated: 'Al-Humazah', nameTranslated: 'The Traducer', ayahCount: 9, revelationPlace: 'Makkah' },
  { number: 105, nameArabic: 'الفيل', nameTransliterated: 'Al-Fil', nameTranslated: 'The Elephant', ayahCount: 5, revelationPlace: 'Makkah' },
  { number: 106, nameArabic: 'قريش', nameTransliterated: 'Quraysh', nameTranslated: 'Quraysh', ayahCount: 4, revelationPlace: 'Makkah' },
  { number: 107, nameArabic: 'الماعون', nameTransliterated: "Al-Ma'un", nameTranslated: 'The Small Kindnesses', ayahCount: 7, revelationPlace: 'Makkah' },
  { number: 108, nameArabic: 'الكوثر', nameTransliterated: 'Al-Kawthar', nameTranslated: 'The Abundance', ayahCount: 3, revelationPlace: 'Makkah' },
  { number: 109, nameArabic: 'الكافرون', nameTransliterated: 'Al-Kafirun', nameTranslated: 'The Disbelievers', ayahCount: 6, revelationPlace: 'Makkah' },
  { number: 110, nameArabic: 'النصر', nameTransliterated: 'An-Nasr', nameTranslated: 'The Divine Support', ayahCount: 3, revelationPlace: 'Madinah' },
  { number: 111, nameArabic: 'المسد', nameTransliterated: 'Al-Masad', nameTranslated: 'The Palm Fiber', ayahCount: 5, revelationPlace: 'Makkah' },
  { number: 112, nameArabic: 'الإخلاص', nameTransliterated: 'Al-Ikhlas', nameTranslated: 'The Sincerity', ayahCount: 4, revelationPlace: 'Makkah' },
  { number: 113, nameArabic: 'الفلق', nameTransliterated: 'Al-Falaq', nameTranslated: 'The Daybreak', ayahCount: 5, revelationPlace: 'Makkah' },
  { number: 114, nameArabic: 'الناس', nameTransliterated: 'An-Nas', nameTranslated: 'Mankind', ayahCount: 6, revelationPlace: 'Makkah' },
]
