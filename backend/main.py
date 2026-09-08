import logging
import os
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional
from contextlib import asynccontextmanager

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("tilawa-backend")

# ============== PYDANTIC MODELS ==============

class ScoredAyahResponse(BaseModel):
    """Response model for individual ayah scoring"""
    index: int = Field(..., description="Ayah index/position")
    status: int = Field(..., description="0: Correct, 1: Minor error, 2: Major error")

class ScoreResponse(BaseModel):
    """Response model for recitation scoring"""
    surah: int = Field(..., ge=1, le=114, description="Surah number (1-114)")
    ayah: int = Field(..., ge=1, description="Ayah number within the surah")
    overall_score: float = Field(..., ge=0, le=100, description="Overall score as percentage")
    heatmap: List[ScoredAyahResponse] = Field(..., description="Per-character scoring breakdown")

class HealthResponse(BaseModel):
    """Response model for health check"""
    status: str = Field(..., description="Health status: healthy or unhealthy")
    timestamp: str = Field(..., description="UTC timestamp of check")
    version: str = Field(..., description="API version")
    environment: str = Field(..., description="Deployment environment (dev/prod)")

class PingResponse(BaseModel):
    """Simple ping response"""
    message: str
    timestamp: str
    uptime_seconds: int

class StreakResponse(BaseModel):
    """Response model for user streak data"""
    user_id: str = Field(..., description="User ID")
    current_streak: int = Field(..., ge=0, description="Current consecutive day streak")
    total_xp: int = Field(..., ge=0, description="Total XP accumulated")
    last_activity_date: Optional[str] = Field(None, description="ISO 8601 timestamp of last activity")

class BookmarkResponse(BaseModel):
    """Response model for mushaf bookmarks"""
    user_id: str
    surah_number: int = Field(..., ge=1, le=114)
    ayah_number: int = Field(..., ge=1)
    bookmarked_at: str

# ============== LIFESPAN CONTEXT ==============

_startup_time = datetime.utcnow()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for startup/shutdown events"""
    logger.info("🚀 TILAWA Backend API starting up...")
    yield
    logger.info("🛑 TILAWA Backend API shutting down...")

# ============== FASTAPI APP INITIALIZATION ==============

app = FastAPI(
    title="TILAWA API Backend",
    description="Asynchronous APIs and WebSockets gateway for Quranic Recitation & ML scoring",
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    lifespan=lifespan
)

# Configure CORS
allowed_origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info(f"✅ CORS enabled for origins: {allowed_origins}")

# ============== HEALTH & STATUS ENDPOINTS ==============

@app.get("/", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Root endpoint - returns API health status"""
    uptime = (datetime.utcnow() - _startup_time).total_seconds()
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        version="1.0.0",
        environment=os.getenv("ENVIRONMENT", "dev")
    )

@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
async def api_health():
    """Detailed health check endpoint"""
    uptime = (datetime.utcnow() - _startup_time).total_seconds()
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        version="1.0.0",
        environment=os.getenv("ENVIRONMENT", "dev")
    )

@app.get("/api/ping", response_model=PingResponse, tags=["Health"])
async def ping():
    """Simple ping endpoint for connectivity testing"""
    uptime = (datetime.utcnow() - _startup_time).total_seconds()
    return PingResponse(
        message="pong",
        timestamp=datetime.utcnow().isoformat(),
        uptime_seconds=int(uptime)
    )

# ============== RECITATION ENDPOINTS ==============

@app.post("/api/recitation/submit", response_model=ScoreResponse, tags=["Recitation"])
async def submit_recitation(
    surah: int = Query(..., ge=1, le=114, description="Surah number"),
    ayah: int = Query(..., ge=1, description="Ayah number"),
    file: UploadFile = File(..., description="Audio file (webm/ogg)")
):
    """
    Submit a recorded recitation for AI scoring and phonetic alignment.
    
    - **surah**: Surah number (1-114)
    - **ayah**: Ayah number within the surah
    - **file**: Audio file in webm or ogg format
    
    Returns:
    - Overall score (0-100)
    - Character-level heatmap (0=correct, 1=minor error, 2=major error)
    """
    if surah < 1 or surah > 114:
        raise HTTPException(status_code=400, detail="Surah must be between 1 and 114")
    if ayah < 1:
        raise HTTPException(status_code=400, detail="Ayah number must be positive")
    
    logger.info(
        f"📝 Recitation submitted: Surah {surah}, Ayah {ayah}, "
        f"File: {file.filename}, Size: {file.size or 'unknown'} bytes"
    )
    
    # TODO: Replace with actual ML pipeline (Whisper ASR + DTW alignment)
    # Mock scoring response for now
    dummy_heatmap = [
        ScoredAyahResponse(index=i, status=0 if i % 7 != 0 else 1)
        for i in range(15)
    ]
    
    return ScoreResponse(
        surah=surah,
        ayah=ayah,
        overall_score=92.5,
        heatmap=dummy_heatmap
    )

