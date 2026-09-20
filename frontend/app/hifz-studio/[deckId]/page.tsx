'use client'

import { useState, useContext } from 'react'
import Link from 'next/link'
import { ChevronLeft, Volume2, RotateCw, ChevronRight, X } from 'lucide-react'
import { getHifzDeck, getCardsByDeck, calculateNextReview } from '@/lib/hifz-data'
import { LanguageContext } from '@/lib/language-context'

interface DeckPageProps {
  params: {
    deckId: string
  }
}

export default function HifzDeckPage({ params }: DeckPageProps) {
  const { deckId } = params
  const { currentLanguage } = useContext(LanguageContext)

  const deck = getHifzDeck(deckId)
  const cards = getCardsByDeck(deckId)

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    correct: 0,
    incorrect: 0,
  })
  const [sessionActive, setSessionActive] = useState(true)

  if (!deck || cards.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Deck not found</h1>
          <Link href="/hifz-studio" className="text-primary hover:underline">
            Back to Hifz Studio
          </Link>
        </div>
      </div>
    )
  }

  const currentCard = cards[currentCardIndex]
  const progress = Math.round(((currentCardIndex + 1) / cards.length) * 100)
  const accuracy = sessionStats.reviewed > 0 
    ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100)
    : 0

  const handleResponse = (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    // Log response
    if (quality >= 3) {
      setSessionStats((prev) => ({
        ...prev,
        correct: prev.correct + 1,
        reviewed: prev.reviewed + 1,
      }))
    } else {
      setSessionStats((prev) => ({
        ...prev,
        incorrect: prev.incorrect + 1,
        reviewed: prev.reviewed + 1,
      }))
    }

    // Move to next card
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    } else {
      // Session complete
      setSessionActive(false)
    }
  }

  if (!sessionActive) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-8 md:px-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold mb-4">Session Complete!</h1>

            <div className="bg-card border border-border rounded-lg p-8 mb-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-1">
                    {sessionStats.correct}
                  </div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-1">
                    {sessionStats.incorrect}
                  </div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-1">
                    {accuracy}%
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Cards reviewed: {sessionStats.reviewed} / {cards.length}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/hifz-studio"
                className="flex-1 rounded-lg border border-border px-6 py-3 font-medium hover:bg-muted transition-colors"
              >
                Back to Decks
              </Link>
              <button
                onClick={() => {
                  setCurrentCardIndex(0)
                  setIsFlipped(false)
                  setSessionStats({ reviewed: 0, correct: 0, incorrect: 0 })
                  setSessionActive(true)
                }}
                className="flex-1 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
              >
                Restart Session
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-4 md:px-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/hifz-studio"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold">{deck.name}</h1>
              <p className="text-xs text-muted-foreground">Card {currentCardIndex + 1} / {cards.length}</p>
            </div>
            <button className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2 items-center">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground w-10 text-right">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl px-4 py-8 md:px-8 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        {/* Session Stats Bar */}
        <div className="w-full mb-8 grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg border border-green-200 bg-green-50/50 dark:bg-green-950/20">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {sessionStats.correct}
            </div>
            <div className="text-xs text-green-600 dark:text-green-300">Correct</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-red-200 bg-red-50/50 dark:bg-red-950/20">
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">
              {sessionStats.incorrect}
            </div>
            <div className="text-xs text-red-600 dark:text-red-300">Incorrect</div>
          </div>
          <div className="text-center p-3 rounded-lg border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {accuracy}%
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-300">Accuracy</div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="w-full mb-8">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-80 rounded-lg border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5 p-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:from-primary/15 hover:to-primary/10 group"
          >
            <div className="text-center">
              {!isFlipped ? (
                <>
                  <div className="text-sm font-medium text-muted-foreground mb-4 group-hover:text-primary transition-colors">
                    Arabic Text (Front)
                  </div>
                  <p className="text-5xl font-arabic text-foreground leading-relaxed mb-4">
                    {currentCard.arabicText}
                  </p>
                  <p className="text-sm italic text-muted-foreground">
                    {currentCard.transliteration}
                  </p>
                  <div className="mt-6 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to reveal meaning →
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm font-medium text-muted-foreground mb-4">
                    Meaning ({currentLanguage.name})
                  </div>
                  <p className="text-lg text-foreground leading-relaxed">
                    {currentCard.meaning}
                  </p>
                  <div className="mt-6 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to hide meaning ←
                  </div>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Controls */}
        <div className="w-full space-y-4">
          {/* Audio Button */}
          <button className="w-full rounded-lg border border-border px-4 py-3 font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
            <Volume2 className="h-5 w-5" />
            Listen to Recitation
          </button>

          {/* Response Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleResponse(1)}
              className="rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 px-3 py-3 font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm"
            >
              😞 Hard
            </button>
            <button
              onClick={() => handleResponse(3)}
              className="rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 px-3 py-3 font-medium hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors text-sm"
            >
              😐 Okay
            </button>
            <button
              onClick={() => handleResponse(5)}
              className="rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 px-3 py-3 font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm"
            >
              😊 Easy
            </button>
          </div>

          {/* Info */}
          <div className="text-center text-xs text-muted-foreground pt-2">
            Surah {currentCard.surah}, Ayah {currentCard.ayahStart}{currentCard.ayahEnd !== currentCard.ayahStart ? `-${currentCard.ayahEnd}` : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
