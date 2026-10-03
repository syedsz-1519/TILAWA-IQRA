# TILAWA — Security & Privacy

Muslim users' data — especially voice recordings and religious-practice patterns — is highly sensitive. Competitors have suffered lasting brand damage from data-sharing scandals. Privacy is a product feature here, not a compliance chore.

## 1. Data Inventory & Classification

| Data | Class | Retention |
|---|---|---|
| Voice recordings (recitation) | **Highly sensitive** | User-controlled; default auto-delete after 90 days; hard delete ≤ 24h on request |
| Practice/streak/khatm history | Sensitive (reveals religious practice) | Account lifetime; exportable; deleted with account |
| Account (email, hashed password) | Standard PII | Account lifetime |
| Device analytics | Low | 13 months, aggregated |

## 2. Hard Commitments
- **No ads. No ad SDKs. No data sale. Ever.**
- Voice recordings are **private by default**, never used for model training without explicit granular opt-in (separate from ToS).
- No third-party trackers; first-party, privacy-respecting analytics only.
- Religious-practice data (streaks, khatm, listening) never leaves our systems and never feeds ad profiles anywhere.
- Full account export (JSON) and one-click account deletion, self-serve.

## 3. Security Controls
- Auth: Better Auth (web) with httpOnly, SameSite cookies; Argon2/bcrypt hashing; rate-limited login; JWT with short TTL + refresh for mobile.
- Authorization: every query scoped by `user_id` at the data layer; no shared-table reads without policy.
- Transport: TLS 1.2+ everywhere; HSTS.
- Recordings: private object storage, signed URLs (short expiry), server-side encryption at rest.
- Input validation on all endpoints (Pydantic); parameterized queries only.
- Secrets in managed env vars; no secrets in code or client bundles.
- Dependency scanning + quarterly penetration test; WS endpoints (battles) authenticated and rate-limited.

## 4. Children (COPPA / GDPR-K)
- Madrasa/parent use means minors are on the platform.
- Child accounts: created by parent/teacher, no public profile, no battles with strangers, no marketing emails, minimal data collection.
- Age gate at signup; under-13 flow requires guardian linkage.

## 5. Regional Compliance
- GDPR (EU/UK): lawful basis documented per processing activity; DPA with all processors; EU data residency option evaluated at scale.
- CCPA (California), PDPL (Saudi Arabia), and Indonesia PDP Law tracked per expansion phase.
- Data-processor inventory maintained in this repo; additions require security review.

## 6. Threat Model Highlights

| Threat | Mitigation |
|---|---|
| Recording leakage (mis-scoped URL) | Signed URLs + per-object owner check + short expiry |
| Account takeover | Rate limiting, breach-password screening, optional 2FA (Phase 3) |
| Scraping of user practice data | No public endpoints expose per-user religious activity |
| Battle-system abuse/harassment | Recitation-only payloads (no free chat v1), report + block, async format limits exposure |
| ML endpoint abuse (cost attack) | Per-user quotas, audio duration caps, hash-based result caching |

## 7. Incident Response
- Severity matrix with paging; user-data breaches disclosed per legal requirement and — where users are affected — proactively, in plain language.
- Postmortems within 7 days; recurring-cause tracking.
