'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

interface PrayerTimes {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

interface NextSalahCardProps {
  prayerTimes?: PrayerTimes
  loading?: boolean
}

export function NextSalahCard({ prayerTimes, loading }: NextSalahCardProps) {
  const [nextPrayer, setNextPrayer] = useState<string>('')
  const [countdown, setCountdown] = useState<string>('--:--:--')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!prayerTimes) return

    const updateCountdown = () => {
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()

      const prayers = [
        { name: 'Fajr', time: prayerTimes.Fajr },
        { name: 'Dhuhr', time: prayerTimes.Dhuhr },
        { name: 'Asr', time: prayerTimes.Asr },
        { name: 'Maghrib', time: prayerTimes.Maghrib },
        { name: 'Isha', time: prayerTimes.Isha },
      ]

      let nextP = prayers[0]
      let minDiff = Infinity

      for (const prayer of prayers) {
        const [h, m] = prayer.time.split(':').map(Number)
        const prayerMinutes = h * 60 + m
        const diff = (prayerMinutes - currentTime + 1440) % 1440

        if (diff > 0 && diff < minDiff) {
          minDiff = diff
          nextP = prayer
        }
      }

      setNextPrayer(nextP.name)

      // Calculate countdown
      const [h, m] = nextP.time.split(':').map(Number)
      const targetTime = new Date()
      targetTime.setHours(h, m, 0, 0)

      if (targetTime < now) {
        targetTime.setDate(targetTime.getDate() + 1)
      }

      const diff = Math.max(0, targetTime.getTime() - now.getTime())
      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)

      setCountdown(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)

      // Progress calculation (in the current prayer window)
      const prevPrayerIdx = Math.max(0, prayers.findIndex((p) => p.name === nextP.name) - 1)
      const prevTime = prayers[prevPrayerIdx].time
      const [ph, pm] = prevTime.split(':').map(Number)
      const prevMinutes = ph * 60 + pm
      const nextMinutes = h * 60 + m
      const progressPercent = Math.min(
        100,
        ((currentTime - prevMinutes) / (nextMinutes - prevMinutes)) * 100 || 0
      )
      setProgress(Math.max(0, progressPercent))
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [prayerTimes])

  if (loading) {
    return (
      <div className="skeleton h-32 w-full rounded-2xl" aria-label="Loading prayer times" aria-busy="true" />
    )
  }

  if (!prayerTimes) {
    return (
      <div className="card-sacred p-6 text-center text-sm text-muted-foreground">
        Enable location to see prayer times
      </div>
    )
  }

  return (
    <div className="card-sacred p-6"
      style={{ background: 'linear-gradient(135deg, oklch(from var(--primary) l c h / 0.06), oklch(from var(--primary) l c h / 0.12))' }}>
      {/* Next Prayer + Countdown */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Next Prayer
          </p>
          <p className="mt-2 text-fluid-3xl font-bold text-foreground">{nextPrayer}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Time Remaining
          </p>
          <p className="mt-2 font-mono text-fluid-2xl font-bold text-primary">{countdown}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Time until next prayer">
        <div
          className="h-full bg-primary transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Prayer times row — scrollable on very small screens */}
      <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 text-center text-sm" role="list" aria-label="Prayer times">
        {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((name) => (
          <div
            key={name}
            role="listitem"
            className={`flex-1 min-w-[3.5rem] shrink-0 rounded-lg px-2 py-1.5 ${
              nextPrayer === name
                ? 'bg-primary/20 font-semibold text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide">{name}</p>
            <p className="mt-0.5 font-mono text-xs">{prayerTimes[name]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
