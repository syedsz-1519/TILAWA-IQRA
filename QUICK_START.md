# TILAWA Quick Start Guide

Get the TILAWA platform running in 5 minutes.

## TL;DR

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
pnpm install  # First time only
pnpm dev
```

### Terminal 3 (Optional): Run Tests
```bash
cd backend
python test_api.py
```

Then visit: **http://localhost:3000**

---

## Detailed Setup (5 minutes)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-org/tilawa-iqra.git
cd tilawa-iqra
```

### 2️⃣ Backend Setup (2 minutes)

```bash
cd backend

# Windows:
.\start.ps1

# Linux/Mac:
bash start.sh
chmod +x start.sh
./start.sh
```

Wait for: **"Uvicorn running on http://0.0.0.0:8000"**

### 3️⃣ Frontend Setup (2 minutes)

**In a NEW terminal:**

```bash
cd frontend
pnpm install
pnpm dev
```

Wait for: **"▲ Next.js 16.2.6 ready on http://localhost:3000"**

### 4️⃣ Verify It Works

Open http://localhost:3000 in browser ✅

Check all pages load:
- [ ] Home page
- [ ] /read (Surah browser)
- [ ] /dashboard
- [ ] /sign-in

---

## First Time Setup Issues?

### "Port already in use"
```bash
# Kill process on port 3000/8000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <number> /F
```

### "ModuleNotFoundError"
```bash
pip install -r requirements.txt
```

### "pnpm: command not found"
```bash
npm install -g pnpm
```

### ".env file not found"
```bash
cd backend
cp .env.example .env

cd ../frontend
cp .env.local.example .env.local
```

---

## Common Commands

### Frontend
```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # Check code quality
pnpm typecheck    # Type checking
pnpm format       # Format code
```

### Backend
```bash
# (inside virtual environment)
python -m uvicorn main:app --reload
pytest test_api.py -v
curl http://localhost:8000/api/health
```

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Health check |
| `/api/users/{id}/streaks` | GET | User streaks |
| `/api/bookmarks` | GET/POST | Mushaf bookmarks |
| `/api/recitation/submit` | POST | Submit audio |
| `/ws/battles` | WS | Real-time battles |

**Docs:** http://localhost:8000/api/docs

---

## Project Structure

```
tilawa-iqra/
├── frontend/           # Next.js web app
│   ├── app/           # Pages & routes
│   ├── components/    # React components
│   ├── lib/           # Utilities
│   └── .env.local     # Your config
├── backend/           # FastAPI server
│   ├── main.py        # API routes
│   ├── requirements.txt
│   └── .env           # Your config
├── database/          # DB schema
│   └── schema.sql
└── docs/              # Documentation
```

---

## Development Tips

### Hot Reload
Both frontend and backend auto-reload on file changes ✨

### Debug Mode
```bash
# Frontend (browser DevTools)
F12 → Console

# Backend (terminal output)
Check logs in terminal where `uvicorn` runs
```

### Database Queries
```bash
# Connect to local PostgreSQL
psql -U postgres -d tilawa_dev

# List tables
\dt

# Describe table
\d user
```

### API Testing
```bash
# Via curl
curl http://localhost:8000/api/health | jq

# Via Swagger UI
http://localhost:8000/api/docs

# Via Python
python
>>> import requests
>>> requests.get('http://localhost:8000/api/health').json()
```

---

## Before Deploying

Run this checklist:

```bash
# 1. Frontend checks
cd frontend
pnpm lint
pnpm typecheck
pnpm build

# 2. Backend checks
cd ../backend
pytest test_api.py

# 3. Check git
git status
git add .
git commit -m "Ready for deployment"
```

---

## Deployment Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Push to main branch
- [ ] Vercel deployment triggered

---

## Getting Help

1. **Check the logs** — Often has the answer
2. **Read error messages carefully** — They're usually descriptive
3. **Verify `.env` files exist** — Most setup issues stem from this
4. **Ensure both servers running** — Frontend needs backend
5. **Review relevant docs**:
   - Frontend: `FRONTEND_SETUP_GUIDE.md`
   - Backend: `BACKEND_SETUP_GUIDE.md`
   - Development: `DEVELOPMENT_CHECKLIST.md`

---

## Next Steps

After setup is working:

1. ⏭️ Test Quran reading functionality
2. ⏭️ Test authentication
3. ⏭️ Test dashboard features
4. ⏭️ Deploy to Vercel
5. ⏭️ Set up monitoring

---

**Happy coding!** 🚀
