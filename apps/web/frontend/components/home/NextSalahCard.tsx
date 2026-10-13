'use client'

import { useEffect, useState } from 'react'

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

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const
type PrayerName = (typeof PRAYERS)[number]

export function NextSalahCard({ prayerTimes, loading }: NextSalahCardProps) {
  const [nextPrayer, setNextPrayer] = useState<PrayerName>('Fajr')
  const [countdown, setCountdown] = useState<string>('--:--:--')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!prayerTimes) return

    const update = () => {
      const now = new Date()
      const nowMin = now.getHours() * 60 + now.getMinutes()

      let next: PrayerName = PRAYERS[0]
      let minDiff = Infinity

      for (const name of PRAYERS) {
        const [h, m] = prayerTimes[name].split(':').map(Number)
        const diff = ((h * 60 + m) - nowMin + 1440) % 1440
        if (diff > 0 && diff < minDiff) { minDiff = diff; next = name }
      }

      setNextPrayer(next)

      const [nh, nm] = prayerTimes[next].split(':').map(Number)
      const target = new Date()
      target.setHours(nh, nm, 0, 0)
      if (target < now) target.setDate(target.getDate() + 1)

      const ms = Math.max(0, target.getTime() - now.getTime())
      const hh = Math.floor(ms / 3_600_000)
      const mm = Math.floor((ms % 3_600_000) / 60_000)
      const ss = Math.floor((ms % 60_000) / 1_000)
      setCountdown(
        `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
      )

      // Progress since last prayer
      const idx = PRAYERS.indexOf(next)
      const prevIdx = Math.max(0, idx - 1)
      const [ph, pm] = prayerTimes[PRAYERS[prevIdx]].split(':').map(Number)
      const prevMin = ph * 60 + pm
      const nextMin = nh * 60 + nm
      const elapsed = nextMin - prevMin > 0 ? (nowMin - prevMin) / (nextMin - prevMin) : 0
      setProgress(Math.max(0, Math.min(100, elapsed * 100)))
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [prayerTimes])

  /* ── Loading ── */
  if (loading) {
    return (
      <div aria-busy="true" aria-label="Loading prayer times">
        <div className="skeleton h-28 w-full rounded-2xl" />
      </div>
    )
  }

  /* ── No location ── */
  if (!prayerTimes) {
    return (
      <div className="card-sacred flex items-center gap-3 p-5 text-sm text-muted-foreground">
        <span className="text-xl" aria-hidden="true">🕌</span>
        <span>Enable location to see prayer times</span>
      </div>
    )
  }

  return (
    <div
      className="card-sacred overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, oklch(from var(--primary) l c h / 0.07) 0%, var(--card) 100%)',
      }}
    >
      <div className="p-5 md:p-6">
        {/* Countdown row */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Next Prayer
            </p>
            <p className="mt-1 text-fluid-2xl font-bold text-foreground">{nextPrayer}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Time Remaining
            </p>
            <p
              className="mt-1 font-mono text-fluid-xl font-bold text-primary tabular-nums"
              aria-live="polite"
              aria-label={`${countdown} until ${nextPrayer}`}
            >
              {countdown}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="my-4 h-1.5 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progress toward next prayer"
        >
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--primary), var(--accent))',
            }}
          />
        </div>

        {/* Prayer times — horizontal scrollable on tiny screens */}
        <div
          className="flex gap-1 overflow-x-auto pb-0.5"
          style={{ scrollbarWidth: 'none' }}
          role="list"
          aria-label="Today's prayer times"
        >
          {PRAYERS.map((name) => {
            const isNext = name === nextPrayer
            return (
              <div
                key={name}
                role="listitem"
                className={`flex min-w-[3.25rem] flex-1 flex-col items-center rounded-xl px-2 py-2 text-center transition-colors ${
                  isNext
                    ? 'bg-primary/15 font-semibold text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <span className="text-[9px] font-bold uppercase tracking-wider">{name}</span>
                <span className="mt-0.5 font-mono text-xs tabular-nums">{prayerTimes[name]}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
