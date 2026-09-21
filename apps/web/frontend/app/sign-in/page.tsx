'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'
import { getSession } from '@/lib/auth'

export default function SignInPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      try {
        const session = await getSession()
        if (session?.user) {
          router.replace('/')
        }
      } catch {
        // Continue to render the sign-in form
      }
    }

    checkSession()
  }, [router])

  return <AuthForm mode="sign-in" />
}
