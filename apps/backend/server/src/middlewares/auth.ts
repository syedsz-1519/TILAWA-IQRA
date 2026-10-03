import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken, AccessTokenPayload } from '../utils/crypto'
import { ApiError } from '../utils/ApiError'

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  try {
    let token: string | undefined

    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    } else if (req.cookies && req.cookies['tilawa-token']) {
      token = req.cookies['tilawa-token']
    }

    if (!token) {
      throw ApiError.unauthorized('Authentication token missing')
    }

    const payload = verifyAccessToken(token)
    req.user = payload
    next()
  } catch (error: any) {
    if (error instanceof ApiError) {
      next(error)
    } else {
      next(ApiError.unauthorized('Invalid or expired authentication token'))
    }
  }
}

export function optionalAuthenticate(req: Request, _res: Response, next: NextFunction): void {
  try {
    let token: string | undefined

    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    } else if (req.cookies && req.cookies['tilawa-token']) {
      token = req.cookies['tilawa-token']
    }

    if (token) {
      const payload = verifyAccessToken(token)
      req.user = payload
    }
  } catch (_err) {
    // Ignore invalid tokens for optional auth
  }
  next()
}

export function requireRole(role: 'admin' | 'user') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'))
    }

    if (req.user.role !== role && req.user.role !== 'admin') {
      return next(ApiError.forbidden('Insufficient permissions'))
    }

    next()
  }
}

/**
 * Extract userId from req.user — throws 401 if not authenticated.
 * Use in controllers instead of req.user?.userId to keep types clean.
 */
export function getUserId(req: Request): string {
  if (!req.user?.userId) {
    throw ApiError.unauthorized('Authentication required')
  }
  return req.user.userId
}
