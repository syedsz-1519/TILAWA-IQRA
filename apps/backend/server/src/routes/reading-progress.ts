import { ReadingProgress } from '../models'

/**
 * Get user's reading progress for a specific surah
 */
export async function getSurahProgress(userId: string, surahNumber: number) {
  try {
    return await ReadingProgress.findOne({ userId, surahNumber })
  } catch (error) {
    console.error('Error getting surah progress:', error)
    return null
  }
}

/**
 * Get all reading progress for user
 */
export async function getUserReadingProgress(userId: string) {
  try {
    return await ReadingProgress.find({ userId }).sort({ surahNumber: 1 })
  } catch (error) {
    console.error('Error getting user reading progress:', error)
    return []
  }
}

/**
 * Update reading progress
 */
export async function updateReadingProgress(
  userId: string,
  surahNumber: number,
  lastAyahRead: number,
  totalAyahsInSurah: number = 286
) {
  try {
    const existing = await getSurahProgress(userId, surahNumber)

    const completionPercentage = Math.round((lastAyahRead / totalAyahsInSurah) * 100)

    if (existing) {
      const updated = await ReadingProgress.findByIdAndUpdate(
        existing._id,
        {
          lastAyahRead,
          completionPercentage,
          updatedAt: new Date(),
        },
        { new: true, runValidators: true }
      )
      return updated
    }

    // Create new progress record
    const created = await ReadingProgress.create({
      userId,
      surahNumber,
      lastAyahRead,
      completionPercentage,
    })

    return created
  } catch (error) {
    console.error('Error updating reading progress:', error)
    return null
  }
}

/**
 * Get completion percentage for a surah (based on last ayah)
 */
export async function getSurahCompletionPercentage(
  userId: string,
  surahNumber: number,
  totalAyahs: number = 286
) {
  try {
    const progress = await getSurahProgress(userId, surahNumber)
    if (!progress) return 0
    return Math.round((progress.lastAyahRead / totalAyahs) * 100)
  } catch (error) {
    console.error('Error getting completion percentage:', error)
    return 0
  }
}
