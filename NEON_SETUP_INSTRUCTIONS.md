# 🗄️ Create Neon PostgreSQL Database (5 minutes)

## Step 1: Sign Up to Neon
1. Go to: https://neon.tech
2. Click "Sign up"
3. Use GitHub account (easiest)
4. Authorize Neon

## Step 2: Create Project
1. Click "Create a new project"
2. Name: `tilawa`
3. Region: Choose closest to you
4. Click "Create project"

## Step 3: Get Connection String
1. In dashboard, you'll see your project
2. Click on "Connection string" tab
3. Copy the connection string that looks like:
```
postgresql://username:password@host.neon.tech:5432/database?sslmode=require
```

## Step 4: Save Connection String
You'll use this in the next step. Keep it safe!

---

## ✅ Once You Have the Connection String

Come back and tell me the connection string, and I'll:
1. Update backend/.env
2. Create vercel.json
3. Deploy everything to Vercel + Railway

This takes ~5 minutes to set up, then deployment is automatic!
