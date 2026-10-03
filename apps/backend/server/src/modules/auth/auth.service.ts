import { AuthRepository } from './auth.repository'
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  generateRandomToken,
} from '../../utils/crypto'
import { ApiError } from '../../utils/ApiError'
import { SYSTEM_CONSTANTS } from '../../config/constants'
import { config } from '../../config/env'

/** Convert a JWT expiry string like '7d', '30d', '24h' into milliseconds. */
function parseDurationMs(expiry: string): number {
  const unit = expiry.slice(-1)
  const value = parseInt(expiry.slice(0, -1), 10)
  if (unit === 'd') return value * 24 * 60 * 60 * 1000
  if (unit === 'h') return value * 60 * 60 * 1000
  if (unit === 'm') return value * 60 * 1000
  return 7 * 24 * 60 * 60 * 1000 // fallback: 7 days
}

export class AuthService {
  private repo = new AuthRepository()

  async register(data: { name: string; email: string; password: string; preferredLanguage?: string }) {
    const existing = await this.repo.findUserByEmail(data.email)
    if (existing) {
      throw ApiError.conflict('An account with this email already exists.', 'EMAIL_EXISTS')
    }

    const passwordHash = await hashPassword(data.password)

    const user = await this.repo.createUser({
      name: data.name,
      email: data.email,
      passwordHash,
      preferredLanguage: data.preferredLanguage || 'en',
      role: 'user',
    })

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    const rawRefreshToken = generateRandomToken(40)
    const refreshTokenHash = hashToken(rawRefreshToken)

    const expiresAt = new Date(Date.now() + parseDurationMs(config.jwtRefreshExpiry))

    await this.repo.saveRefreshToken({
      userId: user._id,
      tokenHash: refreshTokenHash,
      expiresAt,
    })

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
      },
      accessToken,
      refreshToken: rawRefreshToken,
    }
  }

  async login(data: { email: string; password: string }, clientInfo?: { ip?: string; userAgent?: string }) {
    const user = await this.repo.findUserByEmail(data.email)
    // Generic error to prevent user enumeration
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password', 'INVALID_CREDENTIALS')
    }

    // Check progressive lockout
    if (user.lockoutUntil && user.lockoutUntil > new Date()) {
      const minutesRemaining = Math.ceil((user.lockoutUntil.getTime() - Date.now()) / (1000 * 60))
      throw ApiError.forbidden(
        `Account temporarily locked due to failed login attempts. Try again in ${minutesRemaining} minutes.`,
        'ACCOUNT_LOCKED'
      )
    }

    const isPasswordValid = await comparePassword(data.password, user.passwordHash)
    if (!isPasswordValid) {
      const failedAttempts = (user.failedLoginAttempts || 0) + 1
      let lockoutUntil: Date | undefined = undefined

      if (failedAttempts >= SYSTEM_CONSTANTS.AUTH.MAX_LOGIN_ATTEMPTS) {
        lockoutUntil = new Date(Date.now() + SYSTEM_CONSTANTS.AUTH.LOCKOUT_DURATION_MINUTES * 60 * 1000)
      }

      await this.repo.updateUser(user._id.toString(), {
        failedLoginAttempts: failedAttempts,
        lockoutUntil,
      })

      throw ApiError.unauthorized('Invalid email or password', 'INVALID_CREDENTIALS')
    }

    // Reset failed attempts on success
    if (user.failedLoginAttempts > 0 || user.lockoutUntil) {
      await this.repo.updateUser(user._id.toString(), {
        failedLoginAttempts: 0,
        lockoutUntil: undefined,
      })
    }

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    const rawRefreshToken = generateRandomToken(40)
    const refreshTokenHash = hashToken(rawRefreshToken)

    const expiresAt = new Date(Date.now() + parseDurationMs(config.jwtRefreshExpiry))

    await this.repo.saveRefreshToken({
      userId: user._id,
      tokenHash: refreshTokenHash,
      expiresAt,
      ipAddress: clientInfo?.ip,
      userAgent: clientInfo?.userAgent,
    })

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
      },
      accessToken,
      refreshToken: rawRefreshToken,
    }
  }

  async refreshToken(rawRefreshToken: string) {
    const tokenHash = hashToken(rawRefreshToken)
    const tokenDoc = await this.repo.findRefreshTokenByHash(tokenHash)

    if (!tokenDoc) {
      throw ApiError.unauthorized('Invalid refresh token', 'INVALID_REFRESH_TOKEN')
    }

    // Reuse detection! If a revoked token is presented, someone stolen it - invalidate all user sessions!
    if (tokenDoc.isRevoked) {
      await this.repo.revokeAllUserRefreshTokens(tokenDoc.userId.toString())
      throw ApiError.unauthorized('Refresh token reuse detected. All sessions revoked for security.', 'TOKEN_REUSE_DETECTED')
    }

    if (tokenDoc.expiresAt < new Date()) {
      throw ApiError.unauthorized('Refresh token expired', 'EXPIRED_REFRESH_TOKEN')
    }

    const user = await this.repo.findUserById(tokenDoc.userId.toString())
    if (!user) {
      throw ApiError.unauthorized('User not found', 'USER_NOT_FOUND')
    }

    // Rotate refresh token
    const newRawRefreshToken = generateRandomToken(40)
    const newTokenHash = hashToken(newRawRefreshToken)

    await this.repo.revokeRefreshToken(tokenDoc._id.toString(), newTokenHash)

    const expiresAt = new Date(Date.now() + parseDurationMs(config.jwtRefreshExpiry))

    await this.repo.saveRefreshToken({
      userId: user._id,
      tokenHash: newTokenHash,
      expiresAt,
    })

    const newAccessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    return {
      accessToken: newAccessToken,
      refreshToken: newRawRefreshToken,
    }
  }

  async logout(rawRefreshToken?: string) {
    if (rawRefreshToken) {
      const tokenHash = hashToken(rawRefreshToken)
      const tokenDoc = await this.repo.findRefreshTokenByHash(tokenHash)
      if (tokenDoc) {
        await this.repo.revokeRefreshToken(tokenDoc._id.toString())
      }
    }
    return { success: true }
  }
}
