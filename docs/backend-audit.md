# TILAWA Backend Audit & Architectural Assessment

> **Document Status:** Complete Phase 0 Audit  
> **Target Package:** `apps/backend/server` (Node.js 18+, Express, TypeScript, MongoDB Atlas)  
> **Date:** October 3, 2026

---

## Executive Summary

A comprehensive audit of the `apps/backend/server` codebase was performed to analyze the structure, endpoints, security posture, database setup, and runtime stability. The audit revealed critical architectural flaws, unmounted endpoints, security vulnerabilities, ORM duplication (Mongoose vs. Drizzle PG), and missing validation layers.

---

## 1. Backend Landscape & Mapping

### Entry Points & Core Setup
- **`src/index.ts`**: Main Express bootstrap script. Mounts only three routes (`languageRoutes`, `/api/hifz`, `productRoutes`) and a basic `/health` check. Missing central error handling middleware, request ID tracking, and proper CORS origin parsing.
- **`src/config/env.ts`**: Zod environment parser. Provides fallback default values for missing variables (e.g. default fallback JWT secret), allowing insecure operation if env vars are omitted in production.
- **`src/config/database.ts` & `src/config/logger.ts`**: Helper configuration scripts.
- **`src/env.ts`**: Duplicate environment file.

### Database Layer
- **`src/db/index.ts`**: Active Mongoose connection logic to MongoDB Atlas.
- **`src/database/connect.js`**: Legacy duplicate JavaScript database connection file.
- **`src/db/schema.ts`**: Dead code containing Drizzle ORM schema definitions for PostgreSQL (`drizzle-orm/pg-core`). PostgreSQL is not used in production.
- **`src/models/`**: Mongoose schemas for `User`, `ReadingProgress`, `Bookmark`, `Streak`, `HifzProgress`, `NafsTracking`, `Language`, and `Product`.

### Route & Controller Mapping

| File | Type | Express Router Exported? | Mounted in `index.ts`? | Operational Status |
| :--- | :--- | :--- | :--- | :--- |
| `src/routes/bookmarks.ts` | Router | Yes | No | Unmounted / Inaccessible |
| `src/routes/favorites.ts` | Async Functions | No (Exported functions) | No | Unmounted / Helper functions only |
| `src/routes/hifz.ts` | Router | Yes | Yes (`/api/hifz`) | Returns hardcoded mock data |
| `src/routes/languages.ts` | Router | Yes | Yes (Root `/`) | Partially active with hardcoded translation mocks |
| `src/routes/nafs.ts` | Async Functions | No (Exported functions) | No | Unmounted / Helper functions only |
| `src/routes/product.ts` | Router | Yes | Yes (Root `/`) | Active (Unrelated domain model) |
| `src/routes/reading-progress.ts` | Async Functions | No (Exported functions) | No | Unmounted / Helper functions only |
| `src/routes/streaks.ts` | Async Functions | No (Exported functions) | No | Unmounted / Helper functions only |
| `src/controllers/productController.ts` | Controller | N/A | Yes | Only controller file in the legacy backend |

---

## 2. Audit Findings & Critical Issues

### 🔴 Security Vulnerabilities & Secrets Leakage
1. **Exposed Credentials in Git History:**
   - Git log history contained plaintext MongoDB connection strings and passwords (`syedshahnawaz1519_db_user:0v6pU5xPJw0NvX0p` and `syedshahnawaz_db:wzf1BGHGqvI4PrYR`).
   - `apps/backend/server/MONGODB_SETUP.md` contained plaintext credentials in documentation.
   - **Remediation:** Password rotation required in MongoDB Atlas. Secrets must be stored solely in env vars.
2. **Missing Endpoint Authorization:**
   - Routes accept `userId` directly from route parameters or request bodies (e.g. `POST /api/languages/:userId`, `DELETE /quran/:userId/...`) without validating authorization header tokens. Any unauthenticated caller can overwrite or delete another user's progress.
3. **Insecure Secret Fallbacks:**
   - `src/config/env.ts` sets fallback values for `JWT_SECRET` (`tilawa-super-secure-jwt-access-secret-32-chars!`), which allows dangerous development defaults to run in production.
