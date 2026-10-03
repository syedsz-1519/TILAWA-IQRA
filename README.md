# TILAWA (تلاوة)

An authentic, premium, multilingual Quran learning and spiritual development platform.

**Repository:** [https://github.com/syedsz-1519/TILAWA-IQRA.git](https://github.com/syedsz-1519/TILAWA-IQRA.git)  
**Live Application:** [https://tilawaa.vercel.app](https://tilawaa.vercel.app)

---

## 📖 Overview

TILAWA is designed to bring a calm, sacred, mushaf-inspired Quran recitation and learning experience to web and mobile. Featuring verified Arabic text, verse-by-verse audio playback, word-by-word translations across 15+ languages, authentic Hadith collections, curated Duas, and a spaced-repetition Hifz memorization system.

## 🛠️ Technology Stack

- **Web Frontend (`apps/web/frontend`)**:
  - Next.js 16 (React 19, TypeScript, App Router)
  - Tailwind CSS (Light-only Mushaf theme tokens)
  - TanStack Query (Server state management) & Zustand (Reader preferences)
  - Lucide Icons, Framer Motion
- **Backend API (`apps/backend/server`)**:
  - Node.js & Express.js with TypeScript
  - MongoDB Atlas with Mongoose ODM
  - Argon2id / bcrypt password hashing & rotating httpOnly refresh tokens
  - Zod request validation, Pino structured logging, Helmet, Rate Limiting
- **Mobile Client (`apps/mobile/tilawa`)**:
  - Flutter & Dart with Riverpod state management
- **Deployment & Hosting**:
  - Web: Vercel (`https://tilawaa.vercel.app`)
  - API: Railway (`https://api.tilawa.app`)
  - Database: MongoDB Atlas

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- MongoDB instance (local or MongoDB Atlas)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/syedsz-1519/TILAWA-IQRA.git
cd TILAWA-IQRA
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to respective app directories:
```bash
# Frontend
cp .env.example apps/web/frontend/.env.local

# Backend
cp .env.example apps/backend/server/.env
```

### 3. Run Development Servers
```bash
# Run Web Frontend (http://localhost:3000)
npm run dev:web

# Run Backend API (http://localhost:8000)
npm run dev:api
```

### 4. Build and Test
```bash
# Build Frontend
npm run build:web

# Build Backend
npm run build:api

# Lint and Typecheck
npm run lint
npm run typecheck
```

---

## 📁 Repository Structure

```
TILAWA-IQRA/
├── apps/
│   ├── web/frontend/         # Next.js 16 Web Application
│   ├── backend/server/       # Express + MongoDB API Server
│   └── mobile/tilawa/        # Flutter Mobile Application
├── packages/
│   ├── shared/               # Shared constants & helpers
│   ├── api-client/           # Typed API Client
│   └── types/                # Shared TypeScript models
├── infrastructure/
│   └── docker/               # Container configurations
├── docs/                     # Documentation & architecture guides
├── .env.example              # Environment variables template
├── package.json              # Monorepo root workspace configuration
└── vercel.json               # Vercel deployment configuration
```

---

## 📜 Documentation

- [Architecture & System Design](docs/architecture/ARCHITECTURE.md)
- [Deployment Guide (Vercel & Railway)](docs/deployment/DEPLOYMENT.md)
- [API Reference](docs/api/API_REFERENCE.md)
- [Authentication & Security](docs/auth/AUTHENTICATION.md)
- [Contributing Guidelines](CONTRIBUTING.md)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
