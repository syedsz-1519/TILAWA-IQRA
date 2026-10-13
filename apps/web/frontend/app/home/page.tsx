'use client'

import { useEffect, useState } from 'react'
import { HeaderBar } from '@/components/home/HeaderBar'
import { NextSalahCard } from '@/components/home/NextSalahCard'
import { DailyAyahCard } from '@/components/home/DailyAyahCard'
import { QuickAccessGrid } from '@/components/home/QuickAccessGrid'
import { AdhkarStrip } from '@/components/home/AdhkarStrip'
import { ContinueReadingCard } from '@/components/home/ContinueReadingCard'
import { ReadingGoals } from '@/components/home/ReadingGoals'
import { PersonalizedRecommendations } from '@/components/home/PersonalizedRecommendations'
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
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <main className="min-h-dvh bg-background page-bottom-safe">
      <HeaderBar hijriDate={hijriDate} loading={loading} />

      <div className="page-container py-6 md:py-8">
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
          role="dialog"
          aria-modal="true"
          aria-label="Ayah actions"
        >
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[80dvh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-6 md:left-auto md:right-auto md:top-1/2 md:max-w-2xl md:-translate-y-1/2 md:rounded-2xl md:border"
            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h2 className="text-lg font-bold">Ayah Actions</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedAyah.surahName} {selectedAyah.surahNumber}:{selectedAyah.ayahNumber}
              </p>
            </div>

            <div className="space-y-3">
              {[
                { emoji: '🔊', label: 'Listen' },
                { emoji: '📖', label: 'Translation' },
                { emoji: '📚', label: 'Tafseer' },
                { emoji: '📤', label: 'Share' },
                { emoji: '💾', label: 'Save' },
              ].map(({ emoji, label }) => (
                <button
                  key={label}
                  className="flex min-h-[52px] w-full items-center gap-3 rounded-xl border border-border bg-card px-4 text-left transition-colors hover:bg-muted press-effect"
                >
                  <span className="text-xl" aria-hidden="true">{emoji}</span>
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAyahPopup(false)}
              className="mt-5 flex min-h-[52px] w-full items-center justify-center rounded-xl border border-border bg-muted px-4 font-semibold transition-colors hover:bg-muted/80 press-effect"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
