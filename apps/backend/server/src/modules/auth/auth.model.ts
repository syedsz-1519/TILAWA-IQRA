import { Schema, model, Document } from 'mongoose'

export interface IRefreshToken extends Document {
  userId: Schema.Types.ObjectId | string
  tokenHash: string
  expiresAt: Date
  isRevoked: boolean
  replacedByToken?: string
  ipAddress?: string
  userAgent?: string
  createdAt: Date
  updatedAt: Date
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tokenHash: { type: String, required: true, unique: true, index: true },
    expiresAt: { type: Date, required: true, index: true },
    isRevoked: { type: Boolean, default: false },
    replacedByToken: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
)

export const RefreshTokenModel = model<IRefreshToken>('RefreshToken', refreshTokenSchema)
