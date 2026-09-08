# TILAWA Deployment Testing & Verification Guide

## Overview

After deploying TILAWA to Vercel, this guide walks you through testing all features to ensure everything works correctly.

---

## Pre-Testing Checklist

Before testing, verify:

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed (Railway, Fly.io, or separate)
- [ ] Database created and schema applied
- [ ] Environment variables set on Vercel
- [ ] Environment variables set on backend platform
- [ ] CORS configured properly
- [ ] SSL certificates active

---

## Part 1: Infrastructure Verification

### 1.1 Frontend Deployment Status

**Test that frontend is running:**

```bash
# Check Vercel deployment
curl -I https://your-frontend.vercel.app

# Expected response:
# HTTP/2 200
# Content-Type: text/html
```

**In browser:**
1. Open https://your-frontend.vercel.app
2. Should load homepage without 404 errors
3. Check browser console for any JavaScript errors

### 1.2 Backend Health Check

**Test that backend is responding:**

```bash
# Health endpoint
curl https://your-backend-url/api/health

# Expected response:
# {"status":"ok"}
```

**Test ping endpoint:**

```bash
curl https://your-backend-url/api/ping

# Expected response:
# {"status":"pong"}
```

**Check API documentation:**

1. Open https://your-backend-url/api/docs
2. Should see Swagger UI with all endpoints listed
3. All endpoints should be documented

### 1.3 Database Connection

**Test database from backend logs:**

1. Check backend deployment logs (Railway/Fly.io)
2. Should NOT show "Connection refused" errors
3. Should show successful database initialization

**Test database directly:**

```bash
# If you have psql installed
psql [DATABASE_URL] -c "SELECT COUNT(*) FROM \"user\";"

# Should return: count
#                 0
# (or number of existing users)
```

### 1.4 CORS Configuration

**Test CORS from frontend:**

```bash
# From browser console on your frontend
fetch('https://your-backend-url/api/health')
  .then(r => r.json())
  .then(d => console.log(d))

# Should return: {status: "ok"}
# Should NOT show CORS error in console
```

---

## Part 2: Frontend Feature Testing

### 2.1 Homepage & Navigation

**Test:**
1. Open https://your-frontend.vercel.app
2. Homepage loads
3. Navigation menu appears
4. All page links work:
   - [ ] /read (Quran Reader)
   - [ ] /dashboard (Dashboard)
   - [ ] /sign-up (Registration)
   - [ ] /sign-in (Login)
   - [ ] /settings (Settings)

**Expected:** All pages load without 404 errors

### 2.2 Quran Reading Features

**Test Surah Browser:**
1. Navigate to /read
2. See all 114 Surahs displayed in grid
3. Each Surah shows:
   - [ ] Surah number
   - [ ] English name
   - [ ] Arabic name
   - [ ] Ayah count
4. Click on Surah opens individual surah page

**Test Arabic Text Display:**
1. Open any Surah (e.g., Surah 1)
2. Arabic text displays properly (Uthmani script)
3. Text reads right-to-left
4. Verse numbers show
5. Bismillah displays (for Surahs 2-8, 10+)

**Test Reading Modes:**
1. See "Translation" and "Arabic only" buttons
2. Click "Translation" - shows English translation
3. Click "Arabic only" - shows only Arabic text
4. Mode persists when switching Surahs

**Test Language Selection:**
1. Find language dropdown
2. 18+ languages available:
   - [ ] English
   - [ ] Urdu
   - [ ] Hindi (Kanzul Imaan)
   - [ ] Bengali (Kanzul Imaan)
   - [ ] Arabic
   - [ ] And others
3. Select language changes translation
4. Language labels show in native script

**Test Audio Playback:**
1. See audio player
2. "Play & Follow" button plays full Surah
3. Individual ayah click plays that ayah
4. Audio streams from everyayah.com
5. Play/pause buttons work
6. Audio continues playing as you scroll

**Test Navigation:**
1. Previous/Next Surah buttons work
2. Surah names display correctly
3. No "previous" on Surah 1, no "next" on Surah 114

### 2.3 User Authentication

