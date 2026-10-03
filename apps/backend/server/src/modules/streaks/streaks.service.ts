import { StreaksRepository } from './streaks.repository'

export class StreaksService {
  private repo = new StreaksRepository()

  async getUserStreak(userId: string) {
    let streak = await this.repo.findByUserId(userId)
    if (!streak) {
      streak = await this.repo.createStreak(userId)
    }
    return streak
  }

  async addXpAndActivity(userId: string, xpGain: number, minutesRead: number = 0) {
    let userStreak = await this.getUserStreak(userId)

    const lastActivity = userStreak.lastActivityDate
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let lastActivityDate: Date | null = null
    if (lastActivity) {
      lastActivityDate = new Date(lastActivity)
      lastActivityDate.setHours(0, 0, 0, 0)
    }

    let newStreak = userStreak.currentStreak
    if (!lastActivityDate || lastActivityDate.getTime() < today.getTime()) {
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      if (lastActivityDate && lastActivityDate.getTime() === yesterday.getTime()) {
        newStreak += 1
      } else {
        newStreak = 1
      }
    }

    const newLongestStreak = Math.max(userStreak.longestStreak, newStreak)

    const updateData: any = {
      totalXP: userStreak.totalXP + xpGain,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastActivityDate: new Date(),
    }

    if (minutesRead > 0) {
      updateData.$push = { history: { date: new Date(), minutesRead } }
    }

    const updated = await this.repo.updateStreak(userStreak._id.toString(), updateData)

    return updated
  }

  async getLeaderboard(limit?: number) {
    return this.repo.getLeaderboard({ limit: limit || 50 })
  }
}
