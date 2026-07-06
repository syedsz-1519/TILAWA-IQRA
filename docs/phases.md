# TILAWA — Engineering Phases

> Product-level view in `roadmap.md`. This is the build order with deliverables, owners, and acceptance criteria. Phases 1–2 reflect work already validated in the reference implementation; 3–4 follow `TILAWA_ROADMAP_PLAN.md`.

---

## Phase 0 — Platform Foundation
**Goal: a deployable, testable skeleton.**

| # | Deliverable | Acceptance |
|---|---|---|
| 0.1 | Next.js web app scaffold with design tokens, dark mode, RTL support | Lighthouse a11y ≥ 95 |
| 0.2 | FastAPI backend with auth (email/password), Postgres schema v1 | Auth + CRUD integration tests green |
| 0.3 | Quran text ingestion (Uthmani + translations) with checksum validation | 6,236 ayat verified against Tanzil checksums |
| 0.4 | Reciter registry + CDN audio resolution (Yasser Al-Dosari default) | All 114 surah URLs return 200 |
| 0.5 | CI/CD (lint, type-check, test, deploy) | Green pipeline on main |

## Phase 1 — Read, Listen, Track
**Goal: the best listening experience.**

| # | Deliverable | Acceptance |
|---|---|---|
| 1.1 | Surah index + search | Find any surah in ≤ 2 interactions |
| 1.2 | Persistent audio player (stream, seek, loop, speed, queue) | Playback survives navigation; TTFA < 2s on 4G |
| 1.3 | Mushaf reader with per-ayah audio + bookmarks | Auto-scroll sync within ±1 ayah |
| 1.4 | Streaks + Khatm tracker | Cross-device sync < 5s |
| 1.5 | Constellation Map v1 | Renders all 114 surah states |
| 1.6 | Tajweed heatmap (static, from scored sessions) | Matches ML output 1:1 |

## Phase 2 — The Feedback Loop
**Goal: record → score → improve.**

| # | Deliverable | Acceptance |
|---|---|---|
| 2.1 | In-browser/app audio recording with chunked upload | Works on iOS Safari + Android Chrome |
| 2.2 | ML service: ASR + phoneme alignment + tajweed rule scoring | ≥ 85% agreement with expert panel on audit set |
| 2.3 | Results UI: score ring, rule heatmap, drill CTAs | Result round-trip < 8s |
| 2.4 | Waveform replay (user vs. qari overlay) | Aligned within 100ms |
| 2.5 | Tajweed Hub (rules, quizzes, drills) | 17 core rules covered |
| 2.6 | Iqra Mode (beginner path) | Full letter → word → ayah progression |

## Phase 3 — Engagement & Gamification
**Goal: habit formation. (Tier 2 features)**

| # | Deliverable | Key files (reference impl) | Acceptance |
|---|---|---|---|
| 3.1 | Whisper Mode: AMOLED theme + low-volume audio model flag | `whisper_theme.dart`, `server.py` audio flag | Scores whispered recitation at ≥ 75% of normal-volume accuracy |
| 3.2 | Tajweed Streak Battles: async 1v1 | `backend/multiplayer.py` (WS), `tajweed_battle_screen.dart` | Battle completes end-to-end incl. disconnect recovery |
| 3.3 | Leaderboards + badges | Redis sorted sets | Updates < 1s after score |
| 3.4 | Ramadan event system | Config-driven challenges | Launchable without deploy |

## Phase 4 — AI-Powered Unique
**Goal: features nobody else has. (Tier 3 features)**

| # | Deliverable | Key files (reference impl) | Acceptance |
|---|---|---|---|
| 4.1 | Mood-Based Verse Suggester | `/api/suggest-verse`, `mood_selector.dart` | Suggestions pass review-board relevance audit |
| 4.2 | Live Tajweed Visualizer (streaming highlighted Arabic) | `live_tajweed_text.dart` | Highlight latency < 300ms behind speech |
| 4.3 | Asbab al-Nuzul story cards | `surah_story_screen.dart` | All content scholar-sourced + cited |
| 4.4 | Premium tier + Stripe billing | — | Checkout → entitlement < 30s |
| 4.5 | Parent/teacher dashboard | — | Multi-learner view with assignment flow |

---

## Cross-Phase Workstreams
- **Content governance**: review-board sign-off gate in CI for any Quran text/audio/tajweed-rule change (`content-governance.md`).
- **Security & privacy**: quarterly audit; recording deletion SLA monitoring (`security-privacy.md`).
- **Localization**: Arabic UI + RTL in Phase 1; Urdu/Indonesian in Phase 3.
- **QA**: device lab matrix (low-end Android priority); Ramadan load test at 10x baseline before Phase 3 exit.

## Dependencies
```
0 ─→ 1 ─→ 2 ─→ 3 ─→ 4
      │         └── 3.2 requires 2.2 (scoring) + WS infra
      └── 1.6 requires 2.2 output format (contract-first, mock in Phase 1)
```
