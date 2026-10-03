import { Schema, model, Document } from 'mongoose'

export interface IStreak extends Document {
  userId: Schema.Types.ObjectId | string
  currentStreak: number
  longestStreak: number
  totalXP: number
  lastActivityDate?: Date
  history: Array<{ date: Date; minutesRead: number }>
  createdAt: Date
  updatedAt: Date
}

const streakSchema = new Schema<IStreak>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    totalXP: { type: Number, default: 0 },
    lastActivityDate: { type: Date },
    history: [{ date: Date, minutesRead: Number }],
  },
  {
    timestamps: true,
  }
)

// One streak doc per user
streakSchema.index({ userId: 1 }, { unique: true })
// Leaderboard: sort by XP desc, then streak desc
streakSchema.index({ totalXP: -1, currentStreak: -1 })
// Streak-reset cron: find users who were active yesterday or earlier
streakSchema.index({ lastActivityDate: 1 }, { sparse: true })

export const StreakModel = model<IStreak>('Streak', streakSchema)
