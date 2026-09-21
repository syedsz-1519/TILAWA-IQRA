import { Schema, model, Document } from 'mongoose'

export interface INafsTracking extends Document {
  _id: string
  userId: string
  date: Date
  habits: Record<string, boolean>
  reflection: string
  createdAt: Date
  updatedAt: Date
}

const NafsTrackingSchema = new Schema<INafsTracking>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: () => new Date(),
    },
    habits: {
      type: Schema.Types.Mixed,
      default: {},
    },
    reflection: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'nafs_tracking',
  }
)

// Create indexes
NafsTrackingSchema.index({ userId: 1 })
NafsTrackingSchema.index({ userId: 1, date: -1 })
NafsTrackingSchema.index({ createdAt: -1 })

export const NafsTracking = model<INafsTracking>('NafsTracking', NafsTrackingSchema)
