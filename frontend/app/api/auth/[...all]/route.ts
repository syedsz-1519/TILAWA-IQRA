import { auth, getAuth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

// Get auth instance - will throw if not properly configured
const authInstance = auth || getAuth()

export const { GET, POST } = toNextJsHandler(authInstance.handler)
