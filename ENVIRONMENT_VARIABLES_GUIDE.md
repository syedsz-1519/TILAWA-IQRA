# TILAWA Environment Variables - Complete Setup Guide

## 🎯 Overview

This guide explains all environment variables needed for TILAWA to work across:
- **Frontend** (Next.js on Vercel)
- **Backend** (Express.js on Railway)
- **Database** (MongoDB Atlas)

---

## 📋 Environment Variables Summary

### **Frontend (.env.production on Vercel)**

| Variable | Value | Type | Required | Example |
|----------|-------|------|----------|---------|
| `NEXT_PUBLIC_QURAN_API` | Public Quran API endpoint | Public | ✅ Yes | `https://api.quran.com/api/v4` |
| `NEXTAUTH_SECRET` | Auth session encryption key (32+ chars) | Secret | ✅ Yes | `abc123def456...` |
| `NEXTAUTH_URL` | Frontend auth URL | Secret | ✅ Yes | `https://tilawa-iqra.vercel.app` |
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | Public | ✅ Yes | `https://tilawa-backend-*.up.railway.app` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Frontend URL for auth redirects | Public | ✅ Yes | `https://tilawa-iqra.vercel.app` |

### **Backend (.env on Railway)**

| Variable | Value | Type | Required | Example |
|----------|-------|------|----------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | Secret | ✅ Yes | `mongodb+srv://user:pass@cluster.mongodb.net/tilawa` |
| `BETTER_AUTH_SECRET` | Auth secret (must match frontend!) | Secret | ✅ Yes | `abc123def456...` |
| `NODE_ENV` | Environment mode | Public | ✅ Yes | `production` |
| `PORT` | Server port | Public | ✅ Yes | `8000` |
| `FRONTEND_URL` | Frontend domain for CORS | Public | ✅ Yes | `https://tilawa-iqra.vercel.app` |
| `LOG_LEVEL` | Logging verbosity | Public | ❌ No | `info` |

---

## 🔐 Generating NEXTAUTH_SECRET & BETTER_AUTH_SECRET

Both frontend and backend need the **SAME SECRET** (32+ characters).

### **Option 1: Windows PowerShell**

```powershell
$bytes = [byte[]]::new(32)
[Security.Cryptography.RNGCryptoServiceProvider]::new().GetBytes($bytes)
[Convert]::ToHexString($bytes).ToLower()
```

**Output Example:**
```
f3b8e9a2c1d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

### **Option 2: Mac/Linux Bash**

```bash
openssl rand -hex 32
```

### **Option 3: Online Generator**

https://generate-secret.vercel.app/32

---

## 🌐 Frontend Environment Variables (Vercel)

### **1. NEXT_PUBLIC_QURAN_API**

**What it does:** Provides public Quran content API endpoint

```
Key: NEXT_PUBLIC_QURAN_API
Value: https://api.quran.com/api/v4
```

**Used for:**
- Loading Quran chapters, verses, translations
- Audio recitation data
- Transliteration information

---

### **2. NEXTAUTH_SECRET** ⚠️ CRITICAL

**What it does:** Encrypts authentication session tokens

```
Key: NEXTAUTH_SECRET
Value: [Your 32+ character hex string from generator above]
```

**Security Notes:**
- ✅ Must be 32+ characters
- ✅ Must be random and unique
- ❌ Never use same secret in multiple projects
- ❌ Never commit to GitHub
- ✅ Same value must be on backend as `BETTER_AUTH_SECRET`

---

### **3. NEXTAUTH_URL**

**What it does:** Tells auth system the frontend domain (for redirects)

```
Key: NEXTAUTH_URL
Value: https://tilawa-iqra.vercel.app
```

**Replace if you have custom domain:**
```
https://yourdomain.com
```

---

### **4. NEXT_PUBLIC_API_URL** ⚠️ CRITICAL

**What it does:** Frontend knows where to call the backend API

```
Key: NEXT_PUBLIC_API_URL
Value: https://tilawa-backend-prod-xyz.up.railway.app
```

**⚠️ IMPORTANT:**
- Get this URL from Railway AFTER deploying backend
- Must include `https://` (not `http://`)
- No trailing slash
- Match exactly what Railway shows

