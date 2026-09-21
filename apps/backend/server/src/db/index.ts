import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

let isConnected = false

/**
 * Connect to MongoDB
 * @returns {Promise<typeof mongoose>}
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection')
    return mongoose
  }

  try {
    const mongoUri = process.env.MONGODB_URI

    if (!mongoUri) {
      throw new Error(
        '❌ MONGODB_URI environment variable is not set.\n' +
        'Please add MONGODB_URI to your .env file.\n' +
        'Example: mongodb+srv://username:password@cluster.mongodb.net/database_name'
      )
    }

    console.log('🔄 Connecting to MongoDB...')
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    isConnected = true

    console.log('✅ Successfully connected to MongoDB')
    console.log(`📊 Database: ${mongoose.connection.db?.databaseName || 'unknown'}`)
    console.log(`🔗 Host: ${mongoose.connection.host}`)

    return mongoose
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:')
    console.error(`   Error: ${error instanceof Error ? error.message : String(error)}`)
    isConnected = false
    throw error
  }
}

/**
 * Disconnect from MongoDB
 * @returns {Promise<void>}
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    if (isConnected) {
      await mongoose.disconnect()
      isConnected = false
      console.log('✅ Disconnected from MongoDB')
    }
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error instanceof Error ? error.message : String(error))
    throw error
  }
}

/**
 * Get MongoDB connection instance
 * @returns {mongoose.Connection}
 */
export function getDb(): mongoose.Connection {
  return mongoose.connection
}

/**
 * Check if connected to database
 * @returns {boolean}
 */
export function isDbConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1
}

/**
 * Get Mongoose instance
 * @returns {typeof mongoose}
 */
export function getMongoose(): typeof mongoose {
  return mongoose
}

export default mongoose
