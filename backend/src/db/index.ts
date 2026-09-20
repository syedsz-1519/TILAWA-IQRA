import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

let db: any = null

if (process.env.DATABASE_URL) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  
  db = drizzle(pool, { schema })
} else {
  console.warn(
    '⚠️  DATABASE_URL not configured. Database features will be unavailable.\n' +
    'To enable database features, set DATABASE_URL in your .env file.\n' +
    'Example: postgresql://user:password@localhost:5432/tilawa_dev'
  )
}

export { db }

export type Database = typeof db
