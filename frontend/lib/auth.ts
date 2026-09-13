import { betterAuth } from 'better-auth'
import { getPool } from '@/lib/db'

/**
 * BETTER_AUTH_SECRET Configuration for Vercel Production
 * 
 * On Vercel, secrets must be:
 * 1. Set in Vercel Dashboard → Settings → Environment Variables (NOT in .env files)
 * 2. Different for each environment (production, preview, development)
 * 3. At least 32 characters for security
 * 
 * Generate a secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
 * Then add to Vercel dashboard BEFORE deployment.
 */

function validateBetterAuthSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET

  if (!secret) {
    // In production, allow build to proceed but mark for runtime error
    // The actual error will be thrown when getAuth() is called
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️  WARNING: BETTER_AUTH_SECRET not set. Auth will fail at runtime.')
      return 'build-time-placeholder-do-not-use'
    }
    // Development fallback
    return 'dev-secret-only-for-local-development'
  }

  if (secret.length < 32 && process.env.NODE_ENV === 'production') {
    console.warn(
      `⚠️  WARNING: BETTER_AUTH_SECRET is only ${secret.length} characters. ` +
      'Recommended: 32+ characters for security.'
    )
  }

  return secret
}

/**
 * Get the base URL for Better Auth
 * Handles Vercel preview, production, and local development
 */
function getBaseURL(): string {
  // Vercel production URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  // Vercel preview/staging URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Environment variable override
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL
  }

  // V0 runtime (development in editor)
  if (process.env.V0_RUNTIME_URL) {
    return process.env.V0_RUNTIME_URL
  }

  // Local development fallback
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }

  // Production must have a URL
  throw new Error(
    'Cannot determine auth base URL. Set VERCEL_PROJECT_PRODUCTION_URL, VERCEL_URL, or BETTER_AUTH_URL.'
  )
}

/**
 * Get trusted origins for CORS
 * Allows auth requests from frontend URLs
 */
function getTrustedOrigins(): string[] {
  const origins: string[] = []

  if (process.env.V0_RUNTIME_URL) {
    origins.push(process.env.V0_RUNTIME_URL)
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    origins.push(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }

  if (process.env.VERCEL_URL) {
    origins.push(`https://${process.env.VERCEL_URL}`)
  }

  if (process.env.BETTER_AUTH_URL) {
    origins.push(process.env.BETTER_AUTH_URL)
  }

  // Always allow localhost in development
  if (process.env.NODE_ENV === 'development') {
    origins.push('http://localhost:3000', 'http://localhost:3001')
  }

  // In production, throw if no origins configured
  if (origins.length === 0 && process.env.NODE_ENV === 'production') {
    throw new Error(
      'No trusted origins configured for authentication. ' +
      'Set VERCEL_PROJECT_PRODUCTION_URL, VERCEL_URL, or BETTER_AUTH_URL.'
    )
  }

  return origins.length > 0 ? origins : ['http://localhost:3000']
}

// Get database pool (will be null if DATABASE_URL not set)
const pool = getPool()

// Initialize Better Auth with validated secret
let authInstance: any = null
let initError: Error | null = null

try {
  if (!pool) {
    initError = new Error(
      'DATABASE_URL not configured. Better Auth will not be initialized.'
    )
  } else {
    const secret = validateBetterAuthSecret()

    authInstance = betterAuth({
      database: pool as any,
      secret,
      baseURL: getBaseURL(),
      emailAndPassword: {
        enabled: true,
        autoSignIn: true,
      },
      trustedOrigins: getTrustedOrigins(),
      session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
      },
      advanced: {
        defaultCookieAttributes: {
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          secure: process.env.NODE_ENV === 'production', // HTTPS only in production
          httpOnly: true,
        },
      },
    } as any)
  }
} catch (error) {
  initError = error instanceof Error ? error : new Error(String(error))
}

// Helper to get auth or fallback
export function getAuth() {
  if (authInstance) return authInstance
  return {
    api: {
      getSession: async () => null,
    },
  }
}

// Export auth - either the real instance or a null-safe proxy
export const auth = authInstance || {
  api: {
    getSession: async () => null,
  },
}

