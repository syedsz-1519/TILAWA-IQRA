'use client'

import { useEffect, useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getWeeklyActivityApi } from '@/lib/api-client'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface DayActivity {
  day: string
  ayahCount: number
  completed: boolean
  isToday: boolean
}

export function WeeklyActivityChart() {
  const [weeklyData, setWeeklyData] = useState<DayActivity[]>([])
  const [totalThisWeek, setTotalThisWeek] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)

      // Build last 7 date strings in order (oldest → today)
      const todayStr = new Date().toISOString().split('T')[0]

      const { data } = await getWeeklyActivityApi()

      if (data?.activity) {
        const activityMap: Record<string, number> = {}
        for (const item of data.activity) {
          activityMap[item.date] = item.ayahCount
        }

        const mapped: DayActivity[] = data.activity.map(({ date, ayahCount }) => {
          const dayOfWeek = new Date(date + 'T12:00:00').getDay()
          return {
            day: DAY_LABELS[dayOfWeek],
            ayahCount,
            completed: ayahCount > 0,
            isToday: date === todayStr,
          }
        })

        setWeeklyData(mapped)
        setTotalThisWeek(mapped.reduce((sum, d) => sum + d.ayahCount, 0))
      } else {
        // Fallback: show empty 7-day frame using real date labels
        const fallback: DayActivity[] = []
        for (let i = 6; i >= 0; i--) {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const dateStr = d.toISOString().split('T')[0]
          fallback.push({
            day: DAY_LABELS[d.getDay()],
            ayahCount: 0,
            completed: false,
            isToday: dateStr === todayStr,
          })
        }
        setWeeklyData(fallback)
        setTotalThisWeek(0)
      }

      setLoading(false)
    }

    load()
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
          {loading ? (
            <div className="h-8 w-12 animate-pulse rounded bg-muted" />
          ) : (
            <>
              <p className="text-2xl font-bold">{totalThisWeek}</p>
              <p className="text-xs text-muted-foreground">ayahs this week</p>
            </>
          )}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-6 flex items-end justify-between gap-2" style={{ height: 80 }}>
        {loading
          ? Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-3/4 animate-pulse rounded-t-md bg-muted" style={{ height: 40 + Math.random() * 20 }} />
                <div className="h-3 w-6 animate-pulse rounded bg-muted" />
              </div>
            ))
          : weeklyData.map((day, idx) => {
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

                  {/* Day label */}
                  <p className={cn('text-xs font-semibold', day.isToday ? 'text-primary' : 'text-muted-foreground')}>
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
          <p className="text-2xl font-bold text-primary">{loading ? '—' : activeDays}</p>
          <p className="text-xs text-muted-foreground">days active</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-500">{loading ? '—' : avgPerDay}</p>
          <p className="text-xs text-muted-foreground">avg/day</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-500">{loading ? '—' : `${consistency}%`}</p>
          <p className="text-xs text-muted-foreground">consistency</p>
        </div>
      </div>
    </div>
  )
}