**Test Sign-Up:**
1. Go to /sign-up
2. Form shows email, password fields
3. Enter test email and password
4. Submit form
5. User created in database
6. Redirected to dashboard (auto-login)

**Test Sign-In:**
1. Sign out (if logged in)
2. Go to /sign-in
3. Enter email and password
4. Submit form
5. Session created
6. Redirected to dashboard

**Test Session Persistence:**
1. Logged in
2. Refresh page
3. Still logged in (session persists)
4. Close browser and reopen
5. Still logged in (session cookie persists)

**Test Sign-Out:**
1. Logged in
2. Find sign-out button (usually in profile menu)
3. Click sign-out
4. Session cleared
5. Redirected to homepage
6. Cannot access /dashboard without logging in again

### 2.4 Dashboard Features

**Test Dashboard Access:**
1. Must be logged in
2. /dashboard redirects to /sign-in if not logged in
3. Once logged in, /dashboard loads

**Test Dashboard Sections:**
- [ ] Memorization Tracker (/hifz)
- [ ] Tajweed Lessons (/tajweed)
- [ ] Recitation Battles (/battles)
- [ ] Mood Tracker (/mood)
- [ ] Nafs Tracker (/nafs-tracker)
- [ ] Bookmarks (/mushaf)
- [ ] Reading History (/history)
- [ ] Settings (/settings)
- [ ] Stories (/stories)
- [ ] Hadith & Dua (/hadith-dua)

**Each should:**
- [ ] Load without errors
- [ ] Display relevant content
- [ ] Have functioning UI elements

### 2.5 Mobile Responsiveness

**Test on Mobile (or Chrome DevTools mobile view):**

**Set viewport to 375x667 (iPhone SE):**
1. Navigate to /read
2. Surah grid displays correctly
3. Text is readable
4. Buttons are clickable
5. Language dropdown works
6. Audio player visible
7. No horizontal scrolling

**Test on Tablet (768x1024 iPad):**
1. Layout adjusts properly
2. Text sizing appropriate
3. All features accessible

**Test RTL Languages:**
1. Select Arabic or Urdu translation
2. Text aligns right-to-left
3. UI adjusts for RTL (buttons, navigation)
4. No text wrapping issues

---

## Part 3: API Endpoint Testing

### 3.1 Health & Status Endpoints

```bash
# Health check
curl https://your-backend-url/api/health
# Expected: {"status":"ok"}

# Ping
curl https://your-backend-url/api/ping
# Expected: {"status":"pong"}
```

### 3.2 User Endpoints

**Create user via signup:**

```bash
# Frontend does this via sign-up form
# Database should contain new user
```

**Get user streaks:**

```bash
curl https://your-backend-url/api/users/[user-id]/streaks \
  -H "Authorization: Bearer [token]"

# Expected: {"user_id":"...", "streaks":0}
```

### 3.3 Bookmark Endpoints

**Create bookmark:**

```bash
curl -X POST https://your-backend-url/api/bookmarks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [token]" \
  -d '{"surah":1,"ayah":1}'

# Expected: {"id":"...", "user_id":"...", "surah":1, "ayah":1}
```

**Get bookmarks:**

```bash
curl https://your-backend-url/api/bookmarks \
  -H "Authorization: Bearer [token]"

# Expected: [{"id":"...", "user_id":"...", "surah":1, "ayah":1}]
```

### 3.4 WebSocket Testing

**Test WebSocket connection:**

```bash
# Open browser console on frontend
const ws = new WebSocket('wss://your-backend-url/ws/battles?user_id=123');

ws.onopen = () => console.log('Connected');
ws.onmessage = (msg) => console.log('Message:', msg);
ws.onerror = (err) => console.log('Error:', err);
ws.onclose = () => console.log('Disconnected');

// Send test message
ws.send(JSON.stringify({type: "test"}));
```

**Expected:**
- [ ] Connection established
- [ ] Messages received
- [ ] No connection errors

---

## Part 4: Error Scenarios Testing

### 4.1 Database Connection Errors

**Simulate database failure:**
1. Temporarily disable DATABASE_URL in environment
2. Try to sign up
3. Should show user-friendly error (not crash)
4. Re-enable DATABASE_URL
5. Should work again

