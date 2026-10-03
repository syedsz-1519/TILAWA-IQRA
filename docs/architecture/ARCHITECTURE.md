# TILAWA System Architecture & Design

TILAWA is a modern, high-performance, multilingual Quran learning and spiritual development platform built with a unified monorepo architecture.

## Monorepo Layout

```
TILAWA-IQRA/
├── apps/
│   ├── web/frontend/         # Next.js 16 (React 19, TypeScript, Tailwind CSS, Zustand, TanStack Query)
│   ├── backend/server/       # Express.js, TypeScript, Mongoose, Zod, Pino logging
│   └── mobile/tilawa/        # Flutter / Dart multiplatform client
├── packages/
│   ├── shared/               # Shared constants, utilities, and translations
│   ├── api-client/           # Isomorphic TypeScript API client with Zod schemas
│   └── types/                # Shared TypeScript type definitions
├── infrastructure/
│   ├── docker/               # Dockerfile and docker-compose configurations
│   └── kubernetes/           # K8s deployment manifests
├── docs/                     # Centralized project documentation
├── README.md                 # Project entry point and overview
├── LICENSE                   # MIT License
├── CONTRIBUTING.md           # Contribution guidelines
├── .env.example              # Template environment variables
├── package.json              # Monorepo root workspace manifest
└── vercel.json               # Vercel deployment configuration
```

## System Components

### 1. Web Application (`apps/web/frontend`)
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript.
- **Styling**: Vanilla Tailwind CSS with custom Islamic mushaf color palette (Ivory White, Soft Light Green, Deep Forest Green, Burnished Gold). Light-only theme.
- **State Management**: TanStack Query for server cache; Zustand for local reader preferences.
- **Typography**: Next/font integration with Amiri Quran, Scheherazade New, Plus Jakarta Sans, Playfair Display, and localized Noto fonts.

### 2. API Backend (`apps/backend/server`)
- **Runtime**: Node.js + Express + TypeScript.
- **Database**: MongoDB Atlas with Mongoose ODM (strict typing, schema validation, compound indexes).
- **Security**: Argon2id password hashing, rotating refresh tokens in httpOnly cookies, rate limiting with progressive lockout, helmet, CORS allowlists, Zod request validation.
- **Logging & Monitoring**: Pino structured JSON logging, `/health` and `/api/v1` versioned endpoints.

### 3. Mobile Client (`apps/mobile/tilawa`)
- **Framework**: Flutter / Dart with Riverpod state management.
- **Features**: Offline Mushaf reader, audio streaming, Hadith, Duas, and Hifz flashcards.
