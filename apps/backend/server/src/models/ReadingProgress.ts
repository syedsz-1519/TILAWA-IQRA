import { Schema, model, Document } from 'mongoose'

export interface IReadingProgress extends Document {
  userId: string
  surahNumber: number
  lastAyahRead: number
  completionPercentage: number
  createdAt: Date
  updatedAt: Date
}

const ReadingProgressSchema = new Schema<IReadingProgress>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    surahNumber: {
      type: Number,
      required: [true, 'Surah number is required'],
      min: [1, 'Surah number must be between 1 and 114'],
      max: [114, 'Surah number must be between 1 and 114'],
    },
    lastAyahRead: {
      type: Number,
      required: [true, 'Last ayah read is required'],
      min: [1, 'Ayah number must be positive'],
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: [0, 'Completion cannot be negative'],
      max: [100, 'Completion cannot exceed 100'],
    },
  },
  {
    timestamps: true,
    collection: 'reading_progress',
  }
)

// Create indexes for faster queries
ReadingProgressSchema.index({ userId: 1 })
ReadingProgressSchema.index({ userId: 1, surahNumber: 1 }, { unique: true })
ReadingProgressSchema.index({ updatedAt: -1 })

export const ReadingProgress = model<IReadingProgress>('ReadingProgress', ReadingProgressSchema)
