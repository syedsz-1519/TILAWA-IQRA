import mongoose from 'mongoose'

let isConnected = false

/**
 * Connect to MongoDB
 * @returns {Promise<typeof mongoose>}
 */
export async function connectToDatabase() {
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
export async function disconnectDatabase() {
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
export function getDatabase() {
  return mongoose.connection
}

/**
 * Get Mongoose instance
 * @returns {typeof mongoose}
 */
export function getMongoose() {
  return mongoose
}

/**
 * Check if connected to database
 * @returns {boolean}
 */
export function isDbConnected() {
  return isConnected && mongoose.connection.readyState === 1
}

export default mongoose
