import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { sendError } from '../utils/response'
import { logger } from '../config/logger'
import { config } from '../config/env'

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  let error = err

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || 500
    const message = error.message || 'Internal Server Error'
    error = new ApiError(statusCode, message, 'INTERNAL_ERROR', error.details)
  }

  const { statusCode, message, code, details } = error as ApiError

  logger.error({
    err,
    requestId: req.id,
    method: req.method,
    path: req.path,
    statusCode,
    code,
  })

  // In production, hide detailed error messages for unhandled 500 errors
  const clientMessage = config.isProduction && statusCode === 500
    ? 'An unexpected error occurred on the server'
    : message

  return sendError(res, statusCode, clientMessage, code, details)
}
