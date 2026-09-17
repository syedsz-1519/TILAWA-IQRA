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
import {
  SURAHS,
  RECITERS,
  DEFAULT_RECITER,
  getSurahAudioUrls,
  type Reciter,
  type Surah,
} from '@/lib/quran'
import { EVENTS, KEYS } from '@/lib/prefs'

interface PlayerState {
  currentSurah: Surah | null
  currentReciter: Reciter
  isPlaying: boolean
  isLoading: boolean
  currentTime: number
  duration: number
  playbackRate: number
  repeat: boolean
  volume: number
  isMuted: boolean
  errorMessage: string | null
  playSurah: (surah: Surah, reciterOverride?: Reciter) => void
  togglePlay: () => void
  seek: (time: number) => void
  next: () => void
  previous: () => void
  setPlaybackRate: (rate: number) => void
  toggleRepeat: () => void
  setReciter: (reciter: Reciter) => void
  setVolume: (vol: number) => void
  toggleMute: () => void
  closePlayer: () => void
  stop: () => void
  retry: () => void
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
  const currentSurahRef = useRef<Surah | null>(SURAHS[0])
  const currentReciterRef = useRef<Reciter>(DEFAULT_RECITER)
  const playbackRateRef = useRef<number>(1)
  const urlsRef = useRef<string[]>([])
  const urlIndexRef = useRef<number>(0)
  const volumeRef = useRef<number>(1)
  const isMutedRef = useRef<boolean>(false)

