#!/bin/bash

# TILAWA Backend Startup Script

set -e

echo "🚀 Starting TILAWA Backend API..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
source venv/bin/activate || . venv/Scripts/activate

# Install/upgrade dependencies
echo "📚 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Load environment variables
if [ -f ".env" ]; then
    echo "⚙️  Loading .env file..."
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "⚠️  .env file not found. Copy .env.example to .env and configure."
    cp .env.example .env
    echo "✅ Created .env file. Please configure it before starting."
    exit 1
fi

# Set default environment
export ENVIRONMENT=${ENVIRONMENT:-dev}
export LOG_LEVEL=${LOG_LEVEL:-INFO}

# Start the API server
echo "🔧 Starting FastAPI server on http://0.0.0.0:8000"
echo "📖 API Docs available at http://localhost:8000/api/docs"
echo ""

uvicorn main:app --host 0.0.0.0 --port 8000 --reload
