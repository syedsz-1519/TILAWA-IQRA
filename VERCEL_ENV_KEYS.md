# 🔑 Vercel Environment Variables - Copy & Paste Ready

## ✅ All Keys You Need for Vercel Deployment

### **Step 1: Copy Each Key Below**
### **Step 2: Add to Vercel Dashboard**
### **Step 3: Deploy!**

---

## 📋 Environment Variables

### **1. NEXT_PUBLIC_QURAN_API**
```
NEXT_PUBLIC_QURAN_API=https://api.quran.com/api/v4
```
**What it does:** API endpoint for Quran data  
**Type:** Public (client-side)  
**Required:** ✅ Yes

---

### **2. NEXTAUTH_URL**
```
NEXTAUTH_URL=https://tilawa-iqra.vercel.app
```
**What it does:** Authentication redirect URL  
**Type:** Server-side  
**Required:** ✅ Yes  
**Note:** Update `tilawa-iqra.vercel.app` with your actual domain if different

---

### **3. NEXTAUTH_SECRET** ⚠️ IMPORTANT
```
NEXTAUTH_SECRET=#20qnv4KjXaShaGEujV8QQR63MDeEJwn@E%xWiBTSJ%O8ss0u1CObDXUf00wpyaU
```
**What it does:** Encryption key for auth sessions  
**Type:** Server-side  
**Required:** ✅ Yes  
**Security:** 🔒 Keep this SECRET! Don't share with anyone!  
**Generate new:** Use online tool: https://generate-secret.vercel.app/32

---

### **4. NEXT_PUBLIC_API_URL**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
**What it does:** Backend API endpoint  
**Type:** Public (client-side)  
**Required:** ✅ Yes  
**Options:**
- Local development: `http://localhost:8000`
- Production backend: `https://your-backend-domain.com`

---

### **5. MONGODB_URI**
```
MONGODB_URI=mongodb+srv://syedshahnawaz_db:wzf1BGHGqvI4PrYR@cluster0.wxno2ll.mongodb.net/tilawa?retryWrites=true&w=majority
```
**What it does:** MongoDB database connection  
**Type:** Server-side  
**Required:** ✅ Yes  
**Database:** TILAWA on MongoDB Atlas  
**Collections:** users, products, bookmarks, reading_progress, streaks, etc.

---

### **6. NODE_ENV** (Optional)
```
NODE_ENV=production
```
**What it does:** Environment mode  
**Type:** Server-side  
**Required:** ❌ No (Vercel sets automatically)  
**Values:** `production`, `development`

---

## 🚀 How to Add in Vercel

### **Method 1: Vercel UI (Easiest)**

1. Go to: https://vercel.com/dashboard
2. Select your project: `tilawa-iqra`
3. Settings → Environment Variables
4. Click "Add New"
5. Fill in:
   - **Name:** `NEXT_PUBLIC_QURAN_API`
   - **Value:** `https://api.quran.com/api/v4`
   - **Select Environment:** Production, Preview, Development
6. Click "Save"
7. **Repeat for all variables above**

### **Method 2: Vercel CLI**

```bash
# Login to Vercel
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_QURAN_API
# Paste: https://api.quran.com/api/v4

vercel env add NEXTAUTH_URL
# Paste: https://tilawa-iqra.vercel.app

# ... repeat for all variables
```

---

## 📊 Variable Summary Table

| Variable | Type | Value | Required |
|----------|------|-------|----------|
| `NEXT_PUBLIC_QURAN_API` | Public | `https://api.quran.com/api/v4` | ✅ Yes |
| `NEXTAUTH_URL` | Secret | `https://tilawa-iqra.vercel.app` | ✅ Yes |
| `NEXTAUTH_SECRET` | Secret | `#20qnv4KjXaShaGEujV8QQR63MDeEJwn@E%xWiBTSJ%O8ss0u1CObDXUf00wpyaU` | ✅ Yes |
| `NEXT_PUBLIC_API_URL` | Public | `http://localhost:8000` | ✅ Yes |
| `MONGODB_URI` | Secret | `mongodb+srv://...` | ✅ Yes |
| `NODE_ENV` | Secret | `production` | ❌ No |

---

## ⚠️ Security Checklist

- [ ] NEXTAUTH_SECRET is unique and random
- [ ] MONGODB_URI password is correct
- [ ] NEXTAUTH_URL matches your domain
- [ ] NEXT_PUBLIC_API_URL is correct backend URL
- [ ] All variables added to Vercel (not in .env files)
- [ ] .env files are in .gitignore
- [ ] Never commit sensitive keys to GitHub

---

## 🔄 Steps to Deploy

### **1. Prepare Vercel**
- Go to https://vercel.com/new
- Connect GitHub: `syedsz-1519/TILAWA-IQRA`
- Select framework: **Next.js**
- Root directory: `./` or `apps/web/frontend`

### **2. Add Environment Variables**
- Use table above
- Add all 6 variables to Vercel Dashboard

### **3. Deploy**
- Click "Deploy"
- Wait for build to complete
- Visit: https://tilawa-iqra.vercel.app

### **4. Verify**
- ✅ Website loads
- ✅ API calls work
- ✅ No 500 errors

---

## 🆘 Troubleshooting

### **Build fails with "Module not found"**
- Check `vercel.json` settings
- Ensure root directory is correct
- Run `npm run build` locally first

### **API calls returning 404**
- Update `NEXT_PUBLIC_API_URL` to correct backend
- Check backend is running
- Verify CORS settings

### **Authentication not working**
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches domain
- Restart deployment after adding env vars

### **Database connection failing**
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas whitelist (allow all IPs: 0.0.0.0/0)
- Test locally first: `npm run dev`

---

## 📱 Project Structure Reminder

```
TILAWA-IQRA/
├── apps/
│   ├── web/frontend/        ← DEPLOYED TO VERCEL
│   ├── backend/server/      ← DEPLOY SEPARATELY
│   └── mobile/              ← Flutter App
├── vercel.json              ← Vercel config
├── package.json             ← Workspace root
└── VERCEL_ENV_KEYS.md       ← This file
```

---

## ✅ Ready to Deploy!

You have all the keys you need. Just:

1. **Go to Vercel:** https://vercel.com/new
2. **Connect GitHub:** syedsz-1519/TILAWA-IQRA
3. **Add these environment variables** (from above)
4. **Click Deploy**
5. **Done!** 🎉

**Your Live URL:** https://tilawa-iqra.vercel.app

---

**Date Generated:** September 21, 2026  
**Status:** ✅ Ready for Deployment  
**Next Step:** Add variables to Vercel and deploy!
