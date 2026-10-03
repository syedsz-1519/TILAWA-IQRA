# TILAWA — Islamic Data Specification

The single most important constraint in this product: **Quranic data must be perfect.** A typo in an app string is a bug; an error in an ayah is a catastrophic trust failure. This document defines every Islamic dataset, its canonical source, and its validation regime.

## 1. Quran Text

| Attribute | Decision |
|---|---|
| Script | Uthmani (Hafs 'an 'Asim riwayah) |
| Canonical source | Tanzil.net Uthmani text / KFGQPC (King Fahd Complex) digital mushaf |
| Structure | 114 surahs, 6,236 ayat, 604 pages (Madani mushaf), 30 juz, 60 hizb |
| Validation | SHA-256 checksum per surah against canonical source, verified in CI on every build |
| Rendering | Amiri / KFGQPC Uthmanic Hafs font; correct diacritics (tashkeel) mandatory; no fallback fonts for Quran text |
| Prohibited | Any runtime string manipulation of ayah text (no trimming, casing, or truncation) |

### Metadata per surah
`number, name_arabic, name_transliterated, name_translated, ayah_count, revelation_place (Makki/Madani), revelation_order, juz_span, page_start`

## 2. Recitation Audio

### Primary reciter: **Yasser Al-Dosari** (ياسر الدوسري)
Imam of the Grand Mosque (Masjid al-Haram), Riyadh-born; Hafs 'an 'Asim.

| Attribute | Decision |
|---|---|
| Full-surah files | `https://server11.mp3quran.net/yasser/{NNN}.mp3` (NNN = zero-padded surah number, 001–114), 128kbps MP3 |
| Per-ayah files (practice/reader sync) | everyayah.com, `Yasser_Ad-Dussary_128kbps/{SSS}{AAA}.mp3` |
| Fallback CDN | Mirror list maintained in the reciter registry; client retries next mirror on failure |
| Rights | mp3quran.net and everyayah.com distribute recitations for free religious use; commercial redistribution requires verification — we **stream, never rehost** until licensing is secured |

### Reciter registry (extensible)
Each entry: `id, name_arabic, name_english, riwayah, cdn_template, per_ayah_template, bitrate`. Future additions: Mishary Alafasy, Abdul Rahman Al-Sudais, Mahmoud Khalil Al-Husary (teaching pace), Muhammad Siddiq Al-Minshawi.

## 3. Translations

| Language | Source | Notes |
|---|---|---|
| English | Saheeh International | Default; widely accepted |
| Urdu | Fateh Muhammad Jalandhry | Phase 3 |
| Indonesian | Kemenag (Ministry of Religious Affairs) | Phase 3 |

Rules: translations always displayed *as translations* ("Translation of the meanings"), never inline-mixed with Arabic; translator credited on every surface.

## 4. Tajweed Rules Dataset

Core rule set (17 rules) used by the scoring engine and Tajweed Hub:

1. Noon Sakinah & Tanween: Izhar, Idgham (with/without ghunnah), Iqlab, Ikhfa
2. Meem Sakinah: Izhar Shafawi, Idgham Shafawi, Ikhfa Shafawi
3. Madd: Tabee'i (2), Muttasil (4–5), Munfasil (4–5), Lazim (6), 'Arid lil-Sukoon
4. Qalqalah (Sughra/Kubra)
5. Ghunnah
6. Laam rules (Lam Shamsiyyah/Qamariyyah, Tafkheem/Tarqeeq of Allah's name)
7. Ra rules (Tafkheem/Tarqeeq)

- Per-word rule annotations sourced from established tajweed-tagged mushaf datasets, then **verified by the review board**.
- Color convention follows the widely used Dar-al-Ma'arifah tajweed mushaf coloring.

## 5. Asbab al-Nuzul (Revelation Context Stories)
- Sources: Al-Wahidi's *Asbab al-Nuzul*, Ibn Kathir's tafsir (graded narrations only).
- Every story card carries: source citation, narration grading, review-board approval ID.
- Weak/fabricated narrations are excluded, not just labeled.

## 6. Supplementary Datasets
- **Duas**: Hisnul Muslim (Fortress of the Muslim) with takhrij (source references).
- **Hadith** (library feature): Sahih al-Bukhari & Sahih Muslim only for v1; canonical numbering; grading displayed.
- **Prayer times / Qibla** (future): calculation methods (MWL, ISNA, Umm al-Qura) user-selectable; never a single hardcoded method.
- **Hijri calendar**: Umm al-Qura tables with manual adjustment offset (moon-sighting differences).

## 7. Validation & Governance Pipeline
1. Ingest from canonical source → 2. checksum verification → 3. automated structural tests (ayah counts, surah order, diacritic integrity) → 4. review-board sampling sign-off → 5. versioned, immutable release artifact.

Any failure at any step blocks release. See `content-governance.md` for the human review process.
