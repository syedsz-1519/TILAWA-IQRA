'use client'

import { useEffect, useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface DayActivity {
  day: string
  ayahCount: number
  completed: boolean
  isToday: boolean
}

/**
 * Weekly activity chart — reads from localStorage (tilawa_weekly_activity).
 * Data is written by the Quran reader when verses are read.
 */
export function WeeklyActivityChart() {
  const [weeklyData, setWeeklyData] = useState<DayActivity[]>([])
  const [totalThisWeek, setTotalThisWeek] = useState(0)

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0]

    // Load local activity log: { [dateStr]: number }
    let activityMap: Record<string, number> = {}
    try {
      const raw = localStorage.getItem('tilawa_weekly_activity')
      if (raw) activityMap = JSON.parse(raw)
    } catch {
      // ignore
    }

    const days: DayActivity[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const ayahCount = activityMap[dateStr] ?? 0
      days.push({
        day: DAY_LABELS[d.getDay()],
        ayahCount,
        completed: ayahCount > 0,
        isToday: dateStr === todayStr,
      })
    }

    setWeeklyData(days)
    setTotalThisWeek(days.reduce((sum, d) => sum + d.ayahCount, 0))
  }, [])

  const maxAyah = Math.max(...weeklyData.map((d) => d.ayahCount), 20)
  const activeDays = weeklyData.filter((d) => d.completed).length
  const avgPerDay = activeDays > 0 ? Math.round(totalThisWeek / activeDays) : 0
  const consistency = Math.round((activeDays / 7) * 100)

  return (
    <div className="rounded-xl border border-border bg-card p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="size-5 text-primary" />
          <h3 className="text-lg font-semibold">This Week's Activity</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{totalThisWeek}</p>
          <p className="text-xs text-muted-foreground">ayahs this week</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-6 flex items-end justify-between gap-2" style={{ height: 80 }}>
        {weeklyData.map((day, idx) => {
          const heightPercent = (day.ayahCount / maxAyah) * 100
          return (
            <div key={`${day.day}-${idx}`} className="flex flex-col items-center gap-2 flex-1">
              <div className="relative w-full flex items-end" style={{ height: 60 }}>
                {/* Bar */}
                <div
                  className={cn(
                    'mx-auto w-3/4 rounded-t-md transition-all duration-500',
                    day.completed
                      ? 'bg-gradient-to-t from-primary to-primary/70'
                      : 'bg-muted'
                  )}
                  style={{
                    height: `${Math.max(heightPercent, 4)}%`,
                    minHeight: day.completed ? '20px' : '4px',
                  }}
                />
                {/* Today indicator */}
                {day.isToday && (
                  <div className="absolute -top-2 left-1/2 size-2 -translate-x-1/2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
                )}
              </div>
              <p className={cn('text-xs font-semibold', day.isToday ? 'text-primary' : 'text-muted-foreground')}>
                {day.day}
              </p>
              {day.completed && (
                <p className="text-xs font-semibold text-primary">{day.ayahCount}</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{activeDays}</p>
          <p className="text-xs text-muted-foreground">days active</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-500">{avgPerDay}</p>
          <p className="text-xs text-muted-foreground">avg/day</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-500">{consistency}%</p>
          <p className="text-xs text-muted-foreground">consistency</p>
        </div>
      </div>
    </div>
  )
}
