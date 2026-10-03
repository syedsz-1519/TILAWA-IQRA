import { HifzProgressModel, IHifzProgress } from './hifz.model'

export class HifzRepository {
  async findProgress(userId: string, filter?: any): Promise<IHifzProgress[]> {
    return HifzProgressModel.find({ userId, ...filter }).sort({ nextReviewDate: 1 }).lean()
  }

  async findByCard(userId: string, cardId: string): Promise<IHifzProgress | null> {
    return HifzProgressModel.findOne({ userId, cardId }).lean()
  }

  async upsertProgress(userId: string, cardId: string, data: Partial<IHifzProgress>): Promise<IHifzProgress> {
    return HifzProgressModel.findOneAndUpdate(
      { userId, cardId },
      { $set: data },
      { new: true, upsert: true, runValidators: true }
    ).lean()
  }

  async getStats(userId: string) {
    const all = await HifzProgressModel.find({ userId }).select('status').lean()
    const stats = {
      totalCards: all.length,
      masteredCards: all.filter((item) => item.status === 'mastered').length,
      reviewCards: all.filter((item) => item.status === 'review').length,
      learningCards: all.filter((item) => item.status === 'learning').length,
      newCards: all.filter((item) => item.status === 'new').length,
    }
    return stats
  }
}
