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
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    isRevoked: { type: Boolean, default: false, index: true },
    replacedByToken: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
)

// Fast lookup by hash (primary query path in refresh/logout)
refreshTokenSchema.index({ tokenHash: 1 })
// Find all active tokens for a user (reuse detection, session listing)
refreshTokenSchema.index({ userId: 1, isRevoked: 1 })
// Auto-expire documents 24h after expiry date via MongoDB TTL
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 86400 })

export const RefreshTokenModel = model<IRefreshToken>('RefreshToken', refreshTokenSchema)
