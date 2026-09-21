import { Schema, model, Document } from 'mongoose'

export type CardStatus = 'new' | 'learning' | 'review' | 'mastered'

export interface IHifzProgress extends Document {
  userId: string
  cardId: string
  deckId: string
  status: CardStatus
  attempts: number
  correctAttempts: number
  interval: number
  easeFactor: number
  nextReviewDate: Date
  lastReviewed: Date | null
  createdAt: Date
  updatedAt: Date
}

const HifzProgressSchema = new Schema<IHifzProgress>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    cardId: {
      type: String,
      required: [true, 'Card ID is required'],
    },
    deckId: {
      type: String,
      required: [true, 'Deck ID is required'],
    },
    status: {
      type: String,
      enum: ['new', 'learning', 'review', 'mastered'],
      default: 'new',
    },
    attempts: {
      type: Number,
      default: 0,
      min: [0, 'Attempts cannot be negative'],
    },
    correctAttempts: {
      type: Number,
      default: 0,
      min: [0, 'Correct attempts cannot be negative'],
    },
    interval: {
      type: Number,
      default: 1,
      min: [1, 'Interval must be at least 1'],
    },
    easeFactor: {
      type: Number,
      default: 250, // 2.5 * 100 for SM-2 algorithm
      min: [130, 'Ease factor minimum is 1.3'],
    },
    nextReviewDate: {
      type: Date,
      default: () => new Date(),
    },
    lastReviewed: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'hifz_progress',
  }
)

// Create indexes
HifzProgressSchema.index({ userId: 1 })
HifzProgressSchema.index({ userId: 1, cardId: 1 }, { unique: true })
HifzProgressSchema.index({ userId: 1, status: 1 })
HifzProgressSchema.index({ nextReviewDate: 1 })
HifzProgressSchema.index({ createdAt: -1 })

export const HifzProgress = model<IHifzProgress>('HifzProgress', HifzProgressSchema)
