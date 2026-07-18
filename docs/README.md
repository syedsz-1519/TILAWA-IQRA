# TILAWA — Planning & Development Documentation

Complete planning suite for TILAWA, an AI-powered Quranic recitation and Islamic learning platform.

## Documents

| Document | Purpose |
|---|---|
| [prd.md](./prd.md) | Product requirements: vision, personas, features, success metrics |
| [architecture.md](./architecture.md) | System architecture: clients, API, ML service, data layer, key flows |
| [design.md](./design.md) | Design system: colors, typography, key surfaces, accessibility, RTL |
| [roadmap.md](./roadmap.md) | Product roadmap: Now / Next / Later with exit criteria |
| [phases.md](./phases.md) | Engineering phases 0–4 with deliverables and acceptance criteria |
| [strategic-market-analysis.md](./strategic-market-analysis.md) | Market size, competitors, positioning, go-to-market, risks |
| [islamic-data.md](./islamic-data.md) | Canonical Islamic datasets: Quran text, Yasser Al-Dosari audio, tajweed rules, validation |
| [content-governance.md](./content-governance.md) | Scholarly review board, sign-off process, AI guardrails, incident protocol |
| [security-privacy.md](./security-privacy.md) | Data classification, privacy commitments, threat model, COPPA/GDPR |
| [monetization.md](./monetization.md) | Freemium model, premium tiers, institutional licensing, unit economics |

## Reading Order

- **New team member**: prd → architecture → design → phases
- **Investor / stakeholder**: prd → strategic-market-analysis → monetization → roadmap
- **Content / scholarly reviewer**: islamic-data → content-governance
- **Security reviewer**: security-privacy → architecture

## Non-Negotiables (apply across all docs)

1. Quran text and audio must be canonically sourced and checksum-verified — zero error tolerance.
2. Religious content ships only with review-board sign-off.
3. Worship-core features (reading, listening, khatm) are free forever.
4. No ads, no trackers, no sale of user data — voice recordings are private by default.
5. AI is a practice aid, never a religious authority.
