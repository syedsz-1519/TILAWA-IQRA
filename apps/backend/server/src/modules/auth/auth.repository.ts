import { UserModel, IUser } from '../users/users.model'
import { RefreshTokenModel, IRefreshToken } from './auth.model'
import { parsePagination, buildMeta } from '../../utils/pagination'

export class AuthRepository {
  async findUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email: email.toLowerCase() }).lean()
  }

  async findUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).lean()
  }

  async createUser(data: Partial<IUser>): Promise<IUser> {
    return UserModel.create(data)
  }

  async updateUser(id: string, update: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, update, { new: true, runValidators: true }).lean()
  }

  async saveRefreshToken(data: Partial<IRefreshToken>): Promise<IRefreshToken> {
    return RefreshTokenModel.create(data)
  }

  async findRefreshTokenByHash(tokenHash: string): Promise<IRefreshToken | null> {
    return RefreshTokenModel.findOne({ tokenHash }).lean()
  }

  async revokeRefreshToken(id: string, replacedByToken?: string): Promise<void> {
    await RefreshTokenModel.findByIdAndUpdate(id, {
      isRevoked: true,
      ...(replacedByToken ? { replacedByToken } : {}),
    })
  }

  async revokeAllUserRefreshTokens(userId: string): Promise<void> {
    await RefreshTokenModel.updateMany({ userId, isRevoked: false }, { isRevoked: true })
  }

  /** Deletes expired and revoked tokens. Called by nightly cron (token-cleanup job). */
  async deleteExpiredRefreshTokens(): Promise<number> {
    const result = await RefreshTokenModel.deleteMany({
      $or: [{ expiresAt: { $lt: new Date() } }, { isRevoked: true }],
    })
    return result.deletedCount ?? 0
  }

  /** List a user's active sessions (for a "manage sessions" UI). */
  async listActiveSessions(
    userId: string,
    options: { page?: number; limit?: number } = {}
  ) {
    const { page, limit, skip } = parsePagination(options)
    const filter = { userId, isRevoked: false, expiresAt: { $gt: new Date() } }

    const [sessions, total] = await Promise.all([
      RefreshTokenModel.find(filter)
        .select('ipAddress userAgent createdAt expiresAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      RefreshTokenModel.countDocuments(filter),
    ])

    return { sessions, meta: buildMeta(page, limit, total) }
  }
}
