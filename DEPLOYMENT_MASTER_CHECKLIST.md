# TILAWA Complete Deployment - Master Checklist

## 🎯 Master Checklist - Follow This Order

### **Phase 1: Preparation (Day 1)**

- [ ] Read all deployment guides:
  - [ ] `BACKEND_DEPLOYMENT_GUIDE.md`
  - [ ] `VERCEL_COMPLETE_SETUP.md`
  - [ ] `ENVIRONMENT_VARIABLES_GUIDE.md`
  - [ ] `DEPLOYMENT_TESTING_GUIDE.md`

- [ ] Prepare accounts:
  - [ ] GitHub account with access to syedsz-1519/TILAWA-IQRA
  - [ ] Vercel account (free tier is fine)
  - [ ] Railway account (free tier is fine)
  - [ ] MongoDB Atlas account (already set up)

- [ ] Generate secrets:
  - [ ] Run NEXTAUTH_SECRET generator
  - [ ] Copy output to safe location
  - [ ] Verify it's 32+ characters

- [ ] Verify code:
  - [ ] All changes committed to GitHub (branch: `main`)
  - [ ] No uncommitted changes locally
  - [ ] Latest commit is `e5037f2` or newer

---

### **Phase 2: Backend Deployment (Railway) - 15 minutes**

- [ ] **Create Railway Account**
  - [ ] Go to https://railway.app
  - [ ] Sign up (use GitHub for easier integration)

- [ ] **Create Railway Project**
  - [ ] Click "New Project"
  - [ ] Select "GitHub"
  - [ ] Authorize Railway with GitHub
  - [ ] Select repository: `syedsz-1519/TILAWA-IQRA`
  - [ ] Auto-detects Node.js backend

- [ ] **Add Environment Variables to Railway**
  - [ ] Go to Variables tab
  - [ ] Add each variable (6 total):
    - [ ] `MONGODB_URI` = `mongodb+srv://syedshahnawaz_db:wzf1BGHGqvI4PrYR@cluster0.wxno2ll.mongodb.net/tilawa?retryWrites=true&w=majority`
    - [ ] `BETTER_AUTH_SECRET` = [your generated secret]
    - [ ] `NODE_ENV` = `production`
    - [ ] `PORT` = `8000`
    - [ ] `FRONTEND_URL` = `https://tilawa-iqra.vercel.app`
    - [ ] `LOG_LEVEL` = `info`

- [ ] **Deploy Backend**
  - [ ] Click "Deploy" button
  - [ ] Wait for build to complete (3-5 minutes)
  - [ ] Status changes to "Running" (green)
  - [ ] Copy Railway URL (e.g., `https://tilawa-backend-prod-xyz.up.railway.app`)

- [ ] **Test Backend**
  - [ ] Open Railway URL in browser
  - [ ] Add `/health` to end of URL
  - [ ] Should see JSON response with `"status": "ok"`
  - [ ] Check `"database": "connected"`

---

### **Phase 3: Frontend Deployment (Vercel) - 15 minutes**

- [ ] **Create Vercel Project**
  - [ ] Go to https://vercel.com/new
  - [ ] Click "Import Git Repository"
  - [ ] Paste: `https://github.com/syedsz-1519/TILAWA-IQRA`
  - [ ] Click "Continue"

- [ ] **Configure Project**
  - [ ] Framework: Next.js ✓
  - [ ] Build Command: `npm run build --workspace=frontend` ✓
  - [ ] Output Directory: `frontend/.next` ✓
  - [ ] Install Command: `npm install` ✓
  - [ ] Root Directory: `./` ✓

- [ ] **Add Environment Variables to Vercel**
  - [ ] Still on import page
  - [ ] Add each variable (5 total):
    - [ ] `NEXT_PUBLIC_QURAN_API` = `https://api.quran.com/api/v4`
    - [ ] `NEXTAUTH_SECRET` = [your generated secret - MUST MATCH BACKEND]
    - [ ] `NEXTAUTH_URL` = `https://tilawa-iqra.vercel.app`
    - [ ] `NEXT_PUBLIC_API_URL` = [your Railway URL from Phase 2]
    - [ ] `NEXT_PUBLIC_BETTER_AUTH_URL` = `https://tilawa-iqra.vercel.app`
  - [ ] For each: Select "Production + Preview + Development"

- [ ] **Deploy Frontend**
  - [ ] Click "Deploy" button
  - [ ] Wait for build to complete (3-5 minutes)
  - [ ] Status changes to "Ready" (green checkmark)
  - [ ] Copy Vercel URL: `https://tilawa-iqra.vercel.app`

---

### **Phase 4: Verification - 10 minutes**

- [ ] **Test Frontend Loads**
  - [ ] Open `https://tilawa-iqra.vercel.app`
  - [ ] Wait for page to load (5-10 seconds cold start is normal)
  - [ ] Page displays correctly
  - [ ] No console errors (F12 → Console tab)

- [ ] **Test Backend Health**
  - [ ] Open `https://[railway-url]/health`
  - [ ] See JSON: `{ "status": "ok", "database": "connected" }`

