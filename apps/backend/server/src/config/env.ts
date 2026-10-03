import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.string().default('8000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  JWT_REFRESH_SECRET: z.string().min(16, 'JWT_REFRESH_SECRET must be at least 16 characters'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('30d'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  CORS_ORIGINS: z.string().default('http://localhost:3000,https://tilawaa.vercel.app'),
  LOG_LEVEL: z.string().default('info'),
})

// Enforce safe parsing; in non-production allow local defaults if env vars are missing
const envInput = {
  ...process.env,
  MONGODB_URI: process.env.MONGODB_URI || process.env.DATABASE_URL || (process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/tilawa_test' : 'mongodb://localhost:27017/tilawa'),
  JWT_SECRET: process.env.JWT_SECRET || 'tilawa-super-secure-jwt-access-secret-key-32chars',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'tilawa-super-secure-jwt-refresh-secret-key-32chars',
}

const parsed = envSchema.safeParse(envInput)

if (!parsed.success) {
  console.error('❌ Invalid environment configuration:', parsed.error.format())
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Fatal: Invalid environment configuration in production mode.')
  }
}

const validData = parsed.success
  ? parsed.data
  : {
      PORT: 8000,
      NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
      MONGODB_URI: 'mongodb://localhost:27017/tilawa',
      JWT_SECRET: 'tilawa-super-secure-jwt-access-secret-key-32chars',
      JWT_REFRESH_SECRET: 'tilawa-super-secure-jwt-refresh-secret-key-32chars',
      JWT_ACCESS_EXPIRY: '15m',
      JWT_REFRESH_EXPIRY: '30d',
      FRONTEND_URL: 'http://localhost:3000',
      CORS_ORIGINS: 'http://localhost:3000,https://tilawaa.vercel.app',
      LOG_LEVEL: 'info',
    }

export const config = {
  port: validData.PORT,
  nodeEnv: validData.NODE_ENV,
  mongodbUri: validData.MONGODB_URI,
  jwtSecret: validData.JWT_SECRET,
  jwtRefreshSecret: validData.JWT_REFRESH_SECRET,
  jwtAccessExpiry: validData.JWT_ACCESS_EXPIRY,
  jwtRefreshExpiry: validData.JWT_REFRESH_EXPIRY,
  frontendUrl: validData.FRONTEND_URL,
  corsOrigins: validData.CORS_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean),
  logLevel: validData.LOG_LEVEL,
  isProduction: validData.NODE_ENV === 'production',
  isTest: validData.NODE_ENV === 'test',
}
