/**
 * Frontend Auth - Session fetching only
 * 
 * IMPORTANT: Better Auth is initialized on the BACKEND only.
 * Frontend only calls the backend session endpoint to get user info.
 * 
 * Database credentials (DATABASE_URL, BETTER_AUTH_SECRET) are NEVER in frontend.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

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
 * Get current user session from backend
 * Returns null if not authenticated
 */
export async function getSession(): Promise<Session | null> {
  try {
    const response = await fetch(`${API_URL}/api/auth/session`, {
      method: 'GET',
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.session || null
  } catch (error) {
    console.error('Failed to fetch session:', error)
    return null
  }
}

/**
 * Sign in user
 */
export async function signIn(email: string, password: string): Promise<Response> {
  return fetch(`${API_URL}/api/auth/sign-in/email`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
}

/**
 * Sign up user
 */
export async function signUp(
  email: string,
  password: string,
  name?: string
): Promise<Response> {
  return fetch(`${API_URL}/api/auth/sign-up/email`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  })
}

/**
 * Sign out user
 */
export async function signOut(): Promise<Response> {
  return fetch(`${API_URL}/api/auth/sign-out`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

/**
 * Get session with better error handling
 */
export async function getSessionSafe(): Promise<SessionUser | null> {
  try {
    const session = await getSession()
    return session?.user || null
  } catch {
    return null
  }
}