- [ ] **Test Frontend-to-Backend Communication**
  - [ ] Open frontend in browser
  - [ ] Open DevTools: `F12`
  - [ ] Go to Network tab
  - [ ] Navigate to a feature (e.g., Languages)
  - [ ] Should see API request to Railway URL
  - [ ] Status should be `200 OK`
  - [ ] No CORS errors in Console

- [ ] **Test Database Connection**
  - [ ] Go to Railway Dashboard
  - [ ] Select backend service
  - [ ] Check Logs tab
  - [ ] Should see: `✅ Successfully connected to MongoDB`
  - [ ] Should see database name: `tilawa`

---

### **Phase 5: Final Checks - 5 minutes**

- [ ] **Security Verification**
  - [ ] NEXTAUTH_SECRET is 32+ characters ✓
  - [ ] NEXTAUTH_SECRET is SAME on both services ✓
  - [ ] Environment variables are NOT in .env files ✓
  - [ ] .env files are in .gitignore ✓
  - [ ] No secrets in git history ✓

- [ ] **URL Verification**
  - [ ] NEXTAUTH_URL matches Vercel domain ✓
  - [ ] FRONTEND_URL on Railway matches Vercel domain ✓
  - [ ] NEXT_PUBLIC_API_URL matches Railway URL ✓
  - [ ] No mismatches or typos ✓

- [ ] **Feature Testing**
  - [ ] Homepage loads ✓
  - [ ] Navigation works ✓
  - [ ] Try a feature that loads data ✓
  - [ ] Data loads successfully ✓
  - [ ] No errors in console ✓

---

## 📋 Issue Resolution

### **If Frontend Build Fails**

1. Check Vercel build logs: Deployments → Build Log
2. Common issues:
   - [ ] vercel.json has wrong path (should be `frontend/.next`)
   - [ ] Build command is wrong (should be `npm run build --workspace=frontend`)
   - [ ] Missing environment variables
3. Fix and redeploy

### **If Backend Won't Deploy**

1. Check Railway logs
2. Common issues:
   - [ ] MONGODB_URI is incorrect
   - [ ] Node.js not detected (add `"type": "module"` to package.json)
   - [ ] Dependencies not installing
3. Fix and redeploy

### **If Frontend Can't Reach Backend**

1. Check NEXT_PUBLIC_API_URL in Vercel (must be Railway URL)
2. Check Railway backend is running (status = "Running")
3. Check backend logs for errors
4. Redeploy frontend after fixing

### **If CORS Error**

1. Check FRONTEND_URL on Railway (must match Vercel domain exactly)
2. Verify backend has CORS enabled
3. Restart backend deployment
4. Test again

### **If Database Won't Connect**

1. Check MONGODB_URI is correct
2. Go to MongoDB Atlas → Network Access
3. Add Railway IP (or 0.0.0.0/0)
4. Restart backend deployment

---

## 🎯 Expected Results

### **After Successful Deployment**

✅ Frontend URL works: `https://tilawa-iqra.vercel.app`
✅ Backend URL works: `https://[railroad-url]`
✅ Health check responds: `GET /health` returns `{ "status": "ok" }`
✅ No console errors
✅ API requests work
✅ Database is connected
✅ Features work correctly

### **Timeline**

- **Phase 1 (Preparation)**: 10 minutes
- **Phase 2 (Backend)**: 10-15 minutes
- **Phase 3 (Frontend)**: 10-15 minutes
- **Phase 4 (Verification)**: 5-10 minutes
- **Total**: ~45 minutes

---

## 📞 Quick Support

| Issue | Check |
|-------|-------|
| Build fails | Check build logs (Vercel/Railway) |
| API 404 | Backend route doesn't exist |
| API 500 | Backend error - check logs |
| CORS error | FRONTEND_URL doesn't match |
| Can't reach API | NEXT_PUBLIC_API_URL is wrong |
| Database error | MongoDB connection string wrong |
| Auth fails | NEXTAUTH_SECRET mismatch |

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ Frontend loads without errors
2. ✅ Backend health check works
3. ✅ API requests from frontend reach backend (Network tab)
4. ✅ Database shows as connected
5. ✅ No CORS/auth errors
6. ✅ Features load data correctly
7. ✅ Navigation and buttons work

---

## 🎉 You're Done!

Once all checks pass:

✅ Share URL with team/users
✅ Monitor dashboards regularly
✅ Keep documentation updated
✅ Report any issues

---

## 📚 Documentation Index

- **`BACKEND_DEPLOYMENT_GUIDE.md`** - Backend setup on Railway
- **`VERCEL_COMPLETE_SETUP.md`** - Frontend setup on Vercel
- **`ENVIRONMENT_VARIABLES_GUIDE.md`** - Detailed env var explanations
- **`ENV_VARIABLES_QUICK_REFERENCE.md`** - Quick copy-paste values
- **`DEPLOYMENT_TESTING_GUIDE.md`** - Complete testing procedures
- **`DEPLOYMENT_MASTER_CHECKLIST.md`** - This file

---

**Status**: ✅ Complete & Ready
**Last Updated**: September 24, 2026
**Estimated Time**: 45 minutes
**Difficulty**: Intermediate
