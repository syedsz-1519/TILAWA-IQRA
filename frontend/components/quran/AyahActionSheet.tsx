'use client'

import { useEffect, useState } from 'react'
import { X, Volume2, Copy, Share2, BookmarkPlus, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { useAudioPlayer } from '@/lib/audio-context'
import { getAyahTranslation, getAyahAudio, getTafseer, logApiError } from '@/lib/api-client'

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
  const [audioLoading, setAudioLoading] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['listen']))
  const { play, pause, isPlaying, currentUrl } = useAudioPlayer()

  const ayahRef = `${surahNumber}:${ayahNumber}`

  useEffect(() => {
    if (!isOpen || translation !== null) return

    const fetchTranslation = async () => {
      try {
        const { data, error } = await getAyahTranslation(surahNumber, ayahNumber)
        if (error) {
          logApiError(`Translation [${ayahRef}]`, error)
          return
        }
        if (data?.data) {
          setTranslation({
            text: data.data.text,
            language: 'en',
          })
        }
      } catch (error) {
        console.error('Failed to fetch translation:', error)
      }
    }

    fetchTranslation()
  }, [isOpen, ayahRef, surahNumber, ayahNumber, translation])

  useEffect(() => {
    if (!isOpen || audioUrl) return

    const fetchAudio = async () => {
      try {
        setAudioLoading(true)
        const { data, error } = await getAyahAudio(surahNumber, ayahNumber)
        if (error) {
          logApiError(`Audio [${ayahRef}]`, error)
          return
        }
        if (data?.data?.audio) {
          setAudioUrl(data.data.audio)
        }
      } catch (error) {
        console.error('Failed to fetch audio:', error)
      } finally {
        setAudioLoading(false)
      }
    }

    fetchAudio()
  }, [isOpen, ayahRef, surahNumber, ayahNumber, audioUrl])

  const fetchTafseer = async () => {
    if (tafseer !== null) return
    try {
      const { data, error } = await getTafseer(surahNumber, ayahNumber)
      if (error) {
        logApiError(`Tafseer [${ayahRef}]`, error)
        return
      }
      if (data?.tafsirs?.[0]?.text) {
        setTafseer({
          text: data.tafsirs[0].text,
          tafsir: 'Ibn Kathir',
        })
      }
    } catch (error) {
      console.error('Failed to fetch tafseer:', error)
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
    if (isPlaying && currentUrl === audioUrl) {
      pause()
    } else {
      await play(audioUrl)
    }
  }

  const handleShare = async () => {
    const shareText = `${arabicText}\n\nSurah ${surahNumber}, Ayah ${ayahNumber}\n\nRecite with TILAWA`
    const shareData = {
      title: `Ayah ${surahNumber}:${ayahNumber}`,
      text: shareText,
      url: typeof window !== 'undefined' ? window.location.origin : '',
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Share cancelled')
        handleCopy()
      }
    } else {
      handleCopy()
    }
  }

  const handleSave = async () => {
    try {
      const saved = JSON.parse(localStorage.getItem('tilawa_saved_ayahs') || '[]')
      const newAyah = {
        surahNumber,
        ayahNumber,
        text: arabicText,
        savedAt: new Date().toISOString(),
      }

      if (!saved.some((a: any) => a.surahNumber === surahNumber && a.ayahNumber === ayahNumber)) {
        saved.push(newAyah)
        localStorage.setItem('tilawa_saved_ayahs', JSON.stringify(saved))
        alert('✅ Ayah saved!')
      } else {
        alert('⚠️ Already saved')
      }
    } catch (error) {
      console.error('Error saving ayah:', error)
      alert('❌ Failed to save')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(arabicText)
      alert('✅ Arabic text copied!')
    } catch {
      alert('❌ Failed to copy')
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-border bg-background md:left-1/2 md:bottom-auto md:top-1/2 md:right-auto md:max-h-[80vh] md:w-full md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 p-6 backdrop-blur-sm">
          <div>
            <h2 className="text-lg font-bold text-foreground">Ayah Actions</h2>
            <p className="mt-1 text-sm text-muted-foreground">Surah {surahNumber}, Ayah {ayahNumber}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted">
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-2 p-6">
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

          <div className="rounded-lg border border-border">
            <button
              onClick={() => toggleSection('listen')}
              className="flex w-full items-center justify-between bg-card p-4 hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <Volume2 className="size-5 text-primary" />
                <span className="font-semibold">Listen</span>
              </div>
              {expandedSections.has('listen') ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
            </button>

            {expandedSections.has('listen') && (
              <div className="border-t border-border p-4">
                {audioUrl && !audioLoading ? (
                  <div className="space-y-3">
                    <button
                      onClick={handlePlay}
                      disabled={!audioUrl}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                    >
                      <Volume2 className="size-5" />
                      {isPlaying && currentUrl === audioUrl ? 'Pause' : 'Play'} Recitation
                    </button>
                    <p className="text-xs text-muted-foreground">Reciter: Yasser Al-Dosary</p>
                  </div>
                ) : audioLoading ? (
                  <p className="text-sm text-muted-foreground">Loading audio...</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Audio not available</p>
                )}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border">
            <button
              onClick={() => toggleSection('translation')}
              className="flex w-full items-center justify-between bg-card p-4 hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="size-5 text-primary" />
                <span className="font-semibold">Translation</span>
              </div>
              {expandedSections.has('translation') ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
            </button>

            {expandedSections.has('translation') && (
              <div className="border-t border-border p-4">
                {translation ? (
                  <div className="space-y-3">
                    <p className="leading-relaxed text-foreground">{translation.text}</p>
                    <p className="text-xs text-muted-foreground">Translation: Sahih International (Asad)</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Translation not available</p>
                )}
              </div>
            )}
          </div>

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
              {expandedSections.has('tafseer') ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
            </button>

            {expandedSections.has('tafseer') && (
              <div className="border-t border-border p-4">
                {tafseer ? (
                  <div className="space-y-3">
                    <p className="leading-relaxed text-foreground">{tafseer.text}</p>
                    <p className="text-xs text-muted-foreground">Source: {tafseer.tafsir}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Tafseer not available</p>
                )}
              </div>
            )}
          </div>

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
