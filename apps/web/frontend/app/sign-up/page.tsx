'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'
import { useSession } from '@/lib/auth-client'

export default function SignUpPage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace('/')
    }
  }, [session, isPending, router])

  return <AuthForm mode="sign-up" />
}
