import { Request, Response } from 'express'
import { StreaksService } from './streaks.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'
import { getUserId } from '../../middlewares/auth'

const service = new StreaksService()

export const getUserStreakHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const streak = await service.getUserStreak(userId)
  sendSuccess(res, streak)
})

export const updateXpHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const { xpGain, minutesRead } = req.body
  const updated = await service.addXpAndActivity(userId, xpGain, minutesRead)
  sendSuccess(res, updated)
})

export const getLeaderboardHandler = asyncHandler(async (_req: Request, res: Response) => {
  const leaderboard = await service.getLeaderboard({ limit: 50 })
  sendSuccess(res, leaderboard)
})
