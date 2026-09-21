import { db } from '../db'
import { hadithFavorites, duaFavorites } from '../db/schema'
import { eq, and } from 'drizzle-orm'

// ========================================
// Hadith Favorites
// ========================================

export async function getUserHadithFavorites(userId: string) {
  return db.query.hadithFavorites.findMany({
    where: eq(hadithFavorites.userId, userId),
  })
}

export async function addHadithFavorite(
  userId: string,
  hadithId: string,
  hadithText: string,
  hadithSource?: string
) {
  // Check if already favorited
  const existing = await db.query.hadithFavorites.findFirst({
    where: and(eq(hadithFavorites.userId, userId), eq(hadithFavorites.hadithId, hadithId)),
  })

  if (existing) {
    return existing
  }

  const [favorite] = await db
    .insert(hadithFavorites)
    .values({
      userId,
      hadithId,
      hadithText,
      hadithSource,
    })
    .returning()

  return favorite
}

export async function removeHadithFavorite(userId: string, hadithId: string) {
  return db
    .delete(hadithFavorites)
    .where(and(eq(hadithFavorites.userId, userId), eq(hadithFavorites.hadithId, hadithId)))
    .returning()
}

// ========================================
// Dua Favorites
// ========================================

export async function getUserDuaFavorites(userId: string) {
  return db.query.duaFavorites.findMany({
    where: eq(duaFavorites.userId, userId),
  })
}

export async function addDuaFavorite(
  userId: string,
  duaId: string,
  duaText: string,
  duaTranslation?: string,
  benefit?: string
) {
  // Check if already favorited
  const existing = await db.query.duaFavorites.findFirst({
    where: and(eq(duaFavorites.userId, userId), eq(duaFavorites.duaId, duaId)),
  })

  if (existing) {
    return existing
  }

  const [favorite] = await db
    .insert(duaFavorites)
    .values({
      userId,
      duaId,
      duaText,
      duaTranslation,
      benefit,
    })
    .returning()

  return favorite
}

export async function removeDuaFavorite(userId: string, duaId: string) {
  return db
    .delete(duaFavorites)
    .where(and(eq(duaFavorites.userId, userId), eq(duaFavorites.duaId, duaId)))
    .returning()
}
