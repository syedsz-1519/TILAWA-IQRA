import { ProgressRepository } from './progress.repository'
import { DailyActivityModel } from './daily-activity.model'

export class ProgressService {
  private repo = new ProgressRepository()

  async getUserProgress(userId: string) {
    return this.repo.findByUserId(userId)
  }

  async getSurahProgress(userId: string, surahNumber: number) {
    return this.repo.findBySurah(userId, surahNumber)
  }

  async updateProgress(
    userId: string,
    data: { surahNumber: number; lastAyahRead: number; totalAyahsInSurah?: number; pageNumber?: number; updatedAt?: string }
  ) {
    const totalAyahs = data.totalAyahsInSurah || 286
    const completionPercentage = Math.round((data.lastAyahRead / totalAyahs) * 100)
    const clientDate = data.updatedAt ? new Date(data.updatedAt) : new Date()

    const existing = await this.repo.findBySurah(userId, data.surahNumber)

    // Conflict resolution: last-write-wins based on updatedAt timestamp
    if (existing && existing.updatedAt && new Date(existing.updatedAt) > clientDate) {
      return existing
    }

    const updated = await this.repo.upsert(userId, data.surahNumber, {
      lastAyahRead: data.lastAyahRead,
      pageNumber: data.pageNumber || 1,
      completionPercentage,
      updatedAt: clientDate,
    })

    // Track daily ayah activity
    const today = clientDate.toISOString().split('T')[0]
    const ayahsGained = existing
      ? Math.max(0, data.lastAyahRead - (existing.lastAyahRead || 0))
      : data.lastAyahRead
    if (ayahsGained > 0) {
      await DailyActivityModel.findOneAndUpdate(
        { userId, date: today },
        {
          $inc: { ayahCount: ayahsGained },
          $addToSet: { surahsRead: data.surahNumber },
        },
        { upsert: true }
      )
    }

    return updated
  }

  async batchSync(userId: string, items: Array<{ surahNumber: number; lastAyahRead: number; totalAyahsInSurah?: number; pageNumber?: number; updatedAt?: string }>) {
    const results = []
    for (const item of items) {
      const updated = await this.updateProgress(userId, item)
      results.push(updated)
    }
    return results
  }

  /**
   * Get daily ayah activity for the past 7 days for the weekly chart
   */
  async getWeeklyActivity(userId: string) {
    const days: string[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      days.push(d.toISOString().split('T')[0])
    }

    const records = await DailyActivityModel.find({
      userId,
      date: { $in: days },
    }).lean()

    const mapped: Record<string, number> = {}
    for (const r of records) mapped[r.date as string] = r.ayahCount as number

    return days.map((date) => ({
      date,
      ayahCount: mapped[date] ?? 0,
    }))
  }
}
