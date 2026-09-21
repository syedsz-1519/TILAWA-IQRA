# TILAWA — System Architecture

## 1. Overview

TILAWA is an AI-powered Quranic recitation and Islamic learning platform. The system is composed of a web client (Next.js), a mobile client (Flutter), an API backend (FastAPI/Python), an ML inference service for recitation analysis, and managed cloud services for data, auth, and audio delivery.

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTS                              │
│  ┌──────────────────┐        ┌──────────────────────────┐   │
│  │  Web (Next.js)   │        │  Mobile (Flutter)        │   │
│  │  App Router, RSC │        │  iOS / Android           │   │
│  └────────┬─────────┘        └───────────┬──────────────┘   │
└───────────┼──────────────────────────────┼──────────────────┘
            │  HTTPS / WebSocket           │
┌───────────▼──────────────────────────────▼──────────────────┐
│                    API GATEWAY (FastAPI)                    │
│  Auth middleware · Rate limiting · Request validation       │
├───────────────┬──────────────────┬──────────────────────────┤
│  Core API     │  Realtime (WS)   │  ML Service (gRPC/HTTP)  │
│  · Quran data │  · Battles       │  · Tajweed scoring       │
│  · Progress   │  · Live sessions │  · Pronunciation (ASR)   │
│  · Khatm      │  · Ummah feed    │  · Mood-verse matching   │
│  · Bookmarks  │                  │  · Waveform analysis     │
└───────┬───────┴────────┬─────────┴───────────┬──────────────┘
        │                │                     │
┌───────▼────────┐ ┌─────▼─────────┐ ┌─────────▼──────────────┐
│  PostgreSQL    │ │  Redis        │ │  Object Storage        │
│  (Neon/        │ │  (sessions,   │ │  (user recordings,     │
│   Supabase)    │ │   leaderboard,│ │   waveform data)       │
│                │ │   rate limit) │ │                        │
└────────────────┘ └───────────────┘ └────────────────────────┘

External: mp3quran.net / everyayah.com CDN (reciter audio),
          quran.com API (text, translations, tafsir)
```

## 2. Components

### 2.1 Web Client (Next.js 16, App Router)
- **Rendering**: React Server Components for Quran text/data pages; client components only for interactive surfaces (audio player, recorder, quizzes).
- **State**: SWR for server-state caching; React context for the global audio player.
- **Audio**: Native `<audio>` element wrapped in a persistent player provider so playback survives route changes.
- **Styling**: Tailwind CSS v4 with semantic design tokens (see `design.md`).

### 2.2 Mobile Client (Flutter)
- Feature parity with the web client plus offline mushaf, background audio, and on-device Whisper-mode recording.
- Screens: Mushaf reader, Recitation session, Tajweed hub, Battles, Khatm tracker, Stories.

### 2.3 API Backend (FastAPI)
- REST endpoints under `/api/*`; WebSocket endpoints under `/ws/*` for battles and live sessions.
- Stateless — horizontal scaling behind a load balancer; sessions in Redis.
- Key modules: `quran` (text/metadata), `recitation` (upload + score), `progress` (streaks, khatm), `social` (feed, battles), `suggest` (mood-based verse suggester).

### 2.4 ML Service
- Isolated Python service (GPU-capable) exposing:
  - **ASR pipeline**: fine-tuned Whisper for Arabic/Quranic recitation transcription.
  - **Tajweed scorer**: phoneme alignment + rule classifier producing per-ayah heatmaps.
  - **Mood-verse suggester**: embedding search over verse corpus keyed by emotional themes.
- Communicates with the API over internal HTTP; results cached in Redis keyed by recording hash.

### 2.5 Data Layer
- **PostgreSQL**: users, progress, khatm cycles, bookmarks, battle results, content metadata. Every user-scoped query filters by `user_id`.
- **Redis**: leaderboards (sorted sets), rate limits, WS presence, ML result cache.
- **Object storage**: user audio recordings (private, signed URLs, auto-expiring).

### 2.6 Third-Party Audio & Text
- **Recitation audio**: streamed directly from public Quran CDNs (mp3quran.net for full-surah files, everyayah.com for per-ayah files). Reciter: Yasser Al-Dosari (default), with a pluggable reciter registry.
- **Quran text**: Uthmani script + translations sourced from the quran.com API / Tanzil dataset, cached server-side.

## 3. Cross-Cutting Concerns

| Concern | Approach |
|---|---|
| Auth | Email + password (Better Auth on web, JWT for mobile); session cookies httpOnly |
| Authorization | Per-query `user_id` scoping; no cross-user reads |
| Privacy | User recordings private by default; deletable; never used for training without opt-in |
| Caching | CDN for static audio/text; Redis for hot API data; SWR on client |
| Offline | Mobile caches mushaf text + downloaded surah audio |
| Observability | Structured logs, error tracking, ML latency metrics |
| i18n | RTL-first layout for Arabic; English/Urdu/Indonesian translations phase-gated |

## 4. Key Flows

### Recitation scoring
1. Client records audio (chunked) → uploads to `/api/recitation/submit`.
2. API stores audio, enqueues ML job.
3. ML service transcribes, aligns against target ayah, scores tajweed rules.
4. Client polls / receives WS push with heatmap + score; progress updated.

### Audio listening (web)
1. User picks surah → client resolves CDN URL from the reciter registry (`https://server11.mp3quran.net/yasser/{surah}.mp3`).
2. Persistent player streams audio; playback position, queue, and repeat mode held in the player context.

## 5. Deployment
- Web: Vercel (edge network, ISR for Quran text pages).
- API + ML: containerized (Fly.io / AWS ECS); ML on GPU nodes with autoscaling.
- DB: Neon serverless Postgres. CI: GitHub Actions (lint, test, type-check, deploy).
