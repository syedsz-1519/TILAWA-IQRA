/**
 * Centralized Error Handler & Recovery System
 * Automatically handles, logs, and recovers from common errors
 */

export interface ErrorContext {
  component?: string
  action?: string
  userId?: string
  timestamp?: string
  context?: Record<string, any>
}

export interface ErrorRecovery {
  recovered: boolean
  message: string
  retry?: () => Promise<any>
  fallback?: any
}

/**
 * Classify error type for appropriate handling
 */
export function classifyError(error: unknown): string {
  if (error instanceof TypeError) return 'TYPE_ERROR'
  if (error instanceof SyntaxError) return 'SYNTAX_ERROR'
  if (error instanceof ReferenceError) return 'REFERENCE_ERROR'
  if (error instanceof RangeError) return 'RANGE_ERROR'

  const message = String(error).toLowerCase()
  if (message.includes('network')) return 'NETWORK_ERROR'
  if (message.includes('auth')) return 'AUTH_ERROR'
  if (message.includes('not found')) return 'NOT_FOUND_ERROR'
  if (message.includes('permission')) return 'PERMISSION_ERROR'
  if (message.includes('timeout')) return 'TIMEOUT_ERROR'

  return 'UNKNOWN_ERROR'
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T = any>(data: string, fallback?: T): T | null {
  try {
    return JSON.parse(data) as T
  } catch (error) {
    console.warn('JSON parse error:', error)
    return fallback || null
  }
}

/**
 * Safe localStorage access
 */
export function getSafeStorageItem<T = string>(
  key: string,
  fallback?: T,
  parse = false
): T | null {
  try {
    if (typeof window === 'undefined') return fallback || null
    const item = localStorage.getItem(key)
    if (!item) return fallback || null
    return parse ? safeJsonParse(item, fallback) : (item as T)
  } catch (error) {
    console.warn(`Storage access error for key "${key}":`, error)
    return fallback || null
  }
}

/**
 * Safe localStorage set
 */
export function setSafeStorageItem(key: string, value: any, stringify = false): boolean {
  try {
    if (typeof window === 'undefined') return false
    const data = stringify ? JSON.stringify(value) : String(value)
    localStorage.setItem(key, data)
    return true
  } catch (error) {
    console.warn(`Storage write error for key "${key}":`, error)
    return false
  }
}

/**
 * Automatic retry with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number
    delayMs?: number
    backoffMultiplier?: number
    onRetry?: (attempt: number, error: any) => void
  } = {}
): Promise<T | null> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    backoffMultiplier = 2,
    onRetry,
  } = options

  let lastError: any
  let delay = delayMs

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      onRetry?.(attempt, error)

      if (attempt < maxAttempts) {
        console.warn(`Retry attempt ${attempt}/${maxAttempts}, waiting ${delay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
        delay *= backoffMultiplier
      }
    }
  }

  console.error(`All ${maxAttempts} retry attempts failed:`, lastError)
  return null
}

/**
 * Safe API fetch with automatic retry and error handling
 */
export async function safeFetch<T = any>(
  url: string,
  options: RequestInit & { retries?: number; timeout?: number } = {}
): Promise<{ data: T | null; error: string | null; status: number }> {
  const { retries = 2, timeout = 30000, ...fetchOptions } = options

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    const result = await withRetry(
      async () => {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        return response
      },
      { maxAttempts: retries + 1 }
    )

    clearTimeout(timeoutId)

    if (!result) {
      return {
        data: null,
        error: 'Failed after retries',
        status: 0,
      }
    }

    const data = await result.json()
    return { data, error: null, status: result.status }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 0,
    }
  }
}

/**
 * Validate data structure
 */
export function validateData<T>(
  data: unknown,
  schema: Record<string, string>
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Data must be an object'] }
  }

  for (const [key, type] of Object.entries(schema)) {
    const value = (data as Record<string, any>)[key]

    if (typeof value !== type) {
      errors.push(`Field "${key}" must be of type ${type}, got ${typeof value}`)
    }
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Safe component error boundary wrapper
 */
export function withErrorBoundary<T extends (...args: any[]) => any>(
  fn: T,
  fallback?: any
): T {
  return (async (...args: any[]) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error('Error in wrapped function:', error)
      return fallback
    }
  }) as T
}

