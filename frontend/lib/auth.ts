/**
 * Frontend Auth - Session fetching with automatic error recovery
 * 
 * IMPORTANT: Better Auth is initialized on the BACKEND only.
 * Frontend only calls the backend session endpoint to get user info.
 * 
 * Database credentials (DATABASE_URL, BETTER_AUTH_SECRET) are NEVER in frontend.
 */

import { withRetry, logError, getSafeStorageItem, setSafeStorageItem, type ErrorContext } from './error-handler'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const SESSION_CACHE_KEY = 'tilawa_session_cache'
const SESSION_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export interface SessionUser {
  id: string
  name?: string
  email?: string
  image?: string
  emailVerified: boolean
}

export interface Session {
  user: SessionUser
  expiresAt: string
}

/**
 * Get current user session from backend with automatic retry
 * Returns null if not authenticated
 * Uses cache to reduce API calls
 */
export async function getSession(): Promise<Session | null> {
  const errorContext: ErrorContext = {
    component: 'auth',
    action: 'getSession',
  }

  try {
    // Check cache first
    const cached = getSafeStorageItem<Session | null>(SESSION_CACHE_KEY, null, true)
    if (cached && new Date(cached.expiresAt).getTime() > Date.now()) {
      return cached
    }

    // Fetch with retry
    const result = await withRetry(
      async () => {
        const response = await fetch(`${API_URL}/api/auth/session`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Session fetch failed: ${response.status}`)
        }

        return response.json()
      },
      {
        maxAttempts: 2,
        delayMs: 500,
      }
    )

    if (!result) {
      logError(new Error('Session fetch failed after retries'), errorContext)
      return null
    }

    const session = result.session || null
    if (session) {
      setSafeStorageItem(SESSION_CACHE_KEY, session, true)
    }

    return session
  } catch (error) {
    logError(error, { ...errorContext, context: { error: String(error) } })
    
    // Fallback to cached session if available
    const cached = getSafeStorageItem<Session | null>(SESSION_CACHE_KEY, null, true)
    return cached || null
  }
}

/**
 * Sign in user with error handling
 */
export async function signIn(email: string, password: string): Promise<Response> {
  const errorContext: ErrorContext = {
    component: 'auth',
    action: 'signIn',
    context: { email },
  }

  try {
    return await withRetry(
      async () => {
        const response = await fetch(`${API_URL}/api/auth/sign-in/email`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok && response.status !== 401) {
          throw new Error(`Sign in failed: ${response.status}`)
        }

        return response
      },
      { maxAttempts: 2 }
    ) as Response
  } catch (error) {
    logError(error, errorContext)
    throw error
  }
}

/**
 * Sign up user with error handling
 */
export async function signUp(
  email: string,
  password: string,
  name?: string
): Promise<Response> {
  const errorContext: ErrorContext = {
    component: 'auth',
    action: 'signUp',
    context: { email },
  }

  try {
    return await withRetry(
      async () => {
        const response = await fetch(`${API_URL}/api/auth/sign-up/email`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        })

        if (!response.ok && response.status !== 409) {
          throw new Error(`Sign up failed: ${response.status}`)
        }

        return response
      },
      { maxAttempts: 2 }
    ) as Response
  } catch (error) {
    logError(error, errorContext)
    throw error
  }
}

/**
 * Sign out user with error handling
 */
export async function signOut(): Promise<Response> {
  const errorContext: ErrorContext = {
    component: 'auth',
    action: 'signOut',
  }

  try {
    // Clear cache
    setSafeStorageItem(SESSION_CACHE_KEY, null, false)

    return await fetch(`${API_URL}/api/auth/sign-out`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    logError(error, errorContext)
    throw error
  }
}

/**
 * Get session safely without throwing
 */
export async function getSessionSafe(): Promise<SessionUser | null> {
  try {
    const session = await getSession()
    return session?.user || null
  } catch (error) {
    logError(error, { component: 'auth', action: 'getSessionSafe' })
    return null
  }
}


