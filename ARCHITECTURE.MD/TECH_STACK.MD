# TILAWA — Technology Stack Specification

This document provides a comprehensive log of the technology stack, frameworks, developer tools, database engines, and third-party libraries used in **TILAWA**.

---

## Document Index
- [ARCHITECTURE.MD](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/architecture.md)
- [PHASES.MD](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/phases.md)

---

## 1. Technologies Integrated to Date (Current Tech Stack)

The current web platform reference implementation is built on a high-performance, modern React-centric architecture:

### 1.1 Frontend Layer
- **Framework**: **Next.js 15+ (App Router)**
  - Utilizes React Server Components (RSC) for pre-rendering Quranic text datasets at the edge for optimal SEO and performance.
  - Interactive client-side segments (such as the persistent player and recording tools) leverage standard React Client Components.
- **Library**: **React 19**
- **State Caching**: **SWR** (Stale-While-Revalidate) by Vercel for fast, declarative client-side caching of JSON Quran data.
- **Global Context**: Custom React Context providers coordinate persistent background streaming state across route navigations (located in `components/player/player-provider.tsx`).
- **Styling Engine**: **Tailwind CSS v4**
  - Configured with custom CSS variables in `app/globals.css` mapping the Islamic-themed brand colors.
- **Component Primitives**: **shadcn/ui** components built on top of Radix UI primitives.
- **Typography & Icons**:
  - **Amiri** (Google Fonts) for traditional Arabic script rendering.
  - **Geist Sans** for standard UI headings, tables, and settings labels.
  - **Lucide React** for modern UI icons.

### 1.2 Data & Storage Layer
- **Database Engine**: **PostgreSQL** (Hosted via Neon serverless Postgres).
- **ORM mapping**: **Drizzle ORM**
  - Manages relational database interactions. Database models are defined in `lib/db/schema.ts`.
- **Database Migrations**: Integrated via `drizzle-kit`.

### 1.3 Authentication
- **Auth Provider**: **Better Auth**
  - Manages session lifecycle, password hashing, session cookies, and database schema mappings (`user`, `session`, `account`, and `verification` tables).
  - Client side driver is configured in `lib/auth-client.ts`; server side actions are in `lib/auth.ts`.

### 1.4 Public CDNs & Content APIs
- **Quran Text API**: `fawazahmed0/quran-api` served via **jsDelivr CDN** (retrieves Uthmani Arabic json files and translations).
- **Surah-level Audio CDN**: `mp3quran.net` (Sheikh Yasser Al-Dosari).
- **Ayah-level Audio CDN**: `everyayah.com` archives (Yasser Al-Dosari).
- **Urdu Translation Audio**: Shamshad Ali Khan audio archives hosted on `everyayah.com`.

---

## 2. Technologies Scheduled for Future Phases (Planned Tech Stack)

To build out the remaining roadmap features, we will integrate the following software components:

### 2.1 Backend Service Layer (Phases 8–15)
- **Framework**: **FastAPI (Python)**
  - A lightweight, asynchronous Python framework to power core backend endpoints, WebSocket matchmaking services, and file ingestion.

### 2.2 Machine Learning & Audio Analysis (Phases 9–11, Phase 13)
- **ASR Model**: **Whisper (OpenAI / HuggingFace)**
  - A fine-tuned Whisper model running in containerized Python environments (e.g. CUDA-enabled Docker containers) to transcribe Arabic recitations.
- **Phoneme Alignment**: **Dynamic Time Warping (DTW)**
  - A Python alignment engine (utilizing libraries such as `librosa` or `scipy.spatial.distance`) to perform timeline mapping comparing recorded voice to targeted verses.
- **Speech Audio Containers**: **Web Audio API** on-device recording yielding compressed `webm` or `ogg` files via the MediaRecorder browser API.

### 2.3 Mobile Layer (Phases 1, 8, 12, 13)
- **Framework**: **Flutter (Dart)**
  - Compile native mobile applications for iOS & Android.
- **Local Database**: **drift / SQLite** for high-speed, local offline Mushaf page storage and recitation pack caching.
- **Mobile Audio System**: `just_audio` and `audio_service` to enable background playback controls on lock-screens.

### 2.4 Realtime Communications & Sockets (Phase 14)
- **WebSockets API**: Native WebSocket bindings in FastAPI and client-side listeners on Web and Mobile.
- **Matches Broker**: **Redis** to orchestrate matchmaking queues and manage active game loops for async 1v1 battles.

### 2.5 Vector Embeddings & Semantics (Phase 15)
- **Vector Database**: **pgvector** (PostgreSQL extension) to execute similarity search over Quranic verse embeddings mapped against emotional states.
- **Model Embeddings**: Sentence-Transformers or OpenAI Embeddings to index text strings.

### 2.6 Billing & Payment Gateways (Phase 15)
- **Stripe SDK**: Stripe checkout overlays and webhook listeners to process premium subscription logs.

### 2.7 Infrastructure & Deployment Tools
- **Web Frontend Hosting**: Vercel (Edge network, ISR for static reading pages).
- **API & ML Hosting**: Containerized deployments on **Fly.io** or **AWS ECS** (backed by autoscaling GPU nodes).
- **Relational Databases**: Neon Serverless Postgres / Supabase.
- **Cache & Message Broker**: Redis.
- **Continuous Integration**: GitHub Actions (Linting, TypeScript compilation checks, and deployment staging).
