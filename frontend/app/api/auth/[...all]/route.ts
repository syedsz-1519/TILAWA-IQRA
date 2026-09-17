import { auth, getAuth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

let authHandlers: any = null
let authInitError: Error | null = null

try {
  const authInstance = auth || getAuth()
  authHandlers = toNextJsHandler(authInstance.handler)
} catch (error) {
  authInitError = error instanceof Error ? error : new Error(String(error))
  console.error('❌ Auth initialization failed:', authInitError.message)
}

const getErrorResponse = () =>
  new Response(
    JSON.stringify({
      error: 'Authentication service unavailable',
      details: authInitError?.message || 'Auth not initialized',
      help: 'Ensure DATABASE_URL and BETTER_AUTH_SECRET are set in environment variables',
    }),
    {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    }
  )

export const GET = (req: Request) => {
  if (authHandlers?.GET) {
    return authHandlers.GET(req)
  }
  return getErrorResponse()
}

export const POST = (req: Request) => {
  if (authHandlers?.POST) {
    return authHandlers.POST(req)
  }
  return getErrorResponse()
}

