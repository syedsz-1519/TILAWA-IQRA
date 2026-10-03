import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'

declare global {
  namespace Express {
    interface Request {
      id?: string
    }
  }
}

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const existingId = req.header('x-request-id')
  const requestId = existingId || crypto.randomUUID()

  req.id = requestId
  res.setHeader('x-request-id', requestId)
  next()
}
