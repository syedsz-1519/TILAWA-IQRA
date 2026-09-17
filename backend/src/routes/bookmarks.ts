import { db } from '../db'
import { mushafBookmarks } from '../db/schema'
import { eq, and } from 'drizzle-orm'

/**
 * Get user's bookmarks
 */
export async function getUserBookmarks(userId: string) {
  return db.query.mushafBookmarks.findMany({
    where: eq(mushafBookmarks.userId, userId),
  })
}

/**
 * Add bookmark
 */
export async function addBookmark(userId: string, surahNumber: number, ayahNumber: number) {
  // Check if already bookmarked
  const existing = await db.query.mushafBookmarks.findFirst({
    where: and(
      eq(mushafBookmarks.userId, userId),
      eq(mushafBookmarks.surahNumber, surahNumber),
      eq(mushafBookmarks.ayahNumber, ayahNumber)
    ),
  })

  if (existing) {
    return existing
  }

  const [bookmark] = await db
    .insert(mushafBookmarks)
    .values({
      userId,
      surahNumber,
      ayahNumber,
    })
    .returning()

  return bookmark
}

/**
 * Remove bookmark
 */
export async function removeBookmark(userId: string, surahNumber: number, ayahNumber: number) {
  return db
    .delete(mushafBookmarks)
    .where(
      and(
        eq(mushafBookmarks.userId, userId),
        eq(mushafBookmarks.surahNumber, surahNumber),
        eq(mushafBookmarks.ayahNumber, ayahNumber)
      )
    )
    .returning()
}

/**
 * Clear all bookmarks for user
 */
export async function clearBookmarks(userId: string) {
  return db.delete(mushafBookmarks).where(eq(mushafBookmarks.userId, userId)).returning()
}
