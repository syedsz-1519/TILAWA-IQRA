# 🕌 TILAWA - START HERE

**Welcome to TILAWA!** A professional, multilingual Islamic Quranic learning platform.

This document will guide you through the project and help you get started.

---

## 📋 What is TILAWA?

TILAWA is a complete Islamic learning platform providing:
- 📖 Complete Quran with 15+ translations
- 🎵 Audio recitation from multiple reciters
- 📚 Authenticated Hadith collections
- 🤲 Islamic Duas library
- ✨ Memorization (Hifz) system
- 📊 Progress tracking
- 🌐 15+ language support
- 📱 Available on web, iOS, and Android

---

## 🎯 Quick Navigation

### 👤 First Time Here?
1. Read this file (you're here!) ✓
2. Go to **[README.md](README.md)** - Project overview
3. Check **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Common commands

### 👨‍💻 Developer?
1. See **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
2. Review **[docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md)** - System design
3. Follow **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Setup & commands

### 🚀 DevOps/Deployment?
1. Check **[docs/deployment/DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md)** - Production setup
2. Review **[infrastructure/docker/](infrastructure/docker/)** - Container setup
3. See **[docs/deployment/MOBILE_DEPLOYMENT.md](docs/deployment/MOBILE_DEPLOYMENT.md)** - App store

### 📱 Mobile Developer?
1. Go to **[apps/mobile/tilawa/README.md](apps/mobile/tilawa/README.md)** - Flutter guide
2. Check **[docs/deployment/MOBILE_DEPLOYMENT.md](docs/deployment/MOBILE_DEPLOYMENT.md)** - Deployment
3. Review **[CONTRIBUTING.md](CONTRIBUTING.md)** - Code standards

### 📊 Project Manager?
1. Review **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete status
2. Check **[REORGANIZATION_COMPLETE.md](REORGANIZATION_COMPLETE.md)** - What's done
3. See **[docs/](docs/)** - All documentation

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+
- Flutter 3.13.0+
- Git

### Start All Services

```bash
# 1. Clone repository (if needed)
git clone https://github.com/tilawa/tilawa.git
cd TILAWA

# Terminal 1: Backend
cd apps/backend/server
npm install
npm run dev

# Terminal 2: Frontend (new terminal)
cd apps/web/frontend
npm install
npm run dev

# Terminal 3: Mobile (new terminal)
cd apps/mobile/tilawa
flutter pub get
flutter run
```

### Access Points
- 🌐 **Frontend**: http://localhost:3000
- 🔗 **Backend API**: http://localhost:8000
- 📚 **API Docs**: http://localhost:8000/api-docs

---

## 📚 Documentation Guide

### Essential Documents
| Document | Purpose | Audience |
|----------|---------|----------|
| **README.md** | Project overview | Everyone |
| **PROJECT_SUMMARY.md** | Complete project status | Everyone |
| **QUICK_REFERENCE.md** | Common commands | Developers |
| **CONTRIBUTING.md** | How to contribute | Developers |

### Architecture & Design
| Document | Purpose | Audience |
|----------|---------|----------|
| **docs/architecture/ARCHITECTURE.md** | System design | Architects/Developers |
| **docs/deployment/DEPLOYMENT.md** | Production deployment | DevOps/Deployment |
| **docs/deployment/MOBILE_DEPLOYMENT.md** | Mobile deployment | Mobile Developers |

### Development Guides
| Document | Purpose | Audience |
|----------|---------|----------|
| **apps/mobile/tilawa/README.md** | Flutter app guide | Mobile Developers |
| **apps/backend/server/README.md** | Backend guide | Backend Developers |
| **apps/web/frontend/README.md** | Frontend guide | Frontend Developers |

---

## 📁 Project Structure Overview

```
TILAWA/
├── apps/                           # Applications
│   ├── web/frontend/               # Next.js web app (React)
│   ├── mobile/tilawa/              # Flutter mobile app (iOS/Android)
│   └── backend/server/             # Express.js REST API
├── packages/                       # Shared code
│   ├── shared/                     # Utilities & helpers
│   ├── api-client/                 # API client library
│   └── types/                      # TypeScript types
├── infrastructure/                 # DevOps & Infrastructure
│   └── docker/                     # Docker configs
├── docs/                           # Documentation
│   ├── architecture/               # System design
│   ├── deployment/                 # Deployment guides
│   ├── guides/                     # User guides
│   └── api/                        # API documentation
├── tools/                          # Development tools
├── README.md                       # Project overview ⭐
├── PROJECT_SUMMARY.md              # Complete status ⭐
├── QUICK_REFERENCE.md              # Quick commands ⭐
├── CONTRIBUTING.md                 # Contribution guide ⭐
├── .gitignore                      # Git ignore rules
└── vercel.json                     # Vercel deployment config
```

---

## 🛠️ Technology Stack (At a Glance)

### Frontend
- **Framework**: Next.js 16.2.6 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

### Mobile
- **Framework**: Flutter 3.13.0+
- **Language**: Dart 3.0+
- **Platforms**: iOS & Android
- **State**: Riverpod

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **Hosting**: Railway

### Infrastructure
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry & Firebase
- **CDN**: Cloudflare

---

## 📋 Common Tasks

### I want to...

**🔧 Set up for development**
→ See [QUICK_REFERENCE.md - Quick Start](QUICK_REFERENCE.md#-quick-start)

**📖 Understand the architecture**
→ Read [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md)

**👨‍💻 Contribute code**
→ Follow [CONTRIBUTING.md](CONTRIBUTING.md)

**🚀 Deploy to production**
→ See [docs/deployment/DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md)

**📱 Build mobile app**
→ Check [apps/mobile/tilawa/README.md](apps/mobile/tilawa/README.md)

**📚 Submit to App Store**
→ Follow [docs/deployment/MOBILE_DEPLOYMENT.md](docs/deployment/MOBILE_DEPLOYMENT.md)

**🐛 Debug an issue**
→ Check [QUICK_REFERENCE.md - Troubleshooting](QUICK_REFERENCE.md#troubleshooting)

**🔍 Find something in the code**
→ Use [QUICK_REFERENCE.md - Finding Things](QUICK_REFERENCE.md#-finding-things)

**📊 See project status**
→ Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## ✅ Checklist for Getting Started

### For Everyone
- [ ] Clone the repository
- [ ] Read README.md
- [ ] Review QUICK_REFERENCE.md
- [ ] Join the community (Email: support@tilawa.app)

### For Developers
- [ ] Install prerequisites (Node 18+, Flutter 3.13+)
- [ ] Set up development environment
- [ ] Read CONTRIBUTING.md
- [ ] Make your first commit

### For DevOps
- [ ] Review docs/deployment/DEPLOYMENT.md
- [ ] Set up Docker locally
- [ ] Review infrastructure/docker/
- [ ] Configure deployment

### For Team Leads
- [ ] Read PROJECT_SUMMARY.md
- [ ] Review ARCHITECTURE.md
- [ ] Check REORGANIZATION_COMPLETE.md
- [ ] Plan next milestones

---

## 🔗 Important Links

### Repositories
- **GitHub**: https://github.com/tilawa/tilawa
- **Issues**: https://github.com/tilawa/tilawa/issues
- **Discussions**: https://github.com/tilawa/tilawa/discussions

### Live Services
- **Website**: https://tilawa.app
- **API**: https://api.tilawa.app
- **API Docs**: https://api.tilawa.app/api-docs

### Community
- **Email**: support@tilawa.app
- **Twitter**: @tilawaapp
- **Discord**: Coming soon

---

## ❓ Common Questions

**Q: Where do I start?**  
A: Read this file, then README.md, then QUICK_REFERENCE.md

**Q: How do I set up the development environment?**  
A: Follow QUICK_REFERENCE.md "Quick Start" section

**Q: How do I contribute?**  
A: Read CONTRIBUTING.md and make a pull request

**Q: Where's the architecture documentation?**  
A: Check docs/architecture/ARCHITECTURE.md

**Q: How do I deploy?**  
A: See docs/deployment/DEPLOYMENT.md

**Q: How do I submit to App Store/Play Store?**  
A: Follow docs/deployment/MOBILE_DEPLOYMENT.md

**Q: Where's the API documentation?**  
A: Check docs/api/API.md or http://localhost:8000/api-docs

**Q: I found a bug. What do I do?**  
A: Create an issue on GitHub with details

**Q: I want to add a feature. How?**  
A: Fork, create branch, code, submit PR (see CONTRIBUTING.md)

---

## 🚀 Next Steps

1. **Choose your role**:
   - Frontend Developer → Go to [apps/web/frontend/README.md](apps/web/frontend/README.md)
   - Backend Developer → Go to [apps/backend/server/README.md](apps/backend/server/README.md)
   - Mobile Developer → Go to [apps/mobile/tilawa/README.md](apps/mobile/tilawa/README.md)
   - DevOps Engineer → Go to [docs/deployment/DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md)

2. **Set up your environment**:
   - Follow the setup guide for your role
   - Install dependencies
   - Run the services

3. **Make your first contribution**:
   - Pick a task
   - Create a feature branch
   - Make changes
   - Submit a pull request

4. **Stay updated**:
   - Watch the repository
   - Join discussions
   - Follow on Twitter: @tilawaapp

---

## 📞 Need Help?

- **Technical Questions**: Create GitHub Issue
- **General Questions**: GitHub Discussions
- **Security Issues**: Email security@tilawa.app
- **Other**: Email support@tilawa.app

---

## 🎉 Welcome to TILAWA!

We're excited to have you here. Whether you're a user, contributor, or team member, thank you for being part of this journey to make Islamic learning more accessible worldwide.

**Let's build something amazing together! 🕌**

---

### Quick Links
- [README.md](README.md) - Project overview
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete status
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Common commands
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide
- [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md) - System design
- [docs/deployment/DEPLOYMENT.md](docs/deployment/DEPLOYMENT.md) - Deployment guide

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Last Updated**: September 2024
