import { NextRequest, NextResponse } from 'next/server'

/**
 * Proxy to backend reading-progress API
 * GET /api/reading-progress?userId=<userId>[&surahNumber=<number>]
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const surahNumber = request.nextUrl.searchParams.get('surahNumber')

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    
    let endpoint = `${backendUrl}/api/reading-progress?userId=${userId}`
    if (surahNumber) {
      endpoint = `${backendUrl}/api/reading-progress/surah/${surahNumber}?userId=${userId}`
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      console.error(`Backend reading-progress GET failed: ${response.status}`)
      return NextResponse.json(
        { error: 'Failed to fetch reading progress from backend' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data.data || data)
  } catch (error) {
    console.error('Reading progress proxy GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Proxy to backend reading-progress API
 * POST /api/reading-progress
 * Body: { userId: string, surahNumber: number, lastAyahRead: number }
 */
export async function POST(request: NextRequest) {
  try {
    const { userId, surahNumber, lastAyahRead } = await request.json()

    if (!userId || typeof surahNumber !== 'number' || typeof lastAyahRead !== 'number') {
      return NextResponse.json(
        { error: 'userId, surahNumber, and lastAyahRead required' },
        { status: 400 }
      )
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const response = await fetch(`${backendUrl}/api/reading-progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, surahNumber, lastAyahRead }),
    })

    if (!response.ok) {
      console.error(`Backend reading-progress POST failed: ${response.status}`)
      return NextResponse.json(
        { error: 'Failed to update reading progress in backend' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data.data || data, { status: 201 })
  } catch (error) {
    console.error('Reading progress proxy POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
