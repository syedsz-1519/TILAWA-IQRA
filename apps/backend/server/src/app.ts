import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import { config } from './config/env'
import { requestIdMiddleware } from './middlewares/requestId'
import { mongoSanitizeMiddleware } from './middlewares/sanitizer'
import { globalLimiter } from './middlewares/rateLimit'
import { errorHandler } from './middlewares/errorHandler'
import { notFoundHandler } from './middlewares/notFound'
import { isDbConnected } from './db'

// Import module routes
import authRoutes from './modules/auth/auth.routes'
import usersRoutes from './modules/users/users.routes'
import hifzRoutes from './modules/hifz/hifz.routes'
import progressRoutes from './modules/progress/progress.routes'
import bookmarksRoutes from './modules/bookmarks/bookmarks.routes'
import nafsRoutes from './modules/nafs/nafs.routes'
import streaksRoutes from './modules/streaks/streaks.routes'
import settingsRoutes from './modules/settings/settings.routes'

export function createApp(): Express {
  const app = express()

  // Trust Railway proxy headers for accurate client IP detection in rate limiting
  app.set('trust proxy', 1)
  app.disable('x-powered-by')

  // Core Security & Compression Middlewares
  app.use(helmet())
  app.use(compression())
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true, limit: '1mb' }))
  app.use(cookieParser())

  // CORS Configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true)
        if (config.corsOrigins.includes(origin) || origin.endsWith('.vercel.app') || !config.isProduction) {
          return callback(null, true)
        }
        return callback(new Error(`CORS policy blocks access from origin ${origin}`))
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-request-id'],
    })
  )

  // Custom Request Id & Input Sanitization
  app.use(requestIdMiddleware)
  app.use(mongoSanitizeMiddleware)

  // Rate Limiting
  app.use(globalLimiter)

  // Health Checks
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      service: 'TILAWA API',
      version: '1.0.0',
      environment: config.nodeEnv,
      database: isDbConnected() ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    })
  })

  app.get('/ready', (_req: Request, res: Response) => {
    if (isDbConnected()) {
      res.status(200).json({ status: 'ready', database: 'connected' })
    } else {
      res.status(503).json({ status: 'not_ready', database: 'disconnected' })
    }
  })

  // OpenAPI Specs Endpoint
  app.get('/api/docs/openapi.json', (_req: Request, res: Response) => {
    res.json({
      openapi: '3.0.0',
      info: {
        title: 'TILAWA Quranic Learning API',
        version: '1.0.0',
        description: 'Production REST API for TILAWA web and mobile apps.',
      },
      servers: [{ url: '/api/v1' }],
      paths: {
        '/auth/register': { post: { summary: 'Register new user account' } },
        '/auth/login': { post: { summary: 'Login with email & password' } },
        '/auth/refresh': { post: { summary: 'Rotate refresh token & get new access token' } },
        '/hifz/progress': { get: { summary: 'Get Hifz memorization progress' } },
        '/progress': { get: { summary: 'Get reading progress' } },
        '/bookmarks/quran': { get: { summary: 'Get Quran bookmarks' } },
        '/streaks': { get: { summary: 'Get study streak and XP' } },
      },
    })
  })

  // ===============================================
  // Versioned V1 API Routes
  // ===============================================
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/users', usersRoutes)
  app.use('/api/v1/hifz', hifzRoutes)
  app.use('/api/v1/progress', progressRoutes)
  app.use('/api/v1/bookmarks', bookmarksRoutes)
  app.use('/api/v1/nafs', nafsRoutes)
  app.use('/api/v1/streaks', streaksRoutes)
  app.use('/api/v1', settingsRoutes)

  // ===============================================
  // Backward-Compatible Legacy Routes (Unversioned)
  // Ensures existing Web (Vercel) & Mobile (Flutter) clients work without breakages
  // ===============================================
  app.use('/api/hifz', hifzRoutes)
  app.use('/api/reading-progress', progressRoutes)
  app.use('/api/bookmarks', bookmarksRoutes)
  app.use('/api/streaks', streaksRoutes)
  app.use('/', settingsRoutes)
  app.use('/', bookmarksRoutes)

  // 404 & Global Error Handling
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
