import { createApp } from './app'
import { config } from './config/env'
import { logger } from './config/logger'
import { connectToDatabase, disconnectDatabase } from './db'
import { runStreakResetJob } from './jobs/streakReset'
import { runTokenCleanupJob } from './jobs/tokenCleanup'

async function bootstrap() {
  try {
    logger.info('🔄 Initializing database connection...')
    await connectToDatabase()

    const app = createApp()

    const server = app.listen(config.port, () => {
      logger.info(`✅ TILAWA API running on port ${config.port} [env: ${config.nodeEnv}]`)
      logger.info(`🔗 CORS origins allowed: ${config.corsOrigins.join(', ')}`)
    })

    // Setup periodic background jobs (run every 12 hours)
    const JOB_INTERVAL_MS = 12 * 60 * 60 * 1000
    const jobTimer = setInterval(() => {
      runStreakResetJob()
      runTokenCleanupJob()
    }, JOB_INTERVAL_MS)

    // Graceful Shutdown
    const gracefulShutdown = async (signal: string) => {
      logger.info(`⏹️ Received ${signal}. Starting graceful shutdown...`)
      clearInterval(jobTimer)

      server.close(async () => {
        logger.info('🛑 HTTP server closed.')
        try {
          await disconnectDatabase()
          logger.info('👋 Database disconnected. Shutdown complete.')
          process.exit(0)
        } catch (error) {
          logger.error('❌ Error during shutdown:', error)
          process.exit(1)
        }
      })

      // Force shutdown after 10s if connections do not drain
      setTimeout(() => {
        logger.error('⚠️ Could not close connections in time, forcefully shutting down.')
        process.exit(1)
      }, 10000)
    }

    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))

    process.on('unhandledRejection', (reason: any) => {
      logger.error('❌ Unhandled Rejection at Promise:', reason)
    })

    process.on('uncaughtException', (error: Error) => {
      logger.error('❌ Uncaught Exception thrown:', error)
      process.exit(1)
    })
  } catch (error) {
    logger.error('❌ Failed to bootstrap application server:', error)
    process.exit(1)
  }
}

bootstrap()
