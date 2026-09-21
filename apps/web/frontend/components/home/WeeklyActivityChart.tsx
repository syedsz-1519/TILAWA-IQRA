'use client'

import { useEffect, useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DayActivity {
  day: string
  ayahCount: number
  completed: boolean
}

export function WeeklyActivityChart() {
  const [weeklyData, setWeeklyData] = useState<DayActivity[]>([])
  const [totalThisWeek, setTotalThisWeek] = useState(0)

  useEffect(() => {
    const generateWeeklyData = () => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const today = new Date().getDay()

      // Mock data - in real app, this would come from localStorage/API
      const data: DayActivity[] = days.map((day, idx) => {
        const isToday = idx === today
        const isPast = idx < today
        const ayahCount = isPast || isToday ? Math.floor(Math.random() * 30) + 5 : 0

        return {
          day,
          ayahCount,
          completed: ayahCount > 0,
        }
      })

      const total = data.reduce((sum, d) => sum + d.ayahCount, 0)
      setWeeklyData(data)
      setTotalThisWeek(total)
    }

    generateWeeklyData()
  }, [])

  const maxAyah = Math.max(...weeklyData.map((d) => d.ayahCount), 20)

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
      <div className="mb-6 flex items-end justify-between gap-2">
        {weeklyData.map((day, idx) => {
          const heightPercent = (day.ayahCount / maxAyah) * 100
          const isToday = new Date().getDay() === idx

          return (
            <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
              <div className="relative w-full">
                {/* Bar */}
                <div
                  className={cn(
                    'mx-auto w-3/4 rounded-t-md transition-all duration-300',
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
                {isToday && (
                  <div className="absolute -top-2 left-1/2 size-2 -translate-x-1/2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
                )}
              </div>

              {/* Day label */}
              <p className={cn(
                'text-xs font-semibold',
                isToday ? 'text-primary' : 'text-muted-foreground'
              )}>
                {day.day}
              </p>

              {/* Count */}
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
          <p className="text-2xl font-bold text-primary">{weeklyData.filter((d) => d.completed).length}</p>
          <p className="text-xs text-muted-foreground">days active</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-500">
            {weeklyData.length > 0 ? Math.round(totalThisWeek / weeklyData.filter((d) => d.completed).length) : 0}
          </p>
          <p className="text-xs text-muted-foreground">avg/day</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-500">
            {Math.round((weeklyData.filter((d) => d.completed).length / 7) * 100)}%
          </p>
          <p className="text-xs text-muted-foreground">consistency</p>
        </div>
      </div>
    </div>
  )
}
