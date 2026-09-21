'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchSurah } from '@/lib/quran-text'
import { AyahActionSheet } from '@/components/quran/AyahActionSheet'

interface Ayah {
  number: number
  text: string
  surah: number
  numberInSurah: number
}

export function TajweedPracticeTab() {
  const [surahNumber, setSurahNumber] = useState(1)
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedAyah, setSelectedAyah] = useState<Ayah | null>(null)
  const [showAyahSheet, setShowAyahSheet] = useState(false)
  const [fontSize, setFontSize] = useState(28)

  // Load surah
  useEffect(() => {
    const loadSurah = async () => {
      setLoading(true)
      const data = await fetchSurah(surahNumber)
      if (data) {
        setAyahs(data.ayahs)
      }
      setLoading(false)
    }

    loadSurah()
  }, [surahNumber])

  const handleAyahTap = (ayah: Ayah) => {
    setSelectedAyah(ayah)
    setShowAyahSheet(true)
  }

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-2 font-bold text-foreground">Practice Tajweed</h2>
        <p className="text-sm text-muted-foreground">
          Tap on any ayah to listen to the recitation and review tajweed rules applied to it. 
          Focus on the color-coded text (coming soon) which highlights different tajweed rules.
        </p>
      </div>

      {/* Surah Selector */}
      <div className="rounded-xl border border-border bg-card p-6">
        <label className="block text-sm font-semibold text-foreground">
          Select Surah
        </label>
        <select
          value={surahNumber}
          onChange={(e) => setSurahNumber(Number(e.target.value))}
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground"
        >
          {Array.from({ length: 114 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              Surah {n}
            </option>
          ))}
        </select>
      </div>

      {/* Ayahs */}
      {loading ? (
        <div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
          Loading surah...
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="space-y-6">
            {ayahs.map((ayah) => (
              <div
                key={ayah.number}
                onClick={() => handleAyahTap(ayah)}
                className="cursor-pointer rounded-lg p-4 transition-all hover:bg-muted"
              >
                <div
                  lang="ar"
                  dir="rtl"
                  className="text-center leading-relaxed text-foreground"
                  style={{
                    fontFamily: "'Amiri Quran', 'KFGQPC Uthmanic Script HAFS', serif",
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {ayah.text}{' '}
                  <span className="ml-4 inline-block rounded-full bg-primary/20 px-2.5 py-0.5 text-sm font-semibold text-primary">
                    {ayah.numberInSurah}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Font size controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setFontSize(Math.max(16, fontSize - 2))}
              className="rounded-lg border border-border bg-muted px-3 py-2 font-semibold hover:bg-muted/80"
            >
              <ChevronLeft className="size-5" />
            </button>
            <span className="text-sm font-semibold text-muted-foreground">
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize(Math.min(40, fontSize + 2))}
              className="rounded-lg border border-border bg-muted px-3 py-2 font-semibold hover:bg-muted/80"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
        <h3 className="mb-3 font-bold text-amber-900 dark:text-amber-100">
          📖 Tajweed Color Coding (Coming Soon)
        </h3>
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Soon, ayahs will be color-coded to show different tajweed rules in action. 
          Each color represents a specific rule so you can visually identify where rules apply in the text.
        </p>
      </div>

      {/* Ayah Action Sheet */}
      {selectedAyah && (
        <AyahActionSheet
          surahNumber={selectedAyah.surah}
          ayahNumber={selectedAyah.numberInSurah}
          arabicText={selectedAyah.text}
          isOpen={showAyahSheet}
          onClose={() => setShowAyahSheet(false)}
        />
      )}
    </div>
  )
}
