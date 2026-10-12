'use client'

import { useEffect, useState } from 'react'

interface HeaderBarProps {
  hijriDate?: {
    day: number
    monthAr: string
    monthEn: string
    year: number
  }
  loading?: boolean
}

export function HeaderBar({ hijriDate, loading }: HeaderBarProps) {
  const [gregorianDate, setGregorianDate] = useState<string>('')

  useEffect(() => {
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
    setGregorianDate(today.toLocaleDateString('en-US', options))
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div
        className="container-page py-3 md:py-4"
        style={{
          paddingTop: `max(0.75rem, calc(env(safe-area-inset-top, 0px) + 0.5rem))`,
        }}
      >
        {/* Greeting */}
        <h1 className="text-fluid-2xl font-bold text-foreground tracking-tight">
          As-salāmu ʿalaikum
        </h1>

        {/* Date row */}
        <div
          className={`mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-fluid-xs ${
            loading ? 'animate-pulse opacity-60' : ''
          }`}
          aria-live="polite"
          aria-busy={loading}
        >
          {/* Hijri date */}
          {hijriDate ? (
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground" lang="ar" dir="rtl">
                {hijriDate.day} {hijriDate.monthAr}
              </span>
              {' '}
              <span className="opacity-60">{hijriDate.year} AH</span>
            </span>
          ) : (
            <span className="inline-block h-3.5 w-28 rounded-full bg-muted" aria-hidden="true" />
          )}

          {gregorianDate && (
            <>
              <span className="text-border" aria-hidden="true">·</span>
              <span className="text-muted-foreground">{gregorianDate}</span>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
