# TILAWA — Design System & UX Guidelines

## 1. Design Principles

1. **Reverence first** — The Quran is the centerpiece. UI recedes; the text and audio lead.
2. **Calm, not gamified-loud** — Progress mechanics motivate without trivializing worship.
3. **Night-friendly** — Most recitation practice happens after Isha. Dark mode is a first-class citizen (and Whisper Mode is pure AMOLED black).
4. **RTL-native** — Arabic is not an afterthought; layouts are designed RTL-first where Quran text appears.
5. **One-hand reachable** — Primary actions (play, record, next ayah) live in the bottom half on mobile.

## 2. Color System (max 5 colors)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--primary` | Deep emerald `#0d5c46` | Emerald `#34d399`-tinted | Brand, CTAs, active states, tajweed-correct |
| `--background` | Warm off-white `#faf9f6` | Near-black `#0a0f0d` | Page background |
| `--foreground` | Ink `#1a2420` | Off-white `#e8efe9` | Text |
| `--accent` | Gold `#b8860b` (muted) | Soft gold `#d4a94e` | Streaks, achievements, highlights |
| `--muted` | Warm gray `#eceae4` | Deep gray-green `#16211c` | Cards, dividers, secondary surfaces |

Rules:
- Emerald + gold echo classical mushaf ornamentation without skeuomorphism.
- No purple/violet. No gradients except a subtle emerald wash on the hero, if any.
- Tajweed heatmap uses a fixed semantic scale: emerald (correct) → amber (minor) → red (major) — these are functional colors, exempt from the 5-color brand palette.

## 3. Typography (max 2 families)

| Role | Font | Notes |
|---|---|---|
| Quran text | **Amiri** (or KFGQPC Uthmanic Hafs when licensed) | Large sizes only (≥ 22px), generous line-height (2.0+), never truncated |
| UI headings + body | **Geist Sans** | Weights 400/500/600; body 14–16px, `leading-relaxed` |

- Arabic UI strings (non-Quranic) may use the system Arabic stack.
- Never set Quran text in a UI font; never set body copy in Amiri.

## 4. Layout & Spacing
- Mobile-first; flexbox by default, grid only for the surah index and bento sections.
- Spacing scale: Tailwind defaults (`gap-4`, `p-6`); no arbitrary pixel values.
- Max content width: 72ch for reading surfaces; full-bleed for the player bar.
- Persistent bottom audio player bar (height 72px) across all routes while audio is loaded.

## 5. Key Surfaces

### Surah Index
- Searchable list/grid of 114 surahs: number in an ornamental badge, Arabic name, transliteration, English meaning, ayah count, revelation place.
- Tap anywhere on row → play; secondary affordance → open reader.

### Player
- Bottom bar: artwork/surah badge, title, scrubber, play/pause, prev/next, repeat.
- Expanded view: large Arabic calligraphy of surah name, reciter credit ("Yasser Al-Dosari"), speed control, sleep timer, ayah list.

### Mushaf Reader
- Per-ayah blocks with tajweed-color toggle, translation toggle, per-ayah play, bookmark.
- Auto-scroll follows audio when playing.

### Recitation Session
- Big record button, live waveform, target ayah displayed large.
- Results: score ring, per-rule heatmap chips, "drill this rule" CTA.

### Progress
- Streak flame (gold), khatm ring, constellation map, weekly minutes chart.

## 6. Motion
- Durations 150–250ms, ease-out. Playback state changes animate (bar → expanded).
- No decorative parallax. Respect `prefers-reduced-motion`.

## 7. Accessibility
- WCAG 2.1 AA contrast on all text including gold-on-dark (verify ≥ 4.5:1).
- All controls keyboard-operable; player has full ARIA (`aria-label`s for play/pause/seek).
- Arabic content gets `lang="ar"` and `dir="rtl"`; screen readers announce surah names in both scripts.
- Font-size preference for Quran text (5 steps, persisted).

## 8. Iconography & Imagery
- Lucide icons, 20px default, 1.5px stroke.
- Ornamental geometry (eight-pointed star, arch motifs) used sparingly as SVG accents — never as content.
- No photographs of people mid-worship; prefer calligraphy, geometry, and mosque architecture abstractions.
- No emojis as icons.
