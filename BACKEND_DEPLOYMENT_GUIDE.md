# TILAWA Backend Deployment Guide

## Overview

The TILAWA backend is a FastAPI application that needs to be deployed separately from the frontend. This guide covers deployment options and configuration.

---

## Backend Architecture

### What the Backend Does

The backend (`backend/main.py`) provides:

- **Authentication endpoints** — `/api/auth/[...all]` (handled by Better Auth)
- **User progress tracking** — `/api/users/{user_id}/streaks`
- **Bookmarks** — `/api/bookmarks`
- **Recitation scoring** — `/api/recitation/submit`
- **Real-time battles** — `/ws/battles` (WebSocket)
- **Health checks** — `/api/health`, `/api/ping`

### Requirements

- Python 3.9+
- PostgreSQL database (same as frontend)
- FastAPI framework
- Uvicorn server

### Environment Variables (Backend)

```
# Required
DATABASE_URL=postgresql://user:password@host:port/database
BETTER_AUTH_SECRET=your-32-char-secret
CORS_ORIGINS=https://your-frontend.vercel.app,https://localhost:3000
ENVIRONMENT=production
LOG_LEVEL=INFO

# Optional (with defaults)
WHISPER_MODEL=base
WHISPER_DEVICE=cpu
```

---

## Deployment Options

### Option 1: Railway.app (Recommended - Easiest)

**Why Railway:**
- Auto-detects Python + PostgreSQL
- Simple GitHub integration
- Free tier available
- Automatic builds on push
- Built-in PostgreSQL support

**Steps:**

1. **Go to Railway:** https://railway.app

2. **Sign in with GitHub**

3. **Create new project:**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Select your TILAWA repository
   - Railway auto-detects Python

4. **Configure services:**
   - Click "Add" → "PostgreSQL"
   - Railway creates database automatically
   - No additional setup needed

5. **Add environment variables:**
   - Click project settings
   - Go to Variables
   - Add:
     ```
     DATABASE_URL=<from PostgreSQL service>
     BETTER_AUTH_SECRET=<your-32-char-secret>
     CORS_ORIGINS=https://your-frontend.vercel.app
     ENVIRONMENT=production
     LOG_LEVEL=INFO
     ```

6. **Configure build:**
   - Railway auto-detects Python
   - No configuration needed
   - Auto-builds on every push to `backend/` directory

7. **Get deployment URL:**
   - Under "Deployment"
   - Copy the URL: `https://[project-name]-production.up.railway.app`
   - This becomes your `NEXT_PUBLIC_API_URL` on Vercel

8. **Test backend:**
   ```bash
   curl https://[project-name]-production.up.railway.app/api/health
   # Should return: {"status":"ok"}
   ```

**Pricing:** Free tier includes 5 projects, $5/month per additional

---

### Option 2: Fly.io (Scalable)

**Why Fly.io:**
- Runs anywhere (globally distributed)
- Good performance
- Simple CLI deployment
- Free tier available

**Steps:**

