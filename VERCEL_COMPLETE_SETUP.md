# TILAWA Frontend - Complete Vercel Deployment Setup

## 🎯 Overview

This guide walks you through deploying the TILAWA frontend (Next.js) to Vercel. The frontend communicates with a separate backend running on Railway.

**Architecture:**
```
User Browser
    ↓
Vercel Frontend (tilawa-iqra.vercel.app)
    ↓
Railway Backend (tilawa-backend-*.up.railway.app)
    ↓
MongoDB Atlas (tilawa database)
```

---

## 📋 Prerequisites

- ✅ GitHub account with repository: https://github.com/syedsz-1519/TILAWA-IQRA
- ✅ Vercel account (free): https://vercel.com
- ✅ Backend deployed on Railway (follow BACKEND_DEPLOYMENT_GUIDE.md first!)
- ✅ Railway backend URL (e.g., `https://tilawa-backend-prod-xyz.up.railway.app`)

---

## 🚀 Step 1: Import Project to Vercel

### **Method A: Automatic (Recommended)**

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Paste: `https://github.com/syedsz-1519/TILAWA-IQRA`
4. Click **"Continue"**

### **Method B: Connect GitHub**

1. Go to: https://vercel.com/new
2. Click **"Continue with GitHub"**
3. Authorize Vercel with your GitHub account
4. Select the repository
5. Click **"Import"**

---

## 🔧 Step 2: Configure Project Settings

Vercel should auto-detect these, but verify:

### **Framework Preset**
- ✅ **Framework**: Next.js
- ✅ **Build Command**: `npm run build --workspace=frontend`
- ✅ **Output Directory**: `frontend/.next`
- ✅ **Install Command**: `npm install`
- ✅ **Root Directory**: `./` (or leave empty)

### **If settings are wrong:**
1. Click **"Edit"** next to "Root Directory"
2. Set Root Directory to: `./` (the repository root)
3. Click **"Save"**

---

## 🔑 Step 3: Add Environment Variables

**CRITICAL:** These must be added BEFORE deployment!

### **In Vercel Dashboard:**

1. Still on the import page, scroll to **"Environment Variables"**
2. Click **"Add New"** for each variable below

### **Required Variables:**

#### **1. NEXT_PUBLIC_QURAN_API** (Public)
- **Key**: `NEXT_PUBLIC_QURAN_API`
- **Value**: `https://api.quran.com/api/v4`
- **Environments**: Production, Preview, Development

#### **2. NEXTAUTH_SECRET** (Secret)
- **Key**: `NEXTAUTH_SECRET`
- **Value**: `[Generate using command below]`
- **Environments**: Production, Preview, Development

#### **3. NEXTAUTH_URL** (Secret)
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://tilawa-iqra.vercel.app`
- **Environments**: Production, Preview, Development
- **Note**: Replace `tilawa-iqra` if your project has a different name

#### **4. NEXT_PUBLIC_API_URL** (Public - IMPORTANT!)
- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://[YOUR-RAILWAY-BACKEND-URL]`
- **Example**: `https://tilawa-backend-prod-xyz.up.railway.app`
- **Environments**: Production, Preview, Development
- **⚠️ NOTE**: You'll get this from Railway AFTER deploying the backend!

#### **5. NEXT_PUBLIC_BETTER_AUTH_URL** (Public)
- **Key**: `NEXT_PUBLIC_BETTER_AUTH_URL`
- **Value**: `https://tilawa-iqra.vercel.app`
- **Environments**: Production, Preview, Development

---

## 🔐 Generating NEXTAUTH_SECRET

You need a 32+ character random string. Use one of these:

### **On Windows PowerShell:**
```powershell
$bytes = [byte[]]::new(32)
[Security.Cryptography.RNGCryptoServiceProvider]::new().GetBytes($bytes)
[Convert]::ToHexString($bytes).ToLower()
```

### **On Mac/Linux:**
```bash
openssl rand -hex 32
```

**Copy the output and paste it as NEXTAUTH_SECRET value.**

---

## 📝 Variable Entry Example

```
┌─────────────────────────────────────────┐
│ Environment Variable                    │
├─────────────────────────────────────────┤
│ Key: NEXT_PUBLIC_QURAN_API              │
│ Value: https://api.quran.com/api/v4     │
│ Environments: ☑ Production              │
│              ☑ Preview                  │
│              ☑ Development              │
│ [Add Environment Variable]              │
└─────────────────────────────────────────┘
```

---

## ✅ Complete Environment Variables Checklist

| Key | Value | Type | Status |
|-----|-------|------|--------|
| `NEXT_PUBLIC_QURAN_API` | `https://api.quran.com/api/v4` | Public | ⬜ |
| `NEXTAUTH_SECRET` | `[generated secret]` | Secret | ⬜ |
| `NEXTAUTH_URL` | `https://tilawa-iqra.vercel.app` | Secret | ⬜ |
| `NEXT_PUBLIC_API_URL` | `https://[railway-url]` | Public | ⬜ |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | `https://tilawa-iqra.vercel.app` | Public | ⬜ |

---

## 🚀 Step 4: Deploy!

Once all environment variables are added:

1. Click **"Deploy"** button (bottom right)
2. Wait for deployment to complete (~3-5 minutes)
3. See logs in real-time
4. ✅ **Deployment successful!** when you see the checkmark

---

## 📊 Deployment Status

### **Watch the Build**

During deployment, you'll see:
- ✅ `Cloning repository...`
- ✅ `Installing dependencies...`
- ✅ `Running "npm run build --workspace=frontend"`
- ✅ `Creating an optimized production build...`
- ✅ `▲ Next.js compiled successfully`
- ✅ `Deployment complete!`

