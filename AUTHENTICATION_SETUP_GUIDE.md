# TILAWA Authentication Setup & Troubleshooting Guide

Complete guide for setting up and troubleshooting authentication with Better Auth.

## Quick Setup

```bash
# 1. Backend
cd backend
cp .env.example .env

# Edit .env with:
ENVIRONMENT=dev
DATABASE_URL=postgresql://postgres:password@localhost:5432/tilawa_dev
BETTER_AUTH_SECRET=your-random-secret-here

# 2. Frontend
cd frontend
cp .env.local.example .env.local

# Edit .env.local with:
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# 3. Start
# Terminal 1: Backend
.\start.ps1

# Terminal 2: Frontend
pnpm dev
```

Visit: http://localhost:3000/sign-up

---

## Authentication Architecture

```
┌─────────────────┐
│  Frontend/UI    │
│ (Next.js)       │
└────────┬────────┘
         │
         ├─ Browser storage (session token in cookies)
         │
         └─ /api/auth endpoints
              │
┌─────────────▼──────────────────┐
│     Better Auth (Server)        │
│  - Session management           │
│  - Password hashing             │
│  - Token validation             │
└─────────────┬──────────────────┘
              │
┌─────────────▼──────────────────┐
│    PostgreSQL Database          │
│  - users table                  │
│  - sessions table               │
│  - accounts table               │
│  - verification table           │
└─────────────────────────────────┘
```

---

## Database Schema for Auth

