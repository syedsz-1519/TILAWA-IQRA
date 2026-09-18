'use server'

import { getSession } from '@/lib/auth'
import { updateStreaks as updateStreaksAPI, getStreaks as getStreaksAPI } from '@/lib/api-client'

async function getUserId() {
  try {
    const session = await getSession()
    if (!session?.user?.id) throw new Error('Unauthorized')
    return session.user.id
  } catch (error) {
    throw new Error('Authentication failed: ' + (error instanceof Error ? error.message : String(error)))
  }
}

export async function getStreaks() {
  try {
    const userId = await getUserId()
    const { data, error } = await getStreaksAPI(userId)
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data || { userId, currentStreak: 0, totalXP: 0 }
  } catch (error) {
    throw new Error('Failed to get streaks: ' + (error instanceof Error ? error.message : String(error)))
  }
}

export async function addXP(amount: number) {
  try {
    const userId = await getUserId()
    const { data, error } = await updateStreaksAPI(userId, amount)
    
    if (error) {
      throw new Error(error.message)
    }
    
    return { success: true, data }
  } catch (error) {
    throw new Error('Failed to add XP: ' + (error instanceof Error ? error.message : String(error)))
  }
}
