import { Request, Response } from 'express'
import { HifzService } from './hifz.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'

const hifzService = new HifzService()

export const getProgressHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId || req.user?.userId
  const progress = await hifzService.getUserProgress(userId, req.query)
  sendSuccess(res, progress)
})

export const getCardProgressHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId || req.user?.userId
  const progress = await hifzService.getCardProgress(userId, req.params.cardId)
  sendSuccess(res, progress)
})

export const updateProgressHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || req.body.userId
  const updated = await hifzService.updateCardProgress(userId, req.body)
  sendSuccess(res, updated)
})

export const getStatsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId || req.user?.userId
  const stats = await hifzService.getUserStats(userId)
  sendSuccess(res, stats)
})
