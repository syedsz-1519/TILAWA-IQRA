/// Surah Model
class Surah {
  final int number;
  final String name;
  final String nameArabic;
  final String nameTransliteration;
  final int numberOfAyahs;
  final String revelation; // Meccan or Medinan
  final String? description;
  final List<Ayah> ayahs;

  Surah({
    required this.number,
    required this.name,
    required this.nameArabic,
    required this.nameTransliteration,
    required this.numberOfAyahs,
    required this.revelation,
    this.description,
    this.ayahs = const [],
  });

  factory Surah.fromJson(Map<String, dynamic> json) {
    return Surah(
      number: json['number'] as int,
      name: json['name'] as String,
      nameArabic: json['nameArabic'] as String,
      nameTransliteration: json['nameTransliteration'] as String,
      numberOfAyahs: json['numberOfAyahs'] as int,
      revelation: json['revelation'] as String,
      description: json['description'] as String?,
      ayahs: (json['ayahs'] as List<dynamic>?)
          ?.map((e) => Ayah.fromJson(e as Map<String, dynamic>))
          .toList() ??
          [],
    );
  }
}

/// Ayah (Verse) Model
class Ayah {
  final int number;
  final int surahNumber;
  final String text;
  final String? textSimplified;
  final String? textTransliteration;
  final Map<String, String>? translations;
  final String? tafsir;
  final String? tajweed;

  Ayah({
    required this.number,
    required this.surahNumber,
    required this.text,
    this.textSimplified,
    this.textTransliteration,
    this.translations,
    this.tafsir,
    this.tajweed,
  });

  factory Ayah.fromJson(Map<String, dynamic> json) {
    return Ayah(
      number: json['number'] as int,
      surahNumber: json['surahNumber'] as int,
      text: json['text'] as String,
      textSimplified: json['textSimplified'] as String?,
      textTransliteration: json['textTransliteration'] as String?,
      translations: (json['translations'] as Map<String, dynamic>?)
          ?.cast<String, String>(),
      tafsir: json['tafsir'] as String?,
      tajweed: json['tajweed'] as String?,
    );
  }
}

/// Reciter Model
class Reciter {
  final String id;
  final String name;
  final String? description;
  final String? imageUrl;
  final String? nativeLanguage;

  Reciter({
    required this.id,
    required this.name,
    this.description,
    this.imageUrl,
    this.nativeLanguage,
  });

  factory Reciter.fromJson(Map<String, dynamic> json) {
    return Reciter(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String?,
      imageUrl: json['imageUrl'] as String?,
      nativeLanguage: json['nativeLanguage'] as String?,
    );
  }
}

/// Audio File Model
class AudioFile {
  final String id;
  final int surahNumber;
  final String reciterId;
  final String url;
  final int duration; // in seconds
  final int fileSize; // in bytes
  final String quality; // hd, medium, low

  AudioFile({
    required this.id,
    required this.surahNumber,
    required this.reciterId,
    required this.url,
    required this.duration,
    required this.fileSize,
    this.quality = 'medium',
  });

  factory AudioFile.fromJson(Map<String, dynamic> json) {
    return AudioFile(
      id: json['id'] as String,
      surahNumber: json['surahNumber'] as int,
      reciterId: json['reciterId'] as String,
      url: json['url'] as String,
      duration: json['duration'] as int,
      fileSize: json['fileSize'] as int,
      quality: json['quality'] as String? ?? 'medium',
    );
  }
}

/// Quran Statistics Model
class QuranStats {
  final int totalSurahs;
  final int totalAyahs;
  final int totalWords;
  final int totalLetters;
  final List<String> languages;

  QuranStats({
    required this.totalSurahs,
    required this.totalAyahs,
    required this.totalWords,
    required this.totalLetters,
    required this.languages,
  });

  factory QuranStats.fromJson(Map<String, dynamic> json) {
    return QuranStats(
      totalSurahs: json['totalSurahs'] as int,
      totalAyahs: json['totalAyahs'] as int,
      totalWords: json['totalWords'] as int,
      totalLetters: json['totalLetters'] as int,
      languages: List<String>.from(json['languages'] as List<dynamic>),
    );
  }
}
