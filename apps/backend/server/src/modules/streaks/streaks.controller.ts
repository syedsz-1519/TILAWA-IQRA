import { Request, Response } from 'express'
import { StreaksService } from './streaks.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'

const service = new StreaksService()

export const getUserStreakHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId || req.user?.userId
  const streak = await service.getUserStreak(userId)
  sendSuccess(res, streak)
})

export const updateXpHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || req.body.userId
  const { xpGain, minutesRead } = req.body
  const updated = await service.addXpAndActivity(userId, xpGain, minutesRead)
  sendSuccess(res, updated)
})

export const getLeaderboardHandler = asyncHandler(async (_req: Request, res: Response) => {
  const leaderboard = await service.getLeaderboard(50)
  sendSuccess(res, leaderboard)
})
