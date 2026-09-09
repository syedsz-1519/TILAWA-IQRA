import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// Only create pool if DATABASE_URL is available (skip in build environments without DB)
let pool: Pool | null = null

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Vercel serverless: set connection timeout and idle timeout
    // Increased to handle cold starts and network latency
    idleTimeoutMillis: 60000,        // 60 seconds
    connectionTimeoutMillis: 15000,  // 15 seconds (was 5s, too short)
    max: 5,                           // Limit connections for serverless
    min: 1,                           // Maintain minimum connection
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
    throw new Error(
      'DATABASE_URL not configured. Database operations not available. ' +
      'Ensure DATABASE_URL is set in Vercel environment variables.'
    )
  }
  return drizzle(currentPool, { schema })
}
