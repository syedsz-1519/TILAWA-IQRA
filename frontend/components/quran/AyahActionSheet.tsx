'use client'

import { useEffect, useState, useRef } from 'react'
import { X, Volume2, Copy, Share2, BookmarkPlus, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { useAudioPlayer } from '@/lib/audio-context'

interface AyahActionSheetProps {
  surahNumber: number
  ayahNumber: number
  arabicText: string
  isOpen: boolean
  onClose: () => void
}

interface Translation {
  text: string
  language: string
}

interface Tafseer {
  text: string
  tafsir: string
}

export function AyahActionSheet({
  surahNumber,
  ayahNumber,
  arabicText,
  isOpen,
  onClose,
}: AyahActionSheetProps) {
  const [translation, setTranslation] = useState<Translation | null>(null)
  const [tafseer, setTafseer] = useState<Tafseer | null>(null)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['listen']))
  const { play, pause, isPlaying } = useAudioPlayer()
  const audioRef = useRef<HTMLAudioElement>(null)

  const ayahRef = `${surahNumber}:${ayahNumber}`

  // Fetch translation on open
  useEffect(() => {
    if (!isOpen || translation !== null) return

    const fetchTranslation = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://api.alquran.cloud/v1/ayah/${ayahRef}/en.asad`
        )
        const data = await response.json()
        setTranslation({
          text: data.data.text,
          language: 'en',
        })
      } catch (error) {
        console.error('Failed to fetch translation:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTranslation()
  }, [isOpen, ayahRef, translation])

  // Fetch audio URL
  useEffect(() => {
    if (!isOpen || audioUrl) return

    const fetchAudio = async () => {
      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/ayah/${ayahRef}/ar.alafasy`
        )
        const data = await response.json()
        const audio = data.data.audio
        setAudioUrl(audio)
      } catch (error) {
        console.error('Failed to fetch audio:', error)
      }
    }

    fetchAudio()
  }, [isOpen, ayahRef, audioUrl])

  // Fetch tafseer
  const fetchTafseer = async () => {
    if (tafseer !== null) return

    try {
      setLoading(true)
      const response = await fetch(
        `https://api.quran.com/api/v4/tafsirs/169/by_ayah/${surahNumber}:${ayahNumber}`
      )
      if (response.ok) {
        const data = await response.json()
        setTafseer({
          text: data.tafsirs?.[0]?.text || 'Tafseer not available',
          tafsir: 'Ibn Kathir',
        })
      }
    } catch (error) {
      console.error('Failed to fetch tafseer:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSection = (section: string) => {
    const newSections = new Set(expandedSections)
    if (newSections.has(section)) {
      newSections.delete(section)
    } else {
      newSections.add(section)
    }
    setExpandedSections(newSections)
  }

  const handlePlay = async () => {
    if (!audioUrl) return

    if (isPlaying && audioRef.current) {
      pause()
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play()
        play()
      }
    }
  }

  const handleShare = async () => {
    const shareText = `${arabicText}\n\nSurah ${surahNumber}, Ayah ${ayahNumber}\n\nRecite with TILAWA`
    const shareData = {
      title: `Ayah ${surahNumber}:${ayahNumber}`,
      text: shareText,
      url: window.location.origin,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText)
      alert('Ayah copied to clipboard!')
    }
  }

  const handleSave = async () => {
    // Save to localStorage for now (TODO: integrate with Supabase)
    const saved = JSON.parse(localStorage.getItem('tilawa_saved_ayahs') || '[]')
    const newAyah = { surahNumber, ayahNumber, text: arabicText, savedAt: new Date().toISOString() }

    // Avoid duplicates
    if (!saved.some((a: any) => a.surahNumber === surahNumber && a.ayahNumber === ayahNumber)) {
      saved.push(newAyah)
      localStorage.setItem('tilawa_saved_ayahs', JSON.stringify(saved))
      alert('Ayah saved!')
    } else {
      alert('Already saved')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(arabicText)
    alert('Arabic text copied!')
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sheet / Panel */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-border bg-background md:left-1/2 md:bottom-auto md:top-1/2 md:right-auto md:max-h-[80vh] md:w-full md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 p-6 backdrop-blur-sm">
          <div>
            <h2 className="text-lg font-bold text-foreground">Ayah Actions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Surah {surahNumber}, Ayah {ayahNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2 p-6">
          {/* Arabic Text */}
          <div className="mb-6 rounded-lg border border-border bg-card p-4">
            <div
              lang="ar"
              dir="rtl"
              className="text-center text-2xl leading-relaxed text-foreground"
              style={{ fontFamily: "'Amiri Quran', 'KFGQPC Uthmanic Script HAFS', serif" }}
            >
              {arabicText}
            </div>
          </div>

          {/* Listen Section */}
          <div className="rounded-lg border border-border">
            <button
              onClick={() => toggleSection('listen')}
              className="flex w-full items-center justify-between bg-card p-4 hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <Volume2 className="size-5 text-primary" />
                <span className="font-semibold">Listen</span>
              </div>
              {expandedSections.has('listen') ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </button>

            {expandedSections.has('listen') && (
              <div className="border-t border-border p-4">
                {audioUrl ? (
                  <div className="space-y-3">
                    <audio ref={audioRef} />
                    <button
                      onClick={handlePlay}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                    >
                      <Volume2 className="size-5" />
                      {isPlaying ? 'Pause' : 'Play'} Recitation
                    </button>
                    <p className="text-xs text-muted-foreground">
                      Reciter: Yasser Al-Dosary
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Loading audio...</p>
                )}
              </div>
            )}
          </div>

          {/* Translation Section */}
          <div className="rounded-lg border border-border">
            <button
              onClick={() => toggleSection('translation')}
              className="flex w-full items-center justify-between bg-card p-4 hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="size-5 text-primary" />
                <span className="font-semibold">Translation</span>
              </div>
              {expandedSections.has('translation') ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </button>

            {expandedSections.has('translation') && (
              <div className="border-t border-border p-4">
                {translation ? (
                  <div className="space-y-3">
                    <p className="leading-relaxed text-foreground">{translation.text}</p>
                    <p className="text-xs text-muted-foreground">
                      Translation: Sahih International (Asad)
                    </p>
                  </div>
                ) : loading ? (
                  <p className="text-sm text-muted-foreground">Loading translation...</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Translation not available</p>
                )}
              </div>
            )}
          </div>

          {/* Tafseer Section */}
          <div className="rounded-lg border border-border">
            <button
              onClick={() => {
                toggleSection('tafseer')
                if (!expandedSections.has('tafseer') && !tafseer) {
                  fetchTafseer()
                }
              }}
              className="flex w-full items-center justify-between bg-card p-4 hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="size-5 text-primary" />
                <span className="font-semibold">Tafseer</span>
              </div>
              {expandedSections.has('tafseer') ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </button>

            {expandedSections.has('tafseer') && (
              <div className="border-t border-border p-4">
                {tafseer ? (
                  <div className="space-y-3">
                    <p className="leading-relaxed text-foreground">{tafseer.text}</p>
                    <p className="text-xs text-muted-foreground">
                      Source: {tafseer.tafsir}
                    </p>
                  </div>
                ) : loading ? (
                  <p className="text-sm text-muted-foreground">Loading tafseer...</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Tafseer not available</p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid gap-2 pt-4 sm:grid-cols-2">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 font-semibold transition-colors hover:bg-muted"
            >
              <Copy className="size-4" />
              Copy Arabic
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 font-semibold transition-colors hover:bg-muted"
            >
              <Share2 className="size-4" />
              Share
            </button>

            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 font-semibold transition-colors hover:bg-muted sm:col-span-2"
            >
              <BookmarkPlus className="size-4" />
              Save Ayah
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
