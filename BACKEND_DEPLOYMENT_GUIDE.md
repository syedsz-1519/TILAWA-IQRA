# TILAWA Backend Deployment Guide

## 🎯 Overview

The TILAWA backend is an **Express.js + Mongoose + MongoDB** server that cannot run on Vercel (Vercel only supports frontend frameworks). Instead, we'll deploy it to **Railway.app** which supports Node.js perfectly.

---

## 📋 Backend Stack

- **Framework:** Express.js ^4.18.2
- **Runtime:** Node.js (ES modules)
- **Language:** TypeScript 5.7.3
- **Database:** MongoDB Atlas (cloud)
- **Port:** 8000 (configurable)
- **Build:** TypeScript compilation to `dist/` folder

---

## 🚀 Deployment Steps (Railway.app)

### **Step 1: Create Railway Account**

1. Go to: https://railway.app
2. Click **"Start New Project"**
3. Sign up with GitHub (recommended)

---

### **Step 2: Deploy Backend from GitHub**

1. Click **"Create New Project"**
2. Select **"GitHub"**
3. **Authorize Railway** with your GitHub account
4. **Select Repository:** `syedsz-1519/TILAWA-IQRA`
5. **Select Service:** Automatic detection will find Node.js
6. Railway will auto-detect `apps/backend/server` as the backend directory

---

### **Step 3: Configure Build Settings**

Railway should auto-detect these, but verify:

```
Build Command: npm run build
Start Command: npm start
Root Directory: apps/backend/server
```

---

### **Step 4: Add Environment Variables**

In Railway Dashboard → Your Project → Variables:

**Click "+ Add Variable"** for each:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://syedshahnawaz_db:wzf1BGHGqvI4PrYR@cluster0.wxno2ll.mongodb.net/tilawa?retryWrites=true&w=majority` |
| `BETTER_AUTH_SECRET` | 32+ character random secret | `abc123def456ghi789jkl012mno345pqr` |
| `NODE_ENV` | `production` | `production` |
| `PORT` | `8000` (or leave empty for auto) | `8000` |
| `FRONTEND_URL` | Your Vercel frontend URL | `https://tilawa-iqra.vercel.app` |
| `LOG_LEVEL` | `info` | `info` |

---

### **Step 5: Get Backend URL**

Once deployed, Railway gives you a **public URL**:
- Example: `https://tilawa-backend-prod-production.up.railway.app`
- This is your `NEXT_PUBLIC_API_URL` for the frontend!

---

### **Step 6: Update Frontend with Backend URL**

After backend is live on Railway:

