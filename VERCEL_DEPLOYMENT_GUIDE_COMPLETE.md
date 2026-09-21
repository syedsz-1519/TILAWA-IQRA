# ✅ Vercel Deployment Complete Guide - TILAWA

## 🎯 Project Overview

**App Type:** Full-Stack Monorepo  
**Frontend:** Next.js 16 (React 19)  
**Backend:** Express.js + Mongoose + MongoDB  
**Database:** MongoDB Atlas  
**Deployment:** Vercel (Frontend)

---

## 📋 What You Need to Deploy

### Project Structure
```
TILAWA-IQRA/
├── apps/
│   ├── web/frontend/          ← VERCEL DEPLOYS THIS
│   ├── backend/server/        ← Deploy separately (optional)
│   └── mobile/                ← Flutter app
├── frontend/                  ← Symlink to apps/web/frontend
├── package.json               ← Workspace root
└── vercel.json                ← Vercel config
```

---

## 🔑 Step 1: Environment Variables to Add in Vercel

Add these in Vercel Dashboard → Project Settings → Environment Variables:

### **Required Variables**

```
# Quran API
NEXT_PUBLIC_QURAN_API=https://api.quran.com/api/v4

# NextAuth / Better Auth
NEXTAUTH_URL=https://tilawa-iqra.vercel.app
NEXTAUTH_SECRET=your-secret-key-here-min-32-chars

# Backend API
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
# OR for local testing:
NEXT_PUBLIC_API_URL=http://localhost:8000

# Database (MongoDB)
MONGODB_URI=mongodb+srv://syedshahnawaz_db:wzf1BGHGqvI4PrYR@cluster0.wxno2ll.mongodb.net/tilawa?retryWrites=true&w=majority
```

### **Optional Variables**

```
# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Environment
NODE_ENV=production
```

---

## ✅ Step 2: Vercel Configuration

Your `vercel.json` should look like this:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

---

## 📱 Step 3: Deployment Steps

### **Option A: Using Vercel UI (Easiest)**

1. **Go to:** https://vercel.com/new
2. **Select:** "Import Git Repository"
3. **Paste:** `https://github.com/syedsz-1519/TILAWA-IQRA.git`
4. **Select Framework:** Next.js
5. **Configure:**
   - Project Name: `tilawa-iqra`
   - Root Directory: `./` (or select `apps/web/frontend`)
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Add Environment Variables** (from Step 1)
7. **Click:** Deploy

### **Option B: Using Vercel CLI**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod

# 4. Add environment variables when prompted
```

### **Option C: Connect GitHub (Auto-Deploy)**

1. Push code to GitHub
2. Go to Vercel → New Project
3. Connect GitHub
4. Select repo: `syedsz-1519/TILAWA-IQRA`
5. Click Import
6. Add environment variables
7. Deploy

---

## 🎯 Step 4: Complete Vercel Setup Steps

### **During Import:**

**Framework Preset:**
- ✅ Select: `Next.js`

**Root Directory:**
```
./
```
(Vercel will auto-detect)

**Build Command:**
```
npm run build
```

**Output Directory:**
```
.next
```

**Environment Variables:**
Add all variables from Step 1

---

## 🚀 Step 5: After Deployment

### **Verify Deployment:**
1. Go to your Vercel project URL
2. Check that site loads without errors
3. Test API calls working

### **Configure Domain:**
1. Vercel Dashboard → Project Settings → Domains
2. Add your custom domain (if you have one)
3. Or use default: `tilawa-iqra.vercel.app`

### **Update Backend (if needed):**
Update `NEXTAUTH_URL` and `NEXT_PUBLIC_API_URL` if backend is on separate domain

---

## 📊 Complete Environment Variables Checklist

```
□ NEXT_PUBLIC_QURAN_API
□ NEXTAUTH_URL
□ NEXTAUTH_SECRET
□ NEXT_PUBLIC_API_URL
□ MONGODB_URI
□ NODE_ENV=production
```

---

## 🔒 Security Notes

**DO NOT** commit `.env` files to GitHub!

**DO** add to `.gitignore`:
```
.env
.env.local
.env.*.local
```

**DO** use Vercel's Environment Variables section for sensitive data.

---

## 📱 Project Type: What It Is

### **TILAWA-IQRA is:**

1. **Frontend (Next.js):** Web & mobile web app
2. **Backend (Express):** REST API server
3. **Database:** MongoDB Atlas
4. **Mobile App:** Flutter (separate)

### **What Gets Deployed to Vercel:**
- ✅ **Frontend ONLY** (Next.js)
- ✅ Automatically scales
- ✅ CDN included
- ✅ Serverless functions supported

### **What Needs Separate Deployment:**
- Backend (can use Heroku, Railway, Render)
- MongoDB (already hosted on Atlas)
- Mobile app (App Store / Play Store)

---

## 🎨 Frontend Structure

```
apps/web/frontend/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── (auth)/            # Auth pages
│   ├── quran/             # Quran pages
│   ├── hifz/              # Hifz tracking
│   └── streaks/           # Streaks dashboard
├── components/            # React components
├── lib/                   # Utilities & API calls
├── styles/                # Tailwind CSS
├── public/                # Static assets
├── package.json           # Dependencies
├── next.config.js         # Next.js config
├── tailwind.config.js     # Tailwind config
└── tsconfig.json          # TypeScript config
```

---

## 🧪 Testing Before Deploy

```bash
# 1. Build locally
npm run build

# 2. Start production build
npm run start

# 3. Test on http://localhost:3000
```

---

## ⚡ Common Issues & Fixes

### **Issue: "Module not found"**
- ✅ Check `vercel.json` root directory setting
- ✅ Ensure all imports are correct

### **Issue: "Build failed"**
- ✅ Check Environment Variables are set
- ✅ Run `npm run build` locally first
- ✅ Check `package.json` scripts

### **Issue: "API calls failing"**
- ✅ Update `NEXT_PUBLIC_API_URL` to your backend
- ✅ Check CORS settings on backend
- ✅ Verify `MONGODB_URI` is accessible

### **Issue: "Environment variables not working"**
- ✅ Must use `NEXT_PUBLIC_` prefix for client-side
- ✅ Restart deployment after adding variables
- ✅ Check they're in correct environment (Production/Preview)

---

## 📈 Deployment Checklist

- [ ] GitHub repo linked: `syedsz-1519/TILAWA-IQRA`
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Framework set to: `Next.js`
- [ ] Root directory verified
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] All environment variables added
- [ ] Build successful (no errors)
- [ ] Website loads and works
- [ ] API calls functioning
- [ ] Custom domain configured (optional)

---

## 🔗 Deployment Links

**Vercel Dashboard:** https://vercel.com/dashboard  
**Your Project:** https://vercel.com/dashboard/syedsz-1519  
**Live Site:** https://tilawa-iqra.vercel.app

---

## 📞 Need Help?

1. **Vercel Docs:** https://vercel.com/docs
2. **Next.js Docs:** https://nextjs.org/docs
3. **GitHub Issues:** Create issue in your repo
4. **Vercel Support:** vercel.com/support

---

## 🎉 You're Ready to Deploy!

1. ✅ Copy environment variables (from above)
2. ✅ Go to Vercel
3. ✅ Add project
4. ✅ Add environment variables
5. ✅ Click Deploy
6. ✅ Wait for build to complete
7. ✅ Visit your live site!

---

**Status:** ✅ Ready for Vercel Deployment  
**Date:** September 21, 2026  
**Next:** Monitor deployment in Vercel Dashboard
