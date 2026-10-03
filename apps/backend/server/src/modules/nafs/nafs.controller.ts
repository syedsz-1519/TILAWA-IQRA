import { Request, Response } from 'express'
import { NafsService } from './nafs.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'

const service = new NafsService()

export const getTodayHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId || req.user?.userId
  const record = await service.getTodayRecord(userId)
  sendSuccess(res, record)
})

export const updateTodayHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || req.body.userId
  const updated = await service.updateTodayRecord(userId, req.body)
  sendSuccess(res, updated)
})

export const getHistoryHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId || req.user?.userId
  const days = req.query.days ? parseInt(req.query.days as string, 10) : 30
  const history = await service.getHistory(userId, days)
  sendSuccess(res, history)
})
