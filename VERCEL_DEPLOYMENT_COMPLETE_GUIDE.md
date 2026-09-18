# 🚀 TILAWA Vercel Deployment Complete Guide

## ⚠️ CRITICAL ISSUE FOUND

Your backend has a **database mismatch**:
- ❌ `.env` has MongoDB URL
- ✅ Code expects PostgreSQL (using `pg` driver + `drizzle-orm/node-postgres`)

**This will cause immediate runtime crash!**

You have **TWO options**:

---

## OPTION 1: Use MongoDB (What You Have Now)

**Recommended if you want to stick with MongoDB**

### Step 1: Update Backend Database Code

Update `backend/src/db/index.ts`:

```typescript
import mongoose from 'mongoose'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!)
    console.log('✅ MongoDB connected successfully')
    return mongoose.connection
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    process.exit(1)
  }
}

export const db = mongoose.connection
```

### Step 2: Update `backend/src/index.ts`

Add database connection:

```typescript
import { connectDB } from './db'

// ... after loading env vars ...

// Connect to database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Backend server running on port ${PORT}`)
  })
}).catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
```

### Step 3: Update Backend Routes

Convert all Drizzle ORM code to Mongoose:

```typescript
// Example: streaks.ts
import mongoose from 'mongoose'

const streakSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  currentStreak: { type: Number, default: 0 },
  totalXP: { type: Number, default: 0 },
  lastActivityDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Streak = mongoose.model('Streak', streakSchema)

export async function getUserStreaks(userId: string) {
  return await Streak.findOne({ userId })
}

export async function updateStreaks(userId: string, xpGain: number) {
  return await Streak.findOneAndUpdate(
    { userId },
    { $inc: { totalXP: xpGain, currentStreak: 1 }, updatedAt: new Date() },
    { upsert: true, new: true }
  )
}
```

### Step 4: Update Backend Build Script

Update `backend/package.json`:

```json
{
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:migrate": "mongosh < migrations.js"
  }
}
```

---

## OPTION 2: Use PostgreSQL (Recommended for Vercel)

**Better for serverless, easier Vercel integration**

### Step 1: Create PostgreSQL Database

Choose one:

**A. Neon (Recommended - Free tier)**
1. Go to https://neon.tech
2. Sign up
3. Create project
4. Get connection string: `postgresql://user:password@host/database`

**B. Supabase (PostgreSQL + Auth)**
1. Go to https://supabase.com
2. Create project
3. Get connection string from settings

**C. Railway**
1. Go to https://railway.app
2. Create project → Add PostgreSQL
3. Get DATABASE_URL from variables

### Step 2: Update `.env` with PostgreSQL URL

Update `backend/.env`:

```bash
# Database Configuration
# PostgreSQL connection string (from Neon/Supabase/Railway)
DATABASE_URL=postgresql://username:password@host.neon.tech:5432/database?sslmode=require

# ... rest of config ...
```

### Step 3: Keep Backend Code As-Is

Your current code is already configured for PostgreSQL! No changes needed.

### Step 4: Run Database Migrations

```bash
cd backend
npm run db:push
```

This creates all tables in PostgreSQL.

---

## RECOMMENDED: Go With Option 2 (PostgreSQL)

**Why?**

✅ Your code is already written for PostgreSQL
✅ Easier Vercel deployment
✅ Better serverless support
✅ Free tier available (Neon)
✅ No code changes needed
✅ Better performance for web apps

**Let's do Option 2:**

---

# 🚀 Deployment Steps (PostgreSQL Option)

## Step 1: Set Up PostgreSQL Database

### Using Neon (Recommended):

1. Go to https://neon.tech → Sign up
2. Create new project
3. Copy connection string
4. Update `backend/.env`:

```bash
DATABASE_URL=postgresql://user:password@host.neon.tech:5432/database?sslmode=require
```

5. Test locally:
```bash
cd backend
npm run dev
```

Should show: `✅ Backend server running on port 8000`

## Step 2: Deploy Backend to Railway/Render

### Using Railway (Simple):

1. Go to https://railway.app → Sign up
2. New project → GitHub repo
3. Select `backend` directory
4. Add variables:
   - `DATABASE_URL` = your Neon connection string
   - `BETTER_AUTH_SECRET` = strong random 32-char string
   - `NODE_ENV` = production
   - `FRONTEND_URL` = your Vercel frontend URL
5. Deploy
6. Get backend URL (e.g., `https://tilawa-backend.railway.app`)

### Using Render:

1. Go to https://render.com → Sign up
2. New Web Service → GitHub repo
3. Configure:
   - Build command: `cd backend && npm install && npm run build`
   - Start command: `node dist/index.js`
   - Environment variables (same as Railway)
4. Deploy
5. Get backend URL

## Step 3: Create Vercel Config File

Create `vercel.json` in root:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/.next",
  "installCommand": "cd frontend && npm install"
}
```

## Step 4: Update Frontend Environment Variables

Create `frontend/.env.production`:

```bash
# Use your deployed backend URL
NEXT_PUBLIC_API_URL=https://tilawa-backend.railway.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-vercel-domain.vercel.app

# Keep these the same
NEXT_PUBLIC_QURAN_API_BASE=https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions
NEXT_PUBLIC_ALQURAN_CLOUD_API=https://api.alquran.cloud/v1
NEXT_PUBLIC_MP3QURAN_CDN=https://cdn.alquran.cloud/quran
NEXT_PUBLIC_EVERYAYAH_CDN=https://everyayah.com/data/Yasser_Ad-Dossary
```

## Step 5: Deploy Frontend to Vercel

1. Push code to GitHub:
```bash
git add .
git commit -m "chore: prepare for Vercel deployment"
git push origin main
```

2. Go to https://vercel.com → Sign in with GitHub

3. Import project:
   - Select TILAWA-IQRA repository
   - Framework: Next.js (auto-detected)
   - Root directory: `frontend/`
   - Build command: `npm run build`
   - Output directory: `.next`

4. Add environment variables in Vercel:
   - `NEXT_PUBLIC_API_URL` = your backend URL
   - `NEXT_PUBLIC_BETTER_AUTH_URL` = your Vercel URL

5. Click Deploy!

## Step 6: Run Database Migrations

After first deployment, run:

```bash
cd backend
npm run db:push
```

This creates all tables in PostgreSQL.

---

## ✅ Deployment Checklist

### Backend (Railway/Render)
- [ ] PostgreSQL database created (Neon/Supabase)
- [ ] DATABASE_URL configured
- [ ] BETTER_AUTH_SECRET set (32+ chars)
- [ ] NODE_ENV = production
- [ ] FRONTEND_URL configured
- [ ] Backend deployed
- [ ] Database migrations run (npm run db:push)
- [ ] Test endpoint: `curl https://your-backend.railway.app/health`

### Frontend (Vercel)
- [ ] vercel.json created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] NEXT_PUBLIC_API_URL set to backend URL
- [ ] NEXT_PUBLIC_BETTER_AUTH_URL set to Vercel URL
- [ ] Frontend deployed
- [ ] Test app: Open in browser

### Verification
- [ ] Frontend loads at vercel.app
- [ ] Can see home page
- [ ] Console shows no errors
- [ ] API calls reach backend (check Network tab)
- [ ] Can interact with features

---

## 🔐 Environment Variables Summary

### Backend (Railway/Render Environment)
```
DATABASE_URL=postgresql://...@neon.tech/...
BETTER_AUTH_SECRET=your-32-character-secret-key
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
PORT=3000 (auto-set)
LOG_LEVEL=info
```

### Frontend (Vercel Environment)
```
NEXT_PUBLIC_API_URL=https://tilawa-backend.railway.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_QURAN_API_BASE=https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions
NEXT_PUBLIC_ALQURAN_CLOUD_API=https://api.alquran.cloud/v1
```

---

## 🆘 Troubleshooting

### "Cannot connect to database"
- Check DATABASE_URL is correct
- Check IP is whitelisted in MongoDB Atlas OR PostgreSQL firewall
- Test connection locally first

### "CORS error"
- Check backend CORS includes frontend URL
- Verify FRONTEND_URL env var matches actual frontend domain
- Check Network tab to see actual request

### "Build fails on Vercel"
- Check all env vars are set
- Check Next.js build works locally: `cd frontend && npm run build`
- Check no hardcoded localhost URLs

### "API calls return 404"
- Check backend URL in NEXT_PUBLIC_API_URL
- Check backend is actually deployed
- Test endpoint directly: `curl https://backend-url/health`

---

## 📊 Final Deployment Structure

```
GitHub Repository
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── package.json
│   ├── next.config.mjs
│   └── .env.production
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env (gitignored)
└── vercel.json

Deployed:
├── Vercel: frontend (vercel.app domain)
├── Railway/Render: backend (railway.app or render.com domain)
└── Neon/Supabase/Railway: PostgreSQL database
```

---

## ✨ You're Ready!

Follow these steps and TILAWA will be live on Vercel! 🎉

Any questions? Let me know which option you want to go with!
