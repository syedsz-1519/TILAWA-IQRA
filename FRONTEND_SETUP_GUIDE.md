# TILAWA Frontend Setup & Configuration Guide

Complete guide to setting up and configuring the Next.js frontend for TILAWA.

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
pnpm install
```

Or using npm:
```bash
npm install
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.local.example .env.local

# Edit with your settings
# nano .env.local  (or use your editor)
```

### 3. Start Development Server

```bash
pnpm dev
```

Visit http://localhost:3000

## Environment Configuration

### Local Development (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

**To create .env.local:**

```bash
cp .env.local.example .env.local
```

Edit with your values:
```env
# Backend API (FastAPI)
NEXT_PUBLIC_API_URL=http://localhost:8000

# Authentication
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Optional: Database for development
DATABASE_URL=postgresql://user:password@localhost:5432/tilawa_dev
```

### Production Configuration (Vercel)

Set these in Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_API_URL=https://api.tilawa.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://tilawa.app
DATABASE_URL=<your-production-db>
BETTER_AUTH_SECRET=<random-secret>
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=<your-analytics>
```

## Environment Variables Reference

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:8000` | Backend API endpoint |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Yes | `http://localhost:3000` | Auth service URL |
| `NEXT_PUBLIC_QURAN_API_BASE` | No | jsDelivr CDN | Quran text API |
| `NEXT_PUBLIC_ALQURAN_CLOUD_API` | No | alquran.cloud | Translation API |
| `NEXT_PUBLIC_ENABLE_BATTLES` | No | `true` | Enable battle features |
| `NEXT_PUBLIC_ENABLE_ML_SCORING` | No | `false` | Enable Tajweed scoring |
| `DATABASE_URL` | Only prod | — | Database connection |
| `BETTER_AUTH_SECRET` | Only prod | — | Auth encryption key |

## Development Setup

### Prerequisites

- Node.js 18+ (Check: `node --version`)
- pnpm 8+ (Install: `npm install -g pnpm`)
- Backend API running on `http://localhost:8000`

### Installation Steps

1. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Start dev server:**
   ```bash
   pnpm dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Verify Installation

Check that all features are working:

- **Home page:** http://localhost:3000
- **Read Quran:** http://localhost:3000/read
- **Dashboard:** http://localhost:3000/dashboard
- **Sign In:** http://localhost:3000/sign-in

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── read/
│   │   ├── page.tsx             # Surah browser
│   │   └── [surah]/page.tsx      # Individual surah reader
│   ├── dashboard/page.tsx        # Main dashboard
│   ├── sign-in/page.tsx          # Login page
│   ├── sign-up/page.tsx          # Registration page
│   ├── battles/page.tsx          # Battle system
│   ├── hifz/page.tsx             # Memorization tracker
│   ├── tajweed/page.tsx          # Tajweed lessons
│   ├── settings/page.tsx         # User settings
│   └── [other-pages]/            # Additional pages
├── components/
│   ├── app-shell.tsx             # Main layout wrapper
│   ├── quran-reader.tsx          # Surah reader component
│   ├── site-header.tsx           # Header navigation
│   ├── player/                   # Audio player components
│   └── [other-components]/       # UI components
├── lib/
│   ├── auth.ts                   # Authentication setup
│   ├── auth-client.ts            # Client-side auth
│   ├── db.ts                     # Database connection
│   ├── quran-languages.ts        # Language definitions
│   ├── navigation.ts             # Navigation config
│   └── [utilities]/              # Helper functions
├── public/
│   ├── images/                   # Static images
│   └── [assets]/                 # Other assets
├── package.json                  # Dependencies
├── next.config.mjs              # Next.js config
├── tsconfig.json                # TypeScript config
├── .env.local.example           # Environment template
└── .env.production.example      # Production template
```

## Available Scripts

```bash
# Development server (with hot reload)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting (code quality checks)
pnpm lint

# Type checking
pnpm typecheck

# Format code (Prettier)
pnpm format

# Run tests (if configured)
pnpm test
```

## Common Tasks

### Adding a New Page

1. Create file: `app/new-page/page.tsx`
2. Add route to navigation: `lib/navigation.ts`
3. Start dev server (it reloads automatically)

### Adding Environment Variables

1. Add to `.env.local` for development
2. Add to Vercel dashboard for production
3. Use with `process.env.NEXT_PUBLIC_*` (client) or `process.env.VARIABLE_NAME` (server)

### Connecting to Backend API

```typescript
// Example in server component
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/users/123/streaks`
)
const data = await response.json()
```

### Using Client Components

```typescript
'use client'  // Must be at top for client features

import { useState } from 'react'

export function MyComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

## Troubleshooting

### "Port 3000 is already in use"

**Solution:**
```bash
# Find and kill process
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :3000
kill -9 <PID>
```

### "Cannot find module '@/lib/...'

**Solution:** Path alias not working. Check `tsconfig.json`:
```json
"paths": {
  "@/*": ["./*"]
}
```

### "NEXT_PUBLIC_API_URL is undefined"

**Solution:** Environment variable not loaded. Make sure:
1. `.env.local` exists (not `.env`)
2. Variable name starts with `NEXT_PUBLIC_`
3. Restart dev server after creating `.env.local`

### "Backend API connection refused"

**Solution:** Backend not running
```bash
# In another terminal
cd backend
.\start.ps1  # Windows
# or
bash start.sh  # Linux/Mac
```

### "TypeScript errors in build"

**Solution:** Fix type errors or disable checking (not recommended):
```json
// next.config.mjs - NOT RECOMMENDED
typescript: {
  ignoreBuildErrors: true,  // ⚠️ Only for debugging
}
```

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Frontend setup complete"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub
4. Select repository
5. Configure build settings:
   - Framework: Next.js
   - Root Directory: `frontend`

### Step 3: Set Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_API_URL=https://api.tilawa.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://tilawa.app
DATABASE_URL=<your-production-db>
BETTER_AUTH_SECRET=<random-secret>
```

### Step 4: Deploy

Click "Deploy" and wait for build to complete.

## Performance Optimization

### Enable Image Optimization

Already configured in `next.config.mjs`:
```javascript
images: {
  unoptimized: false,  // Enable Next.js Image optimization
}
```

### Enable Caching

```javascript
// In API routes
response.headers.set('Cache-Control', 'public, max-age=3600')
```

## Security Best Practices

1. **Never commit `.env.local`** — Add to `.gitignore` ✅
2. **Use `NEXT_PUBLIC_` prefix** only for public variables
3. **Keep secrets in environment variables** only
4. **Enable HTTPS** in production
5. **Validate user input** on both client and server

## Next Steps

1. ✅ Dependencies installed
2. ✅ Environment configured
3. ⬜ Test Quran reading functionality
4. ⬜ Test authentication
5. ⬜ Test dashboard features
6. ⬜ Test language dropdowns
7. ⬜ Deploy to Vercel

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Vercel Docs](https://vercel.com/docs)

## Support

For issues:
1. Check console errors: `F12` → Console
2. Check logs: Dev server output
3. Verify `.env.local` exists and has correct values
4. Ensure backend is running
5. Check API connectivity: http://localhost:8000/api/health
