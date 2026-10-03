import { Router } from 'express'
import {
  getProgressHandler,
  getCardProgressHandler,
  updateProgressHandler,
  getStatsHandler,
} from './hifz.controller'
import { authenticate, optionalAuthenticate } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import { updateHifzProgressSchema, getHifzProgressQuerySchema } from './hifz.schema'

const router = Router()

router.get('/progress', authenticate, validate({ query: getHifzProgressQuerySchema }), getProgressHandler)
router.get('/progress/:userId', optionalAuthenticate, validate({ query: getHifzProgressQuerySchema }), getProgressHandler)
router.get('/card-progress/:cardId', authenticate, getCardProgressHandler)
router.get('/card-progress/:userId/:cardId', optionalAuthenticate, getCardProgressHandler)
router.post('/update-progress', optionalAuthenticate, validate({ body: updateHifzProgressSchema }), updateProgressHandler)
router.get('/stats', authenticate, getStatsHandler)
router.get('/stats/:userId', optionalAuthenticate, getStatsHandler)

export default router
