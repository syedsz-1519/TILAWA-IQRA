# Vercel Environment Variables Setup - Step by Step

## Your Values (Ready to Copy-Paste)

```
BETTER_AUTH_SECRET=8cefc28679539eea9d4518177111dff67ab8cde9256a20491181c1650b20f410
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=https://tilawaiqra.vercel.app
DATABASE_URL=[YOUR_CONNECTION_STRING_FROM_RAILWAY/NEON]
```

---

## Step-by-Step Instructions

### **Step 1: Go to Vercel Dashboard**
1. Open https://vercel.com/dashboard
2. You should see your project list
3. Click on **`tilawaiqra`** project

### **Step 2: Open Project Settings**
1. Click **Settings** (top navigation)
2. In left sidebar, click **Environment Variables**

### **Step 3: Add BETTER_AUTH_SECRET**
1. Click **Add New** button
2. Fill in:
   ```
   Key: BETTER_AUTH_SECRET
   Value: 8cefc28679539eea9d4518177111dff67ab8cde9256a20491181c1650b20f410
   ```
3. Under "Environments", select:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. Click **Save**

### **Step 4: Add NEXT_PUBLIC_API_URL**
1. Click **Add New** button
2. Fill in:
   ```
   Key: NEXT_PUBLIC_API_URL
   Value: http://localhost:8000
   ```
3. Select all environments (Production, Preview, Development)
4. Click **Save**

**Note:** We'll update this to Railway URL after backend deployment

### **Step 5: Add NEXT_PUBLIC_BETTER_AUTH_URL**
1. Click **Add New** button
2. Fill in:
   ```
   Key: NEXT_PUBLIC_BETTER_AUTH_URL
   Value: https://tilawaiqra.vercel.app
   ```
3. Select all environments (Production, Preview, Development)
4. Click **Save**

**Note:** Replace `tilawaiqra` with your actual Vercel project name if different

### **Step 6: Add DATABASE_URL**
1. Click **Add New** button
2. Fill in:
   ```
   Key: DATABASE_URL
   Value: [YOUR_CONNECTION_STRING]
   ```

**Where to get DATABASE_URL:**

#### **Option A: Railway.app** (Recommended)
1. Go to https://railway.app/dashboard
2. Create new project → PostgreSQL
3. Wait for database to start
4. Click on PostgreSQL service
5. Go to **Connect** tab
6. Copy the **Postgres Connection URL**
7. Paste as DATABASE_URL value

#### **Option B: Neon.tech**
1. Go to https://console.neon.tech
2. Create new project
3. Get the connection string from dashboard
4. Paste as DATABASE_URL value

#### **Option C: Render.com**
1. Go to https://render.com
2. Create PostgreSQL database
3. Copy **Internal Database URL** (NOT External)
4. Paste as DATABASE_URL value

3. Select only **Production** environment (for now)
4. Click **Save**

---

## Summary - Your 4 Variables

| Variable | Value | Environment |
|----------|-------|-------------|
| BETTER_AUTH_SECRET | 8cefc28679539eea9d4518177111dff67ab8cde9256a20491181c1650b20f410 | Production, Preview, Development |
| NEXT_PUBLIC_API_URL | http://localhost:8000 | Production, Preview, Development |
| NEXT_PUBLIC_BETTER_AUTH_URL | https://tilawaiqra.vercel.app | Production, Preview, Development |
| DATABASE_URL | [From Railway/Neon/Render] | Production |

---

## After Adding Variables

1. Go back to **Deployments**
2. Find your latest deployment
3. Click the three dots (...)
4. Click **Redeploy**
5. Wait 2-3 minutes for build to complete
6. Check if deployment succeeded

---

## Common Issues

**Issue: Build fails with "DATABASE_URL not set"**
- ✅ Check DATABASE_URL is added and set to Production
- ✅ Make sure connection string is correct (starts with `postgresql://`)
- ✅ Click Redeploy again

**Issue: Build fails with "BETTER_AUTH_SECRET too short"**
- ✅ Check secret is exactly: `8cefc28679539eea9d4518177111dff67ab8cde9256a20491181c1650b20f410`
- ✅ Don't add extra spaces
- ✅ Make sure you copied the full string

**Issue: Deployment succeeds but page shows error**
- ✅ Check all 4 variables are added
- ✅ Check browser console for error messages
- ✅ Check Vercel function logs for detailed error

---

## Next Steps After Variables Are Set

1. **Redeploy frontend** on Vercel
2. **Deploy backend** to Railway.app
3. **Update NEXT_PUBLIC_API_URL** with Railway URL
4. **Test sign-up and features**

Ready? Go to Vercel dashboard and start adding variables!
