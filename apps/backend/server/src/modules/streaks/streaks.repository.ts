import { StreakModel, IStreak } from './streaks.model'
import { parsePagination, buildMeta } from '../../utils/pagination'

export class StreaksRepository {
  async findByUserId(userId: string): Promise<IStreak | null> {
    return StreakModel.findOne({ userId }).lean() as any
  }

  async upsert(userId: string, data: Partial<IStreak>): Promise<IStreak> {
    return StreakModel.findOneAndUpdate(
      { userId },
      { $set: data },
      { new: true, upsert: true, runValidators: true }
    ).lean() as any
  }

  async createStreak(userId: string): Promise<IStreak> {
    return StreakModel.create({
      userId,
      currentStreak: 0,
      longestStreak: 0,
      totalXP: 0,
    })
  }

  async updateStreak(id: string, data: Partial<IStreak>): Promise<IStreak | null> {
    return StreakModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean() as any
  }

  /** Leaderboard: top N users by XP — uses compound (totalXP, currentStreak) index */
  async getLeaderboard(options: { page?: number; limit?: number } = {}) {
    const { page, limit, skip } = parsePagination({ ...options, maxLimit: 100 })
    const total = await StreakModel.countDocuments()

    const leaderboard = await StreakModel.find({})
      .select('userId totalXP currentStreak longestStreak')
      .sort({ totalXP: -1, currentStreak: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    return { leaderboard, meta: buildMeta(page, limit, total) }
  }

  /**
   * Find users whose lastActivityDate is before yesterday midnight UTC.
   * Used by the streak-reset cron job.
   */
  async findStreaksToReset(): Promise<IStreak[]> {
    const yesterdayMidnight = new Date()
    yesterdayMidnight.setUTCDate(yesterdayMidnight.getUTCDate() - 1)
    yesterdayMidnight.setUTCHours(0, 0, 0, 0)

    return StreakModel.find({
      currentStreak: { $gt: 0 },
      lastActivityDate: { $lt: yesterdayMidnight },
    })
      .select('userId currentStreak')
      .lean() as any
  }

  async resetStreak(userId: string): Promise<void> {
    await StreakModel.updateOne({ userId }, { $set: { currentStreak: 0 } })
  }
}
