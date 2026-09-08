# TILAWA Backend Startup Script (Windows PowerShell)

Write-Host "🚀 Starting TILAWA Backend API..." -ForegroundColor Green

# Check if virtual environment exists
if (-not (Test-Path "venv")) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment
& ".\venv\Scripts\Activate.ps1"

# Install/upgrade dependencies
Write-Host "📚 Installing dependencies..." -ForegroundColor Yellow
python -m pip install --upgrade pip
pip install -r requirements.txt

# Load environment variables from .env
if (Test-Path ".env") {
    Write-Host "⚙️  Loading .env file..." -ForegroundColor Yellow
    Get-Content .env | ForEach-Object {
        if ($_ -and -not $_.StartsWith("#")) {
            $name, $value = $_.Split("=", 2)
            [Environment]::SetEnvironmentVariable($name.Trim(), $value.Trim())
        }
    }
} else {
    Write-Host "⚠️  .env file not found. Copy .env.example to .env and configure." -ForegroundColor Red
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file. Please configure it before starting." -ForegroundColor Green
    exit 1
}

# Set default environment
$env:ENVIRONMENT = if ($env:ENVIRONMENT) { $env:ENVIRONMENT } else { "dev" }
$env:LOG_LEVEL = if ($env:LOG_LEVEL) { $env:LOG_LEVEL } else { "INFO" }

# Start the API server
Write-Host "🔧 Starting FastAPI server on http://0.0.0.0:8000" -ForegroundColor Green
Write-Host "📖 API Docs available at http://localhost:8000/api/docs" -ForegroundColor Cyan
Write-Host ""

uvicorn main:app --host 0.0.0.0 --port 8000 --reload
