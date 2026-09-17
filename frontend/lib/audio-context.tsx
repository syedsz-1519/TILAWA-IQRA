'use client'

import { createContext, useContext, useState, useRef } from 'react'

interface AudioContextType {
  play: () => void
  pause: () => void
  isPlaying: boolean
  currentAyah: string | null
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAyah, setCurrentAyah] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = () => {
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const pause = () => {
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  return (
    <AudioContext.Provider value={{ play, pause, isPlaying, currentAyah }}>
      {children}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
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
