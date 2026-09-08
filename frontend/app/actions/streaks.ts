'use server'

import { getAuth } from '@/lib/auth'
import { getDb } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

async function getUserId() {
  try {
    const auth = getAuth()
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) throw new Error('Unauthorized')
    return session.user.id
  } catch (error) {
    throw new Error('Authentication failed: ' + (error instanceof Error ? error.message : String(error)))
  }
}

export async function getStreaks() {
  try {
    const userId = await getUserId()
    const db = getDb()
    
    // For now, return a default streak object
    // This would normally query the database
    return { userId, currentStreak: 0, totalXP: 0 }
  } catch (error) {
    throw new Error('Failed to get streaks: ' + (error instanceof Error ? error.message : String(error)))
  }
}

export async function addXP(amount: number) {
  try {
    const userId = await getUserId()
    const db = getDb()
    
    // Streaks would normally be updated in database here
    // For now, this is a placeholder
    return { success: true, userId, amount }
  } catch (error) {
    throw new Error('Failed to add XP: ' + (error instanceof Error ? error.message : String(error)))
  }
}
