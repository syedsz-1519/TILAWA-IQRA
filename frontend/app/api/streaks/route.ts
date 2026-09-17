import { NextRequest, NextResponse } from 'next/server'

// Mock data - in production, this would call the backend database
const mockStreaks: Record<string, { currentStreak: number; totalXP: number; lastActivityDate: string }> = {}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    const streaks = mockStreaks[userId] || {
      currentStreak: 0,
      totalXP: 0,
      lastActivityDate: null,
    }

    return NextResponse.json(streaks)
  } catch (error) {
    console.error('Streaks GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, xpGain } = await request.json()

    if (!userId || typeof xpGain !== 'number') {
      return NextResponse.json({ error: 'userId and xpGain required' }, { status: 400 })
    }

    const current = mockStreaks[userId] || {
      currentStreak: 0,
      totalXP: 0,
      lastActivityDate: null,
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const lastActivity = current.lastActivityDate ? new Date(current.lastActivityDate) : null
    lastActivity?.setHours(0, 0, 0, 0)

    let newStreak = current.currentStreak
    if (!lastActivity || lastActivity.getTime() < today.getTime()) {
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      if (lastActivity && lastActivity.getTime() === yesterday.getTime()) {
        newStreak += 1
      } else {
        newStreak = 1
      }
    }

    mockStreaks[userId] = {
      currentStreak: newStreak,
      totalXP: current.totalXP + xpGain,
      lastActivityDate: today.toISOString(),
    }

    return NextResponse.json(mockStreaks[userId])
  } catch (error) {
    console.error('Streaks POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