### Users Table
```sql
CREATE TABLE "user" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    emailVerified BOOLEAN DEFAULT FALSE,
    image TEXT,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Sessions Table
```sql
CREATE TABLE "session" (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    expiresAt TIMESTAMP NOT NULL,
    ipAddress TEXT,
    userAgent TEXT,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Accounts Table (passwords)
```sql
CREATE TABLE "account" (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    password TEXT,  -- bcrypt hashed
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);
```

---

## Environment Variables Required

### Backend (.env)

```bash
# Required for authentication
ENVIRONMENT=dev
DATABASE_URL=postgresql://user:password@localhost:5432/tilawa_dev
BETTER_AUTH_SECRET=random-string-here-minimum-32-chars

# Optional
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
LOG_LEVEL=INFO
```

**Generating BETTER_AUTH_SECRET:**
```bash
# On Linux/Mac:
openssl rand -base64 32

# On Windows PowerShell:
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Random).ToString())) | head -c 32
```

### Frontend (.env.local)

```bash
# Required for authentication
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000

# For development
DATABASE_URL=postgresql://user:password@localhost:5432/tilawa_dev (optional)
BETTER_AUTH_SECRET=same-as-backend (optional, only for testing)
```

---

## Setup Checklist

### 1. Database Setup
- [ ] PostgreSQL installed locally OR remote DB provisioned
- [ ] Database created: `tilawa_dev` (local) or provided by service
- [ ] Connection string obtained
- [ ] Can connect: `psql postgresql://...` or via DB tool

### 2. Backend Configuration
- [ ] Backend `.env` file created from `.env.example`
- [ ] `DATABASE_URL` set correctly
- [ ] `BETTER_AUTH_SECRET` set (32+ random characters)
- [ ] `CORS_ORIGINS` includes frontend URL

### 3. Frontend Configuration
- [ ] Frontend `.env.local` created from `.env.local.example`
- [ ] `NEXT_PUBLIC_BETTER_AUTH_URL` set to frontend URL
- [ ] `NEXT_PUBLIC_API_URL` set to backend URL

### 4. Database Schema
- [ ] Schema applied: Run `schema.sql` on database
- [ ] Tables created:
  - [ ] `"user"` table
  - [ ] `"session"` table
  - [ ] `"account"` table
  - [ ] `"verification"` table
- [ ] Indexes created

### 5. Startup
- [ ] Backend starts without errors: `.\start.ps1`
- [ ] Frontend starts without errors: `pnpm dev`
- [ ] Both running simultaneously

### 6. Testing
- [ ] Navigate to http://localhost:3000/sign-up
- [ ] Sign-up form displays
- [ ] Can create account
- [ ] Can sign in
- [ ] Session persists

---

## Troubleshooting

### ❌ "Cannot find module 'better-auth'"

**Cause:** Dependencies not installed

**Solution:**
```bash
cd backend
pip install -r requirements.txt

cd ../frontend
pnpm install
```

### ❌ "DATABASE_URL is not set"

**Cause:** Environment variable missing

**Solution:**
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env and add DATABASE_URL

# Restart backend
.\start.ps1
```

### ❌ "Connection refused" to database

**Cause:** PostgreSQL not running or wrong credentials

**Solution:**

**If using local PostgreSQL:**
```bash
# Windows: Start PostgreSQL service
net start postgresql-x64-15

# Linux: Start PostgreSQL
sudo systemctl start postgresql

# Mac:
brew services start postgresql
```

**If using cloud database:**
```bash
# Test connection
psql postgresql://user:password@host:port/database

# Verify connection string in .env
DATABASE_URL=postgresql://user:password@host:5432/database
```

### ❌ "relation \"user\" does not exist"

**Cause:** Database schema not created

**Solution:**
```bash
# 1. Connect to database
psql postgresql://user:password@localhost:5432/tilawa_dev

# 2. Run schema
psql postgresql://user:password@localhost:5432/tilawa_dev < ../database/schema.sql

# 3. Verify tables
\dt

# Should show: user, session, account, verification
```

### ❌ Sign-up page blank/not loading

**Cause:** Frontend not running or build failed

**Solution:**
```bash
cd frontend

# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm dev

# Check for errors in terminal
```

### ❌ "Sign up failed" error

**Cause:** Multiple possible reasons

**Solution - Check logs:**
```bash
# Check backend logs (look for error messages)
# Terminal where backend is running

# Check browser console
F12 → Console tab → Look for errors

# Check network requests
F12 → Network tab
Click sign-up button
Look for POST request to /auth/sign-up
Check response for error details
```

### ❌ "Email already exists" when email is new

**Cause:** Case sensitivity or database issue

**Solution:**
```bash
# Check database
psql postgresql://...
SELECT * FROM "user" WHERE email ILIKE 'youremail@example.com';

# If duplicate, delete old record
DELETE FROM "user" WHERE email = 'youremail@example.com';

# Try again
```

### ❌ Can sign up but can't sign in

**Cause:** Password hashing issue or session not created

**Solution:**
```bash
# 1. Check if user created in database
SELECT * FROM "user" WHERE email = 'test@example.com';

# 2. Check if account (password) created
SELECT * FROM "account" WHERE userId = '<user-id>';

# 3. Check browser console for errors
F12 → Console

# 4. Check backend logs for errors

# 5. Verify BETTER_AUTH_SECRET is same in backend and matches
```

### ❌ "CORS error" from frontend

**Cause:** Backend CORS not configured for frontend URL

**Solution:**
```bash
# Backend .env
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# If you changed port, update this
# Restart backend
```

### ❌ Session expires too quickly

**Cause:** Session timeout configured too short

**Solution:**
```bash
# backend/lib/auth.ts
# Check session configuration:
session: {
  expiresIn: 60 * 60 * 24 * 7,  // 7 days in seconds
  updateAge: 60 * 60 * 24,       // Refresh after 1 day
}

# Adjust if needed, then restart backend
```

### ❌ Cannot access protected pages after login

**Cause:** Authentication check failing

**Solution:**
```bash
# 1. Check if session cookie exists
F12 → Application → Cookies
Look for cookie like: auth.session

# 2. Check if cookie has value
Right-click cookie → inspect → check Value field

# 3. Check if backend can verify session
# Run backend tests:
cd backend
python test_api.py

# 4. Check authorization header in network requests
F12 → Network → Click any request
Headers tab → Look for Authorization header
```

### ❌ "Invalid session" after page reload

**Cause:** Session not persisted properly

**Solution:**
```bash
# 1. Check cookie settings
# In DevTools cookie:
- HttpOnly: Should be enabled
- Secure: Should be enabled (in production)
- SameSite: Should be Lax or Strict
- Path: Should be /
- Domain: Should match your domain

# 2. Check if session was saved to database
SELECT * FROM "session";

# 3. Check BETTER_AUTH_SECRET
# Make sure same in backend .env for entire server
```

### ❌ Sign-out not working

**Cause:** Sign-out endpoint issue

**Solution:**
```bash
# 1. Check frontend sign-out button calls correct function
# Should call: signOut() from auth-client

# 2. Check if session deleted from database
# Before logout:
SELECT * FROM "session" WHERE userId = 'xxx';

# After logout:
SELECT * FROM "session" WHERE userId = 'xxx';
# Should be empty

# 3. Check cookies cleared
# After logout, check DevTools cookies
# auth.session should be gone

# 4. Check backend logs for errors
```

### ❌ User data not saving to profile

**Cause:** Database write failing or permissions issue

**Solution:**
```bash
# 1. Check if user can be created
SELECT * FROM "user";

# 2. Check if streaks table accessible
SELECT * FROM "streaks";

# 3. Check permissions on database
# User should have SELECT, INSERT, UPDATE, DELETE on all tables

# 4. Check API response
# F12 → Network → POST /api/users/.../streaks/increment
# Check response for errors
```

---

## Testing Authentication

### Quick Test (2 minutes)

```bash
# 1. Sign Up
Navigate to: http://localhost:3000/sign-up
Email: testuser@test.com
Password: TestPassword123!
Click Sign Up

# Expected: Redirects to home page

# 2. Check logged in
Look at header - should show user email

# 3. Sign Out
Click profile → Sign Out

# Expected: Redirects, logo appears

# 4. Try to access dashboard
Navigate to: http://localhost:3000/dashboard

# Expected: Redirects to sign-in
```

### Verify Database

```bash
psql postgresql://user:password@localhost:5432/tilawa_dev

# Check users table
SELECT id, email, name, "createdAt" FROM "user";

# Check sessions table
SELECT id, "userId", "expiresAt" FROM "session";

# Check accounts (passwords)
SELECT id, "userId" FROM "account";
```

### API Tests

```bash
# Sign up via API
curl -X POST http://localhost:8000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "name": "Test User"
  }'

