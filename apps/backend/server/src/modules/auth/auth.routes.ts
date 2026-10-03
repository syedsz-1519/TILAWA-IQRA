import { Router } from 'express'
import { registerHandler, loginHandler, refreshTokenHandler, logoutHandler } from './auth.controller'
import { validate } from '../../middlewares/validate'
import { authLimiter } from '../../middlewares/rateLimit'
import { registerSchema, loginSchema, refreshTokenSchema } from './auth.schema'

const router = Router()

router.post('/register', authLimiter, validate({ body: registerSchema }), registerHandler)
router.post('/login', authLimiter, validate({ body: loginSchema }), loginHandler)
router.post('/refresh', authLimiter, validate({ body: refreshTokenSchema }), refreshTokenHandler)
router.post('/logout', logoutHandler)

export default router
