import rateLimit from 'express-rate-limit'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, _res: Response, next: NextFunction) => {
    next(ApiError.tooManyRequests('Too many requests from this IP, please try again later.'))
  },
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit auth attempts to 15 per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, _res: Response, next: NextFunction) => {
    next(ApiError.tooManyRequests('Too many authentication attempts, please try again after 15 minutes.'))
  },
})

export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // Limit searches to 60 per minute
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, _res: Response, next: NextFunction) => {
    next(ApiError.tooManyRequests('Too many search requests, please slow down.'))
  },
})
