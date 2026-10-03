import { UserModel, IUser } from '../users/users.model'
import { RefreshTokenModel, IRefreshToken } from './auth.model'

export class AuthRepository {
  async findUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email: email.toLowerCase() })
  }

  async findUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id)
  }

  async createUser(data: Partial<IUser>): Promise<IUser> {
    return UserModel.create(data)
  }

  async updateUser(id: string, update: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, update, { new: true, runValidators: true })
  }

  async saveRefreshToken(data: Partial<IRefreshToken>): Promise<IRefreshToken> {
    return RefreshTokenModel.create(data)
  }

  async findRefreshTokenByHash(tokenHash: string): Promise<IRefreshToken | null> {
    return RefreshTokenModel.findOne({ tokenHash })
  }

  async revokeRefreshToken(id: string, replacedByToken?: string): Promise<void> {
    await RefreshTokenModel.findByIdAndUpdate(id, {
      isRevoked: true,
      replacedByToken,
    })
  }

  async revokeAllUserRefreshTokens(userId: string): Promise<void> {
    await RefreshTokenModel.updateMany({ userId }, { isRevoked: true })
  }

  async deleteExpiredRefreshTokens(): Promise<number> {
    const result = await RefreshTokenModel.deleteMany({
      $or: [{ expiresAt: { $lt: new Date() } }, { isRevoked: true }],
    })
    return result.deletedCount || 0
  }
}
