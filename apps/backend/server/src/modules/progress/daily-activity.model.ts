import { Schema, model, Document } from 'mongoose'

export interface IDailyActivity extends Document {
  userId: Schema.Types.ObjectId | string
  date: string        // ISO date string YYYY-MM-DD
  ayahCount: number   // cumulative ayahs read on this date
  surahsRead: number[]
  createdAt: Date
  updatedAt: Date
}

const dailyActivitySchema = new Schema<IDailyActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: String, required: true, index: true }, // e.g. "2026-10-03"
    ayahCount: { type: Number, default: 0, min: 0 },
    surahsRead: { type: [Number], default: [] },
  },
  {
    timestamps: true,
  }
)

dailyActivitySchema.index({ userId: 1, date: 1 }, { unique: true })

export const DailyActivityModel = model<IDailyActivity>('DailyActivity', dailyActivitySchema)