# ============== USER PROGRESS ENDPOINTS ==============

@app.get("/api/users/{user_id}/streaks", response_model=StreakResponse, tags=["User Progress"])
async def get_user_streaks(user_id: str):
    """
    Get user's current streak and XP data.
    
    - **user_id**: User's unique identifier
    
    Returns streak count, total XP, and last activity date.
    """
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID is required")
    
    logger.info(f"📊 Fetching streaks for user: {user_id}")
    
    # TODO: Query database for user streaks
    # Mock response for now
    return StreakResponse(
        user_id=user_id,
        current_streak=5,
        total_xp=250,
        last_activity_date=datetime.utcnow().isoformat()
    )

@app.post("/api/users/{user_id}/streaks/increment", response_model=StreakResponse, tags=["User Progress"])
async def increment_streak(user_id: str):
    """Increment user's daily streak and award XP"""
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID is required")
    
    logger.info(f"⬆️  Incrementing streak for user: {user_id}")
    
    # TODO: Update database
    return StreakResponse(
        user_id=user_id,
        current_streak=6,
        total_xp=260,
        last_activity_date=datetime.utcnow().isoformat()
    )

# ============== BOOKMARK ENDPOINTS ==============

@app.post("/api/bookmarks", response_model=BookmarkResponse, tags=["Bookmarks"])
async def create_bookmark(
    user_id: str = Query(..., description="User ID"),
    surah_number: int = Query(..., ge=1, le=114),
    ayah_number: int = Query(..., ge=1)
):
    """Create a new mushaf bookmark"""
    logger.info(f"🔖 Creating bookmark: User {user_id}, Surah {surah_number}, Ayah {ayah_number}")
    
    # TODO: Store in database
    return BookmarkResponse(
        user_id=user_id,
        surah_number=surah_number,
        ayah_number=ayah_number,
        bookmarked_at=datetime.utcnow().isoformat()
    )

@app.get("/api/bookmarks", tags=["Bookmarks"])
async def get_bookmarks(user_id: str = Query(..., description="User ID")):
    """Get all bookmarks for a user"""
    logger.info(f"📚 Fetching bookmarks for user: {user_id}")
    
    # TODO: Query database
    return {
        "user_id": user_id,
        "bookmarks": [
            {
                "surah_number": 1,
                "ayah_number": 1,
                "bookmarked_at": datetime.utcnow().isoformat()
            }
        ]
    }

# ============== WEBSOCKET ENDPOINTS ==============

# Track active WebSocket connections
active_connections: List[WebSocket] = []

@app.websocket("/ws/battles")
async def websocket_battles_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for async recitation battles and matchmaking.
    
    Messages:
    - join_queue: Join the matchmaking queue
    - start_battle: Begin a recitation battle with opponent
    - submit_score: Submit recitation score
    - leave: Exit the battle
    """
    await websocket.accept()
    active_connections.append(websocket)
    logger.info(f"🎯 New WebSocket connection (total: {len(active_connections)})")
    
    try:
        while True:
            data = await websocket.receive_text()
            logger.info(f"📨 WebSocket message: {data}")
            
            # Echo back for validation
            await websocket.send_text(f"Server received: {data}")
            
            # Broadcast to all connected clients (optional)
            for connection in active_connections:
                if connection != websocket:
                    try:
                        await connection.send_text(f"Broadcast: {data}")
                    except Exception as e:
                        logger.error(f"Error broadcasting: {e}")
    
    except WebSocketDisconnect:
        active_connections.remove(websocket)
        logger.info(f"🔌 WebSocket disconnected (total: {len(active_connections)})")
    except Exception as e:
        logger.error(f"❌ WebSocket error: {e}")
        active_connections.remove(websocket)

# ============== ERROR HANDLERS ==============

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler"""
    logger.error(f"HTTP Exception: {exc.status_code} - {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "timestamp": datetime.utcnow().isoformat()},
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Catch-all exception handler"""
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "timestamp": datetime.utcnow().isoformat()},
    )

# ============== API DOCUMENTATION ==============

logger.info("✅ TILAWA FastAPI Backend initialized successfully")
logger.info("📖 API Docs: http://localhost:8000/api/docs")
logger.info("🔌 OpenAPI: http://localhost:8000/api/openapi.json")