  const [currentSurah, setCurrentSurah] = useState<Surah | null>(SURAHS[0])
  const [currentReciter, setCurrentReciterState] = useState<Reciter>(DEFAULT_RECITER)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRateState] = useState(1)
  const [repeat, setRepeat] = useState(false)
  const [volume, setVolumeState] = useState(1)
  const [isMuted, setIsMutedState] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Initialize audio element lazily
  const getAudio = useCallback(() => {
    if (!audioRef.current && typeof window !== 'undefined') {
      const audio = new Audio()
      audio.preload = 'metadata'
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  // Robust mirror failover
  const tryNextMirror = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !currentSurahRef.current) return
    const urls = urlsRef.current
    const nextIndex = urlIndexRef.current + 1
    if (nextIndex < urls.length) {
      console.info(`Switching to backup audio CDN mirror ${nextIndex}:`, urls[nextIndex])
      urlIndexRef.current = nextIndex
      audio.src = urls[nextIndex]
      audio.load()
      const p = audio.play()
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true)
          setIsLoading(false)
          setErrorMessage(null)
        }).catch((err) => {
          console.warn(`Audio mirror ${nextIndex} play rejected:`, err)
          tryNextMirror()
        })
      }
    } else {
      console.error('All recitation audio mirrors failed.')
      setIsLoading(false)
      setIsPlaying(false)
      setErrorMessage('Recitation audio could not be streamed. Please tap Retry or choose another reciter.')
    }
  }, [])

  // Start playing a specific surah with candidate mirror URLs
  const playSurah = useCallback(
    (surah: Surah, reciterOverride?: Reciter) => {
      // Pause any ongoing per-ayah recitation on reader page
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(EVENTS.STOP_VERSE_AUDIO))
      }

      const activeReciter = reciterOverride || currentReciterRef.current
      const audio = getAudio()
      if (!audio) return

      // If already on the same surah and same reciter, toggle play/pause
      if (
        currentSurahRef.current?.number === surah.number &&
        audio.src &&
        !reciterOverride
      ) {
        if (audio.paused) {
          setErrorMessage(null)
          setIsLoading(true)
          const p = audio.play()
          if (p !== undefined) {
            p.then(() => {
              setIsPlaying(true)
              setIsLoading(false)
            }).catch((err) => {
              console.warn('Audio play toggle error:', err)
              setIsPlaying(false)
              setIsLoading(false)
              if (err.name === 'NotAllowedError') {
                setErrorMessage('Tap "Play" to grant audio permission and start listening.')
              } else {
                tryNextMirror()
              }
            })
          }
        } else {
          audio.pause()
          setIsPlaying(false)
        }
        return
      }

      currentSurahRef.current = surah
      setCurrentSurah(surah)
      setErrorMessage(null)
      setIsLoading(true)
      setCurrentTime(0)
      setDuration(0)

      const urls = getSurahAudioUrls(surah.number, activeReciter)
      urlsRef.current = urls
      urlIndexRef.current = 0

      audio.src = urls[0]
      audio.playbackRate = playbackRateRef.current
      audio.volume = isMutedRef.current ? 0 : volumeRef.current
      audio.load()

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setIsLoading(false)
            setErrorMessage(null)
          })
          .catch((err) => {
            console.warn('Audio play notice:', err)
            setIsPlaying(false)
            setIsLoading(false)
            if (err.name === 'NotAllowedError') {
              setErrorMessage('Tap "Play" to grant audio permission and start listening.')
            } else {
              tryNextMirror()
            }
          })
      }

      if (
        typeof window !== 'undefined' &&
        'mediaSession' in navigator &&
        typeof MediaMetadata !== 'undefined'
      ) {
        try {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: `${surah.nameTransliterated} — ${surah.nameArabic}`,
            artist: activeReciter.nameEnglish,
            album: 'TILAWA Quran',
          })
        } catch {
          // Ignore MediaSession error
        }
      }
    },
    [getAudio, tryNextMirror],
  )

  const togglePlay = useCallback(() => {
    const audio = getAudio()
    if (!audio) return
    if (!currentSurahRef.current) {
      playSurah(SURAHS[0])
      return
    }
    if (audio.paused) {
      setErrorMessage(null)
      setIsLoading(true)
      if (!audio.src || audio.src === '' || audio.src === window.location.href) {
        const urls = getSurahAudioUrls(currentSurahRef.current.number, currentReciterRef.current)
        urlsRef.current = urls
        urlIndexRef.current = 0
        audio.src = urls[0]
        audio.load()
      }
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setIsLoading(false)
            setErrorMessage(null)
          })
          .catch((err) => {
            console.warn('Audio toggle play error:', err)
            setIsPlaying(false)
            setIsLoading(false)
            if (err.name === 'NotAllowedError') {
              setErrorMessage('Tap "Play" to grant audio permission and start listening.')
            } else {
              tryNextMirror()
            }
          })
      }
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }, [getAudio, playSurah, tryNextMirror])

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
    playbackRateRef.current = rate
    setPlaybackRateState(rate)
    const audio = audioRef.current
    if (audio) audio.playbackRate = rate
  }, [])

  const toggleRepeat = useCallback(() => {
    setRepeat((r) => {
      repeatRef.current = !r
      return !r
    })
  }, [])

  const setReciter = useCallback(
    (reciter: Reciter) => {
      currentReciterRef.current = reciter
      setCurrentReciterState(reciter)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(KEYS.RECITER, reciter.id)
      }
      if (currentSurahRef.current) {
        playSurah(currentSurahRef.current, reciter)
      }
    },
    [playSurah],
  )

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol))
    volumeRef.current = clamped
    setVolumeState(clamped)
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMutedRef.current ? 0 : clamped
    }
  }, [])

  const toggleMute = useCallback(() => {
    setIsMutedState((m) => {
      const nextMuted = !m
      isMutedRef.current = nextMuted
      const audio = audioRef.current
      if (audio) {
        audio.volume = nextMuted ? 0 : volumeRef.current
      }
      return nextMuted
    })
  }, [])

  const retry = useCallback(() => {
    if (!currentSurahRef.current) return
    playSurah(currentSurahRef.current)
  }, [playSurah])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel()
      } catch {}
    }
    setCurrentTime(0)
    setIsPlaying(false)
    setIsLoading(false)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(EVENTS.STOP_VERSE_AUDIO))
    }
  }, [])

  const closePlayer = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.src = ''
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel()
      } catch {}
    }
    currentSurahRef.current = null
    setCurrentSurah(null)
    setIsPlaying(false)
    setIsLoading(false)
    setErrorMessage(null)
  }, [])

  // Setup event listeners on audio element
  useEffect(() => {
    const audio = getAudio()
    if (!audio) return

    // Restore saved reciter preference from localStorage
    if (typeof window !== 'undefined') {
      const savedReciterId = window.localStorage.getItem(KEYS.RECITER)
      if (savedReciterId) {
        const found = RECITERS.find((r) => r.id === savedReciterId)
        if (found) {
          currentReciterRef.current = found
          setCurrentReciterState(found)
        }
      }
    }

    const onPlay = () => {
      setIsPlaying(true)
      setIsLoading(false)
      setErrorMessage(null)
    }

    const onPause = () => setIsPlaying(false)
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0)
      setIsLoading(false)
      setErrorMessage(null)
    }
    const onWaiting = () => setIsLoading(true)
    const onCanPlay = () => {
      setIsLoading(false)
      setErrorMessage(null)
    }

    // Auto-fallback on playback error
    const onError = () => {
      if (!audio.src || audio.src === '' || audio.src === window.location.href) {
        return
      }
      tryNextMirror()
    }

    const onEnded = () => {
      if (repeatRef.current) {
        audio.currentTime = 0
        audio.play().catch(() => setIsPlaying(false))
        return
      }
      const current = currentSurahRef.current
      if (current) {
        const nextSurah = SURAHS[current.number % 114]
        playSurah(nextSurah)
      }
    }

    // External event to pause global player when ayah audio starts
    const onStopGlobal = () => {
      audio.pause()
      setIsPlaying(false)
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    audio.addEventListener('ended', onEnded)

    if (typeof window !== 'undefined') {
      window.addEventListener(EVENTS.STOP_GLOBAL_AUDIO, onStopGlobal)
    }

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('ended', onEnded)
      if (typeof window !== 'undefined') {
        window.removeEventListener(EVENTS.STOP_GLOBAL_AUDIO, onStopGlobal)
      }
    }
  }, [getAudio, playSurah, tryNextMirror])

  return (
    <PlayerContext.Provider
      value={{
        currentSurah,
        currentReciter,
        isPlaying,
        isLoading,
        currentTime,
        duration,
        playbackRate,
        repeat,
        volume,
        isMuted,
        errorMessage,
        playSurah,
        togglePlay,
        seek,
        next,
        previous,
        setPlaybackRate,
        toggleRepeat,
        setReciter,
        setVolume,
        toggleMute,
        closePlayer,
        stop,
        retry,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