**Find Railway URL:**
1. Go to Railway Dashboard → Your Project
2. Look for service URL in the deployment info
3. Copy the full URL
4. Paste here

---

### **5. NEXT_PUBLIC_BETTER_AUTH_URL**

**What it does:** Tells frontend where to redirect for authentication

```
Key: NEXT_PUBLIC_BETTER_AUTH_URL
Value: https://tilawa-iqra.vercel.app
```

**Same as NEXTAUTH_URL** (your frontend domain)

---

## 🖥️ Backend Environment Variables (Railway)

### **1. MONGODB_URI** ⚠️ CRITICAL

**What it does:** Connects backend to MongoDB database

```
Key: MONGODB_URI
Value: mongodb+srv://syedshahnawaz_db:wzf1BGHGqvI4PrYR@cluster0.wxno2ll.mongodb.net/tilawa?retryWrites=true&w=majority
```

**Current Database:**
- **Cluster:** cluster0.wxno2ll.mongodb.net
- **Database:** tilawa
- **Auth:** Username/password (URL encoded)
- **Options:** retryWrites=true, w=majority

**DO NOT MODIFY unless changing database!**

---

### **2. BETTER_AUTH_SECRET** ⚠️ CRITICAL

**What it does:** Decrypts authentication tokens from frontend

```
Key: BETTER_AUTH_SECRET
Value: [SAME AS FRONTEND NEXTAUTH_SECRET]
```

**⚠️ MUST MATCH FRONTEND!**

If frontend has:
```
NEXTAUTH_SECRET=abc123def456...
```

Then backend must have:
```
BETTER_AUTH_SECRET=abc123def456...
```

(Exact same value)

---

### **3. NODE_ENV**

**What it does:** Tells Express which environment to run in

```
Key: NODE_ENV
Value: production
```

**Values:**
- `production` = Production (Vercel/Railway)
- `development` = Local development
- `test` = Testing

---

### **4. PORT**

**What it does:** Which port the server listens on

```
Key: PORT
Value: 8000
```

**Note:** Railway assigns port automatically, but this is the default.

---

### **5. FRONTEND_URL** ⚠️ IMPORTANT

**What it does:** Backend enables CORS for requests from this domain

```
Key: FRONTEND_URL
Value: https://tilawa-iqra.vercel.app
```

**Must match your Vercel frontend domain exactly!**

If mismatch → CORS errors → Frontend can't call backend

---

### **6. LOG_LEVEL** (Optional)

**What it does:** How much logging detail to show

```
Key: LOG_LEVEL
Value: info
```

**Values:**
- `debug` = Everything (development)
- `info` = Important messages (production)
- `warn` = Only warnings
- `error` = Only errors

---

## 📝 Step-by-Step Setup Instructions

### **For Vercel Frontend:**

1. **Go to:** https://vercel.com/dashboard
2. **Select Project:** `tilawa-iqra`
3. **Click:** Settings → Environment Variables
4. **Add each variable:**
   - Click "+ Add Variable"
   - Enter Key
   - Enter Value
   - Select: Production + Preview + Development
   - Click "Save"

5. **Repeat for all 5 variables:**
   - NEXT_PUBLIC_QURAN_API
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - NEXT_PUBLIC_API_URL
   - NEXT_PUBLIC_BETTER_AUTH_URL

6. **Redeploy:** Go to Deployments → Click "Redeploy"

---

### **For Railway Backend:**

1. **Go to:** https://railway.app
2. **Select Project:** TILAWA-IQRA
3. **Click:** Backend service
4. **Click:** "Variables" tab
5. **Add each variable:**
   - Click "+ Add Variable"
   - Enter Key
   - Enter Value
   - Click "Add"

6. **Repeat for all 6 variables:**
   - MONGODB_URI
   - BETTER_AUTH_SECRET
   - NODE_ENV
   - PORT
   - FRONTEND_URL
   - LOG_LEVEL

7. **Redeploy:** Click "Redeploy" button

---

## ✅ Verification Checklist

### **Before Deployment:**

