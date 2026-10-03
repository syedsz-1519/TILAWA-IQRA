import { Request, Response } from 'express'
import { ProgressService } from './progress.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'

const progressService = new ProgressService()

export const getProgressHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId || req.user?.userId
  const progress = await progressService.getUserProgress(userId)
  sendSuccess(res, progress)
})

export const getSurahProgressHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId || req.user?.userId
  const surahNumber = parseInt(req.params.surahNumber, 10)
  const progress = await progressService.getSurahProgress(userId, surahNumber)
  sendSuccess(res, progress)
})

export const updateProgressHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || req.body.userId
  const updated = await progressService.updateProgress(userId, req.body)
  sendSuccess(res, updated)
})

export const batchSyncHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || req.body.userId
  const synced = await progressService.batchSync(userId, req.body.items)
  sendSuccess(res, synced)
})
