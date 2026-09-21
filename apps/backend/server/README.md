# TILAWA Backend API

FastAPI-powered backend for TILAWA — AI-powered Quranic recitation and learning platform.

## Overview

The TILAWA backend provides:

- **REST APIs** for recitation submission, user progress tracking, and bookmarks
- **WebSocket endpoints** for real-time recitation battles and matchmaking
- **ML Pipeline** for Tajweed scoring (via Whisper ASR and phonetic alignment)
- **Database integration** with PostgreSQL for persistent data storage
- **Health monitoring** and comprehensive logging

## Architecture

```
┌─────────────────────────────────────┐
│     Next.js Frontend (Port 3000)    │
└────────────┬────────────────────────┘
             │ HTTP/WebSocket
┌────────────▼────────────────────────┐
│   FastAPI Backend (Port 8000)       │
│  ├─ REST endpoints                  │
│  ├─ WebSocket connections           │
│  └─ ML scoring pipeline             │
└────────────┬────────────────────────┘
             │ SQL
┌────────────▼────────────────────────┐
│  PostgreSQL Database                │
│  (Neon / Supabase)                  │
└─────────────────────────────────────┘
```

## Quick Start

### Prerequisites

- Python 3.9+
- PostgreSQL 12+ (or Neon/Supabase)
- pip or conda

### Installation

1. **Clone and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` with your configuration:**
   ```bash
   ENVIRONMENT=dev
   DATABASE_URL=postgresql://user:password@localhost:5432/tilawa
   BETTER_AUTH_SECRET=your-secret-key
   ```

4. **Start the backend (Windows):**
   ```powershell
   .\start.ps1
   ```

   Or **(Linux/Mac):**
   ```bash
   bash start.sh
   chmod +x start.sh
   ./start.sh
   ```

### Manual Setup (if startup scripts don't work)

```bash
# Create virtual environment
python -m venv venv

# Activate it
# On Windows:
.\venv\Scripts\Activate.ps1
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints

### Health & Status

- **GET `/`** — Health check (returns status and uptime)
- **GET `/api/health`** — Detailed health endpoint
- **GET `/api/ping`** — Simple ping for connectivity testing

### Recitation & Scoring

- **POST `/api/recitation/submit`** — Submit audio for Tajweed scoring
  - Query params: `surah` (1-114), `ayah` (1+)
  - File upload: Audio file (webm/ogg)
  - Returns: Overall score + character-level heatmap

### User Progress

- **GET `/api/users/{user_id}/streaks`** — Get user's streak and XP
- **POST `/api/users/{user_id}/streaks/increment`** — Increment daily streak

### Bookmarks

- **POST `/api/bookmarks`** — Create a new mushaf bookmark
  - Query params: `user_id`, `surah_number`, `ayah_number`
- **GET `/api/bookmarks`** — Retrieve all bookmarks for a user
  - Query params: `user_id`

### WebSocket

- **WS `/ws/battles`** — Real-time recitation battles
  - Messages: `join_queue`, `start_battle`, `submit_score`, `leave`

## API Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **OpenAPI JSON**: http://localhost:8000/api/openapi.json

## Database Schema

The database includes:

**Better Auth Tables:**
- `user` — User profiles
- `session` — Session tokens
- `account` — Authentication accounts
- `verification` — Email verification codes

**Application Tables:**
- `streaks` — Daily streaks and XP
- `nafsTracking` — Spiritual habit tracking
- `mushafBookmarks` — Surah/Ayah bookmarks
- `readingProgress` — Reading session trackers
- `tajweedScores` — Quiz results
- `hadithFavorites` — Favorite hadiths
- `duaFavorites` — Favorite duas

See `../database/schema.sql` for full schema.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ENVIRONMENT` | Environment (dev/prod) | `dev` |
| `CORS_ORIGINS` | Allowed CORS origins | `*` |
| `DATABASE_URL` | PostgreSQL connection string | — |
| `BETTER_AUTH_SECRET` | Auth secret key | — |
| `BETTER_AUTH_URL` | Auth base URL | — |
| `LOG_LEVEL` | Logging level (DEBUG/INFO/WARNING/ERROR) | `INFO` |

## Project Structure

```
backend/
├── main.py              # FastAPI app, routes, and models
├── requirements.txt     # Python dependencies
├── .env.example         # Environment template
├── start.sh             # Unix/Linux startup script
├── start.ps1            # Windows PowerShell startup script
└── README.md            # This file
```

## Development

### Adding New Routes

1. Define Pydantic models for request/response
2. Create route in `main.py` with proper docstrings
3. Add tags for Swagger UI organization
4. Use Field() for parameter documentation
5. Add logging for debugging

Example:

```python
@app.post("/api/endpoint", response_model=ResponseModel, tags=["Feature"])
async def my_endpoint(
    param1: str = Query(..., description="Description"),
    param2: int = Query(10, ge=1, le=100)
):
    """Endpoint description"""
    logger.info(f"Processing: {param1}")
    # Implementation
    return ResponseModel(...)
```

### Testing Endpoints

**Using curl:**
```bash
# Health check
curl http://localhost:8000/api/health

# Get streaks
curl http://localhost:8000/api/users/user123/streaks

# Create bookmark
curl -X POST "http://localhost:8000/api/bookmarks?user_id=user123&surah_number=1&ayah_number=5"
```

**Using Python:**
```python
import requests

response = requests.get("http://localhost:8000/api/health")
print(response.json())
```

## Deployment

### Fly.io Deployment

```bash
# Install flyctl
brew install flyctl

# Initialize project
fly launch

# Deploy
fly deploy
```

### Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY main.py .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Common Issues

**"ModuleNotFoundError: No module named 'fastapi'"**
- Solution: Install dependencies: `pip install -r requirements.txt`

**"Connection refused" when connecting to database**
- Solution: Ensure PostgreSQL is running and DATABASE_URL is correct

**"CORS error" from frontend**
- Solution: Add frontend URL to CORS_ORIGINS in .env

## Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and test locally
3. Push to GitHub: `git push origin feature/my-feature`
4. Create Pull Request

## Support

For issues and questions:
- Check API docs at http://localhost:8000/api/docs
- Review logs in console output
- Check database connectivity
- Ensure all environment variables are set

## License

Proprietary to TILAWA Project
