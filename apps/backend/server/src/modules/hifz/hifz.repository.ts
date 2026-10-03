import mongoose from 'mongoose'
import { HifzProgressModel, IHifzProgress } from './hifz.model'
import { StreakModel } from '../streaks/streaks.model'
import { parsePagination, buildMeta } from '../../utils/pagination'

export class HifzRepository {
  async findProgress(
    userId: string,
    filter: Record<string, unknown> = {},
    options: { page?: number; limit?: number } = {}
  ) {
    const { page, limit, skip } = parsePagination(options)
    const query = { userId, ...filter }

    const [cards, total] = await Promise.all([
      HifzProgressModel.find(query)
        .sort({ nextReviewDate: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      HifzProgressModel.countDocuments(query),
    ])

    return { cards, meta: buildMeta(page, limit, total) }
  }

  async findByCard(userId: string, cardId: string): Promise<IHifzProgress | null> {
    return HifzProgressModel.findOne({ userId, cardId }).lean() as any
  }

  async upsertProgress(userId: string, cardId: string, data: Partial<IHifzProgress>): Promise<IHifzProgress> {
    return HifzProgressModel.findOneAndUpdate(
      { userId, cardId },
      { $set: data },
      { new: true, upsert: true, runValidators: true }
    ).lean() as any
  }

  /**
   * Record a hifz review AND update XP in the same transaction.
   * Wraps both writes in a Mongoose session so they succeed or fail together.
   */
  async recordReviewWithXP(
    userId: string,
    cardId: string,
    progressData: Partial<IHifzProgress>,
    xpEarned: number
  ): Promise<IHifzProgress> {
    const session = await mongoose.startSession()
    let result!: IHifzProgress

    await session.withTransaction(async () => {
      // 1. Upsert hifz card progress
      const updated = await HifzProgressModel.findOneAndUpdate(
        { userId, cardId },
        { $set: progressData },
        { new: true, upsert: true, runValidators: true, session }
      ).lean()

      result = updated as unknown as IHifzProgress

      // 2. Increment XP and update streak activity
      await StreakModel.findOneAndUpdate(
        { userId },
        {
          $inc: { totalXP: xpEarned },
          $set: { lastActivityDate: new Date() },
        },
        { upsert: true, session }
      )
    })

    await session.endSession()
    return result
  }

  async getStats(userId: string) {
    // Single aggregation instead of loading all docs into memory
    const stats = await HifzProgressModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const mapped: Record<string, number> = {}
    for (const s of stats) mapped[s._id as string] = s.count as number

    return {
      totalCards: Object.values(mapped).reduce((a, b) => a + b, 0),
      masteredCards: mapped['mastered'] ?? 0,
      reviewCards: mapped['review'] ?? 0,
      learningCards: mapped['learning'] ?? 0,
      newCards: mapped['new'] ?? 0,
    }
  }
}
