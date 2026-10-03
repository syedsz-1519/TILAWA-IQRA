import { UsersRepository } from './users.repository'
import { comparePassword, hashPassword } from '../../utils/crypto'
import { ApiError } from '../../utils/ApiError'

export class UsersService {
  private repo = new UsersRepository()

  async getProfile(userId: string) {
    const user = await this.repo.findById(userId)
    if (!user) {
      throw ApiError.notFound('User not found', 'USER_NOT_FOUND')
    }
    const { passwordHash: _hash, ...userProfile } = user
    return userProfile
  }

  async updateProfile(userId: string, data: any) {
    const updated = await this.repo.update(userId, data)
    if (!updated) {
      throw ApiError.notFound('User not found', 'USER_NOT_FOUND')
    }
    return updated
  }

  async changePassword(userId: string, currentPass: string, newPass: string) {
    const user = await this.repo.findById(userId)
    if (!user) {
      throw ApiError.notFound('User not found', 'USER_NOT_FOUND')
    }

    const isValid = await comparePassword(currentPass, user.passwordHash)
    if (!isValid) {
      throw ApiError.badRequest('Incorrect current password', 'INVALID_PASSWORD')
    }

    const newHash = await hashPassword(newPass)
    await this.repo.updatePassword(userId, newHash)
    return { success: true }
  }
}
