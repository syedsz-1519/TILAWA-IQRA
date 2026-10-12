'use client'

import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
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
    if (!prayerTimes) return

    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    const [fajrH, fajrM] = prayerTimes.Fajr.split(':').map(Number)
    const [maghribH, maghribM] = prayerTimes.Maghrib.split(':').map(Number)

    const fajrMinutes = fajrH * 60 + fajrM
    const maghribMinutes = maghribH * 60 + maghribM

    // Morning adhkar: between Fajr and Maghrib
    if (currentMinutes >= fajrMinutes && currentMinutes < maghribMinutes) {
      setAdhkarType('morning')
    } else {
      setAdhkarType('evening')
    }
  }, [prayerTimes])

  if (loading) {
    return <div className="skeleton h-20 w-full" aria-label="Loading adhkar" aria-busy="true" />
  }

  return (
    <Link
      href="/dua-adhkar"
      className="group card-sacred press-effect flex items-center justify-between gap-4 p-5"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {adhkarType === 'morning' ? 'Morning' : 'Evening'} Adhkar
        </p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-foreground arabic-ui" lang="ar" dir="rtl">
          {adhkarType === 'morning' ? 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' : 'الْحَمْدُ لِلَّهِ'}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {adhkarType === 'morning'
            ? 'Start your day with morning remembrance'
            : 'Reflect with evening adhkar before Isha'}
        </p>
      </div>
      <ChevronRight
        className="size-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-base)] group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  )
}
