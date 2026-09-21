'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { LANGUAGES, LanguageCode, getLanguageName, getNativeLanguageName, getEnabledLanguages, isRTLLanguage } from '@/lib/languages'

interface LanguageSelectorProps {
  currentLanguage: LanguageCode
  onLanguageChange: (language: LanguageCode) => void
  compact?: boolean
}

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange,
  compact = false 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentLang = LANGUAGES[currentLanguage]
  const enabledLanguages = getEnabledLanguages()

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted transition-colors ${
          isRTLLanguage(currentLanguage) ? 'flex-row-reverse' : ''
        }`}
      >
        <span>{currentLang?.flag}</span>
        {!compact && (
          <>
            <span>{currentLang?.name}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute ${isRTLLanguage(currentLanguage) ? 'right-0' : 'left-0'} z-50 mt-2 w-72 rounded-lg border border-border bg-background shadow-lg`}>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search language..."
            className="w-full border-b border-border px-4 py-2 text-sm focus:outline-none bg-background"
          />

          {/* Language List */}
          <div className="max-h-96 overflow-y-auto">
            {enabledLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3 ${
                  currentLanguage === lang.code ? 'bg-primary/10 border-l-2 border-primary' : ''
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{lang.name}</div>
                  <div className="text-xs text-muted-foreground">{lang.nativeName}</div>
                </div>
                {currentLanguage === lang.code && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
            {enabledLanguages.length} languages available
          </div>
        </div>
      )}
    </div>
  )
}
