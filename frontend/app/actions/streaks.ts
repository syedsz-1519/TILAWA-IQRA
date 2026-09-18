'use server'

import { updateStreaks as updateStreaksAPI, getStreaks as getStreaksAPI } from '@/lib/api-client'

/**
 * Server action to get user streaks
 * Requires userId to be passed from client
 */
export async function getStreaks(userId: string) {
  try {
    if (!userId) {
      throw new Error('User ID is required')
    }

    const { data, error } = await getStreaksAPI(userId)

    if (error) {
      throw new Error(error.message)
    }

    return {
      success: true,
      data: data || { userId, currentStreak: 0, totalXP: 0 },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get streaks',
    }
  }
}

/**
 * Server action to add XP to user
 * Requires userId to be passed from client
 */
export async function addXP(userId: string, amount: number) {
  try {
    if (!userId) {
      throw new Error('User ID is required')
    }

    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Amount must be a positive number')
    }

    const { data, error } = await updateStreaksAPI(userId, amount)

    if (error) {
      throw new Error(error.message)
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add XP',
    }
  }
}
