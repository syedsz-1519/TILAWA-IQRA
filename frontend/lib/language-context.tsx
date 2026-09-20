'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { LanguageCode, LANGUAGES, getLanguageDirection } from './languages'

interface LanguageContextType {
  currentLanguage: LanguageCode
  setLanguage: (language: LanguageCode) => void
  direction: 'ltr' | 'rtl'
  preferredLanguages: LanguageCode[]
  setPreferredLanguages: (languages: LanguageCode[]) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en')
  const [preferredLanguages, setPreferredLanguages] = useState<LanguageCode[]>(['en', 'ur'])
  const [mounted, setMounted] = useState(false)

  // Load language preference from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const savedLanguage = localStorage.getItem('tilawa_language') as LanguageCode
      const savedPreferred = localStorage.getItem('tilawa_preferred_languages')

      if (savedLanguage && LANGUAGES[savedLanguage]) {
        setCurrentLanguage(savedLanguage)
      }

      if (savedPreferred) {
        try {
          const parsed = JSON.parse(savedPreferred) as LanguageCode[]
          setPreferredLanguages(parsed)
        } catch (parseError) {
          console.warn('Failed to parse preferred languages from storage:', parseError)
        }
      }
    } catch (storageError) {
      console.warn('Failed to retrieve language preferences from storage:', storageError)
    }

    setMounted(true)
  }, [])

  // Update document direction based on language
  useEffect(() => {
    if (typeof document === 'undefined') return

    try {
      const direction = getLanguageDirection(currentLanguage)
      document.documentElement.dir = direction
      document.documentElement.lang = currentLanguage

      // Save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('tilawa_language', currentLanguage)
        } catch (storageError) {
          console.warn('Failed to save language preference to storage:', storageError)
        }
      }
    } catch (error) {
      console.warn('Failed to update document direction:', error)
    }
  }, [currentLanguage])

  const handleSetLanguage = (language: LanguageCode) => {
    setCurrentLanguage(language)

    // Add to preferred languages if not already there
    if (!preferredLanguages.includes(language)) {
      const newPreferred = [...preferredLanguages.slice(-3), language] // Keep last 3
      setPreferredLanguages(newPreferred)
    }
  }

  const handleSetPreferredLanguages = (languages: LanguageCode[]) => {
    setPreferredLanguages(languages)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('tilawa_preferred_languages', JSON.stringify(languages))
      } catch (storageError) {
        console.warn('Failed to save preferred languages to storage:', storageError)
      }
    }
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage: handleSetLanguage,
        direction: getLanguageDirection(currentLanguage),
        preferredLanguages,
        setPreferredLanguages: handleSetPreferredLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

/**
 * Hook to use language context
 */
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    // Return default context if provider is missing (fallback for SSR/provider errors)
    console.warn('useLanguage called outside LanguageProvider. Using default language context.')
    return {
      currentLanguage: 'en' as LanguageCode,
      setLanguage: () => {},
      direction: 'ltr' as const,
      preferredLanguages: ['en', 'ur'],
      setPreferredLanguages: () => {},
    }
  }
  return context
}
