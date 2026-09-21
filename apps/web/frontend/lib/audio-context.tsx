'use client'

import { createContext, useContext, useState, useRef, useCallback } from 'react'

interface AudioContextType {
  play: (audioUrl: string) => Promise<void>
  pause: () => void
  isPlaying: boolean
  currentAyah: string | null
  currentUrl: string | null
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAyah, setCurrentAyah] = useState<string | null>(null)
  const [currentUrl, setCurrentUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback(async (audioUrl: string) => {
    try {
      if (!audioRef.current) return

      // If already playing the same URL, just resume
      if (isPlaying && currentUrl === audioUrl) {
        audioRef.current.play()
        return
      }

      // Stop current playback
      if (audioRef.current.src) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      // Set new source and play
      audioRef.current.src = audioUrl
      setCurrentUrl(audioUrl)
      setCurrentAyah(audioUrl)
      
      // Wait for metadata to load before playing
      await new Promise((resolve) => {
        const handler = () => {
          audioRef.current?.removeEventListener('loadedmetadata', handler)
          resolve(null)
        }
        audioRef.current?.addEventListener('loadedmetadata', handler, { once: true })
        audioRef.current?.load()
      })

      setIsPlaying(true)
      await audioRef.current.play()
    } catch (error) {
      console.error('Error playing audio:', error)
      setIsPlaying(false)
    }
  }, [isPlaying, currentUrl])

  const pause = useCallback(() => {
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [])

  const handleEnded = useCallback(() => {
    setIsPlaying(false)
    setCurrentUrl(null)
    setCurrentAyah(null)
  }, [])

  const handleError = useCallback(() => {
    console.error('Audio playback error')
    setIsPlaying(false)
  }, [])

  return (
    <AudioContext.Provider 
      value={{ 
        play, 
        pause, 
        isPlaying, 
        currentAyah,
        currentUrl 
      }}
    >
      {children}
      <audio 
        ref={audioRef} 
        onEnded={handleEnded}
        onError={handleError}
        crossOrigin="anonymous"
      />
    </AudioContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioProvider')
  }
  return context
}
