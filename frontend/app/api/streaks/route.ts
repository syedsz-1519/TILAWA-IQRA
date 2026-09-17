import { NextRequest, NextResponse } from 'next/server'

/**
 * Proxy to backend streaks API
 * GET /api/streaks?userId=<userId>
 */
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const response = await fetch(`${backendUrl}/api/streaks?userId=${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      console.error(`Backend streaks GET failed: ${response.status}`)
      return NextResponse.json(
        { error: 'Failed to fetch streaks from backend' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data.data || data)
  } catch (error) {
    console.error('Streaks proxy GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Proxy to backend streaks API
 * POST /api/streaks
 * Body: { userId: string, xpGain: number }
 */
export async function POST(request: NextRequest) {
  try {
    const { userId, xpGain } = await request.json()

    if (!userId || typeof xpGain !== 'number') {
      return NextResponse.json(
        { error: 'userId and xpGain required' },
        { status: 400 }
      )
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const response = await fetch(`${backendUrl}/api/streaks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, xpGain }),
    })

    if (!response.ok) {
      console.error(`Backend streaks POST failed: ${response.status}`)
      return NextResponse.json(
        { error: 'Failed to update streaks in backend' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data.data || data)
  } catch (error) {
    console.error('Streaks proxy POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
