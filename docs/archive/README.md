# TILAWA — Master Project Guide & Documentation Directory

Welcome to the comprehensive documentation directory for **TILAWA**, an AI-powered Quranic recitation, learning, and spiritual progress tracking platform. 

This document serves as the master guide, detailing every aspect of the project's vision, architecture, codebase structure, design tokens, engineering phases, and third-party integrations.

---

## 1. Product Vision & Strategy

**TILAWA** merges the rigor of traditional Islamic Quranic teaching with modern technology. It closes the feedback loop for self-directed learners by analyzing audio recitations using AI/ML, scoring pronunciation and Tajweed rules, and offering structured trackers for daily spiritual habits (Nafs tracking) and memorization progress (Hifz/Khatm).

### 1.1 Target Audiences & Personas
- **The Beginner (Iqra)**: Children or adults learning Arabic characters and basic phonology. Needs slow-paced recitation loops and visual letter-tracing aids.
- **The Improver**: Learners who read Arabic but need correction on Tajweed rules. Utilizes the AI scoring engine to record, score, and inspect errors.
- **The Hafiz-in-Training**: Memorizers tracking daily logs, leveraging audio looping controls, and organizing spaced-repetition schedules.
- **The Listener**: Users seeking high-quality daily recitation playback, persistent player controls, and mood-based verse suggestions.

### 1.2 Core Feature Tiers
- **P0 (MVP)**: Uthmani script Mushaf reader, Surah browser, persistent full-surah audio player (recited by Sheikh Yasser Al-Dosari), per-ayah bookmarking, and local streaks.
- **P1**: Tajweed Hub (17 core rules library and interactive quizzes), Constellation Map (milestone visualization), and double waveform overlay (user vs. qari comparison).
- **P2 (Differentiators)**: Whisper Mode (AMOLED black theme and whisper-volume speech alignment), async 1v1 WebSocket recitation battles, vector-based Mood Verse matching, and Live Tajweed visualizer.

---

## 2. Technical Stack & Architecture

TILAWA is designed as a decoupled, service-oriented system:

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
```

### 2.1 Core Client Layer (Next.js Web App)
- **Next.js (App Router)**: Utilizing server components (RSC) for page static builds (SEO optimizations) and client components for interactive segments (audio player state, audio recording).
- **State Hydration**: SWR client queries with server caches. React Context provides persistent audio playback across routes.
- **Styling**: Tailwind CSS v4 using semantic design variables.

### 2.2 Core Backend Services (FastAPI API)
- Python FastAPI layer serving JSON endpoints.
- WebSocket interfaces handles async multi-user interactions.

### 2.3 Machine Learning Pipeline (ML Container)
- **Automatic Speech Recognition (ASR)**: Audio recordings processed via fine-tuned Whisper models.
- **Phonetic Alignment**: Evaluates pronunciation by running acoustic token alignment against reference texts.
- **Tajweed Heatmap**: Outputs error indexing arrays mapping verses characters to flags (`0` = correct, `1` = minor error, `2` = major error).

---

## 3. Data & Schema Definitions

Database layers are managed via PostgreSQL with Drizzle ORM mappings.

### 3.1 Better Auth Collections
Enforces default camelCase variables matching client-side dependencies:
- **`user`**: Profile records containing emails, creation times, and names.
- **`session`**: Cookie token registries, IP logs, and user agent attributes.
- **`account`**: Hashed credentials and provider definitions.
- **`verification`**: Registration and verify codes.

### 3.2 Application Data Tables
- **`streaks`**: Active XP points and consecutive active daily counters.
- **`nafsTracking`**: Spirit tracking habits. Saves dates, habits JSON configurations, and diary reflection blocks.
- **`mushafBookmarks`**: Saves target `surahNumber` and `ayahNumber` per user.
- **`readingProgress`**: Active reading session location trackers.
- **`tajweedScores`**: Results tracking for hub quizzes.

---

## 4. API & Audio CDN Bindings

TILAWA avoids hosting massive media directories by routing directly to authorized, free public endpoints:

### 4.1 Content Sources
- **Uthmani Quranic Text**: Sourced via jsDelivr from the fawazahmed0/quran-api repo:
  `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/{surah}.json`
- **Translations**: Dynamic languages retrieved by edition:
  - English: `eng-abdullahyusufal`
  - Urdu: `urd-abulaalamaududi`
  Template: `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/{edition}/{surah}.json`

### 4.2 Audio CDNs
- **Surah Playback**: Streams Yasser Al-Dosari files:
  `https://server11.mp3quran.net/yasser/{surah}.mp3` (e.g. `001.mp3`)
- **Per-Ayah Recitations**: Streams everyayah.com archives:
  `https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/{surah}{ayah}.mp3` (e.g. `001001.mp3`)
- **Interleaved Translation Audio (Urdu)**: Plays Shamshad Ali Khan audio:
  `https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/{surah}{ayah}.mp3`

---

## 5. Visual Design System

The platform styles emphasize traditional Quranic ornamentation adapted to a modern interface:
- **Color Palettes**: Primary Deep Emerald (`#0d5c46`), Accent Muted Gold (`#b8860b`), page Warm Off-white (`#faf9f6`), text Ink (`#1a2420`), and dark AMOLED Near-black (`#0a0f0d`).
- **Typography**: Quranic text is rendered strictly using the **Amiri** font (min-size 22px, line-height 2.0+). System UI headings use **Geist**.
- **Layout**: Mobile-first, RTL-first on scripture fields.
- **Semantic Heatmap**: Heatmaps paint character states using a custom visual scale: emerald (correct) → amber (minor) → red (major).

---

## 6. Codebase File Index

The documentation files in this folder describe specific segments of the project in detail:

| File Name | Purpose |
|---|---|
| [README.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/README.md) | [This File] Master guide and documentation table of contents |
| [architecture.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/architecture.md) | High-level system structure, components flow, and deployment details |
| [TECH_STACK.MD](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/TECH_STACK.MD) | Technical stacks, libraries, tools, and platforms integrated and scheduled |
| [MEMORY.MD](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/MEMORY.MD) | Master repository memory bank containing schema, CDN paths, and system specs |
| [prd.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/prd.md) | Core product scope, target personas, prioritized features, and risks |
| [design.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/design.md) | UI theme guidelines, typography, layout structures, and accessibility standards |
| [roadmap.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/roadmap.md) | High-level business and product delivery roadmap across quarters |
| [phases.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/phases.md) | Granular engineering milestones, deliverables, and exit acceptance metrics |
| [islamic-data.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/islamic-data.md) | Content curation rules, canonical datasets verification, and checksum controls |
| [content-governance.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/content-governance.md) | Scholarly review boards processes, AI safety protocols, and incident logs |
| [security-privacy.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/security-privacy.md) | Threat models, signed URL constraints, and user data privacy standards |
| [monetization.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/monetization.md) | Business plan, premium subscription structure, and unit economics |
| [strategic-market-analysis.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/strategic-market-analysis.md) | Market positioning, competitor analysis, and marketing vectors |
| [terms-and-conditions.md](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/terms-and-conditions.md) | Platform rules and terms of usage agreement |
