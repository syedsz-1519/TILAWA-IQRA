import { Bookmark } from '../models'

// ========================================
// Hadith Favorites
// ========================================

export async function getUserHadithFavorites(userId: string) {
  try {
    return await Bookmark.find({ userId, type: 'hadith' }).sort({ createdAt: -1 })
  } catch (error) {
    console.error('Error fetching hadith favorites:', error)
    return []
  }
}

export async function addHadithFavorite(
  userId: string,
  hadithId: string,
  hadithText: string,
  hadithSource?: string
) {
  try {
    // Check if already favorited
    const existing = await Bookmark.findOne({
      userId,
      type: 'hadith',
      itemId: hadithId,
    })

    if (existing) {
      return existing
    }

    const favorite = await Bookmark.create({
      userId,
      type: 'hadith',
      itemId: hadithId,
      hadithId,
      hadithText,
      hadithSource,
    })

    return favorite
  } catch (error) {
    console.error('Error adding hadith favorite:', error)
    return null
  }
}

export async function removeHadithFavorite(_userId: string, _hadithId: string) {
  try {
    const result = await Bookmark.findOneAndDelete({
      userId: _userId,
      type: 'hadith',
      hadithId: _hadithId,
    })
    return [{ success: !!result }]
  } catch (error) {
    console.error('Error removing hadith favorite:', error)
    return [{ success: false }]
  }
}

// ========================================
// Dua Favorites
// ========================================

export async function getUserDuaFavorites(userId: string) {
  try {
    return await Bookmark.find({ userId, type: 'dua' }).sort({ createdAt: -1 })
  } catch (error) {
    console.error('Error fetching dua favorites:', error)
    return []
  }
}

export async function addDuaFavorite(
  userId: string,
  duaId: string,
  duaText: string,
  duaTranslation?: string,
  benefit?: string
) {
  try {
    // Check if already favorited
    const existing = await Bookmark.findOne({
      userId,
      type: 'dua',
      itemId: duaId,
    })

    if (existing) {
      return existing
    }

    const favorite = await Bookmark.create({
      userId,
      type: 'dua',
      itemId: duaId,
      duaId,
      duaText,
      duaTranslation,
      benefit,
    })

    return favorite
  } catch (error) {
    console.error('Error adding dua favorite:', error)
    return null
  }
}

export async function removeDuaFavorite(_userId: string, _duaId: string) {
  try {
    const result = await Bookmark.findOneAndDelete({
      userId: _userId,
      type: 'dua',
      duaId: _duaId,
    })
    return [{ success: !!result }]
  } catch (error) {
    console.error('Error removing dua favorite:', error)
    return [{ success: false }]
  }
}
