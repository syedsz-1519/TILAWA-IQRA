'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, Heart, Lightbulb, BookOpen, MessageSquare } from 'lucide-react'

interface Message {
  role: 'user' | 'counselor'
  content: string
  relatedAyah?: { surah: number; ayah: number; text: string }
}

export default function CounselorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'counselor',
      content:
        'As-salamu alaikum wa rahmatullahi wa barakatuhu! 👋 I am your personal Ayah-to-Life Counselor. I combine Quranic wisdom with modern psychology to help you navigate life challenges. What is troubling your heart today?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const moods = [
    { emoji: '😔', label: 'Stressed', question: 'I am feeling overwhelmed and stressed' },
    { emoji: '😞', label: 'Sad', question: 'I am feeling sad and hopeless' },
    { emoji: '😤', label: 'Angry', question: 'I am feeling angry or frustrated' },
    { emoji: '😟', label: 'Anxious', question: 'I am feeling anxious or worried' },
    { emoji: '🤔', label: 'Confused', question: 'I am confused about my path' },
    { emoji: '💔', label: 'Heartbroken', question: 'I am dealing with heartbreak' },
  ]

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || input
    if (!text.trim()) return

    const userMessage: Message = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response with Quranic guidance
    setTimeout(() => {
      const responses = [
        {
          text: 'I hear your concern. The Quran teaches us in Surah Al-Baqarah (2:286): "Allah does not burden a soul beyond that it can bear..." This reminds us that Allah knows your capacity and your struggles. What specific aspect is weighing on you most?',
          ayah: { surah: 2, ayah: 286, text: 'La yukallifu Allahu nafsan illa wus`aha...' },
        },
        {
          text: 'The Prophet (peace be upon him) said: "Remember that victory comes with patience, relief comes with hardship, and with hardship comes ease." (Tirmidhi) Your current difficulty is temporary. How can I help you find perspective?',
          ayah: { surah: 94, ayah: 5, text: 'Fa inna ma\'a al-\'usr yusr...' },
        },
        {
          text: 'Surah At-Talaq (65:7) reminds us: "Let those of wealth and ability spend from their means... Allah will give to whoever He wills." Focus on what you can control and trust Allah with the rest.',
          ayah: { surah: 65, ayah: 7, text: 'Li yunfiq dhu sawatin min sawatihi...' },
        },
      ]
      const response = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { role: 'counselor', ...response }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/2 to-transparent">
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-4xl">💚</div>
            <div>
              <h1 className="text-3xl font-bold">Ayah to Life Counselor</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Quranic guidance for life's challenges
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-2xl rounded-lg p-4 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border'
                  }`}
                >
                  <p className="text-sm leading-relaxed mb-2">{msg.content}</p>
                  {msg.relatedAyah && (
                    <div className="mt-3 p-3 rounded bg-muted/50 border-l-2 border-primary">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Quranic Reference:
                      </p>
                      <p className="font-arabic text-right text-sm mb-1">{msg.relatedAyah.text}</p>
                      <p className="text-xs text-muted-foreground">
                        Surah {msg.relatedAyah.surah}:{msg.relatedAyah.ayah}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Mood Selection or Input Area */}
      <div className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-8">
          {messages.length <= 1 && (
            <>
              <p className="text-sm font-medium text-muted-foreground mb-3">How are you feeling today?</p>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => handleSendMessage(mood.question)}
                    className="rounded-lg border border-border p-3 text-center hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-xs font-medium">{mood.label}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Share what's on your heart..."
              className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="rounded-lg bg-primary text-primary-foreground px-4 py-3 hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-3">
            Remember: This counselor provides Quranic guidance. For serious mental health issues, please consult a professional.
          </p>
        </div>
      </div>
    </div>
  )
}
