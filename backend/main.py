import logging
from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("tilawa-backend")

app = FastAPI(
    title="TILAWA API Backend",
    description="Asynchronous APIs and WebSockets gateway for Quranic Recitation & ML scoring",
    version="1.0.0"
)

# Enable CORS for Next.js web client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScoredAyahResponse(BaseModel):
    index: int
    status: int  # 0: Correct, 1: Minor error, 2: Major error

class ScoreResponse(BaseModel):
    surah: int
    ayah: int
    overall_score: float
    heatmap: List[ScoredAyahResponse]

@app.get("/")
def read_root():
    return {"message": "Welcome to the TILAWA FastAPI Backend Gateway"}

@app.post("/api/recitation/submit", response_model=ScoreResponse)
async def submit_recitation(
    surah: int, 
    ayah: int, 
    file: UploadFile = File(...)
):
    """
    Submits a recorded webm/ogg file for speech recognition and phonetic alignment
    """
    logger.info(f"Received recitation for Surah {surah}, Ayah {ayah}, filename: {file.filename}")
    
    # Mocking ML scoring response
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

@app.websocket("/ws/battles")
async def websocket_battles_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for async recitation streak matches and matchmaking lobbies
    """
    await websocket.accept()
    logger.info("New WebSocket connection established for battles")
    try:
        while True:
            data = await websocket.receive_text()
            logger.info(f"Received WebSocket message: {data}")
            # Echo back for ping validation
            await websocket.send_text(f"Server received: {data}")
    except WebSocketDisconnect:
        logger.info("WebSocket connection closed by client")
