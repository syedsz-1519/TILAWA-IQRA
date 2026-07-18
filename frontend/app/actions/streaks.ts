'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { streaks } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getStreaks() {
  const userId = await getUserId()
  const userStreaks = await db
    .select()
    .from(streaks)
    .where(eq(streaks.userId, userId))
  return userStreaks[0] || { currentStreak: 0, totalXP: 0 }
}

export async function addXP(amount: number) {
  const userId = await getUserId()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const userStreaks = await db
    .select()
    .from(streaks)
    .where(eq(streaks.userId, userId))
  
  if (userStreaks.length === 0) {
    await db.insert(streaks).values({
      userId,
      currentStreak: 1,
      totalXP: amount,
      lastActivityDate: new Date(),
    })
  } else {
    const streak = userStreaks[0]
    const lastDate = streak.lastActivityDate ? new Date(streak.lastActivityDate) : null
    lastDate?.setHours(0, 0, 0, 0)
    
    const newStreak = lastDate?.getTime() === today.getTime() 
      ? streak.currentStreak 
      : lastDate?.getTime() === new Date(today).setDate(today.getDate() - 1) 
      ? streak.currentStreak + 1 
      : 1

    await db
      .update(streaks)
      .set({
        currentStreak: newStreak,
        totalXP: streak.totalXP + amount,
        lastActivityDate: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(streaks.id, streak.id))
  }
}
