import { Response } from 'express'

export interface ApiResponseMeta {
  page?: number
  limit?: number
  total?: number
  totalPages?: number
  hasMore?: boolean
  timestamp?: string
  [key: string]: any
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  meta?: ApiResponseMeta
  error?: {
    code: string
    message: string
    details?: any
  }
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  meta?: ApiResponseMeta
): Response {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      ...meta,
      timestamp: new Date().toISOString(),
    },
  }
  return res.status(statusCode).json(response)
}

export function sendError(
  res: Response,
  statusCode: number = 500,
  message: string = 'Internal Server Error',
  code: string = 'INTERNAL_ERROR',
  details?: any
): Response {
  const response: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  }
  return res.status(statusCode).json(response)
}