- [ ] Generated NEXTAUTH_SECRET (32+ characters)
- [ ] Frontend env vars added to Vercel (5 total)
- [ ] Backend env vars added to Railway (6 total)
- [ ] BETTER_AUTH_SECRET is same on frontend AND backend
- [ ] NEXTAUTH_URL matches your Vercel domain
- [ ] FRONTEND_URL matches your Vercel domain
- [ ] MONGODB_URI is correct
- [ ] NEXT_PUBLIC_API_URL points to Railway backend URL

### **After Deployment:**

- [ ] Frontend deploys successfully
- [ ] Backend deploys successfully
- [ ] Frontend loads without console errors
- [ ] API calls from frontend reach backend
- [ ] Backend health check responds: `/health`
- [ ] Database connection works (check Rails logs)
- [ ] No CORS errors in browser console

---

## 🐛 Common Issues & Fixes

### **Issue: "Cannot find module" on Vercel**

**Cause:** Environment variables not set
**Fix:** 
1. Add all variables to Vercel
2. Go to Deployments → Redeploy

---

### **Issue: Frontend says "API Error" or "Cannot reach backend"**

**Cause:** NEXT_PUBLIC_API_URL is wrong or backend not running
**Fix:**
1. Verify NEXT_PUBLIC_API_URL matches Railway URL exactly
2. Test Railway URL in browser: `https://[railway-url]/health`
3. Redeploy frontend on Vercel

---

### **Issue: CORS error in browser console**

**Cause:** Backend doesn't know frontend domain
**Fix:**
1. Check Railway backend has FRONTEND_URL env var
2. Value must match Vercel domain exactly
3. Redeploy backend on Railway

---

### **Issue: Login/Authentication not working**

**Cause:** BETTER_AUTH_SECRET mismatch
**Fix:**
1. Frontend NEXTAUTH_SECRET must equal backend BETTER_AUTH_SECRET
2. Regenerate if unsure
3. Update both (frontend AND backend)
4. Redeploy both

---

### **Issue: "Connection timeout" or "Cannot reach database"**

**Cause:** MongoDB connection string wrong or IP not whitelisted
**Fix:**
1. Verify MONGODB_URI is correct
2. Go to MongoDB Atlas → Network Access
3. Add Railway IP (or 0.0.0.0/0)
4. Try again

---

## 🔍 Debugging Environment Variables

### **Check Frontend Variables (Vercel)**

1. Go to Vercel Dashboard → Your Project
2. Click Settings → Environment Variables
3. See all variables listed
4. Click eye icon to reveal values (be careful!)

### **Check Backend Variables (Railway)**

1. Go to Railway Dashboard → Your Project → Backend Service
2. Click "Variables" tab
3. See all variables listed
4. Values are revealed (Railway is private)

### **Test from Command Line**

```bash
# Check if backend environment is loaded
curl https://[railway-url]/health

# Should return JSON with database status
```

---

## 📚 Reference Values

### **Production URLs**

```
Frontend: https://tilawa-iqra.vercel.app
Backend: https://tilawa-backend-prod-[id].up.railway.app
Database: MongoDB Atlas (tilawa database)
```

### **Local Development URLs**

```
Frontend: http://localhost:3000
Backend: http://localhost:8000
Database: mongodb+srv://... (same as production)
```

---

## 🎯 Key Takeaways

✅ **DO:**
- Keep BETTER_AUTH_SECRET same on both services
- Use production URLs in Vercel/Railway
- Use HTTPS (not HTTP)
- Verify each domain exactly
- Keep secrets private
- Regenerate if leaked

❌ **DON'T:**
- Commit .env files to Git
- Share secret values
- Hardcode URLs in code
- Use localhost URLs in production
- Mix up frontend/backend URLs

---

## 📞 Need Help?

If environment variables aren't working:

1. **Check logs:**
   - Vercel: Deployments → Build Log
   - Railway: Project → Logs

2. **Verify values:**
   - Are they exactly correct?
   - No extra spaces?
   - Correct protocol (https/http)?

3. **Test connectivity:**
   - `curl https://[backend-url]/health`
   - Check browser Network tab
   - Look for CORS/timeout errors

4. **Regenerate if needed:**
   - Generate new NEXTAUTH_SECRET
   - Update both frontend AND backend
   - Redeploy both

---

**Status:** ✅ Complete Guide
**Last Updated:** September 24, 2026
**Scope:** Frontend (Vercel) + Backend (Railway) + Database (MongoDB)
