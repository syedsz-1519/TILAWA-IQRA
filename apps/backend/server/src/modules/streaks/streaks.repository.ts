import { StreakModel, IStreak } from './streaks.model'

export class StreaksRepository {
  async findByUserId(userId: string): Promise<IStreak | null> {
    return StreakModel.findOne({ userId }).lean()
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
    return StreakModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean()
  }

  async getLeaderboard(limit: number = 50): Promise<IStreak[]> {
    return StreakModel.find({}).sort({ totalXP: -1, currentStreak: -1 }).limit(limit).lean()
  }
}
