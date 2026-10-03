import { NafsTrackingModel, INafsTracking } from './nafs.model'

export class NafsRepository {
  async findTodayRecord(userId: string): Promise<INafsTracking | null> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return NafsTrackingModel.findOne({
      userId,
      date: { $gte: today, $lt: tomorrow },
    }).lean()
  }

  async upsertTodayRecord(userId: string, data: Partial<INafsTracking>): Promise<INafsTracking> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return NafsTrackingModel.findOneAndUpdate(
      { userId, date: { $gte: today, $lt: tomorrow } },
      { $set: { ...data, userId, date: today } },
      { new: true, upsert: true, runValidators: true }
    ).lean()
  }

  async findHistory(userId: string, days: number = 30): Promise<INafsTracking[]> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)

    return NafsTrackingModel.find({
      userId,
      date: { $gte: startDate },
    }).sort({ date: -1 }).lean()
  }
}
