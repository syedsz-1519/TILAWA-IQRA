const mongoose = require('mongoose');

/**
 * Connect to MongoDB
 * @returns {Promise<void>}
 */
async function connectToDatabase() {
  try {
    // Get MongoDB connection string from environment variables
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        '❌ MONGODB_URI environment variable is not set.\n' +
        'Please add MONGODB_URI to your .env file.\n' +
        'Example: mongodb+srv://username:password@cluster.mongodb.net/database_name'
      );
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ Successfully connected to MongoDB');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🔗 Host: ${mongoose.connection.host}`);

    return mongoose.connection;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:');
    console.error(`   Error: ${error.message}`);
    
    // Don't exit process - allow graceful handling
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 * @returns {Promise<void>}
 */
async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error.message);
    throw error;
  }
}

/**
 * Get MongoDB connection instance
 * @returns {import('mongoose').Connection}
 */
function getDatabase() {
  return mongoose.connection;
}

/**
 * Get Mongoose instance
 * @returns {import('mongoose')}
 */
function getMongoose() {
  return mongoose;
}

module.exports = {
  connectToDatabase,
  disconnectDatabase,
  getDatabase,
  getMongoose,
  mongoose,
};