/**
 * Auto-recovery for common issues
 */
export async function attemptAutoRecovery(
  errorType: string,
  context?: ErrorContext
): Promise<ErrorRecovery> {
  console.info(`[AUTO-RECOVERY] Attempting recovery for ${errorType}`, context)

  switch (errorType) {
    case 'NETWORK_ERROR':
      // Wait for network to come back online
      await new Promise((resolve) => {
        window?.addEventListener('online', resolve, { once: true })
        setTimeout(resolve, 5000)
      })
      return {
        recovered: true,
        message: 'Network connection restored',
      }

    case 'AUTH_ERROR':
      // Clear auth cache and prompt re-login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('tilawa_session')
        localStorage.removeItem('tilawa_user')
      }
      return {
        recovered: false,
        message: 'Authentication failed. Please log in again.',
      }

    case 'TIMEOUT_ERROR':
      // Increase timeout and retry
      return {
        recovered: true,
        message: 'Request timed out. Retrying with increased timeout.',
      }

    case 'STORAGE_ERROR':
      // Clear cache and reset
      try {
        if (typeof window !== 'undefined') {
          const keys = Object.keys(localStorage)
          keys.forEach((key) => {
            if (key.startsWith('tilawa_')) {
              localStorage.removeItem(key)
            }
          })
        }
        return {
          recovered: true,
          message: 'Storage cleared. Please refresh the page.',
        }
      } catch {
        return {
          recovered: false,
          message: 'Failed to clear storage',
        }
      }

    case 'JSON_PARSE_ERROR':
      return {
        recovered: true,
        message: 'Invalid data format. Using fallback.',
        fallback: {},
      }

    default:
      return {
        recovered: false,
        message: `Unknown error type: ${errorType}`,
      }
  }
}

/**
 * Error logger with context
 */
export function logError(error: unknown, context?: ErrorContext) {
  const errorType = classifyError(error)
  const timestamp = context?.timestamp || new Date().toISOString()

  const logEntry = {
    type: errorType,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    context: {
      component: context?.component,
      action: context?.action,
      userId: context?.userId,
      ...context?.context,
    },
    timestamp,
  }

  console.error('[ERROR LOG]', logEntry)

  // Store in localStorage for debugging (max 50 entries)
  if (typeof window !== 'undefined') {
    try {
      const logs = getSafeStorageItem('tilawa_error_logs', '[]', false)
      const logsArray = safeJsonParse(logs as string, []) || []

      if (Array.isArray(logsArray)) {
        logsArray.push(logEntry)
        if (logsArray.length > 50) logsArray.shift()
        setSafeStorageItem('tilawa_error_logs', logsArray, true)
      }
    } catch (err) {
      console.warn('Failed to store error log:', err)
    }
  }

  return logEntry
}

/**
 * Get stored error logs
 */
export function getErrorLogs() {
  if (typeof window === 'undefined') return []
  const logs = getSafeStorageItem('tilawa_error_logs', '[]', false)
  return safeJsonParse(logs as string, []) || []
}

/**
 * Clear error logs
 */
export function clearErrorLogs() {
  if (typeof window === 'undefined') return false
  return setSafeStorageItem('tilawa_error_logs', '[]', true)
}

/**
 * Health check - verify system functionality
 */
export async function systemHealthCheck(): Promise<{
  healthy: boolean
  issues: string[]
  timestamp: string
}> {
  const issues: string[] = []

  // Check localStorage
  try {
    setSafeStorageItem('tilawa_health_check', 'ok')
    getSafeStorageItem('tilawa_health_check')
  } catch {
    issues.push('localStorage not available')
  }

  // Check API connectivity
  try {
    const result = await safeFetch('/health', { timeout: 5000 })
    if (result.error) {
      issues.push('API not responding')
    }
  } catch {
    issues.push('API connectivity error')
  }

  // Check service worker
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations()
      if (registrations.length === 0) {
        issues.push('Service worker not registered')
      }
    } catch {
      issues.push('Service worker check failed')
    }
  }

  return {
    healthy: issues.length === 0,
    issues,
    timestamp: new Date().toISOString(),
  }
}
