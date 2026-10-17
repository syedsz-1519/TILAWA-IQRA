/**
 * Environment Variable Validation — Frontend only.
 * Only checks NEXT_PUBLIC_* variables that the frontend actually uses.
 */

interface EnvValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function validateEnvironment(): EnvValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // The frontend is now fully offline — no backend required.
  // Only warn if the API URL is set but points to localhost in production.
  if (process.env.NODE_ENV === 'production') {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (apiUrl && (apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1'))) {
      warnings.push(
        'NEXT_PUBLIC_API_URL points to localhost in production. ' +
        'This is expected if running fully offline/frontend-only mode.'
      )
    }
  }

  return { isValid: errors.length === 0, errors, warnings }
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
