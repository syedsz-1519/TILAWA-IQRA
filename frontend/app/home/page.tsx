'use client'

import { useEffect, useState } from 'react'
import { HeaderBar } from '@/components/home/HeaderBar'
import { NextSalahCard } from '@/components/home/NextSalahCard'
import { DailyAyahCard } from '@/components/home/DailyAyahCard'
import { QuickAccessGrid } from '@/components/home/QuickAccessGrid'
import { AdhkarStrip } from '@/components/home/AdhkarStrip'
import { ContinueReadingCard } from '@/components/home/ContinueReadingCard'
import { StatsOverview } from '@/components/home/StatsOverview'
import { StudyStreakBadge } from '@/components/home/StudyStreakBadge'
import { ReadingGoals } from '@/components/home/ReadingGoals'
import { PersonalizedRecommendations } from '@/components/home/PersonalizedRecommendations'
import { WeeklyActivityChart } from '@/components/home/WeeklyActivityChart'
import { AchievementsBadges } from '@/components/home/AchievementsBadges'
import { ReadingInsights } from '@/components/home/ReadingInsights'
import { StudyTipsCarousel } from '@/components/home/StudyTipsCarousel'
import { getHijriDate, type HijriDateData } from '@/lib/hijri'
import { getDailyAyah, type DailyAyahData } from '@/lib/dailyAyah'
import { getPrayerTimes, getUserLocation, getCalculationMethod, type PrayerTimes } from '@/lib/prayerTimes'

interface ReadingProgress {
  surahNumber: number
  ayahNumber: number
  surahName: string
}

export default function HomePage() {
  const [hijriDate, setHijriDate] = useState<HijriDateData | undefined>()
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | undefined>()
  const [dailyAyah, setDailyAyah] = useState<DailyAyahData | undefined>()
  const [readingProgress, setReadingProgress] = useState<ReadingProgress | undefined>()
  const [loading, setLoading] = useState(true)
  const [selectedAyah, setSelectedAyah] = useState<DailyAyahData | undefined>()
  const [showAyahPopup, setShowAyahPopup] = useState(false)
  const [currentStreak, setCurrentStreak] = useState(0)

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Load Hijri date
        try {
          const hijri = await getHijriDate()
          setHijriDate(hijri)
        } catch (err) {
          console.error('Failed to load Hijri date:', err)
        }

        // Load prayer times
        try {
          const location = await getUserLocation()
          if (location) {
            const method = getCalculationMethod()
            const times = await getPrayerTimes(location.latitude, location.longitude, undefined, method)
            if (times) {
              setPrayerTimes(times)
            }
          }
        } catch (err) {
          console.error('Failed to load prayer times:', err)
        }

        // Load daily ayah
        try {
          const ayah = await getDailyAyah()
          setDailyAyah(ayah)
        } catch (err) {
          console.error('Failed to load daily ayah:', err)
        }

        // Load reading progress
        const savedProgress = localStorage.getItem('tilawa_reading_progress')
        if (savedProgress) {
          try {
            setReadingProgress(JSON.parse(savedProgress))
          } catch {
            // Invalid progress data
          }
        }

        // Load current streak
        const savedStreak = localStorage.getItem('tilawa_streak')
        if (savedStreak) {
          setCurrentStreak(parseInt(savedStreak))
        }
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <HeaderBar hijriDate={hijriDate} loading={loading} />

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {/* Study Streak Badge (Hero Section) */}
        <section className="mb-8">
          <StudyStreakBadge currentStreak={currentStreak} />
        </section>

        {/* Stats Overview */}
        <section className="mb-8">
          <StatsOverview userId={undefined} />
        </section>

        {/* Weekly Activity Chart */}
        <section className="mb-8">
          <WeeklyActivityChart />
        </section>

        {/* Achievements & Badges */}
        <section className="mb-8">
          <AchievementsBadges currentStreak={currentStreak} totalXP={0} />
        </section>

        {/* Reading Insights */}
        <section className="mb-8">
          <ReadingInsights />
        </section>

        {/* Study Tips Carousel */}
        <section className="mb-8">
          <StudyTipsCarousel />
        </section>

        {/* Next Salah (Hero) */}
        <section className="mb-8">
          <NextSalahCard prayerTimes={prayerTimes} loading={loading} />
        </section>

        {/* Daily Ayah (Hero) */}
        <section className="mb-8">
          <DailyAyahCard
            ayah={dailyAyah}
            loading={loading}
            onAyahTap={() => {
              setSelectedAyah(dailyAyah)
              setShowAyahPopup(true)
            }}
          />
        </section>

        {/* Reading Goals */}
        <section className="mb-8">
          <ReadingGoals />
        </section>

        {/* Personalized Recommendations */}
        <section className="mb-8">
          <PersonalizedRecommendations />
        </section>

        {/* Quick Access Grid */}
        <section className="mb-8">
          <QuickAccessGrid />
        </section>

        {/* Daily Dua/Adhkar Strip */}
        <section className="mb-8">
          <AdhkarStrip prayerTimes={prayerTimes} loading={loading} />
        </section>

        {/* Continue Reading */}
        <section>
          <ContinueReadingCard progress={readingProgress} loading={loading} />
        </section>
      </div>

      {/* Ayah Action Popup */}
      {showAyahPopup && selectedAyah && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowAyahPopup(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-6 md:left-auto md:right-auto md:top-1/2 md:max-w-2xl md:-translate-y-1/2 md:rounded-2xl md:border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h2 className="text-lg font-bold">Ayah Actions</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedAyah.surahName} {selectedAyah.surahNumber}:{selectedAyah.ayahNumber}
              </p>
            </div>

            {/* Placeholder for ayah actions */}
            <div className="space-y-4">
              <button className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted">
                🔊 Listen
              </button>
              <button className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted">
                📖 Translation
              </button>
              <button className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted">
                📚 Tafseer
              </button>
              <button className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted">
                📤 Share
              </button>
              <button className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted">
                💾 Save
              </button>
            </div>

            <button
              onClick={() => setShowAyahPopup(false)}
              className="mt-6 w-full rounded-lg border border-border bg-muted px-4 py-3 font-semibold transition-colors hover:bg-muted/80"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
