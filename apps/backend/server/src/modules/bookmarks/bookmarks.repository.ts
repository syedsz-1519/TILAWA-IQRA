import { BookmarkModel, IBookmark } from './bookmarks.model'

export class BookmarksRepository {
  async findByUserAndType(userId: string, type: 'quran' | 'hadith' | 'dua' | 'story'): Promise<IBookmark[]> {
    return BookmarkModel.find({ userId, type }).sort({ createdAt: -1 }).lean()
  }

  async findExisting(userId: string, type: string, itemId: string): Promise<IBookmark | null> {
    return BookmarkModel.findOne({ userId, type, itemId }).lean()
  }

  async createBookmark(data: Partial<IBookmark>): Promise<IBookmark> {
    return BookmarkModel.create(data)
  }

  async deleteBookmark(userId: string, type: string, itemId: string): Promise<boolean> {
    const result = await BookmarkModel.findOneAndDelete({ userId, type, itemId })
    return !!result
  }

  async deleteBySurahAndAyah(userId: string, surahNumber: number, ayahNumber: number): Promise<boolean> {
    const result = await BookmarkModel.findOneAndDelete({
      userId,
      type: 'quran',
      surahNumber,
      ayahNumber,
    })
    return !!result
  }
}
