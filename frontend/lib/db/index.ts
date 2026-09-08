import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// Only create pool if DATABASE_URL is available (skip in build environments without DB)
let pool: Pool | null = null

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Vercel serverless: set connection timeout and idle timeout
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  })
}

// Export null-safe pool - handle case where database is not available
export const getPool = () => {
  if (!pool && process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    })
  }
  return pool
}

export const pool_instance = pool

export const db = pool ? drizzle(pool, { schema }) : null

// Export helper for API routes to get or create DB instance
export function getDb() {
  const currentPool = getPool()
  if (!currentPool) {
    throw new Error('DATABASE_URL not configured. Database operations not available.')
  }
  return drizzle(currentPool, { schema })
}
