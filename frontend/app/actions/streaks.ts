'use server'

import { updateStreaks as updateStreaksAPI, getStreaks as getStreaksAPI } from '@/lib/api-client'

/**
 * Server action to get user streaks
 * Requires userId to be passed from client
 * Handles API response and error handling
 */
export async function getStreaks(userId: string) {
  try {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Valid User ID is required')
    }

    // Call API client which handles retries and timeouts
    const { data, error } = await getStreaksAPI(userId)

    // Handle API error
    if (error) {
      throw new Error(`API Error: ${error.message}`)
    }

    // API returns { success: true, data: { ... } }
    const streaksData = data?.data || data
    
    if (!streaksData) {
      // Return default streaks if none exist yet
      return {
        success: true,
        data: {
          userId,
          currentStreak: 0,
          totalXP: 0,
          lastActivityDate: null,
        },
      }
    }

    return {
      success: true,
      data: streaksData,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get streaks'
    console.error('[getStreaks]', message)

    return {
      success: false,
      error: message,
    }
  }
}

/**
 * Server action to add XP to user
 * Requires userId and amount to be passed from client
 * Automatically updates streaks via API
 */
export async function addXP(userId: string, amount: number) {
  try {
    // Validate inputs
    if (!userId || typeof userId !== 'string') {
      throw new Error('Valid User ID is required')
    }

    if (typeof amount !== 'number') {
      throw new Error('XP amount must be a number')
    }

    if (amount <= 0) {
      throw new Error('XP amount must be greater than 0')
    }

    if (!Number.isFinite(amount)) {
      throw new Error('XP amount must be a valid number')
    }

    // Call API client which handles retries and timeouts
    const { data, error } = await updateStreaksAPI(userId, amount)

    // Handle API error
    if (error) {
      throw new Error(`API Error: ${error.message}`)
    }

    // API returns { success: true, data: { ... } }
    const updatedData = data?.data || data

    if (!updatedData) {
      throw new Error('No data returned from server')
    }

    return {
      success: true,
      data: updatedData,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add XP'
    console.error('[addXP]', message)

    return {
      success: false,
      error: message,
    }
  }
}