1. **Install flyctl:**
   ```bash
   # macOS
   brew install flyctl
   
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   
   # Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **Sign in:**
   ```bash
   flyctl auth login
   ```

3. **Create Fly app in backend directory:**
   ```bash
   cd backend
   flyctl launch --name tilawa-api
   ```

4. **Configure (follow prompts):**
   - Python 3.11
   - No, skip Postgres (use cloud PostgreSQL)
   - 256 MB RAM
   - 1 shared-cpu instance

5. **Add environment variables:**
   ```bash
   flyctl secrets set DATABASE_URL="postgresql://..."
   flyctl secrets set BETTER_AUTH_SECRET="your-secret"
   flyctl secrets set CORS_ORIGINS="https://your-frontend.vercel.app"
   ```

6. **Deploy:**
   ```bash
   flyctl deploy
   ```

7. **Get URL:**
   ```bash
   flyctl status
   # Copy the URL from AppName: tilawa-api
   ```

**Pricing:** Free tier includes 3 shared-cpu-1x 256MB VMs, $1.94/month per GB RAM

---

### Option 3: Vercel with Python

**Why Vercel:**
- Same platform as frontend
- Easier environment variable management
- No separate deployment needed

**Steps:**

1. **Create `api/index.py`:**
   ```python
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware
   import os
   import sys
   
   # Add backend to path
   sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))
   
   from main import app as backend_app
   
   # Create Vercel-compatible app
   app = FastAPI()
   
   # Add CORS
   app.add_middleware(
       CORSMiddleware,
       allow_origins=[os.getenv("CORS_ORIGINS", "*").split(",")],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   
   # Mount backend routes
   app.include_router(backend_app.router)
   
   @app.get("/health")
   async def health():
       return {"status": "ok"}
   ```

2. **Update `vercel.json`:**
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

3. **Add environment variables to Vercel:**
   - Same as frontend
   - Plus `CORS_ORIGINS`

4. **Deploy:** Push to GitHub, Vercel auto-deploys

5. **API URL:**
   ```
   NEXT_PUBLIC_API_URL=https://your-vercel-project.vercel.app/api
   ```

**Pricing:** Same as frontend (free tier available)

---

### Option 4: AWS Lambda + RDS

**Why AWS:**
- Production-grade infrastructure
- High availability
- Good for scaling

**Steps:**

1. **Create RDS PostgreSQL:**
   - AWS Console → RDS
   - Create PostgreSQL database
   - Copy endpoint

2. **Create Lambda function:**
   - AWS Console → Lambda
   - Create function (Python 3.11)
   - Upload `backend/` code

3. **Add API Gateway:**
   - Create REST API
   - Connect to Lambda
   - Configure CORS
   - Deploy

4. **Environment variables:**
   - Lambda Configuration → Environment variables
   - Add DATABASE_URL, BETTER_AUTH_SECRET, etc.

5. **Get API endpoint:**
   - From API Gateway deployment
   - Use as `NEXT_PUBLIC_API_URL`

**Pricing:** Pay-per-use (very cheap for low traffic)

---

## Backend Configuration for Each Option

### Update `backend/.env` for your deployment:

```bash
# Which platform you're using
ENVIRONMENT=production

# Cloud database connection
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]

# Same secret as frontend
BETTER_AUTH_SECRET=[32-char-secret]

# Frontend URL (for CORS)
CORS_ORIGINS=https://your-frontend.vercel.app

# Logging
LOG_LEVEL=INFO

# ML Models
WHISPER_MODEL=base
WHISPER_DEVICE=cpu
```

---

## Database Synchronization

**Important:** Frontend and backend MUST use the SAME PostgreSQL database.

### Recommended Setup:

1. **Single cloud PostgreSQL database** (Neon, Railway, AWS RDS)
   - Used by both frontend and backend
   - Schema applied once
   - Both services connect with same DATABASE_URL

2. **Schema Migration:**
   ```bash
   # Apply schema once to cloud database
   psql [DATABASE_URL] < database/schema.sql
   
   # Verify
   psql [DATABASE_URL] -c "SELECT * FROM \"user\";"
   ```

3. **Backup configuration:**
   - Enable automatic backups in database provider
   - Set retention to 7-30 days

---

## Testing Backend Deployment

### After deployment, test these endpoints:

```bash
# Health check
curl https://your-backend-url/api/health
# Expected: {"status":"ok"}

# Ping
curl https://your-backend-url/api/ping
# Expected: {"status":"pong"}

# API documentation
# Open in browser: https://your-backend-url/api/docs
# You should see Swagger UI

# CORS test
curl -X OPTIONS https://your-backend-url/api/health \
  -H "Origin: https://your-frontend.vercel.app" \
  -v
# Check response headers for Access-Control-Allow-Origin
```

### Common issues:

| Issue | Cause | Solution |
|-------|-------|----------|
| 502 Bad Gateway | Backend not running | Check deployment logs |
| 404 Not Found | Wrong API path | Check NEXT_PUBLIC_API_URL |
| CORS error | CORS_ORIGINS not set | Add frontend URL to CORS_ORIGINS |
| 500 Error | Database connection failed | Check DATABASE_URL |
| 401 Unauthorized | Auth secret mismatch | Verify BETTER_AUTH_SECRET matches |

---

## Connecting Frontend to Backend

### In Vercel dashboard environment variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-url/api
```

