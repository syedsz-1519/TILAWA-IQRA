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

// All explicitly allowed origins: web deployments + configured flutter origins
const ALL_ALLOWED_ORIGINS: string[] = [
  ...config.corsOrigins,
  ...config.flutterOrigins,
]

export function createApp(): Express {
  const app = express()

  // Trust Railway/Vercel proxy — needed for accurate client IP in rate limiting
  app.set('trust proxy', 1)
  app.disable('x-powered-by')

  // =============================================
  // SECURITY HEADERS — Helmet (hardened)
  // =============================================
  app.use(
    helmet({
      // Strict-Transport-Security: enforce HTTPS for 1 year
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      // CSP: API-only server — no frontend assets, lock everything down
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'none'"],
          scriptSrc: ["'none'"],
          styleSrc: ["'none'"],
          imgSrc: ["'none'"],
          connectSrc: ["'self'"],
          fontSrc: ["'none'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          formAction: ["'none'"],
          baseUri: ["'none'"],
        },
      },
      noSniff: true,
      dnsPrefetchControl: { allow: false },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      frameguard: { action: 'deny' },
      // crossOriginEmbedderPolicy disabled — breaks native mobile HTTP clients
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: { policy: 'same-origin' },
      // cross-origin needed so mobile/web clients can consume this API
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  )

  // =============================================
  // CORS — strict origin whitelist in production
  // =============================================
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow no-origin requests: native mobile apps, curl, server-to-server
        if (!origin) return callback(null, true)

        // In development: allow all origins for ease of local testing
        if (!config.isProduction) return callback(null, true)

        // Production: explicit whitelist + *.vercel.app for preview deployments
        if (
          ALL_ALLOWED_ORIGINS.includes(origin) ||
          origin.endsWith('.vercel.app')
        ) {
          return callback(null, true)
        }

        callback(new Error(`CORS: Origin '${origin}' is not allowed`))
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-request-id'],
      exposedHeaders: ['X-Request-ID', 'RateLimit-Limit', 'RateLimit-Remaining'],
    })
  )

  // =============================================
  // BODY PARSING & COMPRESSION
  // =============================================
  app.use(compression())
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true, limit: '1mb' }))
  // Signed cookies using COOKIE_SECRET from env
  app.use(cookieParser(config.cookieSecret))

  // =============================================
  // REQUEST ID & NOSQL INJECTION SANITIZATION
  // =============================================
  app.use(requestIdMiddleware)
  app.use(mongoSanitizeMiddleware)

  // =============================================
  // GLOBAL RATE LIMITING — 100 req/min per IP
  // Auth routes have their own stricter limiter (10/15min)
  // =============================================
  app.use(globalLimiter)

  // =============================================
  // HEALTH CHECKS (unauthenticated, not rate-limited individually)
  // =============================================
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

  // =============================================
  // OPENAPI SPEC STUB
  // =============================================
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

  // =============================================
  // VERSIONED V1 API ROUTES
  // =============================================
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/users', usersRoutes)
  app.use('/api/v1/hifz', hifzRoutes)
  app.use('/api/v1/progress', progressRoutes)
  app.use('/api/v1/bookmarks', bookmarksRoutes)
  app.use('/api/v1/nafs', nafsRoutes)
  app.use('/api/v1/streaks', streaksRoutes)
  app.use('/api/v1', settingsRoutes)

  // =============================================
  // BACKWARD-COMPATIBLE LEGACY ROUTES (unversioned)
  // Keeps existing Vercel web + Flutter mobile clients working
  // TODO: Remove once both clients are migrated to /api/v1/
  // =============================================
  app.use('/api/hifz', hifzRoutes)
  app.use('/api/reading-progress', progressRoutes)
  app.use('/api/bookmarks', bookmarksRoutes)
  app.use('/api/streaks', streaksRoutes)
  app.use('/', settingsRoutes)
  app.use('/', bookmarksRoutes)

  // 404 & global error handler — must be last
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
