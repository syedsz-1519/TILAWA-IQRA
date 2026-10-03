import { Router } from 'express'
import {
  getProgressHandler,
  getSurahProgressHandler,
  updateProgressHandler,
  batchSyncHandler,
  getWeeklyActivityHandler,
} from './progress.controller'
import { authenticate, optionalAuthenticate } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import { updateProgressSchema, batchSyncProgressSchema } from './progress.schema'

const router = Router()

router.get('/', authenticate, getProgressHandler)
router.get('/:userId', optionalAuthenticate, getProgressHandler)
router.get('/surah/:surahNumber', authenticate, getSurahProgressHandler)
router.get('/surah/:userId/:surahNumber', optionalAuthenticate, getSurahProgressHandler)
router.post('/update', optionalAuthenticate, validate({ body: updateProgressSchema }), updateProgressHandler)
router.post('/batch-sync', authenticate, validate({ body: batchSyncProgressSchema }), batchSyncHandler)
router.get('/weekly-activity', authenticate, getWeeklyActivityHandler)
router.get('/weekly-activity/:userId', optionalAuthenticate, getWeeklyActivityHandler)

export default router