### 4.2 API Unreachable

**Simulate backend down:**
1. Stop backend temporarily
2. Try to call API from frontend
3. Should timeout or show error
4. Start backend
5. Should work again

### 4.3 Invalid Credentials

**Test authentication failures:**
1. Sign in with wrong password
2. Should show "Invalid credentials" error
3. Should NOT crash
4. Can retry

### 4.4 Network Errors

**Test offline scenario:**
1. Disconnect network
2. Try to navigate
3. Should show appropriate error
4. Reconnect network
5. Should work again

---

## Part 5: Performance Testing

### 5.1 Page Load Times

**Measure with browser DevTools:**

1. Open DevTools (F12)
2. Go to Performance tab
3. Reload page
4. Record performance

**Expected metrics:**
- [ ] First Contentful Paint (FCP): < 2 seconds
- [ ] Largest Contentful Paint (LCP): < 3 seconds
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] First Input Delay (FID): < 100ms

### 5.2 API Response Times

**Test API response times:**

```bash
# Time an API call
time curl https://your-backend-url/api/health

# Expected: < 100ms for local requests, < 500ms for cloud
```

### 5.3 Database Query Performance

**Check slow queries:**

```bash
# In PostgreSQL
SELECT query, calls, mean_time FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

# Should be < 50ms for most queries
```

---

## Part 6: Security Testing

### 6.1 HTTPS/SSL

**Test SSL:**

```bash
# Check certificate
openssl s_client -connect your-frontend.vercel.app:443 | grep -i valid

# Expected: "Verify return code: 0 (ok)"
```

**Browser check:**
1. Open https://your-frontend.vercel.app
2. Look for lock icon in address bar
3. Certificate should be valid

### 6.2 CORS Headers

**Test CORS headers:**

```bash
curl -I -H "Origin: https://other-site.com" \
  https://your-backend-url/api/health

# Check response headers
# Should include Access-Control-Allow-Origin
```

### 6.3 Authentication Security

**Test token validation:**

```bash
# Invalid token
curl https://your-backend-url/api/bookmarks \
  -H "Authorization: Bearer invalid-token"

# Should return 401 Unauthorized
```

### 6.4 XSS Prevention

**Test XSS prevention:**

1. In browser console, try to access sensitive data:
   ```javascript
   // Try to read auth token from localStorage
   localStorage.getItem('auth_token');
   
   // Should NOT be there (secure HTTP-only cookie instead)
   ```

### 6.5 SQL Injection Prevention

**Test SQL injection prevention:**

1. Try sign-up with SQL injection payload:
   ```
   Email: test@test.com' OR '1'='1
   ```

2. Should safely handle as normal email
3. Should NOT execute SQL
4. Should show validation error if needed

---

## Part 7: Browser Compatibility

### Test Supported Browsers

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**For each browser:**
1. Load homepage
2. Navigate to /read
3. Sign up
4. Sign in
5. Test audio playback
6. Test language switching

---

## Part 8: Monitoring & Logs

### 8.1 Vercel Logs

**Check Vercel deployment logs:**

1. Vercel Dashboard → Deployments → [Latest]
2. Click "Logs" tab
3. Look for:
   - [ ] Build completed successfully
   - [ ] No TypeScript errors
   - [ ] No runtime errors
   - [ ] Proper cache headers

### 8.2 Backend Logs

**Check backend platform logs:**

**Railway:**
```bash
railway logs -f
```

**Fly.io:**
```bash
flyctl logs
```

**Look for:**
- [ ] Server started successfully
- [ ] Database connected
- [ ] No connection errors
- [ ] CORS configured properly

### 8.3 Error Tracking

**Set up error tracking (optional):**

1. Sentry.io integration
2. LogRocket for session replay
3. Datadog for infrastructure monitoring

---

## Part 9: End-to-End User Journey Test

**Complete user flow:**

