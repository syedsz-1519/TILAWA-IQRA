import { StreakModel } from '../modules/streaks/streaks.model'
import { logger } from '../config/logger'

/**
 * Runs nightly at 00:05 UTC.
 * Resets currentStreak to 0 for any user whose lastActivityDate
 * is before yesterday midnight UTC — meaning they missed a full day.
 */
export async function runStreakResetJob(): Promise<void> {
  try {
    // "Yesterday midnight UTC" — any lastActivityDate before this means the user
    // missed yesterday entirely and their streak should reset.
    const yesterdayMidnightUTC = new Date()
    yesterdayMidnightUTC.setUTCDate(yesterdayMidnightUTC.getUTCDate() - 1)
    yesterdayMidnightUTC.setUTCHours(0, 0, 0, 0)

    const result = await StreakModel.updateMany(
      {
        currentStreak: { $gt: 0 },
        $or: [
          { lastActivityDate: { $lt: yesterdayMidnightUTC } },
          { lastActivityDate: null },
        ],
      },
      { $set: { currentStreak: 0 } }
    )

    logger.info(
      { modifiedCount: result.modifiedCount },
      '[Job: StreakReset] Streak reset complete'
    )
  } catch (error) {
    logger.error({ err: error }, '[Job: StreakReset] Failed')
  }
}
