import { ProgressRepository } from './progress.repository'

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

    return this.repo.upsert(userId, data.surahNumber, {
      lastAyahRead: data.lastAyahRead,
      pageNumber: data.pageNumber || 1,
      completionPercentage,
      updatedAt: clientDate,
    })
  }

  async batchSync(userId: string, items: Array<{ surahNumber: number; lastAyahRead: number; totalAyahsInSurah?: number; pageNumber?: number; updatedAt?: string }>) {
    const results = []
    for (const item of items) {
      const updated = await this.updateProgress(userId, item)
      results.push(updated)
    }
    return results
  }
}
