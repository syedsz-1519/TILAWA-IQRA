import { Streak } from '../models'

/**
 * Get or create user streaks record
 */
export async function getUserStreaks(userId: string) {
  try {
    let userStreaks = await Streak.findOne({ userId })

    if (!userStreaks) {
      userStreaks = await Streak.create({
        userId,
        currentStreak: 0,
        longestStreak: 0,
        totalXP: 0,
      })
    }

    return userStreaks
  } catch (error) {
    console.error('Error getting user streaks:', error)
    return null
  }
}

/**
 * Update user's XP and streak
 */
export async function updateUserXP(userId: string, xpGain: number) {
  try {
    const userStreaks = await getUserStreaks(userId)

    if (!userStreaks) {
      return null
    }

    // Check if today is a new day
    const lastActivity = userStreaks.lastActivityDate
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let lastActivityDate = null
    if (lastActivity) {
      lastActivityDate = new Date(lastActivity)
      lastActivityDate.setHours(0, 0, 0, 0)
    }

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

    // Update longest streak if needed
    const newLongestStreak = Math.max(userStreaks.longestStreak, newStreak)

    const updated = await Streak.findByIdAndUpdate(
      userStreaks._id,
      {
        totalXP: userStreaks.totalXP + xpGain,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActivityDate: new Date(),
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    )

    return updated
  } catch (error) {
    console.error('Error updating user XP:', error)
    return null
  }
}

/**
 * Get all user streaks (admin/stats)
 */
export async function getAllStreaks() {
  try {
    return await Streak.find({}).sort({ totalXP: -1 }).limit(100)
  } catch (error) {
    console.error('Error getting all streaks:', error)
    return []
  }
}
