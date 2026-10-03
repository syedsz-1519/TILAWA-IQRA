import { Schema, model, Document } from 'mongoose'

export interface IHifzProgress extends Document {
  userId: Schema.Types.ObjectId | string
  cardId: string
  deckId: string
  status: 'new' | 'learning' | 'review' | 'mastered'
  attempts: number
  correctAttempts: number
  interval: number
  easeFactor: number
  lastReviewed?: Date
  nextReviewDate?: Date
  createdAt: Date
  updatedAt: Date
}

const hifzProgressSchema = new Schema<IHifzProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    cardId: { type: String, required: true, index: true },
    deckId: { type: String, required: true, index: true },
    status: { type: String, enum: ['new', 'learning', 'review', 'mastered'], default: 'learning' },
    attempts: { type: Number, default: 0 },
    correctAttempts: { type: Number, default: 0 },
    interval: { type: Number, default: 1 },
    easeFactor: { type: Number, default: 250 },
    lastReviewed: { type: Date },
    nextReviewDate: { type: Date, index: true },
  },
  {
    timestamps: true,
  }
)

hifzProgressSchema.index({ userId: 1, cardId: 1 }, { unique: true })
hifzProgressSchema.index({ userId: 1, nextReviewDate: 1 })

export const HifzProgressModel = model<IHifzProgress>('HifzProgress', hifzProgressSchema)
