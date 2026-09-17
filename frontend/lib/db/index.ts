import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// Only create pool if DATABASE_URL is available
let pool: Pool | null = null

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      idleTimeoutMillis: 60000,
      connectionTimeoutMillis: 15000,
      max: 5,
      min: 1,
    })
  } catch (err) {
    console.warn('[AI Studio] Database connection pool error:', err)
  }
}

export const getPool = () => {
  if (!pool && process.env.DATABASE_URL) {
    try {
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      })
    } catch (err) {
      console.warn('[AI Studio] Database connection pool error:', err)
    }
  }
  return pool
}

export const pool_instance = pool

const noOp = {
  findMany: async () => [],
  findFirst: async () => null,
  findUnique: async () => null,
  create: async (d: any) => d?.data ?? {},
  update: async (d: any) => d?.data ?? {},
  delete: async () => ({}),
}

const mockDb: any = new Proxy({}, {
  get: (_, prop) =>
    prop === 'query'
      ? new Proxy({}, { get: () => noOp })
      : async () => [],
})

let dbInstance: any = null
try {
  if (pool) {
    dbInstance = drizzle(pool, { schema })
  } else {
    dbInstance = mockDb
  }
} catch {
  console.warn('[AI Studio] Database not connected — using mock')
  dbInstance = mockDb
}

export const db = dbInstance

// Export helper for API routes to get or create DB instance
export function getDb() {
  const currentPool = getPool()
  if (!currentPool) {
    return mockDb
  }
  try {
    return drizzle(currentPool, { schema })
  } catch {
    return mockDb
  }
}

