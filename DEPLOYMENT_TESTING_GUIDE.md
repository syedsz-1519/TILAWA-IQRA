# TILAWA Deployment - Testing & Verification Guide

## 🎯 Overview

This guide helps you verify that all components are working correctly after deployment:
- ✅ Frontend on Vercel
- ✅ Backend on Railway  
- ✅ Database (MongoDB Atlas)
- ✅ Communication between services

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All code committed to GitHub (branch: `main`)
- [ ] No build errors locally: `npm run build --workspace=frontend`
- [ ] vercel.json configured correctly
- [ ] 5 environment variables added to Vercel
- [ ] 6 environment variables added to Railway
- [ ] NEXTAUTH_SECRET is same on both services
- [ ] MongoDB URI is correct
- [ ] MongoDB Atlas has Railway IP whitelisted

---

## 🚀 Deployment Steps

### **Step 1: Deploy Backend to Railway**

1. Go to: https://railway.app
2. Create new project from GitHub
3. Select: `syedsz-1519/TILAWA-IQRA`
4. Railway auto-detects `apps/backend/server` as Node.js
5. Add all 6 environment variables
6. Click "Deploy"
7. ⏳ Wait 3-5 minutes for build
8. ✅ Status should show "Running"
9. **Copy Backend URL** (e.g., `https://tilawa-backend-prod-xyz.up.railway.app`)

---

### **Step 2: Update Frontend with Backend URL**

1. Go to: https://vercel.com/dashboard
2. Select: `tilawa-iqra` project
3. Settings → Environment Variables
4. Find: `NEXT_PUBLIC_API_URL`
5. Update Value to Railway URL from Step 1
6. Save

---

### **Step 3: Deploy Frontend to Vercel**

1. Go to: https://vercel.com/new
2. Import GitHub: `syedsz-1519/TILAWA-IQRA`
3. Configure:
   - Framework: Next.js
   - Build Command: `npm run build --workspace=frontend`
   - Output Directory: `frontend/.next`
   - Root Directory: `./`
4. Add all 5 environment variables
5. Click "Deploy"
6. ⏳ Wait 3-5 minutes for build
7. ✅ Status should show "Ready"
8. **Get Frontend URL** (e.g., `https://tilawa-iqra.vercel.app`)

---

## ✅ Test 1: Frontend Loads Successfully

### **Visual Test**

1. Go to your Vercel frontend URL: `https://tilawa-iqra.vercel.app`
2. Wait for page to load (5-10 seconds for cold start)
3. ✅ See homepage with no errors
4. ✅ Navigation works (click buttons, links)
5. ✅ Page styling is correct

### **Browser Console Check**

1. Open DevTools: `F12`
2. Go to **Console** tab
3. ❌ Look for red errors
4. ⚠️ Yellow warnings are okay (usually about analytics)
5. ✅ Should have minimal/no errors

**Expected output:**
```
✓ Page loaded
✓ No "Cannot find module" errors
✓ No "404" errors
✓ No "undefined" reference errors
```

---

## ✅ Test 2: Backend Health Check

### **From Browser**

1. Open new browser tab
2. Go to: `https://[your-railway-url]/health`
3. Replace `[your-railway-url]` with actual Railway URL
4. ✅ Should see JSON response:

```json
{
  "status": "ok",
  "environment": "production",
  "database": "connected",
  "timestamp": "2026-09-24T12:00:00.000Z"
}
```

### **From Command Line (Terminal)**

```bash
curl https://[your-railway-url]/health

# Should return the same JSON above
```

**If you get an error:**
- ❌ `Connection refused` → Backend not running
- ❌ `Could not resolve host` → URL is wrong
- ❌ `504 Gateway Timeout` → Backend is overloaded
- ❌ `database: "disconnected"` → MongoDB connection failed

**Fix:**
1. Check Railway dashboard shows "Running"
2. Check MongoDB connection in Railway logs
3. Verify MONGODB_URI environment variable
4. Check MongoDB Atlas IP whitelist

---

