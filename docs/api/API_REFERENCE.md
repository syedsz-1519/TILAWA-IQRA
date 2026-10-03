# TILAWA REST API Reference (`/api/v1`)

All endpoints adhere to a standardized JSON response envelope:

### Success Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "meta": { ... }
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Descriptive human-readable error",
    "details": []
  }
}
```

---

## Endpoints

### 1. Health
- `GET /health` - Service health status, uptime, and database connectivity.

### 2. Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/register` - Create a new user account.
- `POST /api/v1/auth/login` - Authenticate with email & password. Sets httpOnly cookies.
- `POST /api/v1/auth/refresh` - Rotate refresh token & issue new access token.
- `POST /api/v1/auth/logout` - Clear cookies and invalidate active session.
- `POST /api/v1/auth/logout-all` - Invalidate all active sessions for current user.
- `GET /api/v1/auth/me` - Get current authenticated user profile.
- `GET /api/v1/auth/sessions` - List active sessions for user.
- `POST /api/v1/auth/forgot-password` - Request password reset link.
- `POST /api/v1/auth/reset-password` - Reset password with token.
- `POST /api/v1/auth/merge-guest` - Merge guest device progress into user account.

### 3. Reading Progress (`/api/v1/reading-progress`)
- `GET /api/v1/reading-progress` - Get all reading progress records.
- `POST /api/v1/reading-progress` - Update surah & ayah progress.

### 4. Bookmarks (`/api/v1/bookmarks`)
- `GET /api/v1/bookmarks` - List user bookmarks (Ayah, Dua, Hadith).
- `POST /api/v1/bookmarks` - Create or update bookmark.
- `DELETE /api/v1/bookmarks/:id` - Delete bookmark.

### 5. Hifz Memorization (`/api/v1/hifz`)
- `GET /api/v1/hifz/cards` - Get user flashcards with spaced repetition status.
- `POST /api/v1/hifz/review` - Submit card review outcome (Easy, Good, Hard, Again).

### 6. Streaks & Analytics (`/api/v1/streaks`)
- `GET /api/v1/streaks` - Get current streak, total XP, and activity history.
- `POST /api/v1/streaks/record` - Record daily activity.
