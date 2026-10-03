import { Router } from 'express'
import { getLanguagesHandler } from './settings.controller'

const router = Router()

router.get('/languages', getLanguagesHandler)

export default router
