import { NextRequest, NextResponse } from 'next/server'

/**
 * Proxy to backend bookmarks API
 * GET /api/bookmarks?userId=<userId>
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const response = await fetch(`${backendUrl}/api/bookmarks?userId=${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      console.error(`Backend bookmarks GET failed: ${response.status}`)
      return NextResponse.json(
        { error: 'Failed to fetch bookmarks from backend' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data.data || data)
  } catch (error) {
    console.error('Bookmarks proxy GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Proxy to backend bookmarks API
 * POST /api/bookmarks
 * Body: { userId: string, surahNumber: number, ayahNumber: number }
 */
export async function POST(request: NextRequest) {
  try {
    const { userId, surahNumber, ayahNumber } = await request.json()

    if (!userId || typeof surahNumber !== 'number' || typeof ayahNumber !== 'number') {
      return NextResponse.json(
        { error: 'userId, surahNumber, and ayahNumber required' },
        { status: 400 }
      )
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const response = await fetch(`${backendUrl}/api/bookmarks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, surahNumber, ayahNumber }),
    })

    if (!response.ok) {
      console.error(`Backend bookmarks POST failed: ${response.status}`)
      return NextResponse.json(
        { error: 'Failed to add bookmark in backend' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data.data || data, { status: 201 })
  } catch (error) {
    console.error('Bookmarks proxy POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Proxy to backend bookmarks API
 * DELETE /api/bookmarks
 * Body: { userId: string, surahNumber: number, ayahNumber: number }
 */
export async function DELETE(request: NextRequest) {
  try {
    const { userId, surahNumber, ayahNumber } = await request.json()

    if (!userId || typeof surahNumber !== 'number' || typeof ayahNumber !== 'number') {
      return NextResponse.json(
        { error: 'userId, surahNumber, and ayahNumber required' },
        { status: 400 }
      )
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const response = await fetch(`${backendUrl}/api/bookmarks`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, surahNumber, ayahNumber }),
    })

    if (!response.ok) {
      console.error(`Backend bookmarks DELETE failed: ${response.status}`)
      return NextResponse.json(
        { error: 'Failed to remove bookmark in backend' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Bookmarks proxy DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
