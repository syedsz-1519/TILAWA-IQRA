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
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'CRITICAL: BETTER_AUTH_SECRET is not set in production!\n' +
        'This is required for authentication to work.\n\n' +
        'Steps to fix:\n' +
        '1. Generate a secret: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"\n' +
        '2. Go to Vercel Dashboard → Project Settings → Environment Variables\n' +
        '3. Add: BETTER_AUTH_SECRET=<your-generated-secret>\n' +
        '4. Select environment: Production\n' +
        '5. Redeploy\n\n' +
        'For development, use: dev-secret-only-for-local-development'
      )
    }
    // Development fallback
    console.warn(
      '⚠️  WARNING: Using development secret. Set BETTER_AUTH_SECRET for production use.'
    )
    return 'dev-secret-only-for-local-development'
  }

  if (secret.length < 32 && process.env.NODE_ENV === 'production') {
    throw new Error(
      `BETTER_AUTH_SECRET must be at least 32 characters long for security. Current length: ${secret.length}`
    )
  }

  return secret
}

// Get database pool (will be null if DATABASE_URL not set)
const pool = getPool()

// Initialize Better Auth with validated secret
let authInstance: ReturnType<typeof betterAuth> | null = null

try {
  if (!pool) {
    console.warn(
      'DATABASE_URL not configured. Better Auth will not be initialized. ' +
      'Features requiring authentication will not work.'
    )
  } else {
    const secret = validateBetterAuthSecret()

    authInstance = betterAuth({
      database: pool,
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
    })
  }
} catch (error) {
  console.error('Failed to initialize Better Auth:', error)
  authInstance = null
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
  return 'http://localhost:3000'
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

  return origins.length > 0 ? origins : ['http://localhost:3000']
}

// Export auth instance and helper
export const auth = authInstance

export function getAuth() {
  if (!authInstance) {
    throw new Error(
      'Better Auth not initialized. ' +
      'Check logs above for configuration issues. ' +
      'Ensure DATABASE_URL and BETTER_AUTH_SECRET are set.'
    )
  }
  return authInstance
}