### **Common Build Messages:**

| Message | Status | Action |
|---------|--------|--------|
| `Cloning repository` | 🔵 In Progress | Wait |
| `Installing dependencies` | 🔵 In Progress | Wait |
| `Next.js compiled successfully` | ✅ Success | Continue |
| `Build error occurred` | ❌ Failed | Check logs, fix error, redeploy |

---

## 🔍 After Deployment

### **View Your Live Site**

1. Go to: https://vercel.com/dashboard
2. Click your `tilawa-iqra` project
3. See the **Deployments** tab
4. Latest deployment shows status: ✅ **Ready**
5. Click project name or **Visit** button to open site

### **Your Live URLs**

- **Production**: `https://tilawa-iqra.vercel.app`
- **Environment Domains**: Vercel auto-generates preview URLs for each git branch

---

## ✨ Testing Your Deployment

### **1. Open Your Site**
```
https://tilawa-iqra.vercel.app
```

### **2. Check Console for Errors**
- Open DevTools: `F12`
- Go to **Console** tab
- Look for red errors (should be minimal)

### **3. Test API Connection**
- Open **Network** tab in DevTools
- Try any feature (e.g., click a button, load data)
- Watch network requests
- Verify requests go to your Railway backend

### **4. Test Health Check**
```bash
curl https://[your-railway-url]/health
# Should return: { "status": "ok", "database": "connected", ... }
```

---

## 🐛 Troubleshooting

### **Build Error: "Cannot find module"**

**Solution:**
1. Check `package.json` has all dependencies
2. Verify `vercel.json` has correct build command
3. Go back to GitHub, pull latest changes:
   ```bash
   git pull origin main
   ```
4. Redeploy: Click **"Redeploy"** in Vercel Dashboard

---

### **Site Loads but API Calls Fail**

**Error:** `Failed to fetch from API` or CORS error

**Solution:**
1. Check `NEXT_PUBLIC_API_URL` is set correctly
2. Verify Railway backend is running: `GET /health`
3. Check Railway backend has correct `FRONTEND_URL` env var
4. Verify `NEXTAUTH_URL` matches your Vercel domain

**Debug:**
- Open DevTools → Network tab
- Try a feature that makes an API call
- Check the request URL (should go to Railway, not localhost)
- Check response headers for CORS issues

---

### **Cannot Connect to MongoDB**

**Error:** Backend returning database errors

**Solution:**
1. Go to Railway Dashboard
2. Check backend is running (status = "Running")
3. Check environment variables are set correctly
4. Verify MONGODB_URI is correct
5. Check MongoDB Atlas IP whitelist includes Railway

---

### **CORS Errors**

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Backend at Railway must have CORS enabled
2. Check `FRONTEND_URL` environment variable matches Vercel domain exactly
3. Restart backend on Railway: Click "Redeploy"

---

## 📈 Monitoring & Logs

### **View Deployment Logs**

1. Go to Vercel Dashboard → Your project
2. Click **"Deployments"**
3. Click latest deployment
4. See **Build Log** and **Runtime Logs**

### **Real-time Monitoring**

1. Go to **"Functions"** tab
2. See function execution times and errors

---

## 🔄 Redeploying

### **Redeploy Latest Code**

1. Push changes to GitHub:
   ```bash
   git push origin main
   ```
2. Vercel auto-detects and redeploys (usually within 30 seconds)
3. Check status in Vercel Dashboard

### **Manual Redeploy**

1. Go to Vercel Dashboard → Your project
2. Click **"Deployments"**
3. Find latest deployment
4. Click **⋮ menu** → **"Redeploy"**

### **Rebuild with Fresh Dependencies**

1. Vercel Dashboard → Settings → **Git**
2. Click **"Clear Git Cache"**
3. Go to **Deployments** → Click "Redeploy"

---

## 📋 Deployment Checklist

Before going live:

- [ ] Backend deployed to Railway
- [ ] Railway backend URL obtained
- [ ] All 5 environment variables added to Vercel
- [ ] NEXT_PUBLIC_API_URL points to Railway backend
- [ ] NEXTAUTH_SECRET generated and set
- [ ] NEXTAUTH_URL matches Vercel domain
- [ ] Deployment completed successfully (status = Ready)
- [ ] Site loads without errors
- [ ] API calls work (check Network tab)
- [ ] Health check responds from backend
- [ ] Can access bookmarks/language settings

---

## 🎉 Success Indicators

✅ **Everything is working if:**

1. Site loads at `https://tilawa-iqra.vercel.app`
2. No console errors
3. API requests go to Railway URL
4. Backend health check responds
5. Features like bookmarks, languages work
6. No CORS errors
7. No 500 server errors

---

## 🆘 Support

If something goes wrong:

1. **Check Vercel Logs**: Deployment → Build Log
2. **Check Railway Logs**: Project → Logs
3. **Check Browser Console**: F12 → Console tab
4. **Check Network Requests**: F12 → Network tab
5. **Verify Environment Variables**: All 5 set correctly
6. **Test Health Check**: `curl [railway-url]/health`

---

## 📚 Related Guides

- **Backend Deployment**: See `BACKEND_DEPLOYMENT_GUIDE.md`
- **Environment Setup**: See `.env.example` files
- **MongoDB Setup**: See `MONGODB_SETUP.md` in backend folder
- **Overall Architecture**: See `ARCHITECTURE.md`

---

**Status**: ✅ **Complete**
**Last Updated**: September 24, 2026
**Next Step**: Deploy backend to Railway, then frontend to Vercel
