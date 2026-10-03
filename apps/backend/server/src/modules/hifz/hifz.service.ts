import { HifzRepository } from './hifz.repository'
import { SYSTEM_CONSTANTS } from '../../config/constants'

export class HifzService {
  private repo = new HifzRepository()

  /**
   * SuperMemo SM-2 Spaced Repetition Algorithm
   * Computes next review interval & ease factor based on user response quality (0-5)
   */
  calculateSM2(quality: number, currentInterval: number, currentEaseFactor: number) {
    let interval = currentInterval
    let easeFactor = currentEaseFactor

    if (quality < 3) {
      interval = 1
      easeFactor = Math.max(SYSTEM_CONSTANTS.HIFZ.MIN_EASE_FACTOR, easeFactor - 20)
    } else {
      if (interval === 0 || interval === 1) {
        interval = 1
      } else if (interval === 2) {
        interval = 6
      } else {
        interval = Math.round(interval * (easeFactor / 100))
      }

      // Adjust ease factor using standard SM-2 formula
      // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
      const q = quality
      const delta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)
      easeFactor = Math.max(SYSTEM_CONSTANTS.HIFZ.MIN_EASE_FACTOR, Math.round(easeFactor + delta * 100))
    }

    const nextReviewDate = new Date()
    nextReviewDate.setDate(nextReviewDate.getDate() + interval)

    let status: 'learning' | 'review' | 'mastered' = 'learning'
    if (interval >= 21) {
      status = 'mastered'
    } else if (interval > 1) {
      status = 'review'
    }

    return { interval, easeFactor, nextReviewDate, status }
  }

  async getUserProgress(userId: string, query?: any) {
    const filter: any = {}
    if (query?.deckId) filter.deckId = query.deckId
    if (query?.status) filter.status = query.status
    if (query?.dueOnly === 'true') {
      filter.nextReviewDate = { $lte: new Date() }
    }
    return this.repo.findProgress(userId, filter)
  }

  async getCardProgress(userId: string, cardId: string) {
    return this.repo.findByCard(userId, cardId)
  }

  async updateCardProgress(userId: string, data: { cardId: string; deckId: string; quality: number }) {
    const existing = await this.repo.findByCard(userId, data.cardId)

    const attempts = (existing?.attempts || 0) + 1
    const correctAttempts = (existing?.correctAttempts || 0) + (data.quality >= 3 ? 1 : 0)
    const currentInterval = existing?.interval || 1
    const currentEase = existing?.easeFactor || SYSTEM_CONSTANTS.HIFZ.INITIAL_EASE_FACTOR

    const sm2 = this.calculateSM2(data.quality, currentInterval, currentEase)

    const updated = await this.repo.upsertProgress(userId, data.cardId, {
      deckId: data.deckId,
      attempts,
      correctAttempts,
      interval: sm2.interval,
      easeFactor: sm2.easeFactor,
      status: sm2.status,
      lastReviewed: new Date(),
      nextReviewDate: sm2.nextReviewDate,
    })

    return updated
  }

  async getUserStats(userId: string) {
    return this.repo.getStats(userId)
  }
}
