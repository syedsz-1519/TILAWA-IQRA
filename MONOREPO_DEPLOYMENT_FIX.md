# Vercel Monorepo Deployment - Complete Fix

## Problem Diagnosed

Your `vercel.json` shows a **monorepo setup** with frontend + backend services:
```json
{
  "services": {
    "frontend": { "root": "frontend", "framework": "nextjs" },
    "backend": { "root": "backend" }
  },
  "rewrites": [
    { "source": "/api/backend(/.*)?" },
    { "source": "/(.*)" }
  ]
}
```

But the code is configured for **single-service deployment**. This mismatch is causing deployment failures.

---

## Solution: Two Options

### **OPTION 1: Frontend-Only on Vercel (Recommended - Faster)**

Deploy **only frontend on Vercel**, deploy **backend separately** on Railway/Fly.io.

**Advantages:**
- Simpler setup
- Faster deployments
- Independent scaling
- Recommended for most teams

**Steps:**

1. **Remove monorepo config** - use frontend-only config:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rootDirectory": "frontend",
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install --frozen-lockfile"
}
```

2. **Update environment variables** in Vercel:
   - `NEXT_PUBLIC_API_URL=https://your-backend.railway.app` (if using Railway)
   - `NEXT_PUBLIC_BETTER_AUTH_URL=https://your-frontend.vercel.app`
   - `DATABASE_URL=postgresql://...` (cloud database)
   - `BETTER_AUTH_SECRET=<32-char-secret>`

3. **Deploy backend separately** (see section below)

4. **Push to GitHub and deploy**

---

### **OPTION 2: Full Monorepo on Vercel (Complex)**

Deploy both frontend and backend on Vercel.

**Advantages:**
- Single platform
- Simpler monitoring

**Disadvantages:**
- More complex setup
- Limited backend scalability
- Higher costs
- Shared environment

**Required setup:**

1. **Frontend must have `/api` route** that calls backend
2. **Backend as Vercel Functions** (serverless)
3. **Shared environment variables**

---

## Quick Fix (5 minutes)

If you're stuck and need to deploy NOW:

### Step 1: Fix vercel.json for frontend-only

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rootDirectory": "frontend"
}
```

### Step 2: Add environment variables

In **Vercel Dashboard → Project Settings → Environment Variables**:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-vercel-project.vercel.app
DATABASE_URL=postgresql://user:pass@host:5432/tilawa
BETTER_AUTH_SECRET=generatewith:node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Push to GitHub

```bash
git add vercel.json
git commit -m "fix: switch to frontend-only Vercel config"
git push
```

### Step 4: Vercel auto-redeploys

Wait 2-3 minutes for Vercel to rebuild and deploy.

---

## Backend Deployment (Separate Platform)

### **Backend on Railway (Easiest)**

1. Go to **https://railway.app**
2. Create new project
3. Connect GitHub
4. Railway auto-detects `backend/` folder
5. Add environment variables:
   ```
   DATABASE_URL=postgresql://...
   BETTER_AUTH_SECRET=<same-as-frontend>
   CORS_ORIGINS=https://your-vercel-project.vercel.app
   ENVIRONMENT=production
   ```
6. Copy deployment URL
7. Add to Vercel: `NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app`

### **Backend on Fly.io**

```bash
cd backend
flyctl launch --name tilawa-api
flyctl secrets set DATABASE_URL="postgresql://..."
flyctl secrets set BETTER_AUTH_SECRET="<secret>"
flyctl deploy
```

Copy URL and add to Vercel environment.

---

## Environment Variables Checklist

### Frontend (Vercel)
- [ ] `NEXT_PUBLIC_API_URL` - points to backend
- [ ] `NEXT_PUBLIC_BETTER_AUTH_URL` - your Vercel domain
- [ ] `DATABASE_URL` - cloud PostgreSQL
- [ ] `BETTER_AUTH_SECRET` - 32+ char random

### Backend (Railway/Fly.io)
- [ ] `DATABASE_URL` - same as frontend
- [ ] `BETTER_AUTH_SECRET` - same as frontend
- [ ] `CORS_ORIGINS` - include Vercel frontend URL
- [ ] `ENVIRONMENT` - set to "production"

---

## Fix Checklist

**Before deployment:**
- [ ] vercel.json fixed (use frontend-only config OR properly configured monorepo)
- [ ] All environment variables added to Vercel
- [ ] DATABASE_URL tested (psql command)
- [ ] BETTER_AUTH_SECRET is 32+ characters
- [ ] Backend deployment option chosen (Railway/Fly.io/AWS)
- [ ] Backend environment variables set

**After deployment:**
- [ ] Frontend loads: `https://your-project.vercel.app`
- [ ] Backend responds: `curl https://your-backend.com/api/health`
- [ ] No CORS errors in browser console
- [ ] Sign-up works
- [ ] Quran pages load

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| **Build fails: "DATABASE_URL not found"** | Env var not set | Add DATABASE_URL to Vercel |
| **Build fails: "auth is null"** | BETTER_AUTH_SECRET missing | Add BETTER_AUTH_SECRET |
| **Frontend loads but API 404** | NEXT_PUBLIC_API_URL wrong | Check backend URL |
| **CORS error in console** | Backend CORS not configured | Add frontend URL to backend CORS_ORIGINS |
| **Sign-up returns 500** | Database connection failed | Verify DATABASE_URL |
| **Pages say "Not Found"** | vercel.json rootDirectory wrong | Should be "frontend" |

