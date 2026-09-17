import { db } from '../db'
import { streaks, user } from '../db/schema'
import { eq } from 'drizzle-orm'

/**
 * Get or create user streaks record
 */
export async function getUserStreaks(userId: string) {
  let userStreaks = await db.query.streaks.findFirst({
    where: eq(streaks.userId, userId),
  })

  if (!userStreaks) {
    const [newStreaks] = await db
      .insert(streaks)
      .values({
        userId,
        currentStreak: 0,
        totalXP: 0,
      })
      .returning()

    userStreaks = newStreaks
  }

  return userStreaks
}

/**
 * Update user's XP and streak
 */
export async function updateUserXP(userId: string, xpGain: number) {
  const userStreaks = await getUserStreaks(userId)

  // Check if today is a new day
  const lastActivity = userStreaks.lastActivityDate
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const lastActivityDate = lastActivity ? new Date(lastActivity) : null
  lastActivityDate?.setHours(0, 0, 0, 0)

  let newStreak = userStreaks.currentStreak
  if (!lastActivityDate || lastActivityDate.getTime() < today.getTime()) {
    // New day activity
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (lastActivityDate && lastActivityDate.getTime() === yesterday.getTime()) {
      // Streak continues
      newStreak += 1
    } else {
      // Streak resets
      newStreak = 1
    }
  }

  const [updated] = await db
    .update(streaks)
    .set({
      totalXP: userStreaks.totalXP + xpGain,
      currentStreak: newStreak,
      lastActivityDate: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(streaks.userId, userId))
    .returning()

  return updated
}

/**
 * Get all user streaks (admin/stats)
 */
export async function getAllStreaks() {
  return db.query.streaks.findMany({
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })
}
