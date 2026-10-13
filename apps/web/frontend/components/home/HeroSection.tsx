'use client'

import { useEffect, useState } from 'react'
import { GeometricPattern } from './GeometricPattern'

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
  const [greeting, setGreeting] = useState<string>('As-salāmu ʿalaikum')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12)       setGreeting('Ṣabāḥ al-khayr')   // Good morning
    else if (hour < 17)  setGreeting('As-salāmu ʿalaikum')
    else if (hour < 20)  setGreeting('Masāʾ al-khayr')    // Good evening
    else                 setGreeting('As-salāmu ʿalaikum')

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
        background: 'linear-gradient(160deg, oklch(from var(--primary) l c h / 0.07) 0%, oklch(from var(--accent) l c h / 0.04) 60%, var(--background) 100%)',
      }}
    >
      {/* Geometric background — very low opacity for subtle texture */}
      <div className="absolute inset-0 text-primary opacity-[0.035] dark:opacity-[0.055]">
        <GeometricPattern />
      </div>

      <div className="page-container relative z-10 py-8 md:py-10 animate-in-up">
        {/* Greeting */}
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70 mb-2">
            TILAWA · From Iqra to Tilawa
          </p>
          <h1 className="text-fluid-2xl font-bold text-foreground leading-tight">
            {greeting}
          </h1>
        </div>

        {/* Date row */}
        <div
          className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm transition-opacity ${loading ? 'opacity-40' : 'opacity-100'}`}
          aria-live="polite"
        >
          {/* Hijri date */}
          {hijriDate ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <span
                lang="ar"
                dir="rtl"
                className="arabic-ui text-primary"
              >
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
