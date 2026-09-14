import { NextRequest, NextResponse } from 'next/server'

// Mock data storage - in production, this would use database
const mockBookmarks: Record<string, Array<{ surahNumber: number; ayahNumber: number; bookmarkedAt: string }>> = {}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    const bookmarks = mockBookmarks[userId] || []
    return NextResponse.json(bookmarks)
  } catch (error) {
    console.error('Bookmarks GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, surahNumber, ayahNumber } = await request.json()

    if (!userId || typeof surahNumber !== 'number' || typeof ayahNumber !== 'number') {
      return NextResponse.json(
        { error: 'userId, surahNumber, and ayahNumber required' },
        { status: 400 }
      )
    }

    if (!mockBookmarks[userId]) {
      mockBookmarks[userId] = []
    }

    const existing = mockBookmarks[userId].find(
      (b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
    )

    if (existing) {
      return NextResponse.json(existing)
    }

    const bookmark = {
      surahNumber,
      ayahNumber,
      bookmarkedAt: new Date().toISOString(),
    }

    mockBookmarks[userId].push(bookmark)
    return NextResponse.json(bookmark, { status: 201 })
  } catch (error) {
    console.error('Bookmarks POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId, surahNumber, ayahNumber } = await request.json()

    if (!userId || typeof surahNumber !== 'number' || typeof ayahNumber !== 'number') {
      return NextResponse.json(
        { error: 'userId, surahNumber, and ayahNumber required' },
        { status: 400 }
      )
    }

    if (!mockBookmarks[userId]) {
      return NextResponse.json({ success: true })
    }

    mockBookmarks[userId] = mockBookmarks[userId].filter(
      (b) => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber)
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Bookmarks DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
