# TILAWA (تلاوة)

An authentic, premium, production-grade multilingual Quranic learning & Islamic knowledge ecosystem.

- **Web Application:** [https://tilawaa.vercel.app](https://tilawaa.vercel.app)
- **API Backend:** [https://tilawa-production.up.railway.app](https://tilawa-production.up.railway.app)
- **Repository:** [https://github.com/syedsz-1519/TILAWA-IQRA.git](https://github.com/syedsz-1519/TILAWA-IQRA.git)

---

## 📌 Single Source of Truth

> [!IMPORTANT]
> Everything known about the TILAWA project — including architecture, tech stack, data schemas, API references, design system tokens, deployment instructions, decision logs, roadmap, and setup steps — is consolidated in **[`/memory.md`](memory.md)**.  
> Engineers and AI agents should refer directly to [`/memory.md`](memory.md) before making changes.

---

## 📖 Quick Overview

TILAWA brings an authentic, Madani Mushaf-inspired Quran recitation and learning experience across Web, iOS, and Android:
- **604-Page Madani Mushaf Reader:** 15 lines per page with precise typesetting, page jump navigation, and custom light paper theme.
- **Audio Recitations & Audio Sync:** Multi-reciter playback, verse synchronization, and interleaved Urdu translation audio.
- **Multi-lingual Support:** Verses and word-by-word translations in 15+ languages.
- **Islamic Knowledge Suite:** Hadith collection library, Dua & Adhkar tracker, Hifz memorization studio, Nafs habit tracker, Tajweed practice modules, and Zaid AI learning assistant.

---

## 🛠️ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/syedsz-1519/TILAWA-IQRA.git
cd TILAWA-IQRA

# 2. Install workspace dependencies
npm install

# 3. Configure environment
cp .env.example .env

# 4. Start local development
npm run dev:web   # Web Frontend (http://localhost:3000)
npm run dev:api   # API Backend (http://localhost:8000)
```

For complete deployment guides, database schemas, and architectural reference, read **[`/memory.md`](memory.md)**.

---

## 📄 License & Contributing

- [Contributing Guidelines](CONTRIBUTING.md)
- Project Memory: [`/memory.md`](memory.md)
- Released under the [MIT License](LICENSE).
