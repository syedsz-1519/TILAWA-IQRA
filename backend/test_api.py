"""
Test suite for TILAWA Backend API
Run with: pytest test_api.py -v
Or manually: python test_api.py
"""

import logging
from datetime import datetime

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_health_endpoints():
    """Test health check endpoints"""
    logger.info("🧪 Testing health endpoints...")
    
    import requests
    base_url = "http://localhost:8000"
    
    # Test root endpoint
    print("\n1️⃣  Testing GET /")
    try:
        response = requests.get(f"{base_url}/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print(f"   ✅ Response: {data}")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    # Test /api/health
    print("\n2️⃣  Testing GET /api/health")
    try:
        response = requests.get(f"{base_url}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print(f"   ✅ Response: {data}")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    # Test /api/ping
    print("\n3️⃣  Testing GET /api/ping")
    try:
        response = requests.get(f"{base_url}/api/ping")
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "pong"
        print(f"   ✅ Response: {data}")
    except Exception as e:
        print(f"   ❌ Error: {e}")

def test_user_endpoints():
    """Test user progress endpoints"""
    logger.info("🧪 Testing user progress endpoints...")
    
    import requests
    base_url = "http://localhost:8000"
    user_id = "test-user-123"
    
    # Get streaks
    print(f"\n1️⃣  Testing GET /api/users/{user_id}/streaks")
    try:
        response = requests.get(f"{base_url}/api/users/{user_id}/streaks")
        assert response.status_code == 200
        data = response.json()
        assert data["user_id"] == user_id
        assert "current_streak" in data
        assert "total_xp" in data
        print(f"   ✅ Response: {data}")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    # Increment streak
    print(f"\n2️⃣  Testing POST /api/users/{user_id}/streaks/increment")
    try:
        response = requests.post(f"{base_url}/api/users/{user_id}/streaks/increment")
        assert response.status_code == 200
        data = response.json()
        print(f"   ✅ Response: {data}")
    except Exception as e:
        print(f"   ❌ Error: {e}")

def test_bookmark_endpoints():
    """Test bookmark endpoints"""
    logger.info("🧪 Testing bookmark endpoints...")
    
    import requests
    base_url = "http://localhost:8000"
    user_id = "test-user-123"
    
    # Create bookmark
    print(f"\n1️⃣  Testing POST /api/bookmarks")
    try:
        params = {
            "user_id": user_id,
            "surah_number": 1,
            "ayah_number": 5
        }
        response = requests.post(f"{base_url}/api/bookmarks", params=params)
        assert response.status_code == 200
        data = response.json()
        print(f"   ✅ Response: {data}")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    # Get bookmarks
    print(f"\n2️⃣  Testing GET /api/bookmarks")
    try:
        params = {"user_id": user_id}
        response = requests.get(f"{base_url}/api/bookmarks", params=params)
        assert response.status_code == 200
        data = response.json()
        print(f"   ✅ Response: {data}")
    except Exception as e:
        print(f"   ❌ Error: {e}")

def test_recitation_endpoints():
    """Test recitation scoring endpoints"""
    logger.info("🧪 Testing recitation endpoints...")
    
    import requests
    base_url = "http://localhost:8000"
    
    # Create a dummy audio file for testing
    print(f"\n1️⃣  Testing POST /api/recitation/submit")
    try:
        # Create a small test audio file (silence webm)
        with open("test_audio.webm", "wb") as f:
            # Minimal WebM file header (silent audio)
            f.write(b'\x1a\x45\xdf\xa3\x00\x00\x00\x00\x00\x00\x00\x00')
        
        with open("test_audio.webm", "rb") as audio_file:
            files = {"file": audio_file}
            params = {
                "surah": 1,
                "ayah": 1
            }
            response = requests.post(
                f"{base_url}/api/recitation/submit",
                params=params,
                files=files
            )
            assert response.status_code == 200
            data = response.json()
            assert "overall_score" in data
            assert "heatmap" in data
            print(f"   ✅ Response: {data}")
    except Exception as e:
        print(f"   ❌ Error: {e}")

def test_websocket_connection():
    """Test WebSocket connection"""
    logger.info("🧪 Testing WebSocket connection...")
    
    try:
        import asyncio
        from websockets import connect as ws_connect
        
        async def test_ws():
            print(f"\n1️⃣  Testing WS /ws/battles")
            try:
                async with ws_connect("ws://localhost:8000/ws/battles") as websocket:
                    # Send a test message
                    await websocket.send("test message")
                    
                    # Receive response
                    response = await websocket.recv()
                    print(f"   ✅ Response: {response}")
                    
            except Exception as e:
                print(f"   ❌ Error: {e}")
        
        asyncio.run(test_ws())
    except ImportError:
        print("   ⚠️  websockets library not installed. Install with: pip install websockets")

def run_all_tests():
    """Run all tests"""
    print("=" * 60)
    print("🚀 TILAWA Backend API Test Suite")
    print("=" * 60)
    print(f"Started at: {datetime.now().isoformat()}")
    print()
    
    try:
        test_health_endpoints()
        test_user_endpoints()
        test_bookmark_endpoints()
        test_recitation_endpoints()
        test_websocket_connection()
        
        print("\n" + "=" * 60)
        print("✅ All tests completed!")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ Test suite failed: {e}")

if __name__ == "__main__":
    print("\n💡 Ensure the backend is running before running tests!")
    print("   Start with: python -m uvicorn main:app --reload")
    print()
    
    try:
        run_all_tests()
    except KeyboardInterrupt:
        print("\n\n⏹️  Tests interrupted by user")
