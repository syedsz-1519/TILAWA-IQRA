'use client'

/**
 * Offline-first auth client — no backend required.
 * Stores a guest session in localStorage so the rest of
 * the app always has a user object to work with.
 */

export interface SessionUser {
  id: string
  name: string
  email: string
  image?: string
  emailVerified: boolean
}

export interface Session {
  user: SessionUser
  expiresAt: string
}

const GUEST_USER: SessionUser = {
  id: 'guest',
  name: 'Guest',
  email: '',
  emailVerified: false,
}

function getStoredSession(): Session | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('tilawa_session')
    if (!raw) return null
    return JSON.parse(raw) as Session
  } catch {
    return null
  }
}

function storeSession(session: Session | null) {
  if (typeof window === 'undefined') return
  if (session) {
    localStorage.setItem('tilawa_session', JSON.stringify(session))
  } else {
    localStorage.removeItem('tilawa_session')
  }
}

// ─── Session hook (React) ────────────────────────────────────────────────────

import { useState, useEffect } from 'react'

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    setSession(getStoredSession())
    setIsPending(false)

    const handler = () => setSession(getStoredSession())
    window.addEventListener('tilawa-session-changed', handler)
    return () => window.removeEventListener('tilawa-session-changed', handler)
  }, [])

  return { data: session, isPending }
}

// ─── Sign-up ─────────────────────────────────────────────────────────────────

interface SignUpResult {
  data: Session | null
  error: { message: string } | null
}

async function signUpEmail({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name: string
}): Promise<SignUpResult> {
  if (!email || !password || !name) {
    return { data: null, error: { message: 'All fields are required.' } }
  }
  if (password.length < 8) {
    return { data: null, error: { message: 'Password must be at least 8 characters.' } }
  }

  // Check duplicate email
  const existing = localStorage.getItem(`tilawa_user_${email}`)
  if (existing) {
    return { data: null, error: { message: 'An account with this email already exists.' } }
  }

  const user: SessionUser = {
    id: crypto.randomUUID(),
    name,
    email,
    emailVerified: false,
  }

  // Store user credentials (password hashed via btoa for demo; use bcrypt in prod)
  localStorage.setItem(`tilawa_user_${email}`, JSON.stringify({ user, passwordHash: btoa(password) }))

  const session: Session = {
    user,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  }
  storeSession(session)
  window.dispatchEvent(new CustomEvent('tilawa-session-changed'))

  return { data: session, error: null }
}

// ─── Sign-in ─────────────────────────────────────────────────────────────────

async function signInEmail({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<SignUpResult> {
  const raw = localStorage.getItem(`tilawa_user_${email}`)
  if (!raw) {
    return { data: null, error: { message: 'Invalid email or password.' } }
  }

  const { user, passwordHash } = JSON.parse(raw) as { user: SessionUser; passwordHash: string }
  if (btoa(password) !== passwordHash) {
    return { data: null, error: { message: 'Invalid email or password.' } }
  }

  const session: Session = {
    user,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  }
  storeSession(session)
  window.dispatchEvent(new CustomEvent('tilawa-session-changed'))

  return { data: session, error: null }
}

// ─── Sign-out ─────────────────────────────────────────────────────────────────

async function signOutFn(): Promise<{ error: null }> {
  storeSession(null)
  window.dispatchEvent(new CustomEvent('tilawa-session-changed'))
  return { error: null }
}

// ─── Public client API ────────────────────────────────────────────────────────

export const authClient = {
  signUp: { email: signUpEmail },
  signIn: { email: signInEmail },
  signOut: signOutFn,
  useSession,
}

export const { signIn, signUp, signOut } = authClient
