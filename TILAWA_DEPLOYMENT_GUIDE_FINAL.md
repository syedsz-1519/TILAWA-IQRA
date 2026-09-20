# TILAWA Final Deployment Guide - Phase 16

Complete guide to deploy TILAWA to production on Vercel + Railway + Supabase

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Code reviewed
- [ ] Linting passed
- [ ] Build successful
- [ ] No security vulnerabilities

### Configuration
- [ ] Environment variables set
- [ ] Database migrations complete
- [ ] API keys configured
- [ ] CORS configured
- [ ] SSL certificates ready
- [ ] Domain configured

### Data
- [ ] Database backed up
- [ ] Migration scripts tested
- [ ] Seed data prepared
- [ ] User data migrated

---

## Part 1: Frontend Deployment (Vercel)

### Step 1: Prepare Repository

```bash
# Ensure clean working directory
git status

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Run build
npm run build

# No errors? Proceed to next step
```

### Step 2: Vercel Configuration

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy project
vercel --prod

# Follow prompts to configure
```

#### Option B: Using GitHub Integration

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select TILAWA-IQRA repository
5. Configure:
   - Framework: Next.js
   - Root Directory: ./frontend
   - Build Command: `npm run build`
   - Output Directory: .next
6. Add Environment Variables:

```env
NEXT_PUBLIC_API_URL=https://tilawa-api.railway.app
NEXT_PUBLIC_APP_URL=https://tilawa.vercel.app
BETTER_AUTH_SECRET=[generate-random-secret]
```

7. Click Deploy

### Step 3: Environment Variables in Vercel

Settings → Environment Variables

Required variables:
```env
NEXT_PUBLIC_API_URL=https://tilawa-api.railway.app
NEXT_PUBLIC_APP_URL=https://tilawa.vercel.app
BETTER_AUTH_SECRET=your-secret-key
DATABASE_URL=postgresql://user:password@host/database
```

### Step 4: Custom Domain (Optional)

1. Go to Project Settings
2. Click Domains
3. Add your domain (tilawa.app, tilawa.com, etc.)
4. Update DNS records with Vercel's nameservers
5. Wait for DNS propagation (5-30 minutes)

### Step 5: Verify Deployment

```bash
# Test frontend
curl https://tilawa.vercel.app

# Check build logs
vercel logs tilawa

# Monitor performance
# Use Vercel Analytics dashboard
```

---

## Part 2: Backend Deployment (Railway)

### Step 1: Prepare Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Build backend
npm run build

# Test locally
npm run dev
```

### Step 2: Railway Setup

1. Go to https://railway.app
2. Sign in with GitHub
3. Create new project
4. Select "Deploy from GitHub repo"
5. Select TILAWA-IQRA repository
6. Configure:
   - Root Directory: ./backend
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

### Step 3: Database Connection

#### Using Supabase PostgreSQL

1. Go to Supabase project
2. Copy connection string
3. In Railway project:
   - Add environment variable: `DATABASE_URL=postgresql://...`

#### Create Service Tables

```bash
# SSH into Railway instance or run migration locally
npm run migrate

# Or use Drizzle migrations
npx drizzle-kit migrate
```

### Step 4: Environment Variables in Railway

Settings → Variables

```env
NODE_ENV=production
PORT=8000
DATABASE_URL=postgresql://user:password@db.supabase.co:5432/postgres
BETTER_AUTH_SECRET=your-secret-key
CORS_ORIGIN=https://tilawa.vercel.app
```

### Step 5: Deploy Backend

Railway auto-deploys on push to main

```bash
# Commit and push changes
git add .
git commit -m "Deploy TILAWA backend to production"
git push origin main

# Monitor deployment in Railway dashboard
# Check logs for errors
```

### Step 6: Verify Backend Deployment

```bash
# Test API health
curl https://tilawa-api.railway.app/health

# Test endpoints
curl https://tilawa-api.railway.app/api/languages

# Check logs
# Use Railway dashboard Logs tab
```

---

## Part 3: Database Setup (Supabase)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Create new project
3. Choose region (closest to users)
4. Set database password
5. Wait for provisioning (5-10 minutes)

### Step 2: Run Migrations

#### Option A: Using GUI

1. Go to SQL Editor in Supabase
2. Create new query
3. Copy schema from `backend/src/db/schema.ts`
4. Run queries

#### Option B: Using CLI

```bash
# Install Supabase CLI
npm i -g supabase

# Link to project
supabase link --project-ref <your-project-ref>

# Run migrations
supabase migration up

# Or use Drizzle
npx drizzle-kit push:pg
```

### Step 3: Seed Initial Data

```bash
# Create seed script if needed
# Run seed data
npm run seed
```

### Step 4: Backup Database

1. Go to Backups in Supabase
2. Enable automatic backups
3. Set retention (30 days recommended)
4. Create initial manual backup

---

## Part 4: Post-Deployment Verification

### Frontend Checks

```bash
# 1. Page Load
curl -I https://tilawa.vercel.app
# Check status 200

# 2. API Connectivity
curl https://tilawa.vercel.app/api/languages
# Should return language data

# 3. Authentication
# Test login flow manually

# 4. Features
# Test Quran reading
# Test Hadith search
# Test Dua library
# Test Hifz studio
# Test all advanced features
```

### Backend Checks

```bash
# 1. API Health
curl https://tilawa-api.railway.app/api/health

# 2. Database Connection
curl https://tilawa-api.railway.app/api/hifz/stats/test-user

# 3. CORS
curl -H "Origin: https://tilawa.vercel.app" \
     https://tilawa-api.railway.app/api/languages

# 4. Authentication
# Test protected endpoints
```

