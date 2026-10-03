import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'

const authService = new AuthService()

export const registerHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body)
  
  res.cookie('tilawa-token', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
  })

  sendSuccess(res, result, 201)
})

export const loginHandler = asyncHandler(async (req: Request, res: Response) => {
  const clientInfo = {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  }
  const result = await authService.login(req.body, clientInfo)

  res.cookie('tilawa-token', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
  })

  sendSuccess(res, result, 200)
})

export const refreshTokenHandler = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken || req.cookies['tilawa-refresh-token']
  const result = await authService.refreshToken(refreshToken)

  res.cookie('tilawa-token', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
  })

  sendSuccess(res, result, 200)
})

export const logoutHandler = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken || req.cookies['tilawa-refresh-token']
  await authService.logout(refreshToken)

  res.clearCookie('tilawa-token')
  res.clearCookie('tilawa-refresh-token')

  sendSuccess(res, { message: 'Logged out successfully' }, 200)
})
