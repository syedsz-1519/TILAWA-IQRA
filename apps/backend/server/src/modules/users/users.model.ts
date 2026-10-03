import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  passwordHash: string
  role: 'user' | 'admin'
  avatar?: string
  preferredLanguage: string
  learningLanguages: string[]
  nativeLanguage?: string
  emailVerified: boolean
  verificationToken?: string
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  failedLoginAttempts: number
  lockoutUntil?: Date
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String },
    preferredLanguage: { type: String, default: 'en' },
    learningLanguages: { type: [String], default: [] },
    nativeLanguage: { type: String },
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    failedLoginAttempts: { type: Number, default: 0 },
    lockoutUntil: { type: Date },
  },
  {
    timestamps: true,
  }
)

// Primary lookup: email (unique, login path)
userSchema.index({ email: 1 }, { unique: true })
// Admin: list users sorted by registration date
userSchema.index({ createdAt: -1 })
// Lock-check: find locked accounts efficiently
userSchema.index({ lockoutUntil: 1 }, { sparse: true })

export const UserModel = model<IUser>('User', userSchema)
