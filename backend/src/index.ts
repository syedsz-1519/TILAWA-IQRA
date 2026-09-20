import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { config } from 'dotenv'

// Load environment variables
config()

// Import route handlers
import languageRoutes from './routes/languages'
import hifzRoutes from './routes/hifz'

// Verify recommended environment variables
const recommendedEnvVars = ['NODE_ENV', 'BETTER_AUTH_SECRET']
const missingEnvVars = recommendedEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.warn(`⚠️  Missing recommended environment variables: ${missingEnvVars.join(', ')}`)
}

const app = express()
const PORT = process.env.PORT || 8000
const NODE_ENV = process.env.NODE_ENV || 'development'

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
)

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Mount route handlers
app.use(languageRoutes)
app.use('/api/hifz', hifzRoutes)

// =====================
// HEALTH CHECK ENDPOINT
// =====================

/**
 * GET /health
 * Health check endpoint for monitoring
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

// =====================
// 404 HANDLER
// =====================

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
  })
})

// =====================
// ERROR HANDLER
// =====================

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', error)
  res.status(500).json({
    error: 'Internal server error',
    details: NODE_ENV === 'development' ? error.message : undefined,
  })
})

// =====================
// START SERVER
// =====================

app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`)
  console.log(`📝 Environment: ${NODE_ENV}`)
  console.log(`🔗 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`)
})

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  Shutting down gracefully...')
  process.exit(0)
})
