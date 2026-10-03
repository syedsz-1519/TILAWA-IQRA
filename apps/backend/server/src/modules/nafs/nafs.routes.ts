import { Router } from 'express'
import { getTodayHandler, updateTodayHandler, getHistoryHandler } from './nafs.controller'
import { authenticate, optionalAuthenticate } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import { updateNafsSchema } from './nafs.schema'

const router = Router()

router.get('/today', authenticate, getTodayHandler)
router.get('/today/:userId', optionalAuthenticate, getTodayHandler)
router.post('/today', optionalAuthenticate, validate({ body: updateNafsSchema }), updateTodayHandler)
router.get('/history', authenticate, getHistoryHandler)
router.get('/history/:userId', optionalAuthenticate, getHistoryHandler)

export default router
