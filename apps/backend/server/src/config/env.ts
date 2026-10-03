import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('8000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters').default('tilawa-super-secure-jwt-access-secret-32-chars!'),
  JWT_REFRESH_SECRET: z.string().min(16, 'JWT_REFRESH_SECRET must be at least 16 characters').default('tilawa-super-secure-jwt-refresh-secret-32-chars!'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('30d'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  CORS_ORIGINS: z.string().default('http://localhost:3000,https://tilawaa.vercel.app'),
  LOG_LEVEL: z.string().default('info'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  // In development, provide fallback defaults if DATABASE_URL is missing
  if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'mongodb://localhost:27017/tilawa';
  }
}

export const config = {
  port: parsed.success ? parsed.data.PORT : parseInt(process.env.PORT || '8000', 10),
  nodeEnv: parsed.success ? parsed.data.NODE_ENV : (process.env.NODE_ENV || 'development'),
  databaseUrl: parsed.success ? parsed.data.DATABASE_URL : (process.env.DATABASE_URL || 'mongodb://localhost:27017/tilawa'),
  jwtSecret: parsed.success ? parsed.data.JWT_SECRET : (process.env.JWT_SECRET || 'tilawa-super-secure-jwt-access-secret-32-chars!'),
  jwtRefreshSecret: parsed.success ? parsed.data.JWT_REFRESH_SECRET : (process.env.JWT_REFRESH_SECRET || 'tilawa-super-secure-jwt-refresh-secret-32-chars!'),
  jwtAccessExpiry: parsed.success ? parsed.data.JWT_ACCESS_EXPIRY : '15m',
  jwtRefreshExpiry: parsed.success ? parsed.data.JWT_REFRESH_EXPIRY : '30d',
  frontendUrl: parsed.success ? parsed.data.FRONTEND_URL : (process.env.FRONTEND_URL || 'http://localhost:3000'),
  corsOrigins: (parsed.success ? parsed.data.CORS_ORIGINS : (process.env.CORS_ORIGINS || 'http://localhost:3000,https://tilawaa.vercel.app'))
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  logLevel: parsed.success ? parsed.data.LOG_LEVEL : 'info',
};
