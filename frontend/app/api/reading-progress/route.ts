import { NextRequest, NextResponse } from 'next/server'

// Mock data storage
const mockProgress: Record<string, Array<{ surahNumber: number; lastAyahRead: number; updatedAt: string }>> = {}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const surahNumber = request.nextUrl.searchParams.get('surahNumber')

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    if (surahNumber) {
      const progress = (mockProgress[userId] || []).find(
        (p) => p.surahNumber === Number(surahNumber)
      )
      return NextResponse.json(progress || null)
    }

    const allProgress = mockProgress[userId] || []
    return NextResponse.json(allProgress)
  } catch (error) {
    console.error('Reading progress GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, surahNumber, lastAyahRead } = await request.json()

    if (!userId || typeof surahNumber !== 'number' || typeof lastAyahRead !== 'number') {
      return NextResponse.json(
        { error: 'userId, surahNumber, and lastAyahRead required' },
        { status: 400 }
      )
    }

    if (!mockProgress[userId]) {
      mockProgress[userId] = []
    }

    const existing = mockProgress[userId].find((p) => p.surahNumber === surahNumber)

    if (existing) {
      existing.lastAyahRead = lastAyahRead
      existing.updatedAt = new Date().toISOString()
      return NextResponse.json(existing)
    }

    const progress = {
      surahNumber,
      lastAyahRead,
      updatedAt: new Date().toISOString(),
    }

    mockProgress[userId].push(progress)
    return NextResponse.json(progress, { status: 201 })
  } catch (error) {
    console.error('Reading progress POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
