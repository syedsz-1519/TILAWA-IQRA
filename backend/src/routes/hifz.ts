import { Router } from 'express'
import { db } from '../db'
import { hifzProgress, hifzSessions } from '../db/schema'
import { eq, and } from 'drizzle-orm'

const router = Router()

// Get user's hifz progress
router.get('/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const progress = await db
      .select()
      .from(hifzProgress)
      .where(eq(hifzProgress.userId, userId))

    res.json({ success: true, progress })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hifz progress' })
  }
})

// Get progress for specific card
router.get('/card-progress/:userId/:cardId', async (req, res) => {
  try {
    const { userId, cardId } = req.params
    const progress = await db
      .select()
      .from(hifzProgress)
      .where(and(eq(hifzProgress.userId, userId), eq(hifzProgress.cardId, cardId)))

    res.json({ success: true, progress: progress[0] || null })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch card progress' })
  }
})

// Update card progress (SM-2 algorithm)
router.post('/update-progress', async (req, res) => {
  try {
    const { userId, cardId, deckId, quality } = req.body // quality: 0-5

    const existing = await db
      .select()
      .from(hifzProgress)
      .where(and(eq(hifzProgress.userId, userId), eq(hifzProgress.cardId, cardId)))

    const SM2_CONSTANTS = {
      INITIAL_EASE: 2.5,
      MIN_EASE: 1.3,
      EASY_BONUS: 0.1,
      HARD_PENALTY: 0.2,
    }

    let interval = 0
    let easeFactor = 250 // 2.5 * 100

    if (existing.length > 0) {
      const current = existing[0]
      interval = current.interval
      easeFactor = current.easeFactor

      // SM-2 calculation
      if (quality < 3) {
        interval = 1
        easeFactor = Math.max(130, easeFactor - Math.round(SM2_CONSTANTS.HARD_PENALTY * 100))
      } else {
        if (interval === 0) interval = 1
        else if (interval === 1) interval = 3
        else interval = Math.round((interval * easeFactor) / 100)

        if (quality > 4) {
          easeFactor += Math.round(SM2_CONSTANTS.EASY_BONUS * 100)
        }
      }

      // Update existing record
      const nextReviewDate = new Date()
      nextReviewDate.setDate(nextReviewDate.getDate() + interval)

      await db
        .update(hifzProgress)
        .set({
          status: quality >= 3 ? (interval > 1 ? 'review' : 'learning') : 'learning',
          attempts: current.attempts + 1,
          correctAttempts: quality >= 3 ? current.correctAttempts + 1 : current.correctAttempts,
          lastReviewed: new Date(),
          nextReviewDate,
          interval,
          easeFactor,
          updatedAt: new Date(),
        })
        .where(eq(hifzProgress.id, current.id))
    } else {
      // Create new record
      const nextReviewDate = new Date()
      nextReviewDate.setDate(nextReviewDate.getDate() + 1)

      await db.insert(hifzProgress).values({
        userId,
        cardId,
        deckId,
        status: 'learning',
        attempts: 1,
        correctAttempts: quality >= 3 ? 1 : 0,
        lastReviewed: new Date(),
        nextReviewDate,
        interval: 1,
        easeFactor: 250,
      })
    }

    res.json({ success: true, message: 'Progress updated' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' })
  }
})

// Create hifz session
router.post('/session', async (req, res) => {
  try {
    const { userId, deckId } = req.body

    const session = await db
      .insert(hifzSessions)
      .values({
        userId,
        deckId,
        startTime: new Date(),
        cardsReviewed: 0,
        correctCount: 0,
      })
      .returning()

    res.json({ success: true, session: session[0] })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' })
  }
})

// End hifz session
router.post('/session/:sessionId/end', async (req, res) => {
  try {
    const { sessionId } = req.params
    const { cardsReviewed, correctCount } = req.body

    const accuracy = Math.round((correctCount / cardsReviewed) * 100)

    const session = await db
      .select()
      .from(hifzSessions)
      .where(eq(hifzSessions.id, parseInt(sessionId)))

    // Update session
    await db
      .update(hifzSessions)
      .set({
        endTime: new Date(),
        cardsReviewed,
        correctCount,
        accuracy,
      })
      .where(eq(hifzSessions.id, parseInt(sessionId)))

    res.json({ success: true, accuracy })
  } catch (error) {
    res.status(500).json({ error: 'Failed to end session' })
  }
})

// Get user's hifz statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const progress = await db
      .select()
      .from(hifzProgress)
      .where(eq(hifzProgress.userId, userId))

    const stats = {
      totalCards: progress.length,
      masteredCards: progress.filter((p) => p.status === 'mastered').length,
      learningCards: progress.filter((p) => p.status === 'learning').length,
      reviewCards: progress.filter((p) => p.status === 'review').length,
      newCards: progress.filter((p) => p.status === 'new').length,
    }

    res.json({ success: true, stats })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

export default router
