import { NextRequest, NextResponse } from 'next/server'

/**
 * Auth proxy routes - forwards to backend
 * Backend handles all auth operations (Better Auth)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

/**
 * GET /api/auth/[...all]
 * Proxy to backend auth endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    const searchParams = request.nextUrl.search

    const backendUrl = `${API_URL}${pathname}${searchParams}`

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
    })

    // Create response with proper headers
    const data = await response.json()
    const nextResponse = NextResponse.json(data, { status: response.status })

    // Forward auth cookies
    const setCookie = response.headers.get('set-cookie')
    if (setCookie) {
      nextResponse.headers.set('set-cookie', setCookie)
    }

    return nextResponse
  } catch (error) {
    console.error('Auth proxy GET error:', error)
    return NextResponse.json(
      { error: 'Auth service unavailable' },
      { status: 503 }
    )
  }
}

/**
 * POST /api/auth/[...all]
 * Proxy to backend auth endpoint
 */
export async function POST(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    const body = await request.json().catch(() => ({}))

    const backendUrl = `${API_URL}${pathname}`

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
      body: JSON.stringify(body),
    })

    // Create response with proper headers
    const data = await response.json()
    const nextResponse = NextResponse.json(data, { status: response.status })

    // Forward auth cookies
    const setCookie = response.headers.get('set-cookie')
    if (setCookie) {
      nextResponse.headers.set('set-cookie', setCookie)
    }

    return nextResponse
  } catch (error) {
    console.error('Auth proxy POST error:', error)
    return NextResponse.json(
      { error: 'Auth service unavailable' },
      { status: 503 }
    )
  }
}