# Sign in via API
curl -X POST http://localhost:8000/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

---

## Production Deployment

### Vercel Configuration

Set these environment variables in Vercel Dashboard:

```bash
NEXT_PUBLIC_BETTER_AUTH_URL=https://tilawa.app
NEXT_PUBLIC_API_URL=https://api.tilawa.app
DATABASE_URL=<production-db-url>
BETTER_AUTH_SECRET=<random-secret-32-chars>
```

### Database Backup

```bash
# Backup
pg_dump postgresql://user:password@host/db > backup.sql

# Restore
psql postgresql://user:password@host/db < backup.sql
```

### Monitoring

- Set up database monitoring
- Monitor authentication errors: F12 console
- Monitor failed login attempts
- Monitor session creation/deletion

---

## Security Checklist

- [ ] BETTER_AUTH_SECRET is strong (32+ random characters)
- [ ] Database password is strong
- [ ] HTTPS enabled in production
- [ ] Database backups configured
- [ ] Rate limiting enabled
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified
- [ ] CSRF tokens present (if using forms)
- [ ] Passwords hashed with bcrypt
- [ ] Session tokens are cryptographically random
- [ ] No sensitive data in localStorage
- [ ] No passwords in logs

---

## Support & Resources

- [Better Auth Docs](https://better-auth.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [Next.js Auth](https://nextjs.org/docs/authentication)
- [Security Best Practices](https://owasp.org/www-project-top-ten)

---

**Setup Date:** ____________  
**Status:** ⏳ In Progress