### Examples:

- **Railway:** `https://tilawa-api-production.up.railway.app/api`
- **Fly.io:** `https://tilawa-api.fly.dev/api`
- **Vercel:** `https://your-vercel-project.vercel.app/api`
- **AWS:** `https://[api-id].execute-api.[region].amazonaws.com/prod/api`

---

## Monitoring Backend

### Check deployment health:

**Railway:**
```bash
# View logs
railway logs -f
```

**Fly.io:**
```bash
# View logs
flyctl logs
```

**Vercel:**
```bash
# View logs
vercel logs --tail
```

### Key metrics to monitor:

- **Response time:** Should be <100ms
- **Error rate:** Should be <1%
- **Database connections:** Monitor connection pool
- **Uptime:** Should be >99.9%

---

## Scaling Backend

### When backend gets busy:

**Railway:**
- Click deployment
- Increase RAM/CPU slider
- Auto-redeploys

**Fly.io:**
```bash
flyctl scale vm shared-cpu-2x
```

**Vercel:**
- Update `vercel.json` function memory
- Redeploy

**AWS:**
- Increase Lambda concurrent executions
- Add read replicas to RDS

---

## Recommended Deployment Path

### For best results:

1. **Use Railway for backend** (easiest)
2. **Use Vercel for frontend** (integrated)
3. **Use Neon.tech for database** (free tier)

**Why this combination:**
- Minimal configuration
- Auto-scaling
- Good free tier support
- Easy monitoring

### Setup timeline:

1. **Day 1 - Setup:**
   - Create Railway account
   - Deploy backend (5 min)
   - Get backend URL

2. **Day 1 - Connect:**
   - Add backend URL to Vercel
   - Redeploy frontend (2 min)
   - Test features (10 min)

3. **Day 2 - Monitor:**
   - Check logs
   - Monitor performance
   - Set up alerts

---

## Troubleshooting Deployment Failures

### Backend build fails

**Check:**
1. `requirements.txt` is in `backend/` directory
2. Python version is 3.9+
3. No import errors in `main.py`

**Fix:**
1. Test locally: `python -m uvicorn main:app --reload`
2. Check error logs on deployment platform
3. Update `requirements.txt` and redeploy

### Backend won't start

**Check:**
1. DATABASE_URL is set
2. BETTER_AUTH_SECRET is set
3. Port is correct (usually 8000)

**Fix:**
```bash
# Test locally
export DATABASE_URL="postgresql://..."
export BETTER_AUTH_SECRET="secret"
python -m uvicorn main:app --reload
```

### API returns 404

**Check:**
1. Backend is running (test /api/health)
2. Frontend NEXT_PUBLIC_API_URL is correct
3. Backend CORS_ORIGINS includes frontend URL

**Fix:**
1. Verify backend deployment: `curl backend-url/api/health`
2. Update NEXT_PUBLIC_API_URL in Vercel
3. Redeploy frontend

### CORS errors in browser

**Check:**
1. Backend CORS_ORIGINS environment variable
2. Frontend URL is in CORS_ORIGINS

**Fix:**
```bash
# Example CORS_ORIGINS
CORS_ORIGINS=https://your-frontend.vercel.app,https://your-frontend-preview.vercel.app
```

---

## Next Steps

After backend is deployed:

1. ✅ Backend running and accessible
2. ✅ Frontend connected to backend
3. ✅ All API endpoints working
4. ✅ Database synchronized
5. ✅ CORS properly configured
6. ✅ Authentication working
7. ✅ Features tested end-to-end

Then proceed to final testing (Task #6)

---

## Support Resources

- **Railway Docs:** https://docs.railway.app
- **Fly.io Docs:** https://fly.io/docs
- **Vercel Python:** https://vercel.com/docs/functions/python
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **PostgreSQL:** https://www.postgresql.org/docs

---

**Next:** Complete Task #6 - Test deployment and verify all features work
