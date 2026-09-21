import { Schema, model, Document } from 'mongoose'

export type BookmarkType = 'quran' | 'hadith' | 'dua' | 'story'

export interface IBookmark extends Document {
  _id: string
  userId: string
  type: BookmarkType
  itemId: string
  surahNumber?: number
  ayahNumber?: number
  hadithId?: string
  hadithText?: string
  hadithSource?: string
  duaId?: string
  duaText?: string
  duaTranslation?: string
  benefit?: string
  storyId?: string
  createdAt: Date
  updatedAt: Date
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    type: {
      type: String,
      enum: ['quran', 'hadith', 'dua', 'story'],
      required: [true, 'Bookmark type is required'],
    },
    itemId: {
      type: String,
      required: [true, 'Item ID is required'],
    },
    surahNumber: {
      type: Number,
    },
    ayahNumber: {
      type: Number,
    },
    hadithId: {
      type: String,
    },
    hadithText: {
      type: String,
    },
    hadithSource: {
      type: String,
    },
    duaId: {
      type: String,
    },
    duaText: {
      type: String,
    },
    duaTranslation: {
      type: String,
    },
    benefit: {
      type: String,
    },
    storyId: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'bookmarks',
  }
)

// Create indexes for faster queries
BookmarkSchema.index({ userId: 1, type: 1 })
BookmarkSchema.index({ userId: 1, itemId: 1 }, { unique: true }) // Prevent duplicate bookmarks
BookmarkSchema.index({ createdAt: -1 })

export const Bookmark = model<IBookmark>('Bookmark', BookmarkSchema)
