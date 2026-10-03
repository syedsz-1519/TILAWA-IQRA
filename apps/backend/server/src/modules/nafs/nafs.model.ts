import { Schema, model, Document } from 'mongoose'

export interface INafsTracking extends Document {
  userId: Schema.Types.ObjectId | string
  date: Date
  prayersCompleted: string[]
  fastingStatus: boolean
  quranMinutes: number
  charityAmount?: number
  habits?: Record<string, boolean>
  reflection?: string
  createdAt: Date
  updatedAt: Date
}

const nafsTrackingSchema = new Schema<INafsTracking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    prayersCompleted: { type: [String], default: [] },
    fastingStatus: { type: Boolean, default: false },
    quranMinutes: { type: Number, default: 0 },
    charityAmount: { type: Number, default: 0 },
    habits: { type: Map, of: Boolean, default: {} },
    reflection: { type: String },
  },
  {
    timestamps: true,
  }
)

// One record per user per day — unique constraint prevents duplicate entries
nafsTrackingSchema.index({ userId: 1, date: 1 }, { unique: true })
// History queries: fetch last N days sorted by date
nafsTrackingSchema.index({ userId: 1, date: -1 })

export const NafsTrackingModel = model<INafsTracking>('NafsTracking', nafsTrackingSchema)
