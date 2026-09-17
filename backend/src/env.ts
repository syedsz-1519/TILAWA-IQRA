/**
 * Environment variable validation using Zod
 * Ensures all required env vars are set and valid at startup
 */

type NodeEnv = 'development' | 'production' | 'test'

interface Env {
  NODE_ENV: NodeEnv
  DATABASE_URL: string
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL?: string
  FRONTEND_URL?: string
  PORT?: number
}

/**
 * Validate and parse environment variables
 * Throws error if required variables are missing or invalid
 */
export function validateEnv(): Env {
  const env: Env = {
    NODE_ENV: (process.env.NODE_ENV || 'development') as NodeEnv,
    DATABASE_URL: process.env.DATABASE_URL || '',
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || '',
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
  }

  // Validate required variables
  const errors: string[] = []

  if (!env.DATABASE_URL) {
    errors.push('DATABASE_URL is required')
  }

  if (!env.BETTER_AUTH_SECRET) {
    errors.push('BETTER_AUTH_SECRET is required')
  } else if (env.BETTER_AUTH_SECRET.length < 32) {
    errors.push('BETTER_AUTH_SECRET must be at least 32 characters')
  }

  if (env.NODE_ENV !== 'development' && env.NODE_ENV !== 'production' && env.NODE_ENV !== 'test') {
    errors.push(`NODE_ENV must be 'development', 'production', or 'test', got '${env.NODE_ENV}'`)
  }

  if (!env.FRONTEND_URL) {
    errors.push('FRONTEND_URL is recommended (defaults to http://localhost:3000)')
  }

  if (isNaN(env.PORT as any)) {
    errors.push(`PORT must be a number, got '${process.env.PORT}'`)
  }

  // Throw error if validation failed
  if (errors.length > 0) {
    console.error('❌ Environment validation failed:')
    errors.forEach((error) => console.error(`  - ${error}`))
    process.exit(1)
  }

  return env
}

// Validate on import
export const env = validateEnv()
