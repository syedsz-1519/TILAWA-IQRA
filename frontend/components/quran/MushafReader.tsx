'use client'

import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Menu, Moon, Sun } from 'lucide-react'
import { fetchSurah, getAllSurahs, getSurahMetadata } from '@/lib/quran-text'
import { AyahActionSheet } from './AyahActionSheet'

interface MushafReaderProps {
  initialSurah?: number
  initialAyah?: number
}

interface Ayah {
  number: number
  text: string
  surah: number
  numberInSurah: number
}

export function MushafReader({ initialSurah = 1, initialAyah = 1 }: MushafReaderProps) {
  const [surahNumber, setSurahNumber] = useState(initialSurah)
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [loading, setLoading] = useState(false)
  const [nightMode, setNightMode] = useState(false)
  const [showSurahMenu, setShowSurahMenu] = useState(false)
  const [selectedAyah, setSelectedAyah] = useState<Ayah | null>(null)
  const [showAyahSheet, setShowAyahSheet] = useState(false)
  const [fontSize, setFontSize] = useState(24)

  const surahs = getAllSurahs()
  const currentSurah = getSurahMetadata(surahNumber)

  // Load surah on change
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

  // Save reading progress
  useEffect(() => {
    if (selectedAyah && currentSurah) {
      const progress = {
        surahNumber,
        ayahNumber: selectedAyah.numberInSurah,
        surahName: currentSurah.englishName,
      }
      localStorage.setItem('tilawa_reading_progress', JSON.stringify(progress))
    }
  }, [selectedAyah, surahNumber, currentSurah])

  const goToPreviousSurah = useCallback(() => {
    setSurahNumber((prev) => Math.max(1, prev - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const goToNextSurah = useCallback(() => {
    setSurahNumber((prev) => Math.min(114, prev + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleAyahTap = (ayah: Ayah) => {
    setSelectedAyah(ayah)
    setShowAyahSheet(true)
  }

  return (
    <div className={`min-h-screen transition-colors ${nightMode ? 'bg-slate-900' : 'bg-amber-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-30 border-b ${nightMode ? 'border-slate-700 bg-slate-800' : 'border-amber-200 bg-white'} transition-colors`}>
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <button
            onClick={() => setShowSurahMenu(!showSurahMenu)}
            className={`rounded-lg p-2 transition-colors ${nightMode ? 'hover:bg-slate-700' : 'hover:bg-amber-100'}`}
          >
            <Menu className={`size-6 ${nightMode ? 'text-amber-400' : 'text-amber-900'}`} />
          </button>

          <div className="text-center">
            <p className={`text-sm font-semibold uppercase tracking-widest ${nightMode ? 'text-slate-400' : 'text-amber-700'}`}>
              Surah {surahNumber}
            </p>
            <h1 className={`text-xl font-bold ${nightMode ? 'text-white' : 'text-amber-900'}`}>
              {currentSurah?.englishName}
            </h1>
          </div>

          <button
            onClick={() => setNightMode(!nightMode)}
            className={`rounded-lg p-2 transition-colors ${nightMode ? 'hover:bg-slate-700' : 'hover:bg-amber-100'}`}
          >
            {nightMode ? (
              <Sun className="size-6 text-amber-400" />
            ) : (
              <Moon className="size-6 text-amber-900" />
            )}
          </button>
        </div>

        {/* Surah Menu */}
        {showSurahMenu && (
          <div className={`max-h-96 overflow-y-auto border-t ${nightMode ? 'border-slate-700 bg-slate-800' : 'border-amber-200 bg-white'}`}>
            <div className="grid grid-cols-4 gap-2 p-4">
              {surahs.map((s) => (
                <button
                  key={s.number}
                  onClick={() => {
                    setSurahNumber(s.number)
                    setShowSurahMenu(false)
                  }}
                  className={`rounded-lg p-2 text-sm font-semibold transition-colors ${
                    surahNumber === s.number
                      ? nightMode
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-200 text-amber-900'
                      : nightMode
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  }`}
                >
                  {s.number}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        {loading ? (
          <div className={`rounded-lg p-8 text-center ${nightMode ? 'bg-slate-800' : 'bg-white'}`}>
            <p className={nightMode ? 'text-slate-400' : 'text-amber-700'}>Loading surah...</p>
          </div>
        ) : (
          <div
            className={`rounded-2xl p-8 shadow-lg transition-colors ${
              nightMode ? 'bg-slate-800 text-white' : 'bg-white'
            }`}
          >
            {/* Surah info */}
            {currentSurah && (
              <div className="mb-8 text-center">
                <p className={`text-sm font-semibold uppercase tracking-widest ${nightMode ? 'text-slate-400' : 'text-amber-700'}`}>
                  {currentSurah.revelationType} • {currentSurah.numberOfAyahs} Ayahs
                </p>
                <p className={`mt-2 text-3xl font-bold ${nightMode ? 'text-amber-300' : 'text-amber-900'}`} lang="ar" dir="rtl">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>
            )}

            {/* Ayahs */}
            <div className="space-y-4">
              {ayahs.map((ayah) => (
                <div
                  key={ayah.number}
                  onClick={() => handleAyahTap(ayah)}
                  className={`cursor-pointer rounded-lg p-4 transition-all hover:shadow-md ${
                    nightMode ? 'hover:bg-slate-700' : 'hover:bg-amber-50'
                  }`}
                >
                  <div
                    lang="ar"
                    dir="rtl"
                    className={`text-center text-2xl leading-relaxed ${nightMode ? 'text-white' : 'text-slate-900'}`}
                    style={{
                      fontFamily: "'Amiri Quran', 'KFGQPC Uthmanic Script HAFS', serif",
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    {ayah.text}{' '}
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-sm font-semibold ${
                      nightMode ? 'bg-amber-900/40 text-amber-300' : 'bg-amber-100 text-amber-700'
                    }`}>
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
                className={`rounded-lg px-3 py-2 font-semibold transition-colors ${
                  nightMode
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                Smaller
              </button>
              <span className={`text-sm font-semibold ${nightMode ? 'text-slate-400' : 'text-amber-700'}`}>
                {fontSize}px
              </span>
              <button
                onClick={() => setFontSize(Math.min(36, fontSize + 2))}
                className={`rounded-lg px-3 py-2 font-semibold transition-colors ${
                  nightMode
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                Larger
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <footer className={`sticky bottom-0 border-t ${nightMode ? 'border-slate-700 bg-slate-800' : 'border-amber-200 bg-white'} transition-colors`}>
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <button
            onClick={goToPreviousSurah}
            disabled={surahNumber === 1}
            className={`flex items-center gap-2 rounded-lg p-3 font-semibold transition-colors disabled:opacity-50 ${
              nightMode
                ? 'hover:bg-slate-700'
                : 'hover:bg-amber-100'
            }`}
          >
            <ChevronLeft className="size-5" />
            Previous
          </button>

          <span className={`text-sm font-semibold ${nightMode ? 'text-slate-400' : 'text-amber-700'}`}>
            {surahNumber} / 114
          </span>

          <button
            onClick={goToNextSurah}
            disabled={surahNumber === 114}
            className={`flex items-center gap-2 rounded-lg p-3 font-semibold transition-colors disabled:opacity-50 ${
              nightMode
                ? 'hover:bg-slate-700'
                : 'hover:bg-amber-100'
            }`}
          >
            Next
            <ChevronRight className="size-5" />
          </button>
        </div>
      </footer>

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
