import { Schema, model, Document } from 'mongoose'

export interface IStreak extends Document {
  _id: string
  userId: string
  currentStreak: number
  longestStreak: number
  totalXP: number
  lastActivityDate: Date
  createdAt: Date
  updatedAt: Date
}

const StreakSchema = new Schema<IStreak>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      unique: true,
      index: true,
    },
    currentStreak: {
      type: Number,
      default: 0,
      min: [0, 'Current streak cannot be negative'],
    },
    longestStreak: {
      type: Number,
      default: 0,
      min: [0, 'Longest streak cannot be negative'],
    },
    totalXP: {
      type: Number,
      default: 0,
      min: [0, 'Total XP cannot be negative'],
    },
    lastActivityDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'streaks',
  }
)

// Create indexes
StreakSchema.index({ userId: 1 })
StreakSchema.index({ currentStreak: -1 }) // For leaderboards
StreakSchema.index({ totalXP: -1 }) // For leaderboards
StreakSchema.index({ createdAt: -1 })

export const Streak = model<IStreak>('Streak', StreakSchema)