1. ✅ Load homepage
2. ✅ Navigate to /read
3. ✅ Browse Surahs
4. ✅ Open Surah 1
5. ✅ Read Arabic text
6. ✅ Switch to Translation
7. ✅ Switch language
8. ✅ Play audio
9. ✅ Navigate to next Surah
10. ✅ Sign up (new user)
11. ✅ Verify user created in database
12. ✅ Sign in with new account
13. ✅ Access dashboard
14. ✅ Save bookmark
15. ✅ Check reading history
16. ✅ Access settings
17. ✅ Sign out
18. ✅ Verify session cleared
19. ✅ Sign in again
20. ✅ Verify session restored

---

## Part 10: Deployment Verification Checklist

### Critical Items

- [ ] Frontend loads without 404 errors
- [ ] Backend responds to health checks
- [ ] Database connections successful
- [ ] Authentication working (sign-up/sign-in)
- [ ] Quran text displays correctly
- [ ] Audio playback works
- [ ] Language switching works
- [ ] API endpoints respond
- [ ] CORS properly configured
- [ ] SSL/HTTPS working
- [ ] No JavaScript errors in console
- [ ] No database errors in logs
- [ ] Mobile responsive
- [ ] Sessions persist across reloads

### Performance Items

- [ ] Page loads < 3 seconds
- [ ] API responses < 500ms
- [ ] No memory leaks
- [ ] Database queries optimized
- [ ] Images properly optimized
- [ ] CSS/JS minified

### Security Items

- [ ] HTTPS enforced
- [ ] CORS headers set
- [ ] Auth tokens secure
- [ ] No sensitive data in logs
- [ ] Passwords hashed
- [ ] SQL injection prevented
- [ ] XSS prevented

---

## Part 11: Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Frontend shows 404 | Vercel config wrong | Check vercel.json, rootDirectory=frontend |
| Backend not responding | Backend not deployed | Deploy to Railway/Fly.io |
| Database connection error | DATABASE_URL wrong | Verify connection string in environment |
| CORS error in console | CORS not configured | Add frontend URL to backend CORS_ORIGINS |
| Auth fails with 401 | Token invalid or expired | Check BETTER_AUTH_SECRET matches |
| Audio doesn't play | CDN URL wrong | Check NEXT_PUBLIC_EVERYAYAH_CDN |
| Language dropdown empty | API call failed | Check NEXT_PUBLIC_QURAN_API_BASE |
| Session lost on refresh | Cookies not working | Check HTTPS, secure cookie settings |

---

## Part 12: Sign-Off Checklist

After completing all tests:

- [ ] All 5 infrastructure tests passed
- [ ] All 5 frontend feature tests passed
- [ ] All 4 API endpoint tests passed
- [ ] All 4 error scenario tests passed
- [ ] Performance metrics within acceptable range
- [ ] All 5 security tests passed
- [ ] All supported browsers tested
- [ ] Logs reviewed and clean
- [ ] End-to-end user journey completed
- [ ] Critical deployment items verified
- [ ] Performance items verified
- [ ] Security items verified

---

## Status: Ready for Production

If all tests pass, TILAWA is ready for:

✅ Public launch  
✅ User sign-ups  
✅ Production traffic  
✅ Monitoring/alerts  
✅ Feature rollout  

---

## Post-Launch Monitoring

After going live:

1. **Monitor daily:**
   - Check error rates
   - Monitor performance
   - Review logs

2. **Monitor weekly:**
   - User growth
   - Feature usage
   - Support requests

3. **Monthly:**
   - Security audit
   - Performance optimization
   - Backup verification

---

## Support & Escalation

If tests fail:

1. **Check documentation:**
   - VERCEL_DEPLOYMENT_SETUP.md
   - BACKEND_DEPLOYMENT_GUIDE.md
   - AUTHENTICATION_SETUP_GUIDE.md

2. **Review logs:**
   - Vercel build logs
   - Backend platform logs
   - Browser console

3. **Common fixes:**
   - Verify all environment variables
   - Check database connection
   - Verify CORS configuration
   - Test API endpoints directly

---

**Testing Date:** __________  
**Tested By:** __________  
**Status:** ✅ PASSED / ❌ FAILED  
**Issues Found:** __________  
**Resolved By:** __________  
**Ready for Launch:** ✅ YES / ❌ NO
