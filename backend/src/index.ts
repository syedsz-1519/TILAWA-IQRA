import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { config } from 'dotenv'

// Load environment variables
config()

// Import route handlers
import * as streakRoutes from './routes/streaks'
import * as bookmarkRoutes from './routes/bookmarks'
import * as readingProgressRoutes from './routes/reading-progress'
import languageRoutes from './routes/languages'
import hifzRoutes from './routes/hifz'

// Verify required environment variables
const requiredEnvVars = ['DATABASE_URL', 'NODE_ENV', 'BETTER_AUTH_SECRET']
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`)
  process.exit(1)
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

// Mount language routes
app.use(languageRoutes)

// Mount hifz routes
app.use('/api/hifz', hifzRoutes)

// Mount bookmarks routes
app.use('/api/bookmarks', bookmarkRoutes)

// =====================
// STREAKS ENDPOINTS
// =====================

/**
 * GET /api/streaks?userId=<userId>
 * Get user's streaks data
 */
app.get('/api/streaks', async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string

    if (!userId) {
      return res.status(400).json({
        error: 'userId query parameter is required',
      })
    }

    const streaks = await streakRoutes.getUserStreaks(userId)

    res.json({
      success: true,
      data: streaks,
    })
  } catch (error) {
    console.error('Error fetching streaks:', error)
    res.status(500).json({
      error: 'Failed to fetch streaks',
      details: NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
})

/**
 * POST /api/streaks
 * Update user's XP and streak
 * Body: { userId: string, xpGain: number }
 */
app.post('/api/streaks', async (req: Request, res: Response) => {
  try {
    const { userId, xpGain } = req.body

    if (!userId || typeof xpGain !== 'number') {
      return res.status(400).json({
        error: 'userId and xpGain are required',
      })
    }

    const updated = await streakRoutes.updateUserXP(userId, xpGain)

    res.json({
      success: true,
      data: updated,
    })
  } catch (error) {
    console.error('Error updating streaks:', error)
    res.status(500).json({
      error: 'Failed to update streaks',
      details: NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
})

/**
 * GET /api/streaks/all
 * Get all user streaks (admin only)
 */
app.get('/api/streaks/all', async (req: Request, res: Response) => {
  try {
    // TODO: Add admin authentication check
    const allStreaks = await streakRoutes.getAllStreaks()

    res.json({
      success: true,
      data: allStreaks,
    })
  } catch (error) {
    console.error('Error fetching all streaks:', error)
    res.status(500).json({
      error: 'Failed to fetch all streaks',
      details: NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
})

// =====================
// BOOKMARKS ENDPOINTS
// =====================

/**
 * GET /api/bookmarks?userId=<userId>
 * Get user's bookmarks
 */
app.get('/api/bookmarks', async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string

    if (!userId) {
      return res.status(400).json({
        error: 'userId query parameter is required',
      })
    }

    const bookmarks = await bookmarkRoutes.getUserBookmarks(userId)

    res.json({
      success: true,
      data: bookmarks,
    })
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    res.status(500).json({
      error: 'Failed to fetch bookmarks',
      details: NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
})

/**
 * POST /api/bookmarks
 * Add a bookmark
 * Body: { userId: string, surahNumber: number, ayahNumber: number }
 */
app.post('/api/bookmarks', async (req: Request, res: Response) => {
  try {
    const { userId, surahNumber, ayahNumber } = req.body

    if (!userId || typeof surahNumber !== 'number' || typeof ayahNumber !== 'number') {
      return res.status(400).json({
        error: 'userId, surahNumber, and ayahNumber are required',
      })
    }

    const bookmark = await bookmarkRoutes.addBookmark(userId, surahNumber, ayahNumber)

    res.json({
      success: true,
      data: bookmark,
    })
  } catch (error) {
    console.error('Error adding bookmark:', error)
    res.status(500).json({
      error: 'Failed to add bookmark',
      details: NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
})

/**
 * DELETE /api/bookmarks
 * Remove a bookmark
 * Body: { userId: string, surahNumber: number, ayahNumber: number }
 */
app.delete('/api/bookmarks', async (req: Request, res: Response) => {
  try {
    const { userId, surahNumber, ayahNumber } = req.body

    if (!userId || typeof surahNumber !== 'number' || typeof ayahNumber !== 'number') {
      return res.status(400).json({
        error: 'userId, surahNumber, and ayahNumber are required',
      })
    }

    await bookmarkRoutes.removeBookmark(userId, surahNumber, ayahNumber)

    res.json({
      success: true,
      message: 'Bookmark removed',
    })
  } catch (error) {
    console.error('Error removing bookmark:', error)
    res.status(500).json({
      error: 'Failed to remove bookmark',
      details: NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
})

/**
 * DELETE /api/bookmarks/clear
 * Clear all bookmarks for user
 * Body: { userId: string }
 */
app.delete('/api/bookmarks/clear', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({
        error: 'userId is required',
      })
    }

    await bookmarkRoutes.clearBookmarks(userId)

    res.json({
      success: true,
      message: 'All bookmarks cleared',
    })
  } catch (error) {
    console.error('Error clearing bookmarks:', error)
    res.status(500).json({
      error: 'Failed to clear bookmarks',
      details: NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
})

// =====================
// READING PROGRESS ENDPOINTS
// =====================

/**
 * GET /api/reading-progress?userId=<userId>
 * Get user's reading progress for all surahs
 */
app.get('/api/reading-progress', async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string

    if (!userId) {
      return res.status(400).json({
        error: 'userId query parameter is required',
      })
    }

    const progress = await readingProgressRoutes.getUserReadingProgress(userId)

    res.json({
      success: true,
      data: progress,
    })
  } catch (error) {
    console.error('Error fetching reading progress:', error)
    res.status(500).json({
      error: 'Failed to fetch reading progress',
      details: NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
})

/**
 * GET /api/reading-progress/surah/:surahNumber?userId=<userId>
 * Get reading progress for specific surah
 */
app.get('/api/reading-progress/surah/:surahNumber', async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string
    const surahNumber = parseInt(req.params.surahNumber, 10)

    if (!userId) {
      return res.status(400).json({
        error: 'userId query parameter is required',
      })
    }

    if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
      return res.status(400).json({
        error: 'surahNumber must be between 1 and 114',
      })
    }

    const progress = await readingProgressRoutes.getSurahProgress(userId, surahNumber)

    res.json({
      success: true,
      data: progress || null,
    })
  } catch (error) {
    console.error('Error fetching surah progress:', error)
    res.status(500).json({
      error: 'Failed to fetch surah progress',
      details: NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
})

/**
 * POST /api/reading-progress
 * Update reading progress
 * Body: { userId: string, surahNumber: number, lastAyahRead: number }
 */
app.post('/api/reading-progress', async (req: Request, res: Response) => {
  try {
    const { userId, surahNumber, lastAyahRead } = req.body

    if (
      !userId ||
      typeof surahNumber !== 'number' ||
      typeof lastAyahRead !== 'number'
    ) {
      return res.status(400).json({
        error: 'userId, surahNumber, and lastAyahRead are required',
      })
    }

    if (surahNumber < 1 || surahNumber > 114) {
      return res.status(400).json({
        error: 'surahNumber must be between 1 and 114',
      })
    }

    const updated = await readingProgressRoutes.updateReadingProgress(
      userId,
      surahNumber,
      lastAyahRead
    )

    res.json({
      success: true,
      data: updated,
    })
  } catch (error) {
    console.error('Error updating reading progress:', error)
    res.status(500).json({
      error: 'Failed to update reading progress',
      details: NODE_ENV === 'development' ? String(error) : undefined,
    })
  }
})

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
