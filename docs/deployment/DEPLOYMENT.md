# TILAWA Deployment Guide

Complete guide for deploying TILAWA to production across all platforms.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Web Deployment (Vercel)](#web-deployment-vercel)
4. [Backend Deployment (Railway)](#backend-deployment-railway)
5. [Mobile Deployment](#mobile-deployment)
6. [Database Setup](#database-setup)
7. [Post-Deployment](#post-deployment)

## Prerequisites

- Git configured with SSH keys
- GitHub account with repository access
- Vercel account (free tier available)
- Railway account (free tier available)
- MongoDB Atlas account
- Apple Developer Account (for iOS)
- Google Play Developer Account (for Android)
- AWS account (for S3 storage)

## Environment Setup

### 1. Create `.env` Files

**Backend** (`apps/backend/server/.env`):
```env
# Environment
NODE_ENV=production
PORT=8000

# Database
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/tilawa_prod

# Redis
REDIS_URL=redis://user:pass@host:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d

# OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

# File Storage
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_S3_BUCKET=tilawa-prod
AWS_REGION=us-east-1

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@tilawa.app
SMTP_PASS=xxx

# Analytics
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# CORS
ALLOWED_ORIGINS=https://tilawa.app,https://app.tilawa.app
```

**Frontend** (`apps/web/frontend/.env.production`):
```env
# API
NEXT_PUBLIC_API_URL=https://api.tilawa.app

# Auth
NEXT_PUBLIC_AUTH_DOMAIN=tilawa.auth0.com
NEXT_PUBLIC_CLIENT_ID=xxx

# Analytics
NEXT_PUBLIC_GA_ID=G-xxx
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Feature Flags
NEXT_PUBLIC_FEATURE_OFFLINE=true
NEXT_PUBLIC_FEATURE_SOCIAL=false
```

## Web Deployment (Vercel)

### Step 1: Connect GitHub Repository

1. Go to [Vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select the TILAWA repository
5. Configure project settings

### Step 2: Configure Build Settings

```
Project Name: tilawa
Root Directory: apps/web/frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Step 3: Environment Variables

Add all variables from `.env.production`:
```
NEXT_PUBLIC_API_URL=https://api.tilawa.app
NEXT_PUBLIC_GA_ID=G-xxx
...
```

### Step 4: Deploy

```bash
# Automatic deployment on git push
git push origin main

# Or manual deployment
vercel deploy --prod
```

### Step 5: Configure Custom Domain

1. Go to Vercel Project Settings
2. Domain → Add custom domain
3. Point DNS records to Vercel
4. Enable SSL certificate

**DNS Records:**
```
Type  Name          Value
CNAME tilawa.app    cname.vercel-dns.com
```

## Backend Deployment (Railway)

### Step 1: Create Railway Project

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. New Project → GitHub Repo
4. Select TILAWA repository

### Step 2: Configure Build Settings

Click project settings:
```
Service: Node.js
Root Directory: apps/backend/server
Start Command: npm start
```

### Step 3: Add Environment Variables

Add all variables from `.env`:
```
DATABASE_URL=mongodb+srv://...
REDIS_URL=redis://...
JWT_SECRET=...
```

### Step 4: Configure Database

**Option A: MongoDB Atlas (Recommended)**

1. Create MongoDB Atlas cluster
2. Create database user
3. Set IP whitelist to Railway's IP
4. Get connection string
5. Add to Railway environment: `DATABASE_URL`

**Option B: Railway PostgreSQL**

```bash
# Add PostgreSQL service
railway add
# Select PostgreSQL

# Get connection string from Railway dashboard
# Add to environment as DATABASE_URL
```

### Step 5: Deploy

```bash
# Automatic deployment on git push
git push origin main

# View logs
railway logs
```

### Step 6: Configure Custom Domain

1. Project Settings → Domains
2. Add custom domain: `api.tilawa.app`
3. Update DNS records

## Mobile Deployment

### iOS App Store

```bash
# 1. Build for release
cd apps/mobile/tilawa
flutter build ios --release

# 2. Open Xcode
open ios/Runner.xcworkspace

# 3. Configure signing
# - Team ID
# - Bundle ID: com.tilawa.app
# - Version

# 4. Archive for distribution
# Product → Archive

# 5. Upload to App Store Connect
# Distribute App → App Store Connect

# 6. Submit for review
# App Store Connect → Submit for Review
```

### Android Play Store

```bash
# 1. Build AAB (Android App Bundle)
cd apps/mobile/tilawa
flutter build appbundle --release

# 2. Sign release APK
keytool -genkey -v -keystore ~/tilawa-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias tilawa_key

# 3. Upload to Play Console
# https://play.google.com/console
# Create release
# Upload AAB
# Configure store listing
# Submit for review
```

## Database Setup

### MongoDB Atlas

```bash
# 1. Create cluster
# - Shared tier (free)
# - Region: US-EAST
# - M0 sandbox (free)

# 2. Create database user
Username: tilawa_prod_user
Password: [Generate strong password]

# 3. Set IP whitelist
- Railway IP: [Get from Railway dashboard]
- Vercel IPs: 0.0.0.0/0 (or specific)

# 4. Create database
Database: tilawa_prod

# 5. Get connection string
mongodb+srv://user:pass@cluster.mongodb.net/tilawa_prod

# 6. Initialize collections
mongo "mongodb+srv://user:pass@cluster.mongodb.net/tilawa_prod"

# Create indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.surahs.createIndex({ number: 1 }, { unique: true })
db.hadiths.createIndex({ collection: 1, number: 1 }, { unique: true })
```

### Redis Setup

**Option A: Railway Redis**
```bash
railway add
# Select Redis
# Copy connection string
```

**Option B: Redis Cloud**
```
https://app.redislab.com/
# Create free database
# Get connection URL
```

## Post-Deployment

### 1. Health Checks

```bash
# Frontend
curl https://tilawa.app

# Backend
curl https://api.tilawa.app/health

# Should return:
{
  "status": "ok",
  "timestamp": "2024-09-21T12:00:00Z",
  "version": "1.0.0"
}
```

### 2. Run Migrations

```bash
# Backend migrations
cd apps/backend/server
npm run migrate:prod

# Expected output:
# ✓ Migration 001_init completed
# ✓ Migration 002_auth completed
```

### 3. Seed Initial Data

```bash
# Seed Quran data
npm run seed:quran

# Seed hadith collections
npm run seed:hadith

# Seed user roles
npm run seed:roles
```

### 4. Configure CDN

```bash
# Cloudflare
1. Add site
2. Point nameservers to Cloudflare
3. Configure cache rules
4. Enable auto-minify
5. Configure rate limiting
```

### 5. Set Up Monitoring

**Sentry**:
```bash
# Create project
# Add DSN to environment
# Test error reporting
```

**Google Analytics**:
```bash
# Create GA4 property
# Add tracking ID to .env
# Test with Real-time report
```

### 6. SSL Certificates

All automatically handled by:
- **Vercel**: Automatic SSL
- **Railway**: Automatic SSL
- **Cloudflare**: Automatic SSL

### 7. Backup & Recovery

```bash
# MongoDB Atlas Backups
# Dashboard → Backups → Automated Backup Policy
# - Daily backups
# - 30-day retention
# - Restore point-in-time

# Redis Backups
# Configuration → Backup & Recovery
# - Daily snapshots
# - 7-day retention
```

## Troubleshooting

### Deployment Issues

**Build Failed**:
```bash
# Check logs
vercel logs [project-id]
railway logs

# Rebuild
git commit --allow-empty -m "Rebuild"
git push origin main
```

**Database Connection Failed**:
```bash
# Verify connection string
echo $DATABASE_URL

# Test connection
mongosh "mongodb+srv://user:pass@cluster.mongodb.net"

# Check IP whitelist
# MongoDB Atlas → Network Access → Access List
```

**CORS Errors**:
```bash
# Update ALLOWED_ORIGINS in .env
# Production must be HTTPS
ALLOWED_ORIGINS=https://tilawa.app,https://app.tilawa.app

# Redeploy backend
railway trigger
```

## Rollback Procedure

### Frontend Rollback

```bash
# View deployments
vercel list

# Rollback to previous
vercel rollback [project-id]

# Or redeploy specific commit
git checkout [commit-hash]
git push --force-with-lease
```

### Backend Rollback

```bash
# Via Railway Dashboard
# Deployments → Select previous version → Redeploy

# Or via CLI
railway rollback [deployment-id]
```

## Performance Optimization

### Frontend
- Enable ISR for static pages
- Configure image optimization
- Minify CSS/JS
- Enable Gzip compression

### Backend
- Enable Redis caching
- Implement database indexing
- Use connection pooling
- Enable compression middleware

### Database
- Create indexes on frequently queried fields
- Archive old records
- Analyze query performance
- Monitor collection sizes

## Security Checklist

- [x] HTTPS enabled everywhere
- [x] CORS properly configured
- [x] Rate limiting enabled
- [x] Input validation implemented
- [x] Secrets stored in environment
- [x] SQL injection prevention
- [x] XSS protection enabled
- [x] CSRF tokens configured
- [x] Regular backups enabled
- [x] Monitoring & alerting set up

## Maintenance

### Daily
- Monitor error rates
- Check API response times
- Review user reports

### Weekly
- Review logs
- Check backup status
- Test rollback procedure

### Monthly
- Update dependencies
- Review performance metrics
- Security audit
- Database optimization

---

**Last Updated**: September 2024
**Version**: 1.0.0
