'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface AdhkarStripProps {
  prayerTimes?: { Fajr: string; Maghrib: string }
  loading?: boolean
}

export function AdhkarStrip({ prayerTimes, loading }: AdhkarStripProps) {
  const [type, setType] = useState<'morning' | 'evening'>('morning')

  useEffect(() => {
    if (!prayerTimes) {
      const h = new Date().getHours()
      setType(h >= 6 && h < 18 ? 'morning' : 'evening')
      return
    }
    const now = new Date().getHours() * 60 + new Date().getMinutes()
    const [fh, fm] = prayerTimes.Fajr.split(':').map(Number)
    const [mh, mm] = prayerTimes.Maghrib.split(':').map(Number)
    const fajr = fh * 60 + fm
    const maghrib = mh * 60 + mm
    setType(now >= fajr && now < maghrib ? 'morning' : 'evening')
  }, [prayerTimes])

  if (loading) {
    return <div className="skeleton h-20 w-full rounded-2xl" aria-busy="true" aria-label="Loading adhkar" />
  }

  const isMorning = type === 'morning'

  return (
    <Link
      href="/dua-adhkar"
      className="group card-sacred press-effect flex items-center justify-between gap-4 p-5"
      style={{
        background: isMorning
          ? 'linear-gradient(135deg, oklch(0.94 0.06 85 / 0.4), var(--card))'
          : 'linear-gradient(135deg, oklch(0.92 0.04 265 / 0.35), var(--card))',
      }}
      aria-label={`Open ${isMorning ? 'morning' : 'evening'} adhkar`}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-xl text-xl"
          aria-hidden="true"
          style={{
            background: isMorning
              ? 'linear-gradient(135deg, oklch(0.90 0.10 85), oklch(0.94 0.06 70))'
              : 'linear-gradient(135deg, oklch(0.88 0.08 265), oklch(0.92 0.05 280))',
          }}
        >
          {isMorning ? '🌅' : '🌙'}
        </div>

        {/* Text */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {isMorning ? 'Morning' : 'Evening'} Adhkar
          </p>
          <p
            lang="ar"
            dir="rtl"
            className="arabic-ui mt-0.5 text-base font-semibold text-foreground"
          >
            {isMorning ? 'أَذْكَارُ الصَّبَاحِ' : 'أَذْكَارُ الْمَسَاءِ'}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {isMorning ? 'Start your day with remembrance' : 'Reflect before rest'}
          </p>
        </div>
      </div>

      <ChevronRight
        className="size-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-base)] group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  )
}