### Database Checks

```bash
# 1. Connection
psql postgresql://user:password@db.supabase.co:5432/postgres

# 2. Tables exist
\dt

# 3. Sample data
SELECT COUNT(*) FROM users;

# 4. Backups working
# Check Supabase Backups tab
```

### Monitoring Setup

1. **Vercel Analytics**
   - Go to Analytics dashboard
   - Monitor page views, traffic, performance

2. **Railway Monitoring**
   - Check CPU/Memory usage
   - Monitor error rates
   - Review logs

3. **Supabase Monitoring**
   - Check database performance
   - Monitor storage
   - Review slow queries

---

## Part 5: Scaling Considerations

### Database Scaling (Supabase)
- Monitor row count
- Monitor storage usage
- Consider upgrade if:
  - >1 million rows
  - Storage >100GB
  - High query load

### Backend Scaling (Railway)
- Monitor CPU/Memory
- Check response times
- Scale vertically (upgrade tier)
- Or add load balancer if needed

### Frontend Scaling (Vercel)
- Automatic scaling
- Monitor edge function usage
- Check bandwidth

---

## Part 6: Maintenance & Updates

### Regular Tasks

#### Daily
- [ ] Monitor error rates
- [ ] Check uptime
- [ ] Review user feedback

#### Weekly
- [ ] Review performance metrics
- [ ] Check security logs
- [ ] Backup verification

#### Monthly
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance review

#### Quarterly
- [ ] Major feature releases
- [ ] Infrastructure review
- [ ] Disaster recovery test

### Deployment Process for Updates

```bash
# 1. Development
git checkout -b feature/new-feature
# ... make changes ...

# 2. Testing
npm run test
npm run build

# 3. Commit & Push
git add .
git commit -m "feat: describe changes"
git push origin feature/new-feature

# 4. Pull Request
# Create PR on GitHub
# Request review
# Merge after approval

# 5. Automatic Deployment
# Vercel auto-deploys main branch
# Railway auto-deploys main branch

# 6. Verification
# Test in production
# Monitor metrics
# Rollback if needed
```

### Rollback Procedure

If deployment fails:

```bash
# Vercel: Use deployment list to revert
vercel deploy --prebuilt

# Railway: Revert to previous commit
git revert <commit-hash>
git push origin main

# Database: Restore from backup (Supabase)
```

---

## Part 7: Security Best Practices

### API Security
- [ ] Use HTTPS everywhere
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS prevention

### Database Security
- [ ] Strong passwords (20+ chars)
- [ ] Row Level Security (RLS) enabled
- [ ] Encrypted backups
- [ ] No sensitive data in logs
- [ ] Regular security audits

### Application Security
- [ ] Secrets in environment variables only
- [ ] No secrets in code
- [ ] Dependencies updated
- [ ] Security headers set
- [ ] Regular security scans

### Compliance
- [ ] GDPR compliant
- [ ] Privacy policy in place
- [ ] Terms of service defined
- [ ] Data retention policy
- [ ] User data deletion process

---

## Part 8: Troubleshooting

### Frontend Issues

**Problem: Pages not loading**
```
Solution:
1. Check Vercel deployment status
2. Check API_URL environment variable
3. Review browser console
4. Clear cache and reload
```

**Problem: API calls failing**
```
Solution:
1. Check backend health
2. Verify CORS settings
3. Check network tab
4. Review API response
```

### Backend Issues

**Problem: Database connection failed**
```
Solution:
1. Verify DATABASE_URL
2. Check network connectivity
3. Review Supabase status
4. Test connection locally
```

**Problem: High memory usage**
```
Solution:
1. Check for memory leaks
2. Monitor query performance
3. Consider upgrading tier
4. Optimize code
```

### Database Issues

**Problem: Slow queries**
```
Solution:
1. Analyze query execution
2. Add indexes if needed
3. Optimize schema
4. Consider data archiving
```

**Problem: High storage usage**
```
Solution:
1. Archive old data
2. Clean up logs
3. Compress data
4. Consider upgrade
```

---

## Part 9: Performance Optimization

### Frontend
- Enable caching headers
- Optimize images
- Minify CSS/JS
- Use CDN for assets
- Enable compression

### Backend
- Connection pooling
- Query optimization
- Cache frequently accessed data
- Implement pagination
- Monitor slow queries

### Database
- Regular VACUUM
- Analyze query plans
- Update statistics
- Proper indexing
- Archiving old data

---

## Part 10: Monitoring & Alerts

### Setup Alerts

**Vercel Alerts**
- Deployment failures
- Build errors
- Error rate spikes

**Railway Alerts**
- CPU/Memory > 80%
- Error rate > 1%
- Downtime

**Supabase Alerts**
- Slow queries
- Connection issues
- Storage > 80%

### Monitoring Tools
- Google Lighthouse
- New Relic
- DataDog
- Grafana
- Prometheus

---

## Deployment Checklist Summary

Before going live:
- [ ] All tests passing
- [ ] Build successful
- [ ] Environment variables set
- [ ] Database migrated
- [ ] Backups configured
- [ ] Monitoring enabled
- [ ] Security verified
- [ ] Performance checked
- [ ] Error handling tested
- [ ] Load tested

---

## Support & Contact

### Help Resources
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Express Docs: https://expressjs.com

### Emergency Contacts
- Vercel Support: support@vercel.com
- Railway Support: support@railway.app
- Supabase Support: support@supabase.com

---

**Deployment Date:** [Record here]
**Deployed By:** [Your name]
**Version:** 1.0.0
**Status:** ✅ Live
