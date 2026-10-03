# TILAWA — Content Governance & Scholarly Review

## Why this exists
An Islamic edtech product lives or dies on religious trust. This document defines who approves religious content, how, and what happens when we get something wrong.

## 1. Review Board
- 3–5 members minimum: at least one qari with ijazah in Hafs 'an 'Asim, one tajweed instructor, one scholar of tafsir/hadith sciences.
- Publicly listed on the website with credentials (transparency is the trust mechanism).
- Compensated advisory roles; conflict-of-interest disclosures required.

## 2. What Requires Sign-Off

| Content class | Review level |
|---|---|
| Quran text dataset (any change/version bump) | Full board, unanimous |
| Recitation audio source additions | Qari member verifies riwayah + audio integrity sampling |
| Tajweed rule definitions & scoring rubrics | Tajweed instructor + qari |
| Tajweed *feedback copy* shown to users | Tajweed instructor |
| Asbab al-Nuzul stories, tafsir excerpts | Tafsir scholar; citation + grading mandatory |
| Duas, hadith content | Hadith-sciences reviewer; Sahihayn-only policy v1 |
| Marketing copy referencing religious claims | Any one member |
| UI copy (non-religious) | No review needed |

## 3. Process
1. Content change opens a tracked review request (template: source, citation, diff, risk class).
2. Reviewer(s) approve/reject with written rationale — stored permanently.
3. CI gate: religious-content paths are code-owner protected; merges blocked without approval artifact.
4. Released datasets are versioned and immutable; the app displays the dataset version in Settings → About.

## 4. AI Feedback Guardrails
- The tajweed scorer is presented as a **practice aid**, never as religious authority. Standing disclaimer: "AI feedback is an aid to practice. For certification, seek a qualified teacher."
- Confidence thresholds: below-threshold rule detections are shown as "review this" (neutral), not "incorrect."
- The model never comments on the *reciter's worship* — only on articulation mechanics.
- Mood-Based Verse Suggester: verse-mood mappings are human-curated and board-approved; the LLM selects only from the approved mapping, never free-generates pairings. Crisis inputs (self-harm signals) surface help resources, not just verses.

## 5. Error Response Protocol (religious content incident)
1. **Severity 1** (Quran text/audio error live): kill-switch the affected content within 1 hour; public acknowledgment within 24h.
2. Root-cause review with the board; corrective dataset release.
3. Postmortem published in release notes. Silence is worse than the error.

## 6. Community Reporting
- Every ayah, audio track, and story card has a "Report an issue" affordance.
- Reports triaged within 48h; religious-content reports route directly to the board queue.

## 7. Cultural & Sectarian Scope
- v1 scope: Quran recitation per Hafs 'an 'Asim — the majority riwayah — with other riwayat as a future, clearly-labeled expansion.
- The product takes no positions on fiqh/madhhab disputes; features avoid areas requiring juristic rulings.
- Content acceptable across mainstream Sunni scholarship is the baseline bar; contested material is excluded rather than argued.
