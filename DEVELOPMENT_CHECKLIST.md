# TILAWA Development Setup Checklist

Complete checklist for setting up TILAWA development environment.

## System Requirements

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Python 3.9+ installed (`python --version`)
- [ ] PostgreSQL 12+ available (local or cloud)
- [ ] Git installed and configured
- [ ] Text editor (VS Code recommended)

## Frontend Setup

### Step 1: Install Dependencies
- [ ] Navigate to `frontend` directory
- [ ] Run `pnpm install`
- [ ] Verify no critical errors
- [ ] Check `package.json` for all dependencies

### Step 2: Environment Configuration
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Set `NEXT_PUBLIC_API_URL=http://localhost:8000`
- [ ] Set `NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000`
- [ ] Verify `.env.local` is in `.gitignore`

### Step 3: Build & Run
- [ ] Run `pnpm build` (production build test)
- [ ] Build completes with 0 errors ✅
- [ ] Run `pnpm dev` (development server)
- [ ] Server starts on http://localhost:3000
- [ ] Browser loads home page without errors

### Step 4: Verify Pages
- [ ] [ ] Home page loads: http://localhost:3000
- [ ] [ ] Read page loads: http://localhost:3000/read
- [ ] [ ] Dashboard loads: http://localhost:3000/dashboard
- [ ] [ ] Sign-in page loads: http://localhost:3000/sign-in
- [ ] [ ] All pages are responsive (test on mobile)

## Backend Setup

### Step 1: Install Dependencies
- [ ] Navigate to `backend` directory
- [ ] Run startup script:
  - Windows: `.\start.ps1`
  - Linux/Mac: `bash start.sh`
- [ ] Virtual environment created
- [ ] Dependencies installed

### Step 2: Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Set `ENVIRONMENT=dev`
- [ ] Set `CORS_ORIGINS=http://localhost:3000`
- [ ] Configure `DATABASE_URL` (if using local DB)

### Step 3: Start Backend
- [ ] Backend starts on http://localhost:8000
- [ ] No startup errors in logs
- [ ] Swagger UI loads: http://localhost:8000/api/docs

### Step 4: Verify API Endpoints
- [ ] [ ] Health check: `curl http://localhost:8000/api/health`
- [ ] [ ] Ping: `curl http://localhost:8000/api/ping`
- [ ] [ ] Get streaks: `curl http://localhost:8000/api/users/test/streaks`
- [ ] [ ] Create bookmark: Works in Swagger UI
- [ ] [ ] WebSocket: Can connect to `/ws/battles`

## Database Setup

### Step 1: Choose Database
- [ ] Local PostgreSQL OR
- [ ] [ ] Neon (serverless) OR
- [ ] [ ] Supabase

### Step 2: Create Database
- [ ] Database created
- [ ] Connection string obtained
- [ ] Connection tested

### Step 3: Run Schema
- [ ] Schema file located: `database/schema.sql`
- [ ] Schema applied to database
- [ ] Tables created successfully

### Step 4: Verify Tables
- [ ] `user` table exists
- [ ] `session` table exists
- [ ] `streaks` table exists
- [ ] `mushafBookmarks` table exists
- [ ] All indexes created

## Integration Testing

### Frontend-Backend Connection
- [ ] [ ] Frontend can reach backend API
- [ ] [ ] API health check passes from frontend
- [ ] [ ] CORS configured correctly
- [ ] [ ] No "blocked by CORS" errors

### Authentication Flow
- [ ] [ ] Sign-up page loads
- [ ] [ ] Can create new account
- [ ] [ ] Session created in database
- [ ] [ ] User logged in
- [ ] [ ] Sign-out works

### Quran Reading
- [ ] [ ] Surahs load from CDN
- [ ] [ ] Audio plays from mp3quran.net
- [ ] [ ] Translations display correctly
- [ ] [ ] Language dropdown works
- [ ] [ ] Mobile view responsive

### User Data Persistence
- [ ] [ ] Streaks tracked in database
- [ ] [ ] Bookmarks saved to database
- [ ] [ ] User preferences persisted
- [ ] [ ] Data survives page reload

## Code Quality

