# 🗄️ Database Integration Guide - TILAWA

Complete guide to Tilawa's database integration using Drizzle ORM with PostgreSQL.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Database Schema](#database-schema)
3. [Setup Instructions](#setup-instructions)
4. [API Routes](#api-routes)
5. [Hooks & Client Utilities](#hooks--client-utilities)
6. [Usage Examples](#usage-examples)
7. [Deployment](#deployment)

---

## 🏗️ Architecture Overview

```
Frontend (Next.js)
    ↓
API Routes (/app/api/*)
    ↓
Database Client (lib/db-client.ts)
    ↓
Backend Routes (backend/src/routes/*)
    ↓
Database (PostgreSQL) + Drizzle ORM
```

**Components:**

- **Frontend**: React components + hooks consuming API routes
- **API Routes**: Next.js server-side route handlers with mock/real data
- **Database Client**: Typed utilities for API calls
- **Backend**: Drizzle ORM query functions (for future backend service)
- **Database**: PostgreSQL with tables managed by Drizzle migrations

---

## 🗂️ Database Schema

### Better Auth Tables

- `user` - User profiles
- `session` - Active sessions
- `account` - OAuth/password accounts
- `verification` - Email verification codes

### Application Tables

| Table | Purpose |
|-------|---------|
| `streaks` | Daily activity streaks & XP tracking |
| `nafsTracking` | Daily spiritual habit tracking with reflection |
| `mushafBookmarks` | Bookmarked ayahs in the Quran reader |
| `readingProgress` | Last read position per surah |
| `tajweedScores` | Quiz attempt scores and results |
| `hadithFavorites` | Saved hadiths |
| `duaFavorites` | Saved duas |

---

## 🚀 Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/tilawa
NODE_ENV=development
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
```

### 2. Database Connection

```bash
# Generate Drizzle migrations
npm run db:push

# Or use Drizzle Studio for visual management
npm run db:studio
```

### 3. Frontend Already Configured

```bash
cd frontend
# API routes are ready at /app/api/*
npm install
npm run dev
```

---

## 🔌 API Routes

All routes are in `/frontend/app/api/`:

### Streaks API

**GET** `/api/streaks`
```json
{
  "currentStreak": 5,
  "totalXP": 1250,
  "lastActivityDate": "2024-01-15T00:00:00Z"
}
```

**POST** `/api/streaks`
```json
{
  "userId": "user-123",
  "xpGain": 50
}
```

### Bookmarks API

**GET** `/api/bookmarks?userId=user-123`
```json
[
  { "surahNumber": 2, "ayahNumber": 255, "bookmarkedAt": "..." }
]
```

**POST** `/api/bookmarks`
```json
{
  "userId": "user-123",
  "surahNumber": 2,
  "ayahNumber": 255
}
```

**DELETE** `/api/bookmarks`
```json
{
  "userId": "user-123",
  "surahNumber": 2,
  "ayahNumber": 255
}
```

### Reading Progress API

**GET** `/api/reading-progress?userId=user-123[&surahNumber=2]`
```json
{
  "surahNumber": 2,
  "lastAyahRead": 186,
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**POST** `/api/reading-progress`
```json
{
  "userId": "user-123",
  "surahNumber": 2,
  "lastAyahRead": 186
}
```

---

## 🎣 Hooks & Client Utilities

### Database Client (`lib/db-client.ts`)

```typescript
// Streaks
import { getStreaks, updateStreaks } from '@/lib/db-client'

await getStreaks('user-123')
await updateStreaks('user-123', 50) // Add 50 XP

// Bookmarks
import { getBookmarks, addBookmark, removeBookmark } from '@/lib/db-client'

await addBookmark('user-123', 2, 255)
await removeBookmark('user-123', 2, 255)

// Reading Progress
import { getReadingProgress, updateReadingProgress } from '@/lib/db-client'

await updateReadingProgress('user-123', 2, 186)
```

### React Hooks

#### `useStreaks(userId)`

```typescript
const { currentStreak, totalXP, addXP, isLoading } = useStreaks(userId)

await addXP(50) // Add 50 XP
```

#### `useReadingProgress(userId, surahNumber)`

```typescript
const { lastAyahRead, updateProgress, isLoading } = useReadingProgress(userId, 2)

await updateProgress(186) // Update to ayah 186
```

#### `useBookmarks(userId)`

```typescript
const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks(userId)

const bookmarked = isBookmarked(2, 255) // Check if bookmarked
await toggleBookmark(2, 255) // Add or remove
```

---

## 💡 Usage Examples

### Example 1: Track Reading Progress

```typescript
'use client'

import { useReadingProgress } from '@/hooks/use-reading-progress'

export function QuranReader({ userId, surahNumber }: Props) {
  const { lastAyahRead, updateProgress } = useReadingProgress(userId, surahNumber)

  const handleAyahClick = async (ayahNumber: number) => {
    await updateProgress(ayahNumber)
  }

  return (
    <div>
      <p>Last read: Ayah {lastAyahRead}</p>
      {/* Render quran and call handleAyahClick */}
    </div>
  )
}
```

### Example 2: Display User Streaks

```typescript
'use client'

import { useStreaks } from '@/hooks/use-streaks'

export function StreaksDisplay({ userId }: Props) {
  const { currentStreak, totalXP, addXP } = useStreaks(userId)

  return (
    <div>
      <p>Streak: {currentStreak} days 🔥</p>
      <p>Total XP: {totalXP}</p>
      <button onClick={() => addXP(100)}>Complete Task (+100 XP)</button>
    </div>
  )
}
```

### Example 3: Manage Bookmarks

```typescript
'use client'

import { useBookmarks } from '@/hooks/use-bookmarks'

export function AyahCard({ userId, surahNumber, ayahNumber }: Props) {
  const { isBookmarked, toggleBookmark, isLoading } = useBookmarks(userId)

  return (
    <button
      onClick={() => toggleBookmark(surahNumber, ayahNumber)}
      disabled={isLoading}
      className={isBookmarked(surahNumber, ayahNumber) ? 'active' : ''}
    >
      {isBookmarked(surahNumber, ayahNumber) ? '⭐' : '☆'} Bookmark
    </button>
  )
}
```

---

## 🛠️ Backend Integration

To connect to real database (currently using mock data):

### 1. Replace Mock API with Real Backend

```typescript
// frontend/app/api/streaks/route.ts
import { getUserStreaks, updateUserXP } from '@/backend/routes/streaks'
import { auth } from '@/lib/auth' // Session handler

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { xpGain } = await request.json()
  const updated = await updateUserXP(session.userId, xpGain)
  return NextResponse.json(updated)
}
```

### 2. Database Migrations

```bash
cd backend

# Generate migrations from schema
npm run db:push

# View migrations in Drizzle Studio
npm run db:studio
```

### 3. Run Backend Service

```bash
npm run dev  # Development
npm start    # Production
```

---

## 🚢 Deployment

### Environment Variables

Add to production `.env`:

```env
DATABASE_URL=postgresql://user:password@prod-db.example.com:5432/tilawa
NODE_ENV=production
BETTER_AUTH_SECRET=production-secret-key
BETTER_AUTH_URL=https://tilawa.app
```

### Database Migrations on Deployment

```bash
# Run before deployment
npm run db:push
```

### Vercel Deployment

1. Add `DATABASE_URL` to Vercel environment variables
2. API routes automatically hosted
3. Mock data persists in-memory (use real database for production)

---

## 📊 Database Indexes

All tables have proper indexes for user-scoped queries:

- `idx_streaks_user` - Fast streak lookups by user
- `idx_bookmarks_user` - Fast bookmark queries
- `idx_progress_user` - Fast reading progress lookups
- `uniq_user_surah_ayah` - Prevent duplicate bookmarks

---

## 🔍 Debugging

### Check Database State

```bash
# Open Drizzle Studio
npm run db:studio
# Visit http://localhost:3000 (default)
```

### Mock Data Inspection

Data is currently stored in-memory. To persist across restarts, implement:

```typescript
// Option 1: Use localStorage on frontend
localStorage.setItem('bookmarks', JSON.stringify(data))

// Option 2: Connect to real PostgreSQL database
// Update backend/src/db/index.ts with real pool
```

---

## ✅ Checklist for Full Integration

- [x] Schema defined in Drizzle ORM
- [x] API routes created
- [x] Database client utilities
- [x] React hooks for data fetching
- [x] Mock implementation (development)
- [ ] Production PostgreSQL setup
- [ ] Real backend service running
- [ ] Authentication layer (Better Auth)
- [ ] Error handling & logging
- [ ] Data validation & sanitization

---

## 📚 References

- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Better Auth](https://www.better-auth.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Status**: ✅ Ready for Development & Testing

Next: Deploy to staging database, test real data flow
