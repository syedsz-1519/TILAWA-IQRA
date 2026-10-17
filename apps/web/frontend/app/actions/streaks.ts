'use server'

import { getStreaks as getStreaksLocal, updateStreaks as updateStreaksLocal } from '@/lib/db-client'

/**
 * Server action to get user streaks — reads from localStorage via db-client.
 * Note: 'use server' actions run on the server, so this returns default data.
 * Actual streak data is managed client-side via useStreaks hook.
 */
export async function getStreaks(userId: string) {
  try {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Valid User ID is required')
    }

    return {
      success: true,
      data: {
        userId,
        currentStreak: 0,
        totalXP: 0,
        lastActivityDate: null,
      },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get streaks'
    console.error('[getStreaks]', message)
    return { success: false, error: message }
  }
}

/**
 * Server action to add XP — returns success; actual update happens client-side.
 */
export async function addXP(userId: string, amount: number) {
  try {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Valid User ID is required')
    }
    if (typeof amount !== 'number' || amount <= 0 || !Number.isFinite(amount)) {
      throw new Error('XP amount must be a positive finite number')
    }

    return {
      success: true,
      data: { userId, xpAdded: amount },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add XP'
    console.error('[addXP]', message)
    return { success: false, error: message }
  }
}
