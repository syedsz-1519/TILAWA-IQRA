import { NafsTracking } from '../models'

/**
 * Get today's nafs tracking record for user
 */
export async function getTodayNafsRecord(userId: string) {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return await NafsTracking.findOne({
      userId,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    })
  } catch (error) {
    console.error('Error getting today nafs record:', error)
    return null
  }
}

/**
 * Create or update nafs record for today
 */
export async function updateNafsRecord(
  userId: string,
  habits: Record<string, boolean>,
  reflection?: string
) {
  try {
    const existing = await getTodayNafsRecord(userId)

    if (existing) {
      const updated = await NafsTracking.findByIdAndUpdate(
        existing._id,
        {
          habits,
          reflection,
          updatedAt: new Date(),
        },
        { new: true, runValidators: true }
      )

      return updated
    }

    const created = await NafsTracking.create({
      userId,
      date: new Date(),
      habits,
      reflection,
    })

    return created
  } catch (error) {
    console.error('Error updating nafs record:', error)
    return null
  }
}

/**
 * Get user's nafs history (last 30 days)
 */
export async function getNafsHistory(userId: string, _days: number = 30) {
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - _days)
    startDate.setHours(0, 0, 0, 0)

    return await NafsTracking.find({
      userId,
      date: {
        $gte: startDate,
      },
    }).sort({ date: -1 })
  } catch (error) {
    console.error('Error getting nafs history:', error)
    return []
  }
}
