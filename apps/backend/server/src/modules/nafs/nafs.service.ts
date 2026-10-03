import { NafsRepository } from './nafs.repository'

export class NafsService {
  private repo = new NafsRepository()

  async getTodayRecord(userId: string) {
    return this.repo.findTodayRecord(userId)
  }

  async updateTodayRecord(userId: string, data: any) {
    return this.repo.upsertTodayRecord(userId, data)
  }

  async getHistory(userId: string, days?: number) {
    return this.repo.findHistory(userId, days || 30)
  }
}
