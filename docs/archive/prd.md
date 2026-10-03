# TILAWA — Product Requirements Document (PRD)

## 1. Product Summary

**TILAWA** is an AI-powered Islamic edtech platform that teaches Quranic recitation (tilawah) with real-time tajweed feedback, structured memorization tracking, and beautiful listening experiences — combining the rigor of a traditional Quran teacher with the accessibility of modern software.

- **Vision**: Every Muslim, anywhere, can learn to recite the Quran correctly and beautifully.
- **Mission**: Make expert-level tajweed feedback instant, affordable, and encouraging.

## 2. Problem Statement

1. Qualified Quran teachers are scarce, expensive, and geographically concentrated.
2. Self-learners have no feedback loop — they cannot hear their own mistakes.
3. Existing Quran apps are read/listen-only; none close the loop on *recitation quality*.
4. Memorization (hifz) tracking is done on paper or generic habit apps with no Quran awareness.

## 3. Target Users & Personas

| Persona | Description | Primary Jobs |
|---|---|---|
| **The Beginner (Iqra)** | Adult or child learning to read Arabic script | Letter recognition, guided reading, slow-paced audio |
| **The Improver** | Can read but unsure about tajweed | Record → get scored feedback → drill weak rules |
| **The Hafiz-in-training** | Memorizing the Quran | Khatm/hifz tracker, spaced repetition, audio loops |
| **The Listener** | Wants daily connection with the Quran | High-quality recitation audio (Yasser Al-Dosari default), mood-based verse suggestions |
| **The Parent/Teacher** | Supervises learners | Progress dashboards, assignments, streak visibility |

## 4. Core Features (Prioritized)

### P0 — Must have (MVP)
- **Mushaf Reader**: Uthmani script, per-ayah navigation, translations, bookmarks.
- **Recitation Listening**: Full-surah streaming audio, reciter registry (Yasser Al-Dosari default), repeat/loop, playback speed, background play.
- **Recitation Practice**: Record an ayah, receive AI tajweed score + per-rule heatmap.
- **Progress & Streaks**: Daily streaks, khatm tracker, listening/practice minutes.
- **Auth & Profiles**: Email/password accounts, private-by-default recordings.

### P1 — Should have
- **Tajweed Hub**: Rule library with examples, quizzes, targeted drills.
- **Constellation Map**: Visual map of Quran progress (surahs as stars).
- **Waveform Replay**: Compare user waveform vs. qari waveform side by side.
- **Iqra Mode**: Beginner letter-by-letter guided reading.

### P2 — Differentiators
- **Whisper Mode**: Low-volume recitation detection for late-night practice (AMOLED dark theme).
- **Tajweed Streak Battles**: Async 1v1 recitation battles via WebSocket.
- **Mood-Based Verse Suggester**: "How do you feel?" → thematically matched verses.
- **Live Tajweed Visualizer**: Streaming color-highlighted Arabic during recitation.
- **Asbab al-Nuzul Stories**: Revelation-context story cards per surah.
- **Ummah Feed / Bilal Hub**: Community recitations and adhan practice.

## 5. Non-Goals (v1)
- Fiqh rulings, fatwa Q&A, or general Islamic jurisprudence content.
- Live human teacher marketplace (future phase).
- Full tafsir authoring — we link/embed vetted sources only.

## 6. Success Metrics

| Metric | Target (12 months) |
|---|---|
| WAU | 100k |
| D30 retention | ≥ 25% |
| Median recitations scored / active user / week | ≥ 5 |
| Avg. tajweed score improvement after 4 weeks | +15% |
| Khatm completions | 10k |
| Paid conversion (premium) | 4% |

## 7. Functional Requirements (selected)

- FR-1: Users can stream any of the 114 surahs recited by Yasser Al-Dosari with < 2s time-to-first-audio on 4G.
- FR-2: Recitation scoring returns results in < 8s for a single ayah.
- FR-3: All Quran text rendered in Uthmani script with correct RTL shaping and tajweed color option.
- FR-4: Streaks and khatm progress sync across web and mobile in real time.
- FR-5: Users can delete any recording permanently; deletion propagates to storage within 24h.

## 8. Non-Functional Requirements
- **Accuracy**: Quran text must match a verified Uthmani source with zero tolerance for error (see `islamic-data.md`).
- **Availability**: 99.9% API uptime; audio playback degrades gracefully to CDN-only mode if API is down.
- **Accessibility**: WCAG 2.1 AA; full keyboard navigation; screen-reader labels for Arabic content.
- **Privacy**: Recordings are private; no third-party ad trackers; COPPA-aware child accounts.
- **Performance**: LCP < 2.5s, INP < 200ms on mid-range mobile.

## 9. Risks

| Risk | Mitigation |
|---|---|
| Incorrect tajweed feedback erodes trust | Scholar-reviewed rule engine; confidence thresholds; "beta" labeling for low-confidence rules |
| Quran text/audio errors | Checksummed canonical datasets; scholarly review board sign-off (see `content-governance.md`) |
| CDN audio dependency | Multi-CDN fallback (mp3quran → everyayah); offline downloads |
| ML cost at scale | Result caching, on-device inference for common ayat (future) |
