import { BookmarksRepository } from './bookmarks.repository'

export class BookmarksService {
  private repo = new BookmarksRepository()

  async getBookmarks(userId: string, type: 'quran' | 'hadith' | 'dua' | 'story') {
    return this.repo.findByUserAndType(userId, type)
  }

  async addQuranBookmark(userId: string, data: { surahNumber: number; ayahNumber: number; pageNumber?: number; note?: string; folder?: string }) {
    const itemId = `${data.surahNumber}-${data.ayahNumber}`
    const existing = await this.repo.findExisting(userId, 'quran', itemId)
    if (existing) {
      return existing
    }

    return this.repo.createBookmark({
      userId,
      type: 'quran',
      itemId,
      surahNumber: data.surahNumber,
      ayahNumber: data.ayahNumber,
      pageNumber: data.pageNumber,
      note: data.note,
      folder: data.folder || 'General',
    })
  }

  async removeQuranBookmark(userId: string, surahNumber: number, ayahNumber: number) {
    return this.repo.deleteBySurahAndAyah(userId, surahNumber, ayahNumber)
  }

  async addHadithFavorite(userId: string, data: { hadithId: string; hadithText: string; hadithSource?: string }) {
    const existing = await this.repo.findExisting(userId, 'hadith', data.hadithId)
    if (existing) {
      return existing
    }

    return this.repo.createBookmark({
      userId,
      type: 'hadith',
      itemId: data.hadithId,
      hadithId: data.hadithId,
      hadithText: data.hadithText,
      hadithSource: data.hadithSource,
    })
  }

  async removeHadithFavorite(userId: string, hadithId: string) {
    return this.repo.deleteBookmark(userId, 'hadith', hadithId)
  }

  async addDuaFavorite(userId: string, data: { duaId: string; duaText: string; duaTranslation?: string; benefit?: string }) {
    const existing = await this.repo.findExisting(userId, 'dua', data.duaId)
    if (existing) {
      return existing
    }

    return this.repo.createBookmark({
      userId,
      type: 'dua',
      itemId: data.duaId,
      duaId: data.duaId,
      duaText: data.duaText,
      duaTranslation: data.duaTranslation,
      benefit: data.benefit,
    })
  }

  async removeDuaFavorite(userId: string, duaId: string) {
    return this.repo.deleteBookmark(userId, 'dua', duaId)
  }

  async addStoryBookmark(userId: string, storyId: string) {
    const existing = await this.repo.findExisting(userId, 'story', storyId)
    if (existing) {
      return existing
    }

    return this.repo.createBookmark({
      userId,
      type: 'story',
      itemId: storyId,
      storyId,
    })
  }

  async removeStoryBookmark(userId: string, storyId: string) {
    return this.repo.deleteBookmark(userId, 'story', storyId)
  }
}
