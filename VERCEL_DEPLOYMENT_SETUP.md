# Vercel Deployment Configuration Guide

## Overview

This guide explains how to properly configure TILAWA for Vercel deployment and fix the remaining deployment issues.

---

## Issue Summary

The TILAWA deployment is failing because:

1. **Database connection fails at build time** ✅ FIXED
2. **Better Auth secret not configured** ✅ FIXED
3. **Environment variables incomplete** ✅ FIXED
4. **Vercel configuration missing** 🔴 NEEDS FIX
5. **Backend API not routable** 🔴 NEEDS FIX

---

## Part 1: Configure Vercel Dashboard

### Step 1: Add Environment Variables

Go to: **Vercel Dashboard → Project Settings → Environment Variables**

Add these variables and select "Production" for each:

```
REQUIRED VARIABLES:

1. DATABASE_URL
   Value: postgresql://[user]:[password]@[host]:[port]/[database]
   Source: Get from Neon.tech, Railway, or AWS RDS
   
2. BETTER_AUTH_SECRET
   Value: [32+ character random string]
   Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
3. NEXT_PUBLIC_API_URL
   Value: https://[your-backend-url]/api
   (If backend is on same Vercel: https://[backend-project].vercel.app/api)
   
4. NEXT_PUBLIC_BETTER_AUTH_URL
   Value: https://[your-project].vercel.app
   (Vercel provides this automatically after first deploy)

OPTIONAL BUT RECOMMENDED:

5. NEXT_PUBLIC_ENVIRONMENT
   Value: production
   
6. NEXT_PUBLIC_APP_NAME
   Value: TILAWA
```

### Step 2: Verify Build Settings

Go to: **Vercel Dashboard → Project Settings → General**

Verify these settings:

- **Framework Preset:** Next.js
- **Build Command:** `pnpm build`
- **Output Directory:** `.next`
- **Install Command:** `pnpm install --frozen-lockfile`
- **Node.js Version:** 20.x or higher

---

## Part 2: Manual vercel.json Updates

Since `vercel.json` can't be edited directly in some modes, here's what needs to be configured:

