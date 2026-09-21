import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  phoneNumber?: string
  profilePicture?: string
  nativeLanguage: string
  preferredLanguage: string
  learningLanguages: string[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    },
    password: {
      type: String,
      select: false, // Don't return password by default
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
    },
    nativeLanguage: {
      type: String,
      default: 'ur', // Urdu by default
    },
    preferredLanguage: {
      type: String,
      default: 'ur',
    },
    learningLanguages: {
      type: [String],
      default: ['ur', 'en'],
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
)

// Create indexes for frequently queried fields
UserSchema.index({ email: 1 })
UserSchema.index({ createdAt: -1 })

export const User = model<IUser>('User', UserSchema)
