# TILAWA Authentication & Security Architecture

## Authentication Flow

TILAWA implements a production-grade authentication flow using httpOnly cookies, Argon2id/bcrypt password hashing, and rotating refresh tokens.

### Security Highlights
- **No tokens in `localStorage`**: Access and refresh tokens are stored in `httpOnly`, `Secure`, `SameSite=Strict/Lax` cookies to prevent XSS credential theft.
- **Short-Lived Access Token**: Valid for 15 minutes.
- **Rotating Refresh Token**: Valid for 30 days with single-use rotation. If a previously used refresh token is presented, the entire token family is revoked to prevent replay attacks.
- **Password Protection**: Hashed using Argon2id or bcrypt (cost factor 12).
- **Lockout & Rate Limiting**: Progressive delays and exponential backoff on repeated failed login attempts to prevent brute-force and credential stuffing attacks.
- **Guest Migration**: Anonymous session data (bookmarks, reading progress, hifz status) is seamlessly merged upon user registration or sign-in.
- **Session Auditing**: Users can view all active logged-in devices/sessions from Settings and trigger "Sign out all devices".

### OAuth2 & Social Sign-In
- **Google OAuth**: One-tap sign-in with verified profile linking.
- **Apple Sign-In**: Ready for mobile and web integration.