1. Go to **Vercel Dashboard** → Your project → **Settings** → **Environment Variables**
2. Add/Update:
   - **NEXT_PUBLIC_API_URL** = `https://tilawa-backend-prod-production.up.railway.app` (Railway's URL)
   - **NEXT_PUBLIC_BETTER_AUTH_URL** = `https://tilawa-iqra.vercel.app` (Your Vercel domain)
3. Click **Save**
4. Vercel will automatically redeploy

---

## 🔧 Backend Configuration Files

### **`package.json`** (apps/backend/server/)

Key scripts:
```json
{
  "scripts": {
    "dev": "tsx src/index.ts",          // Development with hot-reload
    "build": "tsc",                     // Compile TypeScript to dist/
    "start": "node dist/index.js",      // Production startup
    "db:push": "drizzle-kit push:pg",   // (Not used currently)
    "db:migrate": "tsx src/db/migrate.ts" // (Not used currently)
  }
}
```

**Railway uses:**
- `npm install` (automatic)
- `npm run build` (compile TypeScript)
- `npm start` (run compiled JavaScript)

---

### **`tsconfig.json`** (apps/backend/server/)

Configured for:
- ES modules (`"module": "esnext"`)
- CommonJS output for Node.js
- Strict type checking
- Output to `dist/` folder

---

### **`src/index.ts`** (Main Entry Point)

The server:
1. Loads environment variables from `.env`
2. Connects to MongoDB
3. Starts Express server on port 8000
4. Exposes health check: `GET /health`
5. Mounts all API routes
6. Handles errors gracefully
7. Supports graceful shutdown (SIGINT)

---

## 📡 API Endpoints Available

Once deployed, the backend serves these endpoints:

### **Health Check**
```
GET /health
Response: { status: "ok", environment: "production", database: "connected", timestamp: "..." }
```

### **Languages**
```
GET /api/languages                          # Get all supported languages
GET /api/languages/:userId                  # Get user's language preferences
POST /api/languages/:userId                 # Update user's language settings
```

### **Reading Progress**
```
GET /api/reading-progress/:userId
POST /api/reading-progress/:userId
```

### **Bookmarks**
```
GET /api/bookmarks/:userId
POST /api/bookmarks                         # Add bookmark
DELETE /api/bookmarks/:bookmarkId           # Remove bookmark
```

### **Hifz (Memorization)**
```
GET /api/hifz/progress/:userId
POST /api/hifz/update-progress
POST /api/hifz/session
POST /api/hifz/session/:sessionId/end
GET /api/hifz/stats/:userId
```

### **Streaks & XP**
```
GET /api/streaks/:userId
POST /api/streaks/:userId
```

### **Nafs Tracking**
```
GET /api/nafs/:userId
POST /api/nafs/:userId
```

---

## 🗄️ Database (MongoDB Atlas)

### **Current Configuration**

**Connection String:**
```
mongodb+srv://syedshahnawaz_db:wzf1BGHGqvI4PrYR@cluster0.wxno2ll.mongodb.net/tilawa?retryWrites=true&w=majority
```

**Database Name:** `tilawa`

**Collections:**
- `users` - User accounts and preferences
- `products` - E-learning products/courses
- `bookmarks` - User bookmarks (Quran, Hadith, Dua, Stories)
- `reading_progress` - Surah/Ayah reading tracking
- `streaks` - Daily streaks and XP
- `nafs_tracking` - Self-improvement tracking
- `hifz_progress` - Memorization progress (SM-2 algorithm)
- `languages` - Language-specific user data

### **Mongoose Models**

All models defined in `apps/backend/server/src/models/`:
- `User.ts` - User schema with language preferences
- `Product.ts` - Product/course schema
- `Bookmark.ts` - Bookmark schema (supports Quran/Hadith/Dua/Story)
- `ReadingProgress.ts` - Reading progress schema
- `Streak.ts` - Streak/XP schema
- `NafsTracking.ts` - Self-tracking schema
- `HifzProgress.ts` - Memorization cards with SM-2
- `Language.ts` - Language-specific progress

---

## ⚙️ Environment Variables (Complete List)

### **Required for Production**

```
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Authentication
BETTER_AUTH_SECRET=<32+ character random hex string>

# Server Configuration
NODE_ENV=production
PORT=8000
FRONTEND_URL=https://tilawa-iqra.vercel.app

# Logging
LOG_LEVEL=info
```

### **How to Generate BETTER_AUTH_SECRET**

**On Windows PowerShell:**
```powershell
$bytes = [byte[]]::new(32)
[Security.Cryptography.RNGCryptoServiceProvider]::new().GetBytes($bytes)
[Convert]::ToHexString($bytes).ToLower()
```

**On Mac/Linux:**
```bash
openssl rand -hex 32
```

---

## 🔍 Monitoring & Logs

### **View Logs in Railway**

1. Go to Railway Dashboard → Your Project
2. Click **"Logs"** tab
3. See real-time logs of your backend

### **Health Check**

Test that backend is running:
```bash
curl https://your-railway-url/health

# Response:
# {
#   "status": "ok",
#   "environment": "production",
#   "database": "connected",
#   "timestamp": "2026-09-24T12:00:00.000Z"
# }
```

---

## 🆘 Troubleshooting

### **Issue: Build fails on Railway**

**Error:** `npm: command not found`
- **Fix:** Railway should auto-detect Node.js. If not, add `engines` to `package.json`:
```json
{
  "engines": {
    "node": "20.x"
  }
}
```

### **Issue: Cannot connect to MongoDB**

**Error:** `ECONNREFUSED` or timeout
- **Fix:** Add Railway IP to MongoDB Atlas whitelist:
  1. Go to MongoDB Atlas → Network Access
  2. Add Railway IP: Get from Railway logs
  3. Or add `0.0.0.0/0` (not recommended for production)

### **Issue: CORS errors from frontend**

**Error:** `Access to XMLHttpRequest blocked by CORS policy`
- **Fix:** Verify `FRONTEND_URL` env var matches your Vercel domain exactly

### **Issue: Environment variables not loading**

**Error:** `undefined` values in logs
- **Fix:** Railway loads env vars on deploy. If you add them after:
  1. Go to Railway Dashboard → Variables
  2. Make any small edit (like adding/removing space)
  3. Redeploy: Click "Deploy" button

---

## 📊 Deployment Checklist

- [ ] GitHub repository synced with latest code
- [ ] `package.json` has correct scripts (dev, build, start)
- [ ] `tsconfig.json` configured for Node.js ES modules
- [ ] `src/index.ts` connects to MongoDB
- [ ] `.env.example` documents all required variables
- [ ] Railway project created
- [ ] GitHub connected to Railway
- [ ] `apps/backend/server` auto-detected as root directory
- [ ] All environment variables added to Railway:
  - [ ] MONGODB_URI
  - [ ] BETTER_AUTH_SECRET
  - [ ] NODE_ENV
  - [ ] PORT
  - [ ] FRONTEND_URL
  - [ ] LOG_LEVEL
- [ ] Build succeeds (check Railway Logs)
- [ ] Service deployed and running
- [ ] Health check responds: `GET /health`
- [ ] Railway URL noted (e.g., `https://tilawa-backend-prod-xyz.up.railway.app`)
- [ ] Frontend updated with backend URL as `NEXT_PUBLIC_API_URL`
- [ ] Vercel redeployed with new env vars

---

## 🎉 Success!

Once deployed:

✅ **Frontend** running on Vercel: `https://tilawa-iqra.vercel.app`
✅ **Backend** running on Railway: `https://tilawa-backend-prod-xyz.up.railway.app`
✅ **Database** MongoDB Atlas: `tilawa` database with 8 collections
✅ **API** fully functional and connecting frontend ↔ backend

---

## 📝 Next Steps

1. **Deploy Backend to Railway** (follow steps 1-6 above)
2. **Get Backend URL** from Railway
3. **Update Vercel Environment Variables** with backend URL
4. **Redeploy Frontend** on Vercel
5. **Test:** Open frontend and try API calls (bookmarks, languages, etc.)

---

**Generated:** September 24, 2026
**Status:** ✅ Ready for deployment
