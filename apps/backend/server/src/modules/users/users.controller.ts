import { Request, Response } from 'express'
import { UsersService } from './users.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'

const usersService = new UsersService()

export const getProfileHandler = asyncHandler(async (req: Request, res: Response) => {
  const profile = await usersService.getProfile(req.user!.userId)
  sendSuccess(res, profile)
})

export const updateProfileHandler = asyncHandler(async (req: Request, res: Response) => {
  const updated = await usersService.updateProfile(req.user!.userId, req.body)
  sendSuccess(res, updated)
})

export const changePasswordHandler = asyncHandler(async (req: Request, res: Response) => {
  await usersService.changePassword(req.user!.userId, req.body.currentPassword, req.body.newPassword)
  sendSuccess(res, { message: 'Password updated successfully' })
})
