import { Request, Response } from 'express'
import { HifzService } from './hifz.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'
import { getUserId } from '../../middlewares/auth'

const hifzService = new HifzService()

export const getProgressHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const progress = await hifzService.getUserProgress(userId, req.query)
  sendSuccess(res, progress)
})

export const getCardProgressHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const cardId = req.params['cardId'] as string
  const progress = await hifzService.getCardProgress(userId, cardId)
  sendSuccess(res, progress)
})

export const updateProgressHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const updated = await hifzService.updateCardProgress(userId, req.body)
  sendSuccess(res, updated)
})

export const getStatsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const stats = await hifzService.getUserStats(userId)
  sendSuccess(res, stats)
})
