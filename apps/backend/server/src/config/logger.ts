import pino from 'pino'
import { config } from './env'

export const logger = pino({
  level: config.logLevel,
  redact: {
    paths: [
      'password',
      'confirmPassword',
      'oldPassword',
      'newPassword',
      'token',
      'accessToken',
      'refreshToken',
      'authorization',
      'cookie',
      'req.headers.authorization',
      'req.headers.cookie',
    ],
    remove: true,
  },
  transport:
    config.nodeEnv === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'SYS:standard',
          },
        }
      : undefined,
})
