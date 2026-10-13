'use client'

import { useEffect, useState } from 'react'

/* ── Home section components ── */
import { HeroSection }           from '@/components/home/HeroSection'
import { DailyAyahCard }         from '@/components/home/DailyAyahCard'
import { ContinueReadingCard }   from '@/components/home/ContinueReadingCard'
import { QuickAccessGrid }       from '@/components/home/QuickAccessGrid'
import { NextSalahCard }         from '@/components/home/NextSalahCard'
import { AdhkarStrip }           from '@/components/home/AdhkarStrip'
import { ReadingGoals }          from '@/components/home/ReadingGoals'

/* ── Data utilities ── */
import { getHijriDate, type HijriDateData } from '@/lib/hijri'
import { getDailyAyah, type DailyAyahData } from '@/lib/dailyAyah'
import { getPrayerTimes, getUserLocation, getCalculationMethod, type PrayerTimes } from '@/lib/prayerTimes'

interface ReadingProgress {
  surahNumber: number
  ayahNumber: number
  surahName: string
}

export default function HomePage() {
  const [hijriDate,      setHijriDate]      = useState<HijriDateData | undefined>()
  const [prayerTimes,    setPrayerTimes]    = useState<PrayerTimes | undefined>()
  const [dailyAyah,      setDailyAyah]      = useState<DailyAyahData | undefined>()
  const [readingProgress,setReadingProgress]= useState<ReadingProgress | undefined>()
  const [loading,        setLoading]        = useState(true)

  /* Ayah action popup state */
  const [selectedAyah,   setSelectedAyah]   = useState<DailyAyahData | undefined>()
  const [showAyahPopup,  setShowAyahPopup]  = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)

        /* Hijri date */
        try { setHijriDate(await getHijriDate()) } catch {}

        /* Prayer times */
        try {
          const loc = await getUserLocation()
          if (loc) {
            const times = await getPrayerTimes(loc.latitude, loc.longitude, undefined, getCalculationMethod())
            if (times) setPrayerTimes(times)
          }
        } catch {}

        /* Daily ayah */
        try { setDailyAyah(await getDailyAyah()) } catch {}

        /* Reading progress (localStorage) */
        try {
          const saved = localStorage.getItem('tilawa_reading_progress')
          if (saved) setReadingProgress(JSON.parse(saved))
        } catch {}
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <main className="min-h-dvh bg-background page-bottom-safe">

      {/* ── A: Hero — greeting + geometric pattern + date ── */}
      <HeroSection hijriDate={hijriDate} loading={loading} />

      <div className="page-container space-y-5 py-6 md:space-y-6 md:py-8" data-page-enter>

        {/* ── B: Daily Ayah — spiritual focal point ── */}
        <section aria-labelledby="ayah-heading" className="animate-in-up delay-75">
          <h2 id="ayah-heading" className="sr-only">Daily Ayah</h2>
          <DailyAyahCard
            ayah={dailyAyah}
            loading={loading}
            onAyahTap={() => {
              setSelectedAyah(dailyAyah)
              setShowAyahPopup(true)
            }}
          />
        </section>

        {/* ── C: Continue Reading ── */}
        <section aria-labelledby="continue-heading" className="animate-in-up delay-150">
          <h2 id="continue-heading" className="sr-only">Continue Reading</h2>
          <ContinueReadingCard progress={readingProgress} loading={loading} />
        </section>

        {/* ── D: Quick Access Grid ── */}
        <section aria-labelledby="quick-access-heading" className="animate-in-up delay-225">
          <QuickAccessGrid />
        </section>

        {/* ── E: Next Salah ── */}
        <section aria-labelledby="salah-heading" className="animate-in-up delay-300">
          <h2 id="salah-heading" className="sr-only">Next Prayer</h2>
          <NextSalahCard prayerTimes={prayerTimes} loading={loading} />
        </section>

        {/* ── F: Morning / Evening Adhkar ── */}
        <section aria-labelledby="adhkar-heading" className="animate-in-up delay-375">
          <h2 id="adhkar-heading" className="sr-only">Daily Adhkar</h2>
          <AdhkarStrip prayerTimes={prayerTimes} loading={loading} />
        </section>

        {/* ── G: Reading Goals ── */}
        <section aria-labelledby="goals-heading" className="animate-in-up delay-450">
          <h2 id="goals-heading" className="sr-only">Reading Goals</h2>
          <ReadingGoals />
        </section>

      </div>

      {/* ── Ayah action bottom sheet ── */}
      {showAyahPopup && selectedAyah && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowAyahPopup(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ayah-popup-title"
        >
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[80dvh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-6 md:left-1/2 md:right-auto md:top-1/2 md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border"
            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border md:hidden" aria-hidden="true" />

            <div className="mb-5">
              <h3 id="ayah-popup-title" className="text-base font-bold">Ayah Actions</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {selectedAyah.surahName} · {selectedAyah.surahNumber}:{selectedAyah.ayahNumber}
              </p>
            </div>

            <div className="space-y-2">
              {[
                { emoji: '🔊', label: 'Listen',      desc: 'Play this ayah' },
                { emoji: '📖', label: 'Translation', desc: 'Read the meaning' },
                { emoji: '📚', label: 'Tafseer',     desc: 'Detailed commentary' },
                { emoji: '📤', label: 'Share',       desc: 'Share with others' },
                { emoji: '💾', label: 'Save',        desc: 'Bookmark this ayah' },
              ].map(({ emoji, label, desc }) => (
                <button
                  key={label}
                  className="flex min-h-[52px] w-full items-center gap-3 rounded-xl border border-border bg-card px-4 text-left transition-colors hover:border-primary/30 hover:bg-muted press-effect"
                >
                  <span className="text-xl" aria-hidden="true">{emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAyahPopup(false)}
              className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-xl border border-border bg-muted font-semibold text-sm transition-colors hover:bg-muted/80 press-effect"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