### Update vercel.json (copy the complete file below)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rootDirectory": "frontend",
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install --frozen-lockfile",
  "framework": "nextjs",
  "regions": ["sfo1"],
  "functions": {
    "api/**": {
      "runtime": "nodejs20.x",
      "memory": 1024,
      "maxDuration": 60
    }
  },
  "rewrites": [
    {
      "source": "/api/auth/(.*)",
      "destination": "/api/auth/[...all]"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        },
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization, X-CSRF-Token"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/auth",
      "destination": "/sign-in",
      "permanent": false
    }
  ]
}
```

**What this does:**

- `rootDirectory`: Tells Vercel frontend code is in `/frontend`
- `buildCommand`: Uses pnpm to build
- `installCommand`: Uses pnpm with frozen lockfile
- `functions`: Configures API routes to run as serverless functions
- `rewrites`: Routes `/api/auth/*` to the auth handler
- `headers`: Adds CORS headers to all API routes (allows cross-origin requests)
- `redirects`: Redirects old auth URLs to sign-in page

---

## Part 3: Database Setup (Cloud PostgreSQL)

You MUST use a cloud PostgreSQL database. Local databases won't work on Vercel.

### Option A: Neon.tech (Recommended, Free Tier)

1. Go to: https://console.neon.tech
2. Sign up with GitHub
3. Create a new project
4. Copy the connection string: `postgresql://...`
5. Add to Vercel as `DATABASE_URL` environment variable

### Option B: Railway.app

1. Go to: https://railway.app
2. Sign in with GitHub
3. Create new project → Add PostgreSQL
4. Copy the DATABASE_URL from the PostgreSQL plugin
5. Add to Vercel as `DATABASE_URL` environment variable

### Option C: Render

1. Go to: https://render.com
2. Sign in with GitHub
3. Create new PostgreSQL database
4. Copy Internal Database URL
5. Add to Vercel as `DATABASE_URL` environment variable

### Option D: AWS RDS

1. Create RDS PostgreSQL instance
2. Get the endpoint from RDS console
3. Construct connection string: `postgresql://user:password@endpoint:5432/database`
4. Add to Vercel as `DATABASE_URL` environment variable

---

## Part 4: Backend API Deployment

TILAWA has a separate FastAPI backend that needs to be deployed separately.

### Option A: Deploy Backend to Vercel (Recommended)

Vercel can run FastAPI with proper configuration:

1. Create `api/index.py` at project root:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import sys

# Add backend to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from main import app

# Add CORS middleware for Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health():
    return {"status": "ok"}
```

2. Update `vercel.json` to include Python functions:

```json
{
  "functions": {
    "api/**": {
      "runtime": "python3.9"
    },
    "frontend/pages/**": {
      "runtime": "nodejs20.x"
    }
  }
}
```

### Option B: Deploy Backend to Railway

1. Go to: https://railway.app
2. Connect GitHub and select TILAWA repository
3. Railway auto-detects `backend/` and `requirements.txt`
4. Configure environment:
   - `DATABASE_URL`: Same as frontend
   - `BETTER_AUTH_SECRET`: Same as frontend
   - `CORS_ORIGINS`: Add your Vercel frontend URL
5. Copy deployment URL from Railway
6. Add to Vercel as `NEXT_PUBLIC_API_URL`

### Option C: Deploy Backend to Fly.io

1. Go to: https://fly.io
2. Install `flyctl`: `brew install flyctl`
3. Create Fly app: `flyctl launch`
4. Deploy: `flyctl deploy`
5. Copy deployment URL
6. Add to Vercel as `NEXT_PUBLIC_API_URL`

---

## Part 5: Complete Deployment Checklist

### Before First Deployment

- [ ] Fork TILAWA repository on GitHub
- [ ] Create PostgreSQL database (Neon, Railway, AWS, or Render)
- [ ] Get `DATABASE_URL` connection string
- [ ] Generate `BETTER_AUTH_SECRET` (32+ characters)
- [ ] Decide on backend deployment (Vercel, Railway, or Fly.io)
- [ ] Update `vercel.json` with complete configuration (see Part 2)
- [ ] Commit all changes to GitHub

### Vercel Dashboard Setup

- [ ] Sign in to https://vercel.com
- [ ] Click "Add New Project"
- [ ] Select your TILAWA GitHub repository
- [ ] Vercel auto-detects Next.js
- [ ] Click "Environment Variables"
- [ ] Add all required variables (see Part 1)
- [ ] Select "Production" for each
- [ ] Click "Deploy"

### After First Deployment

- [ ] Wait for build to complete (2-3 minutes)
- [ ] Check deployment URL (https://[project].vercel.app)
- [ ] Test homepage loads
- [ ] Check browser console for errors
- [ ] Test sign-up (if auth is working)
- [ ] Check Vercel logs for errors

---

## Part 6: Troubleshooting Deployment Failures

### Build fails with "DATABASE_URL not set"

**Cause:** Environment variable not added to Vercel

**Fix:**
1. Go to Vercel Project Settings
2. Add `DATABASE_URL` environment variable
3. Set to "Production"
4. Click "Redeploy"

### Build fails with "BETTER_AUTH_SECRET not found"

**Cause:** Authentication secret not configured

**Fix:**
1. Generate secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. Add to Vercel as `BETTER_AUTH_SECRET`
3. Set to "Production"
4. Click "Redeploy"

### Runtime error: "Cannot connect to database"

**Cause:** Database connection string is invalid

**Fix:**
1. Test connection locally: `psql [DATABASE_URL]`
2. Verify format: `postgresql://user:password@host:port/database`
3. Check cloud provider dashboard for correct string
4. Update in Vercel environment variables
5. Click "Redeploy"

### API returns 404 errors

**Cause:** Backend not deployed or URL incorrect

**Fix:**
1. Deploy backend (see Part 4)
2. Test backend: `curl https://[backend-url]/api/health`
3. Add correct `NEXT_PUBLIC_API_URL` to Vercel
4. Click "Redeploy"

### CORS errors in browser

**Cause:** Backend CORS not configured for frontend URL

**Fix:**
1. Update backend `.env` `CORS_ORIGINS`
2. Include Vercel frontend URL: `https://[project].vercel.app`
3. Redeploy backend
4. Clear browser cache and try again

### Pages return 500 errors

**Cause:** Better Auth misconfigured

**Fix:**
1. Check Vercel logs: "Deployments → [latest] → Logs"
2. Verify `BETTER_AUTH_SECRET` is 32+ characters
3. Verify `DATABASE_URL` is correct
4. Check schema applied: `psql [DATABASE_URL] -c "SELECT * FROM \"user\";"`
5. Update variables if needed
6. Click "Redeploy"

---

## Part 7: Monitoring Production

### Check Deployment Health

1. Go to Vercel Dashboard → Deployments
2. Click latest deployment
3. Check build logs for warnings
4. Check runtime logs for errors
5. Test critical features:
   - Homepage loads
   - Sign-up works
   - Login works
   - Quran page loads
   - Audio plays

### Enable Monitoring

1. Vercel Analytics (free):
   - Automatic performance tracking
   - Shows page load times, errors
   - No additional setup needed

2. Error tracking (optional):
   - Sentry.io for detailed error tracking
   - Datadog for infrastructure monitoring
   - LogRocket for session replay

### Set Up Alerts

1. Vercel → Project Settings → Notifications
2. Add email for deployment failures
3. Configure alert when builds fail or take too long

---

## Part 8: Next Steps

After deployment is working:

1. **Test all features:**
   - Sign up with email
   - Login
   - Browse Quran
   - Switch languages
   - Play audio
   - Check on mobile

2. **Monitor for issues:**
   - Check Vercel logs weekly
   - Review error reports
   - Monitor performance metrics

3. **Plan next phase:**
   - Set up custom domain
   - Configure SSL (automatic on Vercel)
   - Set up monitoring/alerts
   - Plan feature rollout

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Better Auth Docs:** https://www.better-auth.com
- **PostgreSQL Docs:** https://www.postgresql.org/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com

---

## Quick Command Reference

```bash
# Generate a secure secret (32+ chars)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Test PostgreSQL connection
psql "postgresql://user:password@host:port/database"

# Check database schema
psql [DATABASE_URL] -c "SELECT * FROM \"user\";"

# Test backend health
curl https://[backend-url]/api/health

# View Vercel logs locally
vercel logs --tail

# Rebuild on Vercel dashboard
# Deployments → [latest] → Redeploy
```

---

**Status:** Ready for Vercel deployment  
**Last Updated:** September 8, 2026  
**Next Steps:** Follow Part 1 and Part 4 to complete deployment
