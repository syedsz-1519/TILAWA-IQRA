import { Router } from 'express'
import { getUserStreakHandler, updateXpHandler, getLeaderboardHandler } from './streaks.controller'
import { authenticate, optionalAuthenticate } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import { updateXpSchema } from './streaks.schema'

const router = Router()

router.get('/', authenticate, getUserStreakHandler)
router.get('/leaderboard', getLeaderboardHandler)
router.get('/:userId', optionalAuthenticate, getUserStreakHandler)
router.post('/xp', optionalAuthenticate, validate({ body: updateXpSchema }), updateXpHandler)

export default router
