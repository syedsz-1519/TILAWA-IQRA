import { StreakModel } from '../modules/streaks/streaks.model'
import { logger } from '../config/logger'

export async function runStreakResetJob(): Promise<void> {
  try {
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    twoDaysAgo.setHours(23, 59, 59, 999)

    // Reset currentStreak to 0 for users who haven't logged activity in over 48 hours
    const result = await StreakModel.updateMany(
      {
        lastActivityDate: { $lt: twoDaysAgo },
        currentStreak: { $gt: 0 },
      },
      {
        $set: { currentStreak: 0 },
      }
    )

    logger.info(`[Job: StreakReset] Reset ${result.modifiedCount || 0} inactive user streaks.`)
  } catch (error) {
    logger.error('[Job: StreakReset] Error executing streak reset job:', error)
  }
}
