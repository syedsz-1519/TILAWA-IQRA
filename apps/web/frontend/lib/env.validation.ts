/**
 * Environment Variable Validation
 * Ensures all required environment variables are set for Vercel deployment
 */

interface EnvValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function validateEnvironment(): EnvValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Check production-specific variables
  if (process.env.NODE_ENV === 'production') {
    // DATABASE_URL is required for auth
    if (!process.env.DATABASE_URL) {
      errors.push(
        'DATABASE_URL is not set. Authentication will not work. ' +
        'Set it in Vercel → Project Settings → Environment Variables.'
      )
    }

    // BETTER_AUTH_SECRET is required for secure sessions
    if (!process.env.BETTER_AUTH_SECRET) {
      errors.push(
        'BETTER_AUTH_SECRET is not set. User sessions will be insecure. ' +
        'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
      )
    } else if (process.env.BETTER_AUTH_SECRET.length < 32) {
      errors.push(
        `BETTER_AUTH_SECRET is too short (${process.env.BETTER_AUTH_SECRET.length} chars). ` +
        'Minimum 32 characters required for security.'
      )
    }

    // Check for base URL configuration
    const hasBaseUrl =
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL ||
      process.env.BETTER_AUTH_URL ||
      process.env.V0_RUNTIME_URL

    if (!hasBaseUrl) {
      warnings.push(
        'No base URL configured (VERCEL_PROJECT_PRODUCTION_URL, VERCEL_URL, BETTER_AUTH_URL). ' +
        'Auth may fail. Vercel usually auto-injects VERCEL_PROJECT_PRODUCTION_URL.'
      )
    }
  }

  // Development environment checks
  if (process.env.NODE_ENV === 'development') {
    if (!process.env.DATABASE_URL) {
      warnings.push(
        'DATABASE_URL not set for development. Database features will not work. ' +
        'See frontend/.env.local.example for setup instructions.'
      )
    }

    if (!process.env.BETTER_AUTH_SECRET) {
      warnings.push(
        'BETTER_AUTH_SECRET not set. Using development default. ' +
        'Set BETTER_AUTH_SECRET in .env.local for consistent behavior.'
      )
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Log validation results for debugging
 */
export function logEnvironmentValidation(): void {
  const validation = validateEnvironment()

  if (validation.errors.length > 0) {
    console.error('❌ Environment Validation Errors:')
    validation.errors.forEach((error) => console.error(`   - ${error}`))
  }

  if (validation.warnings.length > 0) {
    console.warn('⚠️  Environment Validation Warnings:')
    validation.warnings.forEach((warning) => console.warn(`   - ${warning}`))
  }

  if (validation.isValid && process.env.NODE_ENV === 'production') {
    console.log('✅ Environment validation passed')
  }
}

/**
 * Throw error in production if validation fails
 */
export function validateEnvironmentOrThrow(): void {
  const validation = validateEnvironment()

  if (!validation.isValid) {
    const errorMessage = [
      'Environment validation failed:',
      ...validation.errors.map((e) => `  ❌ ${e}`),
    ].join('\n')

    throw new Error(errorMessage)
  }
}
