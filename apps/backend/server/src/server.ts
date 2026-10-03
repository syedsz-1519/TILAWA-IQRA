import { createApp } from './app'
import { config } from './config/env'
import { logger } from './config/logger'
import { connectToDatabase, disconnectDatabase } from './db'
import { runStreakResetJob } from './jobs/streakReset'
import { runTokenCleanupJob } from './jobs/tokenCleanup'

/**
 * Lightweight cron scheduler — no external dependency needed.
 * Runs `fn` at the next occurrence of `targetHourUTC` and then every 24h.
 * Returns the timer reference for cleanup on shutdown.
 */
function scheduleDailyUTC(
  name: string,
  targetHourUTC: number,
  fn: () => Promise<void>
): NodeJS.Timeout {
  const now = new Date()
  const next = new Date()
  next.setUTCHours(targetHourUTC, 5, 0, 0) // run at HH:05:00 UTC

  // If that time has already passed today, schedule for tomorrow
  if (next.getTime() <= now.getTime()) {
    next.setUTCDate(next.getUTCDate() + 1)
  }

  const msUntilFirst = next.getTime() - now.getTime()
  logger.info(
    { job: name, nextRunIn: `${Math.round(msUntilFirst / 60000)}min` },
    `[Jobs] ${name} scheduled`
  )

  // Fire once at the target time, then every 24h
  const timer = setTimeout(async () => {
    await fn()
    setInterval(fn, 24 * 60 * 60 * 1000)
  }, msUntilFirst)

  return timer
}

async function bootstrap() {
  try {
    logger.info('Initializing database connection...')
    await connectToDatabase()

    const app = createApp()

    const server = app.listen(config.port, () => {
      logger.info(
        { port: config.port, env: config.nodeEnv, origins: config.corsOrigins },
        'TILAWA API running'
      )
    })

    // =============================================
    // BACKGROUND JOBS
    // Streak reset: midnight UTC (00:05)
    // Token cleanup: 2am UTC (02:05)
    // =============================================
    const streakTimer = scheduleDailyUTC('StreakReset', 0, runStreakResetJob)
    const tokenTimer = scheduleDailyUTC('TokenCleanup', 2, runTokenCleanupJob)

    // =============================================
    // GRACEFUL SHUTDOWN
    // =============================================
    const gracefulShutdown = async (signal: string) => {
      logger.info({ signal }, 'Shutdown signal received')
      clearTimeout(streakTimer)
      clearTimeout(tokenTimer)

      server.close(async () => {
        logger.info('HTTP server closed')
        try {
          await disconnectDatabase()
          logger.info('Database disconnected — shutdown complete')
          process.exit(0)
        } catch (error) {
          logger.error({ err: error }, 'Error during shutdown')
          process.exit(1)
        }
      })

      // Force kill after 10s if connections do not drain
      setTimeout(() => {
        logger.error('Could not drain connections in time — forcing exit')
        process.exit(1)
      }, 10_000).unref()
    }

    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))

    process.on('unhandledRejection', (reason) => {
      logger.error({ reason }, 'Unhandled promise rejection')
    })

    process.on('uncaughtException', (error) => {
      logger.error({ err: error }, 'Uncaught exception — exiting')
      process.exit(1)
    })
  } catch (error) {
    logger.error({ err: error }, 'Failed to bootstrap server')
    process.exit(1)
  }
}

bootstrap()
