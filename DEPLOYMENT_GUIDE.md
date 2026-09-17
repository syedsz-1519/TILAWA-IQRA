# TILAWA Deployment Guide

**Status**: ✅ All production errors fixed. Ready for deployment.

---

## Pre-Deployment Checklist

- [x] All 8 critical errors fixed
- [x] Audio context synchronized
- [x] Backend Express server created
- [x] API routes implemented
- [x] Auth moved to backend
- [x] Database credentials removed from frontend
- [x] Environment validation added
- [x] API standardization complete

---

## Step 1: Backend Deployment

### Option A: Deploy to Vercel (Recommended)

1. **Create separate Vercel project** for backend:
   ```bash
   cd backend
   npm run build
   ```

2. **Set environment variables** in Vercel dashboard:
   - `DATABASE_URL`: PostgreSQL connection string
   - `BETTER_AUTH_SECRET`: Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `NODE_ENV`: `production`
   - `BETTER_AUTH_URL`: Your backend production URL
   - `FRONTEND_URL`: Your frontend Vercel URL

3. **Update package.json scripts**:
   ```json
   {
     "scripts": {
       "dev": "node --loader ts-node/esm src/index.ts",
       "build": "tsc",
       "start": "node dist/index.js"
     }
   }
   ```

4. **Deploy**:
   ```bash
   vercel deploy --prod
   ```

### Option B: Deploy to Render/Railway/Other Hosting

Follow service-specific deployment guides. Ensure:
- Node.js 18+ runtime
- Environment variables set
- PostgreSQL database configured
- CORS origin set to frontend URL

---

## Step 2: Frontend Deployment

1. **Update environment variables** (`.env.production` or in Vercel dashboard):
   ```
   NEXT_PUBLIC_API_URL=<your-backend-url>
   NEXT_PUBLIC_BETTER_AUTH_URL=<your-frontend-url>
   NEXT_PUBLIC_ALQURAN_CLOUD_API=https://api.alquran.cloud/v1
   ```

2. **Build and deploy**:
   ```bash
   cd frontend
   npm run build
   vercel deploy --prod
   ```

3. **Verify Vercel environment variables** (Settings → Environment Variables):
   - All `NEXT_PUBLIC_*` variables set
   - No `DATABASE_URL` or `BETTER_AUTH_SECRET`

---

## Step 3: Database Setup

1. **Create PostgreSQL database**:
   ```bash
   createdb tilawa_prod
   ```

2. **Run migrations**:
   ```bash
   cd backend
   npm run db:push
   ```

3. **Set `DATABASE_URL`**:
   ```
   postgresql://user:password@host:5432/tilawa_prod
   ```

---

## Step 4: Verification

### Health Check
```bash
curl https://<backend-url>/health
# Expected: { "status": "ok", "environment": "production", "timestamp": "..." }
```

### Auth Flow
1. Navigate to `https://<frontend-url>/sign-up`
2. Create test account
3. Should redirect to dashboard
4. Check localStorage: `better-auth.session` should exist

### API Endpoints
```bash
# Get streaks (replace TOKEN with actual user ID)
curl https://<backend-url>/api/streaks?userId=test-user

# Add bookmark
curl -X POST https://<backend-url>/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user","surahNumber":1,"ayahNumber":1}'

# Get reading progress
curl https://<backend-url>/api/reading-progress?userId=test-user
```

### Frontend Features
- [x] Home page loads
- [x] Prayer times display
- [x] Daily ayah shows
- [x] Quran reader works
- [x] Click ayah opens action sheet
- [x] Audio plays from action sheet
- [x] Bookmarks save/load
- [x] Streaks track

---

## Troubleshooting

### Backend won't start
- Check `DATABASE_URL` format
- Verify database exists
- Check `BETTER_AUTH_SECRET` length (min 32 chars)
- Check Node.js version (18+)

### Auth not working
- Verify backend is reachable from frontend
- Check CORS origin in backend (should match frontend URL)
- Check `BETTER_AUTH_SECRET` is set (server will fail silently without it)
- Check database migrations ran

### API calls failing (503)
- Verify `NEXT_PUBLIC_API_URL` points to backend
- Check backend is running: `curl <backend-url>/health`
- Check network tab in browser DevTools
- Check backend logs

### Audio not playing
- Check audio API is accessible (may be blocked by CORS)
- Try with VPN (some CDNs region-locked)
- Check browser console for errors
- Verify speakers/volume on device

### Bookmarks not persisting
- Check `DATABASE_URL` is correct
- Verify database migrations completed
- Check backend logs for errors
- Verify user is authenticated

---

## Performance Optimization

### Frontend
```bash
# Enable static optimization
npm run build

# Check bundle size
npm run build -- --analyze
```

### Backend
```bash
# Monitor with pm2
npm install -g pm2
pm2 start dist/index.js --name tilawa-backend
pm2 logs tilawa-backend
```

---

## Security Checklist

- [x] Database credentials only in backend
- [x] No secrets in frontend `.env`
- [x] CORS properly configured
- [x] HTTPS enforced (Vercel auto)
- [x] Auth secret 32+ characters
- [x] Session cookies secure flag set
- [x] Environment validation at startup

---

## Monitoring

### Logs
- **Frontend**: Vercel dashboard → Deployments → Logs
- **Backend**: Vercel dashboard → Logs
- **Database**: PostgreSQL logs

### Metrics
- Backend response times
- Database query performance
- Frontend error rate
- API endpoint usage

---

## Rollback Plan

If deployment fails:

1. **Frontend**: Vercel automatically keeps previous deployments
   ```bash
   # Rollback in Vercel dashboard
   ```

2. **Backend**: Keep previous commit handy
   ```bash
   git revert <commit>
   git push
   ```

3. **Database**: Backup before any migrations
   ```bash
   pg_dump tilawa_prod > backup.sql
   ```

---

## Post-Deployment

1. **Update docs** with production URLs
2. **Configure analytics** (optional)
3. **Set up error tracking** (Sentry, etc.)
4. **Test complete flows** in production
5. **Announce availability** to users
6. **Monitor first 24 hours** for issues

---

## Support

For issues during deployment:
- Check logs: Vercel dashboard → Logs
- Check database: `psql <DATABASE_URL>`
- Test backend directly: `curl https://<backend-url>/health`
- Review error messages carefully

---

**Status**: Ready for production deployment 🚀
