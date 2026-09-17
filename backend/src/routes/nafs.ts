import { db } from '../db'
import { nafsTracking } from '../db/schema'
import { eq, and, gte, lt } from 'drizzle-orm'

/**
 * Get today's nafs tracking record for user
 */
export async function getTodayNafsRecord(userId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return db.query.nafsTracking.findFirst({
    where: and(
      eq(nafsTracking.userId, userId),
      gte(nafsTracking.date, today),
      lt(nafsTracking.date, tomorrow)
    ),
  })
}

/**
 * Create or update nafs record for today
 */
export async function updateNafsRecord(
  userId: string,
  habits: Record<string, boolean>,
  reflection?: string
) {
  const existing = await getTodayNafsRecord(userId)

  if (existing) {
    const [updated] = await db
      .update(nafsTracking)
      .set({
        habits,
        reflection,
      })
      .where(eq(nafsTracking.id, existing.id))
      .returning()

    return updated
  }

  const [created] = await db
    .insert(nafsTracking)
    .values({
      userId,
      date: new Date(),
      habits,
      reflection,
    })
    .returning()

  return created
}

/**
 * Get user's nafs history (last 30 days)
 */
export async function getNafsHistory(userId: string, days: number = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  startDate.setHours(0, 0, 0, 0)

  return db.query.nafsTracking.findMany({
    where: and(eq(nafsTracking.userId, userId), gte(nafsTracking.date, startDate)),
  })
}
