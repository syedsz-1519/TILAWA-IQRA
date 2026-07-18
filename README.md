# TILAWA

**AI-powered Quranic learning platform** — listen, learn, and perfect your recitation.

TILAWA is an Islamic edtech app that combines beautiful Quran listening with AI-driven tajweed feedback, hifz (memorization) tools, and gamified learning. This repository contains the web application and the complete planning documentation suite.

## Features

- **Quran Audio Player** — Stream all 114 surahs recited by **Sheikh Yasser Al-Dosari**, with a persistent player bar: play/pause, next/previous surah, seek, playback speed (0.75x–1.5x), repeat mode, auto-advance, and Media Session (lock-screen) controls.
- **Surah Browser** — Search and browse all 114 surahs by name (English or Arabic), with ayah counts and revelation place (Makkah / Madinah).
- **Islamic Design System** — Emerald and gold palette with Amiri Arabic typography for authentic Quranic text rendering.
- **Roadmap Features** (planned) — AI tajweed feedback, hifz tracker, recitation battles, mood-based verse suggestions, and prophet stories. See [`docs/roadmap.md`](docs/roadmap.md).

## Tech Stack

- **Framework:** Next.js (App Router) + React
- **Styling:** Tailwind CSS v4 with semantic design tokens
- **UI:** shadcn/ui components
- **Fonts:** Geist (UI) + Amiri (Quranic Arabic)
- **Audio:** mp3quran.net CDN (Yasser Al-Dosari riwayah Hafs)

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/                  # Next.js App Router pages and global styles
components/           # UI components (hero, surah browser, features, header)
components/player/    # Audio player provider and persistent player bar
lib/quran.ts          # Surah dataset (114 surahs) and reciter registry
docs/                 # Planning and development documentation
```

## Documentation

The full planning suite lives in [`docs/`](docs/):

| Document | Purpose |
| --- | --- |
| [architecture.md](docs/architecture.md) | System architecture and technical design |
| [prd.md](docs/prd.md) | Product requirements document |
| [roadmap.md](docs/roadmap.md) | Feature roadmap and milestones |
| [design.md](docs/design.md) | Design system and UI guidelines |
| [phases.md](docs/phases.md) | Development phases and delivery plan |
| [strategic-market-analysis.md](docs/strategic-market-analysis.md) | Market landscape and positioning |
| [islamic-data.md](docs/islamic-data.md) | Quranic data sources and content standards |
| [content-governance.md](docs/content-governance.md) | Scholarly review and content policies |
| [security-privacy.md](docs/security-privacy.md) | Security and privacy practices |
| [monetization.md](docs/monetization.md) | Business model and pricing strategy |

## Audio Attribution

Quran recitation by **Sheikh Yasser Al-Dosari** (Hafs 'an 'Asim), streamed from [mp3quran.net](https://mp3quran.net). Audio is used for listening and educational purposes.

## License

All Quranic text and audio remain the intellectual and spiritual heritage of the Muslim ummah. Application code is proprietary to the TILAWA project.
