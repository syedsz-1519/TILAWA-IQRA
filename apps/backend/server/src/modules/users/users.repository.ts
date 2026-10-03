import { UserModel, IUser } from './users.model'

export class UsersRepository {
  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).lean()
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select('-passwordHash').lean()
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { passwordHash })
  }
}
