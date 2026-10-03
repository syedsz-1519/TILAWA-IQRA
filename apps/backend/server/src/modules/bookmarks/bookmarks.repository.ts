import { BookmarkModel, IBookmark } from './bookmarks.model'
import { parsePagination, buildMeta } from '../../utils/pagination'

export class BookmarksRepository {
  async findByUserAndType(
    userId: string,
    type: 'quran' | 'hadith' | 'dua' | 'story',
    options: { page?: number; limit?: number } = {}
  ) {
    const { page, limit, skip } = parsePagination(options)
    const filter = { userId, type }

    const [bookmarks, total] = await Promise.all([
      BookmarkModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BookmarkModel.countDocuments(filter),
    ])

    return { bookmarks, meta: buildMeta(page, limit, total) }
  }

  async findAll(userId: string, options: { page?: number; limit?: number } = {}) {
    const { page, limit, skip } = parsePagination(options)
    const filter = { userId }

    const [bookmarks, total] = await Promise.all([
      BookmarkModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BookmarkModel.countDocuments(filter),
    ])

    return { bookmarks, meta: buildMeta(page, limit, total) }
  }

  async findExisting(userId: string, type: 'quran' | 'hadith' | 'dua' | 'story', itemId: string): Promise<IBookmark | null> {
    return BookmarkModel.findOne({ userId, type, itemId }).lean()
  }

  async createBookmark(data: Partial<IBookmark>): Promise<IBookmark> {
    return BookmarkModel.create(data)
  }

  async deleteBookmark(userId: string, type: 'quran' | 'hadith' | 'dua' | 'story', itemId: string): Promise<boolean> {
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
