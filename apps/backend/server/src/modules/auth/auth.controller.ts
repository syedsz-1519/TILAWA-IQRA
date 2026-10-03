import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'
import { config } from '../../config/env'

const authService = new AuthService()

/** Cookie options for the short-lived access token. */
function accessCookieOptions() {
  return {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: (config.isProduction ? 'strict' : 'lax') as 'strict' | 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: '/',
    signed: true,
  } as const
}

/** Cookie options for the long-lived refresh token. */
function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: (config.isProduction ? 'strict' : 'lax') as 'strict' | 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/v1/auth/refresh', // scope to refresh route only
    signed: true,
  } as const
}

export const registerHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body)

  res.cookie('tilawa-token', result.accessToken, accessCookieOptions())
  res.cookie('tilawa-refresh-token', result.refreshToken, refreshCookieOptions())

  // Return tokens in body as well — mobile clients (Flutter) use body tokens, not cookies
  sendSuccess(res, result, 201)
})

export const loginHandler = asyncHandler(async (req: Request, res: Response) => {
  const clientInfo = {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  }
  const result = await authService.login(req.body, clientInfo)

  res.cookie('tilawa-token', result.accessToken, accessCookieOptions())
  res.cookie('tilawa-refresh-token', result.refreshToken, refreshCookieOptions())

  sendSuccess(res, result, 200)
})

export const refreshTokenHandler = asyncHandler(async (req: Request, res: Response) => {
  // Accept refresh token from: signed cookie (web) OR request body (mobile)
  const refreshToken =
    req.signedCookies['tilawa-refresh-token'] ||
    req.body.refreshToken

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh token missing' })
  }

  const result = await authService.refreshToken(refreshToken)

  res.cookie('tilawa-token', result.accessToken, accessCookieOptions())
  res.cookie('tilawa-refresh-token', result.refreshToken, refreshCookieOptions())

  sendSuccess(res, result, 200)
})

export const logoutHandler = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken =
    req.signedCookies['tilawa-refresh-token'] ||
    req.body.refreshToken

  await authService.logout(refreshToken)

  res.clearCookie('tilawa-token', { path: '/' })
  res.clearCookie('tilawa-refresh-token', { path: '/api/v1/auth/refresh' })

  sendSuccess(res, { message: 'Logged out successfully' }, 200)
})
