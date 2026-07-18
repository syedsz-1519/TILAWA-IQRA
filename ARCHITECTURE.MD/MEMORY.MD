# TILAWA — Master Project Memory Bank

This file contains the consolidated documentation, logic systems, database schemes, routing maps, components architectures, and CDN endpoints of the **TILAWA** project. It serves as a persistent context for developer orientation and system maintenance.

---

## 1. Project Directory Architecture

The repository is structured as a decoupled monorepo, separating client-side presentation layers from API backend systems:

```
TILAWA-IQRA/
├── ARCHITECTURE.MD/             # Project Planning & System Docs Folder
│   ├── README.md                # Master directory guide
│   ├── MEMORY.MD                # [This File] Complete repository memory bank
│   ├── architecture.md          # System layout & flows
│   ├── prd.md                   # Product requirements & success metrics
│   ├── design.md                # Design visual guides & typography
│   ├── phases.md                # 15-Phase engineering plan
│   ├── roadmap.md               # Feature release milestones
│   └── ...                      # Content governance, security, market reports
├── frontend/                    # Next.js web application
│   ├── app/                     # App router pages, layouts, and server actions
│   ├── components/              # Shared React UI and player components
│   ├── lib/                     # Client auth clients, database models, helper utilities
│   ├── public/                  # Public frontend web assets
│   ├── package.json             # Frontend dependency packages
│   └── tsconfig.json            # TypeScript compile configurations
├── backend/                     # FastAPI python backend
│   ├── main.py                  # Server app entrypoint
│   ├── requirements.txt         # Python library list
│   └── app/                     # Python endpoint routers
├── database/                    # SQL schema definitions & migrations
│   ├── schema.sql               # Database layout
│   └── migrations/              # Drizzle SQL migration files
├── audio/                       # Locally compiled audio files or sample guides
└── images/                      # System-wide brand images and assets
```

---

## 2. Database Models & Schema Specifications

The relational schema is configured via Drizzle ORM in PostgreSQL:

### 2.1 Better Auth Base Tables
- **`user`**: `id` (text PK), `name` (text), `email` (text unique), `emailVerified` (boolean), `image` (text), timestamps.
- **`session`**: `id` (text PK), `userId` (FK references `user.id` cascade), `token` (text unique), `expiresAt` (timestamp), metadata columns.
- **`account`**: `id` (text PK), `userId` (FK references `user.id`), provider tokens, hashed passwords.
- **`verification`**: `id` (text PK), `identifier` (text), `value` (text), `expiresAt` (timestamp).

### 2.2 Core Application Tables
- **`streaks`**: Tracks daily consecutive user activity. Columns: `id` (serial PK), `userId` (text, indexed), `currentStreak` (int), `totalXP` (int), `lastActivityDate` (timestamp).
- **`nafsTracking`**: Daily spiritual habit checklist. Columns: `id` (serial PK), `userId` (text), `date` (timestamp), `habits` (JSON: `{ habitName: boolean }`), `reflection` (text).
- **`mushafBookmarks`**: Saves user bookmarks. Columns: `id` (serial PK), `userId` (text), `surahNumber` (int), `ayahNumber` (int), `bookmarkedAt` (timestamp).
- **`readingProgress`**: Active reading progress tracking. Columns: `id` (serial PK), `userId` (text), `surahNumber` (int), `lastAyahRead` (int).
- **`tajweedScores`**: Results tracking for hub quizzes. Columns: `id` (serial PK), `userId` (text), `quizNumber` (int), `score` (int), `totalQuestions` (int).

---

## 3. Audio & Text CDN API Integration

- **Uthmani Quran Script**: Sourced via jsDelivr:
  `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/{surah}.json`
- **Translations**: Sourced by edition from jsDelivr:
  - English: `eng-abdullahyusufal`
  - Urdu: `urd-abulaalamaududi`
  - Roman Urdu: `urd-abulaalamaududi-la`
  - Hindi: `hin-suhelfarooqkhan-la`
  - Telugu: `tel-aburida-la`
  - Marathi: `mar-muhammadshafi-la`
  - Tamil: `tam-janturstfoundation-la`
  - Malayalam: `mal-abdulhameed-la`
  - Gujarati: `guj-rabilaalomari-la`
  - Assamese: `asm-shaykhrafeequli-la`
- **Sheikh Yasser Al-Dosari (Surah Audio)**:
  `https://server11.mp3quran.net/yasser/{surah}.mp3` (e.g. `001.mp3`)
- **Sheikh Yasser Al-Dosari (Ayah Audio)**:
  `https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/{surah}{ayah}.mp3`
- **Urdu Translation Audio (Shamshad Ali Khan)**:
  `https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/{surah}{ayah}.mp3` (plays interleaved in Urdu and Roman Urdu modes)

---

## 4. Visual Layout & Brand Identity

- **Theme Palette**: Deep Emerald (`#0d5c46`), Muted Gold (`#b8860b`), Warm Off-white (`#faf9f6`), Ink (`#1a2420`), AMOLED Near-black (`#0a0f0d`).
- **Typography Guidelines**: Amiri Serif for Arabic script (minimum 22px, line-height 2.0+). Geist Sans for standard UI text.
- **RTL Support**: Language fields displaying Arabic text are locked to `dir="rtl"` and `lang="ar"`.
