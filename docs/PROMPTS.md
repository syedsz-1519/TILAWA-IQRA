# TILAWA Development Prompts Registry

> **Purpose:** This file stores every AI prompt used to develop the TILAWA project, verbatim and in order. It is the canonical record for auditing, replication, and onboarding.
> **Last updated:** 2026-10-03

---

> [!CAUTION]
> ### Security Alerts
> No secrets were found in any prompt below. All prompts have been reviewed for API keys, passwords, tokens, Mongo URIs, and private emails. If you add a new prompt, ensure it contains no secrets before committing.

---

## How to Use This File

1. Copy a prompt verbatim from the section below.
2. Run prompts in the **Recommended Run Order** listed in the next section - later prompts depend on earlier ones.
3. After running a prompt, update **Status** (e.g., `Used`, `Needs rerun`) and fill in **Result / notes** with a link to the commit or PR.
4. If a prompt is outdated, mark it `Superseded` and point to the newer prompt ID.
5. Add new prompts using the template at [`/docs/templates/PROMPT_TEMPLATE.md`](./templates/PROMPT_TEMPLATE.md).

---

## Quick Index

| ID | Title | Area | Date | Status | Run Order |
|:---|:------|:-----|:-----|:-------|:---------:|
| [P-001](#p-001-full-stack-platform-upgrade) | Full-Stack Platform Upgrade | Architecture | Unknown | Used | 1 |
| [P-002](#p-002-quran-reader-mushaf-redesign) | Quran Reader Mushaf Redesign | Quran Reader / Frontend | Unknown | Used | 2 |
| [P-003](#p-003-project-memory-consolidation) | Project Memory Consolidation | Docs/Memory | Unknown | Used | 3 |
| [P-004](#p-004-backend-audit-and-rewrite) | Backend Audit and Rewrite | Backend | Unknown | Used | 4 |
| [P-005](#p-005-prompt-registry-creation) | Prompt Registry Creation | Docs/Memory | 2026-10-03 | Used | 5 |

---

## Recommended Run Order

1. **P-001** - Establish architecture, clean root, security audit (foundation for everything)
2. **P-002** - Redesign the Quran reader UI (depends on stable frontend from P-001)
3. **P-003** - Consolidate all docs into `memory.md` (requires completed audit from P-001)
4. **P-004** - Backend audit and rewrite (depends on `memory.md` from P-003 for full context)
5. **P-005** - Create this prompt registry (depends on all prior work being complete)

---

## Prompts

---

### P-001: Full-Stack Platform Upgrade

- **Area:** Architecture
- **Date:** Unknown
- **Tool/Agent used:** Unknown
- **Status:** Used
- **Depends on:** None
- **Goal:** Upgrade TILAWA into a professional, production-grade full-stack application in phased stages.
- **Result / notes:** Phase 0 audit complete. Security leak (Mongo credentials) found and redacted. ~70 loose root files archived. Backend and frontend restructured. Commits: `459efcc`, `47d8ca6`, `3aa0451`, `e39f22b`.

### P-002: Quran Reader Mushaf Redesign

- **Area:** Quran Reader / Frontend
- **Date:** Unknown
- **Tool/Agent used:** Unknown
- **Status:** Used
- **Depends on:** P-001
- **Goal:** Redesign the Quran reader as a pixel-perfect digital Madani Mushaf with two reading modes.
- **Result / notes:** Mushaf reader redesigned with light-only theme. Two reading modes implemented. Commits: `4164730`, `5212787`.

### P-003: Project Memory Consolidation

- **Area:** Docs/Memory
- **Date:** Unknown
- **Tool/Agent used:** Unknown
- **Status:** Used
- **Depends on:** P-001
- **Goal:** Consolidate all project knowledge into a single memory.md SSOT.
- **Result / notes:** `/memory.md` created at 551 lines. Legacy files archived. Commit: `3aa0451`.

### P-004: Backend Audit and Rewrite

- **Area:** Backend
- **Date:** Unknown
- **Tool/Agent used:** Unknown
- **Status:** Used
- **Depends on:** P-001, P-003
- **Goal:** Audit and rewrite the TILAWA Express backend into a clean, secure, layered API.
- **Result / notes:** Audit in `/docs/backend-audit.md`. New modular architecture scaffolded. Commit: `e39f22b`. Refactoring ongoing.

### P-005: Prompt Registry Creation

- **Area:** Docs/Memory
- **Date:** 2026-10-03
- **Tool/Agent used:** Antigravity IDE (Claude)
- **Status:** Used
- **Depends on:** P-001, P-002, P-003, P-004
- **Goal:** Create this canonical prompt registry file plus a reusable template.
- **Result / notes:** This file. Also created `/docs/templates/PROMPT_TEMPLATE.md`.

---

## Open Questions

1. **P-001 through P-004 dates unknown** - Exact dates not recorded in git. Check commit timestamps for `459efcc`, `3aa0451`, `e39f22b`.
2. **Tool/Agent used for P-001-P-004** - Listed as Unknown; update if available.

---

## How to Add a New Prompt

1. Copy the template from [`/docs/templates/PROMPT_TEMPLATE.md`](./templates/PROMPT_TEMPLATE.md).
2. Assign the next sequential ID (e.g., `P-006`).
3. Fill in all fields.
4. Add a row to the **Quick Index** table.
5. Commit: `docs(prompts): add P-0xx <short title>`
