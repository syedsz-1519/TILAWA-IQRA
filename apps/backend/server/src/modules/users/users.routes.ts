import { Router } from 'express'
import { getProfileHandler, updateProfileHandler, changePasswordHandler } from './users.controller'
import { authenticate } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import { updateProfileSchema, changePasswordSchema } from './users.schema'

const router = Router()

router.use(authenticate)

router.get('/profile', getProfileHandler)
router.patch('/profile', validate({ body: updateProfileSchema }), updateProfileHandler)
router.post('/change-password', validate({ body: changePasswordSchema }), changePasswordHandler)

export default router
