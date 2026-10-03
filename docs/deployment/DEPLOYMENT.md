# TILAWA Deployment Guide

## Production Overview

| Service | Hosting Platform | URL | Configuration |
|---|---|---|---|
| **Web Frontend** | Vercel | https://tilawaa.vercel.app | `apps/web/frontend` with Root `./` or direct subdirectory |
| **API Server** | Railway | https://api.tilawa.app | `apps/backend/server` with Node 20+ runtime |
| **Database** | MongoDB Atlas | Cluster: `tilawa-cluster` | MongoDB 7.0+ Replica Set |

---

## 1. Vercel Frontend Deployment

1. Connect the GitHub repository `https://github.com/syedsz-1519/TILAWA-IQRA.git` on Vercel.
2. If Root Directory is `./`, Vercel uses `vercel.json`:
   ```json
   {
     "framework": "nextjs",
     "buildCommand": "npm run build --workspace=apps/web/frontend",
     "outputDirectory": "apps/web/frontend/.next",
     "installCommand": "npm install"
   }
   ```
3. Set Environment Variables in Vercel:
   - `NEXT_PUBLIC_API_URL`: `https://api.tilawa.app` (or Railway API URL)
   - `NEXT_PUBLIC_APP_URL`: `https://tilawaa.vercel.app`
   - `NEXT_PUBLIC_QURAN_API_BASE`: `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions`
   - `NEXT_PUBLIC_ALQURAN_CLOUD_API`: `https://api.alquran.cloud/v1`

---

## 2. Railway Backend Deployment

1. Create a new service from GitHub repo pointing to `apps/backend/server`.
2. Build Command: `npm run build`
3. Start Command: `npm start` (or `node dist/index.js`)
4. Set Environment Variables in Railway:
   - `NODE_ENV`: `production`
   - `PORT`: `8000` (or Railway dynamic `$PORT`)
   - `DATABASE_URL`: `mongodb+srv://<USER>:<PASSWORD>@cluster0.mongodb.net/tilawa_prod?retryWrites=true&w=majority`
   - `JWT_SECRET`: Secure 64-character secret
   - `JWT_REFRESH_SECRET`: Secure 64-character secret
   - `FRONTEND_URL`: `https://tilawaa.vercel.app`
   - `CORS_ORIGINS`: `https://tilawaa.vercel.app,http://localhost:3000`

---

## 3. MongoDB Atlas Database Setup

1. Whitelist Railway outgoing IP / all IPs (`0.0.0.0/0` with strong password authentication).
2. Create dedicated application user with `readWrite` access to `tilawa` database.
3. Compound indexes are auto-managed by Mongoose at startup.
