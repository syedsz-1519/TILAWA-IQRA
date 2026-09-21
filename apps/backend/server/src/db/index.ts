import { MongoClient, Db } from 'mongodb'

let db: Db | null = null
let mongoClient: MongoClient | null = null

async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db
  }

  if (!process.env.DATABASE_URL) {
    throw new Error(
      '❌ DATABASE_URL environment variable is not set. ' +
      'Please configure MongoDB connection string in your .env file.\n' +
      'Example: mongodb+srv://username:password@cluster.mongodb.net/database_name'
    )
  }

  try {
    mongoClient = new MongoClient(process.env.DATABASE_URL, {
      maxPoolSize: 10,
      minPoolSize: 1,
    })

    await mongoClient.connect()
    console.log('✅ Connected to MongoDB')

    // Get the database (default to 'tilawa_dev' or extract from connection string)
    const dbName = process.env.DATABASE_URL.split('/').pop()?.split('?')[0] || 'tilawa_dev'
    db = mongoClient.db(dbName)

    return db
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error)
    throw error
  }
}

// Initialize connection immediately if DATABASE_URL is set
if (process.env.DATABASE_URL) {
  connectToDatabase().catch((error) => {
    console.error('Failed to initialize database connection:', error)
    process.exit(1)
  })
} else {
  console.warn(
    '⚠️  DATABASE_URL not configured. Database features will be unavailable.\n' +
    'To enable database features, set DATABASE_URL in your .env file.\n' +
    'Example: mongodb+srv://user:password@cluster.mongodb.net/tilawa_dev'
  )
}

// Export for compatibility with existing code
export { connectToDatabase, mongoClient, db as default }
export const getDb = (): Db | null => db
export type Database = Db
