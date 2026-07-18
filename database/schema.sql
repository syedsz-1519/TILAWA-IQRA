-- ==========================================
-- TILAWA DATABASE SCHEMA BLUEPRINT
-- Postgres Relational tables mapped via Drizzle ORM
-- ==========================================

-- --- Better Auth Tables --------------------

CREATE TABLE IF NOT EXISTS "user" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
    "image" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "session" (
    "id" TEXT PRIMARY KEY,
    "expiresAt" TIMESTAMP NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
    "id" TEXT PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP,
    "refreshTokenExpiresAt" TIMESTAMP,
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "verification" (
    "id" TEXT PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);


-- --- Application Tables --------------------

-- User Streaks and XP Points
CREATE TABLE IF NOT EXISTS "streaks" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "totalXP" INTEGER NOT NULL DEFAULT 0,
    "lastActivityDate" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Daily Nafs Spiritual Habit Tracking
CREATE TABLE IF NOT EXISTS "nafsTracking" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "habits" JSON NOT NULL DEFAULT '{}'::json,
    "reflection" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- User Bookmarks in Mushaf Reader
CREATE TABLE IF NOT EXISTS "mushafBookmarks" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "surahNumber" INTEGER NOT NULL,
    "ayahNumber" INTEGER NOT NULL,
    "bookmarkedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Reading Progress Session Trackers
CREATE TABLE IF NOT EXISTS "readingProgress" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "surahNumber" INTEGER NOT NULL,
    "lastAyahRead" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tajweed Quiz Score Logs
CREATE TABLE IF NOT EXISTS "tajweedScores" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "quizNumber" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "attemptedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Hadith Favorites list
CREATE TABLE IF NOT EXISTS "hadithFavorites" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "hadithId" TEXT NOT NULL,
    "hadithText" TEXT NOT NULL,
    "hadithSource" TEXT,
    "savedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Dua Favorites list
CREATE TABLE IF NOT EXISTS "duaFavorites" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "duaId" TEXT NOT NULL,
    "duaText" TEXT NOT NULL,
    "duaTranslation" TEXT,
    "benefit" TEXT,
    "savedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create Indexes for user scoping
CREATE INDEX IF NOT EXISTS "idx_streaks_user" ON "streaks" ("userId");
CREATE INDEX IF NOT EXISTS "idx_nafs_user" ON "nafsTracking" ("userId");
CREATE INDEX IF NOT EXISTS "idx_bookmarks_user" ON "mushafBookmarks" ("userId");
CREATE INDEX IF NOT EXISTS "idx_progress_user" ON "readingProgress" ("userId");