### TypeScript
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] All `.ts` files have proper types
- [ ] No `any` types without justification

### Linting
- [ ] No lint errors: `pnpm lint`
- [ ] Code style consistent
- [ ] Import statements organized

### Build
- [ ] Frontend builds: `pnpm build` (0 errors)
- [ ] Backend starts: `python -m uvicorn main:app`
- [ ] No build warnings about dependencies

## Browser Testing

### Chrome
- [ ] [ ] All pages load
- [ ] [ ] Audio plays
- [ ] [ ] Responsive design works
- [ ] [ ] Console has no errors

### Firefox
- [ ] [ ] All pages load
- [ ] [ ] Audio plays
- [ ] [ ] Responsive design works
- [ ] [ ] Console has no errors

### Mobile (via DevTools)
- [ ] [ ] Mobile view responsive
- [ ] [ ] Touch interactions work
- [ ] [ ] Language dropdown works on mobile
- [ ] [ ] Audio player controls accessible

## Performance

### Frontend
- [ ] [ ] Page loads in < 3 seconds
- [ ] [ ] Lighthouse score > 80
- [ ] [ ] No memory leaks detected
- [ ] [ ] Audio streaming smooth

### Backend
- [ ] [ ] API responds in < 500ms
- [ ] [ ] Health check instant
- [ ] [ ] No hanging connections
- [ ] [ ] Logs are clean

## Security

### Environment Variables
- [ ] [ ] No secrets in code
- [ ] [ ] `.env.local` in `.gitignore`
- [ ] [ ] Production secrets in Vercel only
- [ ] [ ] Secrets rotated regularly

### API Security
- [ ] [ ] CORS configured correctly
- [ ] [ ] Input validation on backend
- [ ] [ ] Error messages don't leak info
- [ ] [ ] Rate limiting configured

### Authentication
- [ ] [ ] Passwords hashed in database
- [ ] [ ] Session tokens secure
- [ ] [ ] HTTPS configured (production)
- [ ] [ ] CSRF protection enabled

## Deployment Preparation

### Git Setup
- [ ] [ ] Repository initialized
- [ ] [ ] Main branch clean
- [ ] [ ] All changes committed
- [ ] [ ] `.gitignore` configured

### Vercel Configuration
- [ ] [ ] `vercel.json` configured
- [ ] [ ] Root directory set to `frontend`
- [ ] [ ] Build command verified
- [ ] [ ] Environment variables listed

### Production Database
- [ ] [ ] Production DB provisioned
- [ ] [ ] Connection string secured
- [ ] [ ] Schema migrated to production
- [ ] [ ] Backups configured

### Domain Setup
- [ ] [ ] Domain registered
- [ ] [ ] DNS configured for Vercel
- [ ] [ ] SSL certificate active
- [ ] [ ] Custom domain working

## Final Verification

### Before First Deploy
- [ ] [ ] All tasks above completed
- [ ] [ ] No console errors in dev
- [ ] [ ] All API endpoints working
- [ ] [ ] Database connections stable
- [ ] [ ] Authentication tested end-to-end

### Post-Deploy Verification
- [ ] [ ] Deployment successful
- [ ] [ ] Site loads at custom domain
- [ ] [ ] API accessible from deployed site
- [ ] [ ] Authentication works
- [ ] [ ] Database queries successful
- [ ] [ ] Monitoring alerts configured

## Issue Tracking

| Issue | Status | Notes |
|-------|--------|-------|
| — | ⏳ | Add issues as they arise |

## Timeline

```
Day 1: ✅ System requirements
Day 2: ✅ Frontend setup & testing
Day 3: ✅ Backend setup & testing
Day 4: ✅ Database setup & schema
Day 5: ✅ Integration testing
Day 6: ✅ Code quality & security
Day 7: ✅ Deployment preparation
Day 8: 🚀 First deployment
```

## Notes

- Keep this checklist updated as you progress
- Mark items as complete: `[x]`
- Add notes for any blockers or issues
- Use timestamps for major milestones
- Reference this checklist during code reviews

---

**Last Updated:** September 8, 2026  
**Status:** In Progress  
**Owner:** Development Team
