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
    return <div className="h-20 animate-pulse rounded-xl bg-muted" />
  }

  return (
    <Link
      href="/dua-adhkar"
      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-gradient-to-r from-rose-50 to-pink-50 p-6 transition-all hover:shadow-md dark:from-rose-950/20 dark:to-pink-950/20"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {adhkarType === 'morning' ? 'Morning' : 'Evening'} Adhkar
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground">
          {adhkarType === 'morning'
            ? "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ · Start your day with morning remembrance"
            : "الْحَمْدُ لِلَّهِ · Reflect with evening adhkar before Isha"}
        </p>
      </div>
      <ChevronRight className="size-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
