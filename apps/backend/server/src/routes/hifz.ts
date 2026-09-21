import { Router } from 'express'

const router = Router()

// Get user's hifz progress
router.get('/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    // Mock data - replace with actual database queries when MongoDB is integrated
    const progress = [
      {
        id: '1',
        userId,
        cardId: 'juz-30-001',
        deckId: 'juz-30',
        status: 'learning',
        attempts: 3,
        correctAttempts: 2,
        interval: 1,
        easeFactor: 250,
        nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        lastReviewed: new Date(),
      },
    ]

    res.json({ success: true, progress })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hifz progress' })
  }
})

// Get progress for specific card
router.get('/card-progress/:userId/:cardId', async (req, res) => {
  try {
    const { userId, cardId } = req.params
    
    // Mock data
    const progress = {
      id: '1',
      userId,
      cardId,
      deckId: 'juz-30',
      status: 'learning',
      attempts: 3,
      correctAttempts: 2,
      interval: 1,
      easeFactor: 250,
      nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      lastReviewed: new Date(),
    }

    res.json({ success: true, progress })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch card progress' })
  }
})

// Update card progress (SM-2 algorithm)
router.post('/update-progress', async (req, res) => {
  try {
    const { userId, cardId, deckId, quality } = req.body // quality: 0-5

    const SM2_CONSTANTS = {
      INITIAL_EASE: 2.5,
      MIN_EASE: 1.3,
      EASY_BONUS: 0.1,
      HARD_PENALTY: 0.2,
    }

    let interval = 1
    let easeFactor = 250 // 2.5 * 100

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

    const nextReviewDate = new Date()
    nextReviewDate.setDate(nextReviewDate.getDate() + interval)

    // Mock response - replace with actual database update
    res.json({
      success: true,
      message: 'Progress updated',
      data: {
        userId,
        cardId,
        deckId,
        status: quality >= 3 ? (interval > 1 ? 'review' : 'learning') : 'learning',
        interval,
        easeFactor,
        nextReviewDate,
      },
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' })
  }
})

// Create hifz session
router.post('/session', async (req, res) => {
  try {
    const { userId, deckId } = req.body

    const session = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      deckId,
      startTime: new Date(),
      cardsReviewed: 0,
      correctCount: 0,
    }

    res.json({ success: true, session })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' })
  }
})

// End hifz session
router.post('/session/:sessionId/end', async (req, res) => {
  try {
    const { _sessionId } = req.params
    const { cardsReviewed, correctCount } = req.body

    const accuracy = cardsReviewed > 0 ? Math.round((correctCount / cardsReviewed) * 100) : 0

    res.json({ success: true, accuracy })
  } catch (error) {
    res.status(500).json({ error: 'Failed to end session' })
  }
})

// Get user's hifz statistics
router.get('/stats/:userId', async (_req, res) => {
  try {
    // Mock statistics
    const stats = {
      totalCards: 237,
      masteredCards: 50,
      learningCards: 100,
      reviewCards: 75,
      newCards: 12,
    }

    res.json({ success: true, stats })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

export default router
