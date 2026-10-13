'use client'

import { useEffect, useState } from 'react'
import { GeometricPattern } from './GeometricPattern'
import { useSession } from '@/lib/auth-client'

interface HeroSectionProps {
  hijriDate?: {
    day: number
    monthAr: string
    monthEn: string
    year: number
  }
  loading?: boolean
}

export function HeroSection({ hijriDate, loading }: HeroSectionProps) {
  const [gregorianDate, setGregorianDate] = useState<string>('')
  const { data: session } = useSession()

  // Extract first name from session (e.g. "Abdullah Syed" → "Abdullah")
  const firstName = session?.user?.name?.trim().split(/\s+/)[0] ?? null

  useEffect(() => {
    const today = new Date()
    setGregorianDate(
      today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    )
  }, [])

  return (
    <div
      className="relative overflow-hidden border-b border-border/50"
      style={{
        background:
          'linear-gradient(160deg, oklch(from var(--primary) l c h / 0.07) 0%, oklch(from var(--accent) l c h / 0.04) 60%, var(--background) 100%)',
      }}
    >
      {/* Geometric SVG background — very low opacity */}
      <div className="absolute inset-0 text-primary opacity-[0.035] dark:opacity-[0.055]" aria-hidden="true">
        <GeometricPattern />
      </div>

      <div className="page-container relative z-10 py-8 md:py-10 animate-in-up">
        {/* Label */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
          TILAWA · From Iqra to Tilawa
        </p>

        {/* Greeting — always As-salāmu ʿalaikum + name if signed in */}
        <h1 className="text-fluid-2xl font-bold text-foreground leading-tight">
          {firstName ? (
            <>
              As-salāmu ʿalaikum,{' '}
              <span className="text-primary">{firstName}</span>
            </>
          ) : (
            'As-salāmu ʿalaikum'
          )}
        </h1>

        {/* Date row */}
        <div
          className={`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm transition-opacity ${loading ? 'opacity-40' : 'opacity-100'}`}
          aria-live="polite"
        >
          {/* Hijri */}
          {hijriDate ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <span lang="ar" dir="rtl" className="arabic-ui text-primary">
                {hijriDate.day} {hijriDate.monthAr}
              </span>
              <span className="text-muted-foreground">{hijriDate.year} AH</span>
            </span>
          ) : (
            <span className="skeleton inline-block h-4 w-28 rounded" aria-label="Loading Hijri date" />
          )}

          {gregorianDate && (
            <>
              <span className="text-border/60" aria-hidden="true">·</span>
              <span className="text-muted-foreground">{gregorianDate}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
