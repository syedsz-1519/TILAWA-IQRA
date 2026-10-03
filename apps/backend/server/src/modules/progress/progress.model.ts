import { Schema, model, Document } from 'mongoose'

export interface IReadingProgress extends Document {
  userId: Schema.Types.ObjectId | string
  surahNumber: number
  lastAyahRead: number
  pageNumber: number
  completionPercentage: number
  updatedAt: Date
  createdAt: Date
}

const readingProgressSchema = new Schema<IReadingProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    surahNumber: { type: Number, required: true, min: 1, max: 114 },
    lastAyahRead: { type: Number, required: true, min: 0 },
    pageNumber: { type: Number, default: 1 },
    completionPercentage: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

readingProgressSchema.index({ userId: 1, surahNumber: 1 }, { unique: true })

export const ReadingProgressModel = model<IReadingProgress>('ReadingProgress', readingProgressSchema)
