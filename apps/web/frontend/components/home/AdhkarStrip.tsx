'use client'

import { useEffect, useState } from 'react'
import { ChevronRight, Sun, Moon } from 'lucide-react'
import Link from 'next/link'

interface AdhkarStripProps {
  prayerTimes?: {
    Fajr: string
    Maghrib: string
  }
  loading?: boolean
}

export function AdhkarStrip({ prayerTimes, loading }: AdhkarStripProps) {
  const [adhkarType, setAdhkarType] = useState<'morning' | 'evening'>('morning')

  useEffect(() => {
    if (!prayerTimes) {
      // Fallback: use hour of day
      const hour = new Date().getHours()
      setAdhkarType(hour >= 6 && hour < 18 ? 'morning' : 'evening')
      return
    }

    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const [fajrH, fajrM]       = prayerTimes.Fajr.split(':').map(Number)
    const [maghribH, maghribM] = prayerTimes.Maghrib.split(':').map(Number)
    const fajrMin    = fajrH * 60 + fajrM
    const maghribMin = maghribH * 60 + maghribM

    setAdhkarType(
      currentMinutes >= fajrMin && currentMinutes < maghribMin
        ? 'morning'
        : 'evening'
    )
  }, [prayerTimes])

  if (loading) {
    return (
      <div
        className="h-20 animate-pulse rounded-2xl bg-muted"
        aria-busy="true"
        aria-label="Loading adhkar"
      />
    )
  }

  const isMorning = adhkarType === 'morning'

  return (
    <Link
      href="/dua-adhkar"
      className="
        group flex items-center justify-between gap-4
        rounded-2xl border px-5 py-4 shadow-token-sm
        transition-all duration-200 hover:shadow-token-md press
        bg-amber-50 border-amber-200/60 hover:border-amber-400/60
        dark:bg-amber-950/25 dark:border-amber-800/40 dark:hover:border-amber-600/60
      "
      aria-label={`Open ${isMorning ? 'morning' : 'evening'} Adhkar`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/40">
          {isMorning
            ? <Sun  className="size-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            : <Moon className="size-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          }
        </div>
        <div className="min-w-0">
          <p className="text-fluid-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {isMorning ? 'Morning' : 'Evening'} Adhkar
          </p>
          <p className="mt-0.5 max-w-xs truncate text-fluid-sm leading-relaxed text-foreground" lang="ar" dir="rtl">
            {isMorning
              ? 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
              : 'الْحَمْدُ لِلَّهِ'}
          </p>
        </div>
      </div>
      <ChevronRight
        className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  )
}
