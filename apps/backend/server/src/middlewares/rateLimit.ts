import rateLimit from 'express-rate-limit'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'

export const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, _res: Response, next: NextFunction) => {
    next(ApiError.tooManyRequests('Too many requests from this IP, please try again later.'))
  },
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 auth attempts per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // only count failed attempts
  handler: (_req: Request, _res: Response, next: NextFunction) => {
    next(ApiError.tooManyRequests('Too many authentication attempts, please try again after 15 minutes.'))
  },
})

export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 searches per minute
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, _res: Response, next: NextFunction) => {
    next(ApiError.tooManyRequests('Too many search requests, please slow down.'))
  },
})

