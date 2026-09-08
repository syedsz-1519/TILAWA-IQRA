# TILAWA Backend Setup & Testing Guide

This guide walks you through setting up and testing the FastAPI backend for TILAWA.

## Quick Overview

The backend provides:
- REST APIs for recitation, user progress, and bookmarks
- WebSocket support for real-time battles
- ML pipeline hooks for Tajweed scoring
- Full API documentation at `/api/docs`

## Step 1: Install Python Dependencies

### Option A: Windows PowerShell

```powershell
cd backend
.\start.ps1
```

This will:
1. Create a virtual environment
2. Install all dependencies
3. Start the server on http://0.0.0.0:8000

### Option B: Linux/Mac

```bash
cd backend
bash start.sh
chmod +x start.sh
./start.sh
```

### Option C: Manual Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
.\venv\Scripts\Activate.ps1
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start the server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Step 2: Configure Environment

Edit `backend/.env`:

```bash
ENVIRONMENT=dev
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
DATABASE_URL=postgresql://user:password@localhost:5432/tilawa
BETTER_AUTH_SECRET=your-secret-key-here
LOG_LEVEL=INFO
```

### Getting Database URL

**Local PostgreSQL:**
```
postgresql://postgres:password@localhost:5432/tilawa
```

**Neon (Serverless):**
1. Go to https://console.neon.tech
2. Create a new project
3. Copy the connection string from "Connect" button
4. Use it as DATABASE_URL

**Supabase:**
1. Go to https://supabase.com
2. Create new project
3. Go to Settings → Database → Connection Pooling
4. Copy the connection string

## Step 3: Verify Installation

Once the server starts, visit:

### Health Check
```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-09-08T10:30:45.123456",
  "version": "1.0.0",
  "environment": "dev"
}
```

### API Documentation
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

## Step 4: Test the API

### Method A: Using curl

```bash
# Health check
curl http://localhost:8000/api/ping

# Get user streaks
curl http://localhost:8000/api/users/test-user/streaks

# Create bookmark
curl -X POST "http://localhost:8000/api/bookmarks?user_id=test-user&surah_number=1&ayah_number=5"

# Get bookmarks
curl "http://localhost:8000/api/bookmarks?user_id=test-user"
```

### Method B: Using Python test script

```bash
cd backend

# Install test dependencies
pip install requests websockets

# Run tests
python test_api.py
```

### Method C: Using Swagger UI

1. Visit http://localhost:8000/api/docs
2. Click on any endpoint
3. Click "Try it out"
4. Fill in parameters
5. Click "Execute"

## Step 5: Integration with Frontend

### Connect Frontend to Backend

In `frontend/lib/auth.ts`, update the API endpoint:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
```

Add to `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Make API Calls from Frontend

```typescript
// Example: Fetch user streaks
async function getStreaks(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/streaks`
  )
  return await response.json()
}

// Example: Create bookmark
async function createBookmark(userId: string, surahNumber: number, ayahNumber: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bookmarks?user_id=${userId}&surah_number=${surahNumber}&ayah_number=${ayahNumber}`,
    { method: 'POST' }
  )
  return await response.json()
}
```

## Step 6: Run Backend with Frontend

### Terminal 1: Start Backend

```bash
cd backend
.\start.ps1  # Windows
# or
bash start.sh  # Linux/Mac
```

### Terminal 2: Start Frontend

```bash
cd frontend
pnpm dev
```

### Terminal 3 (Optional): Watch Tests

```bash
cd backend
pytest test_api.py -v --watch
```

## Troubleshooting

### Error: "ModuleNotFoundError: No module named 'fastapi'"

**Solution:**
```bash
pip install -r requirements.txt
```

### Error: "Connection refused" (port 8000)

**Solution:** Backend might already be running or port is in use
```bash
# Find and kill process using port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :8000
kill -9 <PID>
```

### Error: "CORS error" from frontend

**Solution:** Update CORS_ORIGINS in `.env`:
```
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Error: "ModuleNotFoundError: No module named 'psycopg2'"

**Solution:**
```bash
pip install psycopg2-binary
pip install -r requirements.txt
```

### Database Connection Error

**Checklist:**
1. Is DATABASE_URL set correctly in `.env`?
2. Is PostgreSQL running?
3. Does database exist?
4. Are credentials correct?

Create database:
```bash
# Windows (if PostgreSQL installed)
psql -U postgres -c "CREATE DATABASE tilawa;"

# Or use Neon/Supabase web console
```

## API Endpoints Reference

### Health
- `GET /` — Root health check
- `GET /api/health` — Detailed health
- `GET /api/ping` — Connectivity test

### User Progress
- `GET /api/users/{user_id}/streaks` — Get streak data
- `POST /api/users/{user_id}/streaks/increment` — Increment streak

### Bookmarks
- `POST /api/bookmarks` — Create bookmark
- `GET /api/bookmarks` — List bookmarks

### Recitation
- `POST /api/recitation/submit` — Submit audio for scoring

### WebSocket
- `WS /ws/battles` — Real-time battle connection

## Performance Tips

1. **Use connection pooling** for database
2. **Cache frequent queries** with Redis
3. **Compress responses** with gzip
4. **Use CDN** for static files
5. **Monitor logs** for slow queries

## Deployment

### Fly.io

```bash
cd backend
fly launch
fly deploy
```

### Docker

```bash
docker build -t tilawa-backend .
docker run -p 8000:8000 --env-file .env tilawa-backend
```

### Vercel Functions (Advanced)

Create `api/index.py`:
```python
from main import app
from mangum import Mangum

handler = Mangum(app)
```

## Next Steps

1. ✅ Backend running
2. ✅ API documented
3. ⬜ Set up database migrations
4. ⬜ Implement ML pipeline
5. ⬜ Add authentication
6. ⬜ Deploy to production

## Support Resources

- FastAPI Docs: https://fastapi.tiangolo.com
- Uvicorn Docs: https://www.uvicorn.org
- PostgreSQL Docs: https://www.postgresql.org/docs
- Pydantic Docs: https://docs.pydantic.dev

## Feedback

For issues or suggestions:
1. Check logs in console
2. Visit http://localhost:8000/api/docs
3. Review `.env` configuration
4. Check database connectivity
