import { Request, Response } from 'express'
import { NafsService } from './nafs.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'
import { getUserId } from '../../middlewares/auth'

const service = new NafsService()

export const getTodayHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const record = await service.getTodayRecord(userId)
  sendSuccess(res, record)
})

export const updateTodayHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const updated = await service.updateTodayRecord(userId, req.body)
  sendSuccess(res, updated)
})

export const getHistoryHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const days = req.query['days'] ? parseInt(req.query['days'] as string, 10) : 30
  const history = await service.getHistory(userId, days)
  sendSuccess(res, history)
})
