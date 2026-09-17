import { db } from '../db'
import { readingProgress } from '../db/schema'
import { eq, and } from 'drizzle-orm'

/**
 * Get user's reading progress for a specific surah
 */
export async function getSurahProgress(userId: string, surahNumber: number) {
  return db.query.readingProgress.findFirst({
    where: and(
      eq(readingProgress.userId, userId),
      eq(readingProgress.surahNumber, surahNumber)
    ),
  })
}

/**
 * Get all reading progress for user
 */
export async function getUserReadingProgress(userId: string) {
  return db.query.readingProgress.findMany({
    where: eq(readingProgress.userId, userId),
  })
}

/**
 * Update reading progress
 */
export async function updateReadingProgress(
  userId: string,
  surahNumber: number,
  lastAyahRead: number
) {
  const existing = await getSurahProgress(userId, surahNumber)

  if (existing) {
    const [updated] = await db
      .update(readingProgress)
      .set({
        lastAyahRead,
        updatedAt: new Date(),
      })
      .where(eq(readingProgress.id, existing.id))
      .returning()

    return updated
  }

  // Create new progress record
  const [created] = await db
    .insert(readingProgress)
    .values({
      userId,
      surahNumber,
      lastAyahRead,
    })
    .returning()

  return created
}

/**
 * Get completion percentage for a surah (based on last ayah)
 */
export async function getSurahCompletionPercentage(
  userId: string,
  surahNumber: number,
  totalAyahs: number
) {
  const progress = await getSurahProgress(userId, surahNumber)
  if (!progress) return 0
  return Math.round((progress.lastAyahRead / totalAyahs) * 100)
}
