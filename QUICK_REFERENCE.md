# TILAWA - Quick Reference Guide

## 🚀 Quick Start

### Setup All Services
```bash
# Terminal 1: Backend
cd apps/backend/server
npm install
npm run dev

# Terminal 2: Frontend
cd apps/web/frontend
npm install
npm run dev

# Terminal 3: Mobile
cd apps/mobile/tilawa
flutter pub get
flutter run
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api-docs

---

## 📁 Project Structure Quick Navigation

```
Main Files:
├── README.md                    # Project overview
├── CONTRIBUTING.md              # Contribution guide
├── PROJECT_SUMMARY.md           # Complete summary
├── .gitignore                   # Git ignore rules
└── vercel.json                  # Vercel config

Apps:
├── apps/web/frontend/           # Next.js web app
├── apps/mobile/tilawa/          # Flutter app
└── apps/backend/server/         # Express.js API

Docs:
├── docs/architecture/           # System design
├── docs/deployment/             # Production guides
└── docs/guides/                 # User guides

Infrastructure:
└── infrastructure/docker/       # Docker setup
```

---

## 🛠️ Common Commands

### Backend
```bash
cd apps/backend/server

npm run dev              # Development server
npm run build           # Build for production
npm run start           # Run production build
npm test                # Run tests
npm run lint            # Lint code
npm run migrate:dev     # Run database migrations
npm run seed:dev        # Seed sample data
```

### Frontend
```bash
cd apps/web/frontend

npm run dev             # Development server
npm run build           # Build for production
npm run start           # Run production build
npm test                # Run tests
npm run lint            # Lint code
npm run format          # Format code
```

### Mobile
```bash
cd apps/mobile/tilawa

flutter pub get         # Get dependencies
flutter run             # Run app
flutter build apk       # Build Android APK
flutter build ios       # Build iOS app
flutter test            # Run tests
dart analyze lib/       # Analyze code
dart format lib/        # Format code
```

---

## 🔐 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=8000
DATABASE_URL=mongodb://localhost:27017/tilawa_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Mobile (.env)
```
APP_ENV=development
API_URL_DEV=http://localhost:8000
```

---

## 📊 API Endpoints Quick Reference

### Authentication
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
POST   /api/auth/logout            # Logout user
POST   /api/auth/refresh           # Refresh token
```

### Quran
```
GET    /api/quran/surahs           # Get all surahs
GET    /api/quran/surahs/:number   # Get specific surah
GET    /api/quran/search           # Search ayahs
GET    /api/quran/reciters         # Get reciters
GET    /api/quran/audio/:surah     # Get audio file
```

### User
```
GET    /api/users/me               # Get current user
PUT    /api/users/me               # Update profile
GET    /api/users/progress         # Get progress
POST   /api/users/bookmarks        # Bookmark ayah
```

---

## 🧪 Testing

### Run All Tests
```bash
# Backend
cd apps/backend/server
npm test

# Frontend
cd apps/web/frontend
npm test

# Mobile
cd apps/mobile/tilawa
flutter test
```

### Run Specific Tests
```bash
# Backend (single file)
npm test -- auth.test.ts

# Frontend (watch mode)
npm test -- --watch

# Mobile (verbose)
flutter test -v
```

---

## 🚢 Deployment

### Deploy to Vercel (Frontend)
```bash
vercel deploy --prod
```

### Deploy to Railway (Backend)
```bash
# Automatic on push to main
git push origin main
```

### Deploy Mobile to App Store
```bash
cd apps/mobile/tilawa
flutter build ios --release
# Then use Xcode to submit
```

### Deploy Mobile to Play Store
```bash
cd apps/mobile/tilawa
flutter build appbundle --release
# Then upload to Play Console
```

---

## 🐛 Debugging

### Backend Debug Logs
```bash
# Enable debug logging
DEBUG=tilawa:* npm run dev

# View logs
npm run logs
```

### Frontend Debug
```bash
# Chrome DevTools
# Browser console for errors
# Network tab for API calls
```

### Mobile Debug
```bash
# Flutter inspector
flutter run -d chrome

# Device logs
flutter logs

# Verbose mode
flutter run -v
```

---

## 📱 Platform-Specific Setup

### iOS
```bash
cd apps/mobile/tilawa/ios
pod deintegrate
pod install
cd ..
open ios/Runner.xcworkspace
```

### Android
```bash
cd apps/mobile/tilawa
./gradlew clean
./gradlew build
```

---

## 🔍 Finding Things

### Search Code
```bash
# Find function definition
grep -r "function_name" apps/

# Search in specific file type
grep -r "pattern" --include="*.ts"

# Using ripgrep (faster)
rg "pattern" --type ts
```

### Find Documentation
```
Architecture    → docs/architecture/ARCHITECTURE.md
Deployment      → docs/deployment/DEPLOYMENT.md
Mobile Guide    → apps/mobile/tilawa/README.md
API Docs        → docs/api/API.md
Contributing    → CONTRIBUTING.md
```

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Failed
```bash
# Check MongoDB is running
mongosh

# Check Redis is running
redis-cli ping
```

### Dependencies Issue
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
```bash
# Clean and rebuild
flutter clean
flutter pub get
flutter run

# Or for other apps
npm run clean
npm run build
```

---

## 📞 Common Contact Points

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions  
- **Email**: support@tilawa.app
- **Security**: security@tilawa.app

---

## 🎯 Key Commands by Role

### Frontend Developer
```bash
npm run dev         # Start dev server
npm test            # Run tests
npm run format      # Format code
npm run build       # Build production
```

### Backend Developer
```bash
npm run dev         # Start dev server
npm test            # Run tests
npm run migrate     # Run migrations
npm run seed        # Seed data
```

### Mobile Developer
```bash
flutter run         # Run app
flutter test        # Run tests
dart format lib/    # Format code
flutter build apk   # Build release
```

### DevOps Engineer
```bash
docker-compose up           # Start all services
vercel deploy               # Deploy frontend
railway trigger              # Deploy backend
kubectl apply -f deploy/    # Deploy to K8s
```

---

## 📈 Performance Monitoring

### Frontend Metrics
```
Lighthouse: lighthouse-batch apps/web/frontend
PageSpeed: https://pagespeed.web.dev
```

### Backend Metrics
```
API Monitoring: http://localhost:8000/health
Database: MongoDB Atlas Dashboard
Logs: Railway Dashboard
```

---

## 🔄 Version Management

### Semantic Versioning
```
Current: 1.0.0
Format: MAJOR.MINOR.PATCH+BUILD

Examples:
1.0.0   - Initial release
1.1.0   - New features (backward compatible)
1.0.1   - Bug fix (no new features)
```

### Tagging
```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## 📚 Documentation Links

- **GitHub**: https://github.com/tilawa/tilawa
- **Website**: https://tilawa.app
- **API Docs**: https://api.tilawa.app/docs
- **Architecture**: /docs/architecture/ARCHITECTURE.md

---

## ⚡ Performance Tips

### Frontend
- Use React DevTools for profiling
- Check Lighthouse in DevTools
- Monitor bundle size: `npm run analyze`

### Backend
- Monitor API response time
- Check database query performance
- Use Redis for caching

### Mobile
- Use Flutter DevTools for profiling
- Monitor memory usage
- Check frame rate (60 FPS target)

---

**Last Updated**: September 2024  
**For Full Documentation**: See README.md and PROJECT_SUMMARY.md
