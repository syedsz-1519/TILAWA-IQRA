# TILAWA — Product Roadmap

> Detailed engineering breakdown per phase lives in `phases.md`. This document is the product-level view.

## Now → Next → Later

### NOW (Quarter 1) — Foundation & Listening
**Theme: "Read and listen beautifully."**
- Mushaf reader (Uthmani script, translations, bookmarks)
- Multilingual Indian language support (Hindi, Telugu, Marathi, Tamil, Malayalam, Gujarati, Assamese, Urdu, Roman Urdu) integrated on home screen and reader.
- Zaid AI Learning Assistant (`/zaid-ai`) for basic letters and Tajweed Q&A.
- Recitation listening with Yasser Al-Dosari (full-surah streaming, loop, speed, background play)
- Reciter registry (architecture ready for multiple qaris)
- Accounts, profiles, daily streaks
- Web app polish + responsive/RTL foundation
- Khatm tracker v1

**Exit criteria**: A listener can complete a full khatm on the platform; D7 retention ≥ 20%.

### NEXT (Quarter 2) — Feedback Loop
**Theme: "Recite and improve."**
- Recitation recording + AI tajweed scoring (per-ayah heatmap)
- Tajweed Hub: rule library, quizzes, targeted drills
- Waveform replay (user vs. qari comparison)
- Constellation Map progress visualization
- Iqra Mode for absolute beginners
- Mobile app (Flutter) beta on Android

**Exit criteria**: ≥ 5 scored recitations per active user per week; scoring accuracy validated by review board on a 500-sample audit.

### LATER (Quarters 3–4) — Engagement & Intelligence
**Theme: "Stay, play, and go deeper."**

Q3 — Engagement & Gamification (Roadmap Phase 3):
- Whisper Mode (AMOLED ultra-dark theme + low-volume speech processing)
- Tajweed Streak Battles (async 1v1 via WebSocket)
- Leaderboards, badges, Ramadan events
- iOS release

Q4 — AI-Powered Unique (Roadmap Phase 4):
- Mood-Based Verse Suggester (`/api/suggest-verse`)
- Live Tajweed Rule Visualizer (streaming color-highlighted Arabic)
- Asbab al-Nuzul story cards per surah
- Premium tier launch (see `monetization.md`)
- Parent/teacher dashboards

**Exit criteria**: WAU 100k; paid conversion ≥ 4%.

## Beyond (Year 2 candidates)
- Human teacher marketplace (vetted ijazah holders)
- Hifz spaced-repetition engine with audio-cued review
- Multi-reciter comparison and maqam (melody) detection
- Offline-first PWA; additional languages (Urdu, Indonesian, Turkish, French)
- Institutional/madrasa licensing

## Release Cadence & Principles
- Ship weekly to web, biweekly to mobile beta.
- Every Quran-content change requires review board sign-off before release (see `content-governance.md`).
- Ramadan is the peak season: freeze risky changes 2 weeks prior; ship engagement features 6 weeks prior.
