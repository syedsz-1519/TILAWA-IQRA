'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { SURAHS, getSurahAudioUrl, DEFAULT_RECITER, type Surah } from '@/lib/quran'

interface PlayerState {
  currentSurah: Surah | null
  isPlaying: boolean
  isLoading: boolean
  currentTime: number
  duration: number
  playbackRate: number
  repeat: boolean
  playSurah: (surah: Surah) => void
  togglePlay: () => void
  seek: (time: number) => void
  next: () => void
  previous: () => void
  setPlaybackRate: (rate: number) => void
  toggleRepeat: () => void
}

const PlayerContext = createContext<PlayerState | null>(null)

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const repeatRef = useRef(false)
  const currentSurahRef = useRef<Surah | null>(null)

  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRateState] = useState(1)
  const [repeat, setRepeat] = useState(false)

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio()
      audio.preload = 'metadata'
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  const playSurah = useCallback(
    (surah: Surah) => {
      const audio = getAudio()
      if (currentSurahRef.current?.number === surah.number) {
        if (audio.paused) {
          audio.play().catch(() => setIsPlaying(false))
        } else {
          audio.pause()
        }
        return
      }
      currentSurahRef.current = surah
      setCurrentSurah(surah)
      setIsLoading(true)
      setCurrentTime(0)
      setDuration(0)
      audio.src = getSurahAudioUrl(surah.number)
      audio.playbackRate = audio.defaultPlaybackRate
      audio.play().catch(() => {
        setIsPlaying(false)
        setIsLoading(false)
      })
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: `${surah.nameTransliterated} — ${surah.nameArabic}`,
          artist: DEFAULT_RECITER.nameEnglish,
          album: 'TILAWA',
        })
      }
    },
    [getAudio],
  )

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !currentSurahRef.current) return
    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
    setCurrentTime(time)
  }, [])

  const next = useCallback(() => {
    const current = currentSurahRef.current
    if (!current) return
    const nextSurah = SURAHS[current.number % 114]
    playSurah(nextSurah)
  }, [playSurah])

  const previous = useCallback(() => {
    const current = currentSurahRef.current
    if (!current) return
    const audio = audioRef.current
    if (audio && audio.currentTime > 5) {
      audio.currentTime = 0
      return
    }
    const prevIndex = (current.number - 2 + 114) % 114
    playSurah(SURAHS[prevIndex])
  }, [playSurah])

  const setPlaybackRate = useCallback((rate: number) => {
    const audio = audioRef.current
    if (audio) audio.playbackRate = rate
    setPlaybackRateState(rate)
  }, [])

  const toggleRepeat = useCallback(() => {
    setRepeat((r) => {
      repeatRef.current = !r
      return !r
    })
  }, [])

  useEffect(() => {
    const audio = getAudio()

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }
    const onWaiting = () => setIsLoading(true)
    const onCanPlay = () => setIsLoading(false)
    const onEnded = () => {
      if (repeatRef.current) {
        audio.currentTime = 0
        audio.play().catch(() => setIsPlaying(false))
        return
      }
      const current = currentSurahRef.current
      if (current) {
        const nextSurah = SURAHS[current.number % 114]
        currentSurahRef.current = nextSurah
        setCurrentSurah(nextSurah)
        setCurrentTime(0)
        setDuration(0)
        audio.src = getSurahAudioUrl(nextSurah.number)
        audio.play().catch(() => setIsPlaying(false))
      }
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('ended', onEnded)
    }
  }, [getAudio])

  return (
    <PlayerContext.Provider
      value={{
        currentSurah,
        isPlaying,
        isLoading,
        currentTime,
        duration,
        playbackRate,
        repeat,
        playSurah,
        togglePlay,
        seek,
        next,
        previous,
        setPlaybackRate,
        toggleRepeat,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