---

## Step-by-Step Instructions

### **FASTEST PATH (Option 1 - Recommended)**

**Time: 30 minutes to full deployment**

#### Step 1: Fix vercel.json (5 min)

Replace entire `vercel.json` with:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rootDirectory": "frontend",
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install --frozen-lockfile"
}
```

#### Step 2: Prepare environment (5 min)

Generate secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Get cloud PostgreSQL:
- Go to https://console.neon.tech
- Create database
- Copy connection string

#### Step 3: Add to Vercel (5 min)

1. Vercel Dashboard → Project Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_API_URL` = (temp) `http://localhost:8000`
   - `NEXT_PUBLIC_BETTER_AUTH_URL` = `https://your-project.vercel.app`
   - `DATABASE_URL` = (from Neon)
   - `BETTER_AUTH_SECRET` = (generated above)

#### Step 4: Deploy backend (10 min)

Option A: Railway
```bash
# Go to https://railway.app
# Select TILAWA repo
# Wait for auto-deploy
# Copy URL
```

Option B: Fly.io
```bash
cd backend
flyctl launch --name tilawa-api
# Follow prompts
flyctl secrets set DATABASE_URL="..."
flyctl secrets set BETTER_AUTH_SECRET="..."
flyctl deploy
```

#### Step 5: Update Vercel (2 min)

Update `NEXT_PUBLIC_API_URL` to your backend URL

#### Step 6: Test (3 min)

```bash
# Test frontend
curl https://your-project.vercel.app

# Test backend
curl https://your-backend-url/api/health

# Test in browser
# Go to https://your-project.vercel.app
# Try sign-up
```

---

## What to Do Right Now

1. **Tell me:** Are you using monorepo or single-service deployment?
2. **Choose:** Option 1 (frontend-only) or Option 2 (monorepo)?
3. **Execute:** Follow the checklist above
4. **Report:** Any errors you see

---

## Emergency: If Still Stuck

Send me:
1. Your `vercel.json` file
2. Vercel build log (Deployments → [latest] → Logs)
3. Error messages you see

Then I'll fix it directly.

---

**Next Steps:**
1. Update `vercel.json` with frontend-only config
2. Deploy backend to Railway/Fly.io
3. Add environment variables to Vercel
4. Push to GitHub
5. Vercel auto-deploys in 2-3 minutes

**Time to deployment:** 30 minutes
