import { ReadingProgressModel, IReadingProgress } from './progress.model'

export class ProgressRepository {
  async findByUserId(userId: string): Promise<IReadingProgress[]> {
    return ReadingProgressModel.find({ userId }).sort({ surahNumber: 1 }).lean()
  }

  async findBySurah(userId: string, surahNumber: number): Promise<IReadingProgress | null> {
    return ReadingProgressModel.findOne({ userId, surahNumber }).lean()
  }

  async upsert(userId: string, surahNumber: number, data: Partial<IReadingProgress>): Promise<IReadingProgress> {
    return ReadingProgressModel.findOneAndUpdate(
      { userId, surahNumber },
      { $set: data },
      { new: true, upsert: true, runValidators: true }
    ).lean()
  }
}
