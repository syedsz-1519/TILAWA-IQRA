import { Schema, model, Document } from 'mongoose'

export interface ILanguage extends Document {
  _id: string
  userId: string
  language: string
  nativeName: string
  totalAyahsRead: number
  totalSurahsCompleted: number
  lastReadSurah: number
  lastReadAyah: number
  masteredAyahs: number
  reviewNeededAyahs: number
  streakDays: number
  lastActivity: Date
  createdAt: Date
  updatedAt: Date
}

const LanguageSchema = new Schema<ILanguage>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    language: {
      type: String,
      required: [true, 'Language code is required'],
    },
    nativeName: {
      type: String,
      required: [true, 'Native language name is required'],
    },
    totalAyahsRead: {
      type: Number,
      default: 0,
      min: [0, 'Total ayahs cannot be negative'],
    },
    totalSurahsCompleted: {
      type: Number,
      default: 0,
      min: [0, 'Total surahs cannot be negative'],
      max: [114, 'Total surahs cannot exceed 114'],
    },
    lastReadSurah: {
      type: Number,
      default: 1,
      min: [1, 'Surah number must be at least 1'],
      max: [114, 'Surah number cannot exceed 114'],
    },
    lastReadAyah: {
      type: Number,
      default: 0,
      min: [0, 'Ayah number cannot be negative'],
    },
    masteredAyahs: {
      type: Number,
      default: 0,
      min: [0, 'Mastered ayahs cannot be negative'],
    },
    reviewNeededAyahs: {
      type: Number,
      default: 0,
      min: [0, 'Review needed ayahs cannot be negative'],
    },
    streakDays: {
      type: Number,
      default: 0,
      min: [0, 'Streak days cannot be negative'],
    },
    lastActivity: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'languages',
  }
)

// Create indexes
LanguageSchema.index({ userId: 1 })
LanguageSchema.index({ userId: 1, language: 1 }, { unique: true })
LanguageSchema.index({ lastActivity: -1 })
LanguageSchema.index({ createdAt: -1 })

export const Language = model<ILanguage>('Language', LanguageSchema)
