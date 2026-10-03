import mongoose from 'mongoose';
import { config } from './env.js';
import { logger } from './logger.js';

export async function connectDatabase(): Promise<typeof mongoose | null> {
  try {
    mongoose.set('strictQuery', true);
    
    mongoose.connection.on('connected', () => {
      logger.info('✅ Connected to MongoDB database successfully');
    });

    mongoose.connection.on('error', (err) => {
      logger.error({ err }, '❌ MongoDB connection error');
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB connection disconnected');
    });

    const conn = await mongoose.connect(config.databaseUrl, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: config.nodeEnv === 'development',
    });

    return conn;
  } catch (error) {
    logger.error({ error }, '❌ Failed to connect to MongoDB');
    if (config.nodeEnv === 'production') {
      process.exit(1);
    }
    return null;
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected cleanly');
  } catch (error) {
    logger.error({ error }, 'Error disconnecting MongoDB');
  }
}