## ✅ Test 3: Frontend → Backend Communication

### **Test API Call**

1. Open frontend: `https://tilawa-iqra.vercel.app`
2. Open DevTools: `F12`
3. Go to **Network** tab
4. Try a feature that calls the backend (e.g., load languages, bookmarks)
5. Watch Network tab for API requests
6. ✅ Should see request to your Railway backend URL
7. ✅ Status should be `200 OK` (green)

**Request should look like:**
```
GET https://[railway-url]/api/languages
Status: 200 OK
Response: [array of languages]
```

### **Network Tab Debugging**

If you see errors:

| Error | Cause | Fix |
|-------|-------|-----|
| `404 Not Found` | Endpoint doesn't exist | Check route in backend |
| `500 Internal Server Error` | Backend error | Check Railway logs |
| `CORS error` | Domain mismatch | Verify FRONTEND_URL on Railway |
| `Connection timeout` | Backend too slow | Check cold start, MongoDB connection |

---

## ✅ Test 4: CORS & Authentication

### **Test CORS Headers**

1. In DevTools Network tab
2. Click any API request
3. Go to **Response Headers**
4. Look for:
   - ✅ `Access-Control-Allow-Origin: https://tilawa-iqra.vercel.app`
   - ✅ `Access-Control-Allow-Credentials: true`

**If missing:**
1. Check backend has CORS middleware
2. Verify `FRONTEND_URL` env var on Railway
3. Restart backend deployment

### **Test Authentication (if implemented)**

1. Try to sign up / log in
2. Check for errors in Console
3. Check Network tab for auth requests
4. ✅ Should see requests to `/api/auth/*`
5. ✅ Credentials should be stored

---

## ✅ Test 5: Database Connection

### **Check MongoDB Connection**

1. Go to Railway Dashboard
2. Select backend service
3. Click **"Logs"** tab
4. Look for startup messages:

```
✅ Successfully connected to MongoDB
📊 Database: tilawa
🔗 Host: cluster0.wxno2ll.mongodb.net
```

**If you see errors:**
```
❌ Failed to connect to MongoDB
   Error: Authentication failed
```

**Fix:**
1. Verify MONGODB_URI is correct
2. Check MongoDB username/password
3. Check MongoDB Atlas IP whitelist (add Railway IP or 0.0.0.0/0)
4. Test connection locally first

---

## ✅ Test 6: Environment Variables

### **Verify Variables Are Loaded**

**Frontend (Vercel):**
1. Vercel Dashboard → Project Settings → Environment Variables
2. See all 5 variables listed
3. Click eye icon to reveal (verify values are correct)

**Backend (Railway):**
1. Railway Dashboard → Project → Variables
2. See all 6 variables listed
3. Check values are correct

### **Test Variable Usage**

**Frontend:**
1. Open DevTools Console
2. Check if these global constants exist:
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
console.log(process.env.NEXT_PUBLIC_QURAN_API)
```
3. Should output the actual values (not `undefined`)

**Backend:**
1. Check Railway logs for environment loading
2. Should see messages like:
```
🔄 Initializing database connection...
✅ Backend server running on port 8000
🔗 CORS enabled for: https://tilawa-iqra.vercel.app
```

---

## ✅ Test 7: Full Feature Test

### **Test a Complete Flow**

1. **Open Frontend**
   - Navigate to: `https://tilawa-iqra.vercel.app`
   - ✅ Homepage loads

2. **Test Data Loading**
   - Go to a page that loads data (e.g., Languages, Bookmarks)
   - ✅ Should show content
   - Check Network tab → See API calls
   - Check response status → Should be 200

3. **Test Interactivity**
   - Click buttons, form inputs, navigation
   - ✅ Should work smoothly
   - No console errors

4. **Test API Errors (if applicable)**
   - Try an action that might fail
   - Check error handling
   - Should show user-friendly message (not crash)

---

## 🐛 Troubleshooting Matrix

