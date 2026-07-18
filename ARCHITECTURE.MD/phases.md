# TILAWA — Interactive Engineering Phases (15-Phase Plan)

This document details the granular 15-phase engineering plan for **TILAWA**. 

### Progression Rule
> [!TIP]
> Each phase has a planned duration of **2–3 weeks**. However, if all acceptance criteria are met in **1–2 weeks**, the team will immediately advance to the next phase to maximize velocity.

---

## Document Index
- [TECH_STACK.MD](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/TECH_STACK.MD)
- [ROADMAP.MD](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/roadmap.md)

---

## Interactive Phases Timeline

### Phase 1 — Project Scaffolding & Design Tokens
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[/] In Progress`
- **Tasks**:
  - [x] Create Next.js 15+ template with TypeScript and Tailwind CSS v4.
  - [x] Configure global CSS variables (`--primary`, `--accent`, `--background`) in `app/globals.css`.
  - [x] Initialize Google Fonts integration for Geist UI and Amiri Arabic.
  - [x] Set up Light/Dark theme provider (`next-themes`).
- **Deliverable**: A deployable Next.js shell with functional theme toggling and styled font pairings.
- **Acceptance**: Lighthouse Accessibility score ≥ 95 on index.

---

### Phase 2 — Database Schema & Auth Setup
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[/] In Progress`
- **Tasks**:
  - [x] Configure PostgreSQL connection parameters with Drizzle ORM.
  - [x] Set up Better Auth server config in `lib/auth.ts` and client client in `lib/auth-client.ts`.
  - [x] Design schemas for standard Auth collections (`user`, `session`, `account`, `verification`).
  - [x] Create frontend Sign-in and Sign-up page forms.
- **Deliverable**: Working secure login/signup flow synced to the Postgres backend.
- **Acceptance**: E2E test runs successfully register a user and issue session cookies.

---

### Phase 3 — Quran Text Curation & Ingestion
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[/] In Progress`
- **Tasks**:
  - [x] Configure fawazahmed0/quran-api jsDelivr CDN endpoint fetchers.
  - [x] Integrate Uthmani script loading hooks.
  - [x] Implement multi-language translations registry (English, Urdu, Roman Urdu, Hindi, Telugu, Marathi, Tamil, Malayalam, Gujarati, Assamese).
  - [x] Script verification checksum routines to ensure text data integrity.
- **Deliverable**: API handlers that dynamically load correct Uthmani script and translations including Indian regional dialects.
- **Acceptance**: 6,236 ayat verify successfully against Tanzil reference checksums.

---

### Phase 4 — Surah Registry & Player Context
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[/] In Progress`
- **Tasks**:
  - [x] Write static metadata registry for all 114 Surahs in `lib/quran.ts`.
  - [x] Configure Yasser Al-Dosari mp3quran.net streaming templates.
  - [x] Build global React Context `PlayerProvider` to manage playback.
  - [x] Hook HTML5 audio instances to listen to play/pause state modifications.
- **Deliverable**: Global audio state controller enabling surah streams.
- **Acceptance**: Audio playback initialization time (TTFA) < 2s on simulated 4G connection.

---

### Phase 5 — Surah Browser & Search UI
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[/] In Progress`
- **Tasks**:
  - [x] Build Surah list/grid landing components.
  - [x] Code English, transliterated, and Arabic search filters.
  - [x] Design Surah badges depicting revelation place (Makkah/Madinah) and Ayah counts.
  - [x] Link Surah cards to dynamic routing path `/read/[surah]`.
- **Deliverable**: Searchable Surah directory homepage.
- **Acceptance**: Find and open any of the 114 Surahs in under 2 clicks.

---

### Phase 6 — Interactive Mushaf Reader Layout
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[/] In Progress`
- **Tasks**:
  - [x] Construct dynamic routing page `app/read/[surah]/page.tsx`.
  - [x] Implement inline text translations and audio playback buttons per Ayah.
  - [x] Connect play-along everyayah.com CDN streams.
  - [x] Bind automatic page scrolling tracking the active Ayah play state.
- **Deliverable**: Interactive reading dashboard with line-by-line audio triggers.
- **Acceptance**: Selected Ayah highlighting matches audio progress within ±1 verse offset.

---

### Phase 7 — Streak Tracker & Khatm Logs
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[/] In Progress`
- **Tasks**:
  - [x] Define `streaks` and `readingProgress` tables in the database schema.
  - [x] Code daily activity trigger actions updating streak counts.
  - [x] Build Khatm goal logging UI to compute reading targets.
  - [x] Create a user dashboard displaying active streaks and reading achievements.
- **Deliverable**: Interactive dashboard tracking and displaying consecutive activity streaks.
- **Acceptance**: User progress updates synchronize with Postgres in less than 5s.

---

### Phase 8 — Audio Recorder & Submit API
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[ ] Planned`
- **Tasks**:
  - [ ] Implement client-side audio capture using the Web MediaRecorder API.
  - [ ] Configure audio compression outputs (WebM/Ogg formats).
  - [ ] Set up secure cloud signed upload URLs.
  - [ ] Code API `/api/recitation/submit` endpoints to save recording metadata.
