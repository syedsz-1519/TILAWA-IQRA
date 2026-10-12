'use client'

import { useEffect, useState } from 'react'
import { formatArabicDate } from '@/lib/hijri'

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

  const loadingClass = loading ? 'animate-pulse opacity-60' : ''

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="page-container py-4">
        {/* Greeting + dates */}
        <div className="mb-1">
          <h1 className="text-fluid-xl font-bold text-foreground">As-salāmu ʿalaikum</h1>
        </div>

        <div className={`flex flex-wrap items-center gap-3 text-sm ${loadingClass}`}>
          {hijriDate ? (
            <div className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                {hijriDate.day} {hijriDate.monthAr}
              </span>
              <span className="mx-2 text-border" aria-hidden="true">·</span>
              <span>{hijriDate.year} AH</span>
            </div>
          ) : (
            <div className="skeleton h-4 w-32" aria-label="Loading date" />
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
