import { Schema, model, Document } from 'mongoose'

export interface IBookmark extends Document {
  userId: Schema.Types.ObjectId | string
  type: 'quran' | 'hadith' | 'dua' | 'story'
  itemId: string
  surahNumber?: number
  ayahNumber?: number
  pageNumber?: number
  hadithId?: string
  hadithText?: string
  hadithSource?: string
  duaId?: string
  duaText?: string
  duaTranslation?: string
  benefit?: string
  storyId?: string
  note?: string
  folder?: string
  createdAt: Date
  updatedAt: Date
}

const bookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['quran', 'hadith', 'dua', 'story'], required: true, index: true },
    itemId: { type: String, required: true, index: true },
    surahNumber: { type: Number },
    ayahNumber: { type: Number },
    pageNumber: { type: Number },
    hadithId: { type: String },
    hadithText: { type: String },
    hadithSource: { type: String },
    duaId: { type: String },
    duaText: { type: String },
    duaTranslation: { type: String },
    benefit: { type: String },
    storyId: { type: String },
    note: { type: String },
    folder: { type: String, default: 'General' },
  },
  {
    timestamps: true,
  }
)

bookmarkSchema.index({ userId: 1, type: 1, itemId: 1 }, { unique: true })

export const BookmarkModel = model<IBookmark>('Bookmark', bookmarkSchema)