4. **Missing NoSQL Injection Protection:**
   - Express body parsing does not sanitize MongoDB query operators (`$gt`, `$ne`, `$where`), exposing database queries to operator injection.
5. **No Rate Limiting or CSRF Safeguards:**
   - Express server lacks global or route-specific rate limiters and helmet security headers.

### 🟡 Architectural & Code Quality Issues
1. **Unmounted Express Routes:**
   - `reading-progress.ts`, `streaks.ts`, `nafs.ts`, and `favorites.ts` were written as standalone async functions instead of Express routers, leaving core functionality unreachable via HTTP endpoints.
2. **ORM Confusion (Mongoose vs. Drizzle):**
   - The repository contains Drizzle ORM schemas (`src/db/schema.ts`) for PostgreSQL alongside Mongoose schemas for MongoDB.
   - **Remediation:** Remove Drizzle ORM and PostgreSQL dependencies; standardize strictly on Mongoose for MongoDB.
3. **Duplicate Files:**
   - `src/database/connect.js` duplicates `src/db/index.ts`.
   - `src/env.ts` duplicates `src/config/env.ts`.
   - `src/routes/favorites.ts` duplicates functions in `src/routes/bookmarks.ts`.
4. **Mock Data in Production Endpoints:**
   - `src/routes/hifz.ts` returns static mock SM-2 algorithm calculations instead of querying and updating the `HifzProgress` Mongoose model.
5. **Inconsistent API Response Shapes:**
   - Endpoints return varied formats: `{ success, bookmarks }`, `{ error }`, `{ success, data }`, or raw arrays.
6. **Unhandled Promise Rejections:**
   - Async route handlers lack `asyncHandler` wrappers, causing potential server crashes on unhandled promise rejections.

### 🟢 Database Performance & Indexing Gaps
1. **Missing Compound Indexes:**
   - `Bookmark`: Missing unique compound index on `{ userId: 1, surahNumber: 1, ayahNumber: 1, type: 1 }`.
   - `ReadingProgress`: Missing unique compound index on `{ userId: 1, surahNumber: 1 }`.
   - `HifzProgress`: Missing unique compound index on `{ userId: 1, cardId: 1 }`.
   - `NafsTracking`: Missing unique compound index on `{ userId: 1, date: 1 }`.
2. **Missing `lean()` Queries:**
   - Read-heavy queries fetch full Mongoose documents, incurring memory and deserialization overhead.

---

## 3. Secrets Rotation Checklist

The following secrets identified in git history and codebase docs MUST be rotated:

- [ ] **MongoDB Atlas Database Password:** User `syedshahnawaz1519_db_user` password `0v6pU5xPJw0NvX0p`
- [ ] **MongoDB Atlas Cluster User:** User `syedshahnawaz_db` password `wzf1BGHGqvI4PrYR`
- [ ] **JWT Access Secret:** Production `JWT_SECRET`
- [ ] **JWT Refresh Secret:** Production `JWT_REFRESH_SECRET`

---

## 4. Planned Modular Architecture (Phase 1 Target)

The backend will be refactored into a clean 3-tier modular architecture under `src/`:

```
apps/backend/server/src/
├── config/           # Fail-fast Zod env, constants, logger
├── modules/          # Feature modules (Domain isolated)
│   ├── auth/         # routes, controller, service, repository, model, schemas, types
│   ├── users/        # User management & profiles
│   ├── quran/        # Quran text, translations, search
│   ├── audio/        # Audio reciter metadata & audio stream references
│   ├── hadith/       # Hadith collections & search
│   ├── dua/          # Dua & Adhkar collections
│   ├── hifz/         # Hifz memorization & SM-2 algorithm engine
│   ├── progress/     # Reading progress sync & history
│   ├── bookmarks/    # Bookmarks & favorites management
│   ├── nafs/         # Spiritual habit tracking
│   └── streaks/      # Daily streaks & XP calculation
├── middlewares/      # Auth, Zod validation, rate limiter, error handler, request ID
├── utils/            # ApiError, response helper, asyncHandler, pagination
├── jobs/             # Scheduled tasks (streak resets, token cleanup)
├── app.ts            # Express app configuration
└── server.ts         # Server bootstrap, DB connection, graceful shutdown
```