| Symptom | Cause | Solution |
|---------|-------|----------|
| Frontend won't load | Build failed or wrong URL | Check Vercel build logs |
| "Cannot reach API" | Backend URL wrong | Update NEXT_PUBLIC_API_URL |
| CORS error in console | Domain mismatch | Check FRONTEND_URL on Railway |
| "API 404 Not Found" | Route doesn't exist | Check backend route file |
| "API 500 Error" | Backend crashed | Check Railway logs |
| Database won't connect | Connection string wrong or IP not whitelisted | Add Railway IP to MongoDB Atlas |
| Authentication fails | NEXTAUTH_SECRET mismatch | Ensure same secret on both services |
| Slow responses | Cold start or connection timeout | Normal for first request after inactivity |

---

## 📊 Performance Baseline

Expected response times after full deployment:

| Operation | Time | Status |
|-----------|------|--------|
| Frontend page load | 2-5 seconds | ✅ Normal |
| API call (cold start) | 3-10 seconds | ✅ Normal |
| API call (warm) | 100-500ms | ✅ Good |
| Database query | 50-200ms | ✅ Good |

**First request after deploying may be slow (cold start). Subsequent requests will be faster.**

---

## ✅ Final Verification Checklist

### **Before Going Live**

- [ ] Frontend loads without errors
- [ ] Backend health check responds
- [ ] API calls reach backend (check Network tab)
- [ ] Database is connected (check logs)
- [ ] No CORS errors
- [ ] NEXTAUTH_SECRET is same on both services
- [ ] All environment variables are set
- [ ] MongoDB Atlas has Railway IP whitelisted
- [ ] vercel.json is correct
- [ ] .env files are in .gitignore

### **After Going Live**

- [ ] Share URL with team/users
- [ ] Monitor Vercel dashboard for errors
- [ ] Monitor Railway dashboard for errors
- [ ] Check browser console reports
- [ ] Ask users to report any issues
- [ ] Keep logs for 24 hours for debugging

---

## 🔍 Monitoring & Ongoing Checks

### **Weekly Health Checks**

```bash
# Check if backend is running
curl https://[railway-url]/health

# Check if frontend loads
curl https://tilawa-iqra.vercel.app
```

### **View Logs**

**Vercel Logs:**
1. Dashboard → Project → Deployments → Latest → "Build Log"

**Railway Logs:**
1. Dashboard → Project → Service → "Logs" tab

### **Set Up Alerts (Optional)**

- **Vercel**: Settings → Integrations → Slack/Discord notifications
- **Railway**: Coming soon (watch for updates)

---

## 📞 Getting Help

If something doesn't work:

1. **Check logs first** (Vercel + Railway)
2. **Verify environment variables** (all values correct?)
3. **Test health check** (`/health` endpoint)
4. **Check browser console** (F12 → Console)
5. **Check network requests** (F12 → Network tab)

---

## 📚 Reference Documents

- **Backend Setup**: `BACKEND_DEPLOYMENT_GUIDE.md`
- **Frontend Setup**: `VERCEL_COMPLETE_SETUP.md`
- **Environment Variables**: `ENVIRONMENT_VARIABLES_GUIDE.md`
- **Quick Reference**: `ENV_VARIABLES_QUICK_REFERENCE.md`

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ Frontend loads at `https://tilawa-iqra.vercel.app`
✅ Backend responds at `https://[railway-url]/health`
✅ No console errors in DevTools
✅ API calls from frontend reach backend
✅ Database is connected
✅ All features work as expected
✅ No CORS/authentication errors

---

## 🚀 Ready to Deploy!

You now have:
1. ✅ Fixed frontend code (no build errors)
2. ✅ Correct vercel.json configuration
3. ✅ Complete environment variables setup
4. ✅ Backend deployment guide
5. ✅ Testing procedures
6. ✅ Troubleshooting guides

**Next Steps:**
1. Deploy backend to Railway
2. Deploy frontend to Vercel
3. Run through testing checklist
4. Go live! 🎉

---

**Status**: ✅ Ready for Production
**Last Updated**: September 24, 2026
**Scope**: Frontend + Backend + Database Testing