- **Deliverable**: Microphone recording controls linked to backend file upload pipelines.
- **Acceptance**: Web recording functions reliably on mobile Safari and Chrome browsers.

---

### Phase 9 — ML API Gateway & Whisper ASR Integration
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[ ] Planned`
- **Tasks**:
  - [ ] Scaffolding FastAPI backend microservices.
  - [ ] Integrate a fine-tuned Whisper model for Quranic Arabic transcription.
  - [ ] Set up CPU/GPU processing pipelines for audio files.
  - [ ] Cache transcribed results in Redis to reduce redundant model execution.
- **Deliverable**: Fast ASR microservice returning transcription text from audio files.
- **Acceptance**: Audio transcription accuracy matches target texts at ≥ 90% character accuracy.

---

### Phase 10 — Phonetic Alignment & Tajweed Scoring
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[ ] Planned`
- **Tasks**:
  - [ ] Implement phoneme alignment using Dynamic Time Warping (DTW).
  - [ ] Map user phoneme indices directly to canonical verse pronunciation arrays.
  - [ ] Program rules validating Quranic tajweed exceptions (Madd, Ghunnah, etc.).
  - [ ] Return structured JSON arrays scoring character ranges by error code.
- **Deliverable**: Alignment logic matching recorded phonemes to targets and scoring rules.
- **Acceptance**: Scoring engine maintains ≥ 85% agreement rate compared to human review boards.

---

### Phase 11 — Feedback Scoring UI & Heatmap
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[ ] Planned`
- **Tasks**:
  - [ ] Design radial percentage rings displaying pronunciation scores.
  - [ ] Construct interactive character heatmaps mapping colors (emerald/amber/red).
  - [ ] Implement modal boxes displaying detailed rule error explanations.
  - [ ] Link error states to dedicated practice cards.
- **Deliverable**: Detailed UI feedback overlay highlighting mistakes directly on Arabic text.
- **Acceptance**: Scoring feedback is processed and displayed in less than 8 seconds.

---

### Phase 12 — Tajweed Hub & Spaced-Repetition Hifz
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[ ] Planned`
- **Tasks**:
  - [ ] Compile library detailing the 17 core Tajweed rules with audio samples.
  - [ ] Write dynamic interactive quizzes checking rule definitions.
  - [ ] Develop spaced repetition intervals scheduling flagged ayahs for review.
  - [ ] Set up Hifz tracking cards storing memorization statuses.
- **Deliverable**: Training and review space assisting verse memorization.
- **Acceptance**: Hifz tracker updates and caches scheduled review times instantly.

---

### Phase 13 — Whisper Mode & AMOLED Dark Theme
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[ ] Planned`
- **Tasks**:
  - [ ] Define pitch-black AMOLED color palettes in Tailwind theme settings.
  - [ ] Adapt audio recorders to capture low-decibel whisper vocal inputs.
  - [ ] Optimize Whisper ASR configurations to process quiet phonetic patterns.
  - [ ] Add quick-toggle dark mode shortcuts for late-night sessions.
- **Deliverable**: Night-friendly interface designed for low-volume recitations.
- **Acceptance**: Whisper scoring maintains ≥ 75% accuracy compared to normal voice inputs.

---

### Phase 14 — WebSocket Battles & Live Visualizer
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[ ] Planned`
- **Tasks**:
  - [ ] Configure FastAPI WebSocket endpoints supporting active connections.
  - [ ] Build async matchmaking lobbies pairing users for 1v1 battles.
  - [ ] Implement live voice transcription rendering highlighted words on screen.
  - [ ] Handle connection dropouts and automatic recovery states.
- **Deliverable**: Realtime interactive lobby supporting recitation matches and live transcription highlights.
- **Acceptance**: Realtime voice text highlighting latency matches speech within 300ms.

---

### Phase 15 — Mood Verse Suggester & Stripe Billing
- **Duration**: 2-3 weeks (Advance early in 1-2 weeks if complete)
- **Status**: `[ ] Planned`
- **Tasks**:
  - [ ] Generate semantic vector embeddings for Quranic verses based on emotional themes.
  - [ ] Set up cosine similarity query endpoints (pgvector database).
  - [ ] Connect Stripe SDK checkout forms and handle webhooks.
  - [ ] Build parent/teacher dashboard tables monitoring linked accounts.
- **Deliverable**: Embedding-based search tool, subscriptions system, and oversight dashboard.
- **Acceptance**: Checkout payments register and update entitlements in less than 30s.
