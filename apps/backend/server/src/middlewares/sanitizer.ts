import { Request, Response, NextFunction } from 'express'

function sanitizeValue(value: any): any {
  if (value === null || value === undefined) return value

  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue)
  }

  if (typeof value === 'object') {
    const cleanObj: Record<string, any> = {}
    for (const key of Object.keys(value)) {
      // Strip keys starting with $ or containing . to prevent NoSQL query operator injection
      if (key.startsWith('$') || key.includes('.')) {
        continue
      }
      cleanObj[key] = sanitizeValue(value[key])
    }
    return cleanObj
  }

  return value
}

export function mongoSanitizeMiddleware(req: Request, _res: Response, next: NextFunction): void {
  if (req.body) req.body = sanitizeValue(req.body)
  if (req.query) req.query = sanitizeValue(req.query)
  if (req.params) req.params = sanitizeValue(req.params)
  next()
}
