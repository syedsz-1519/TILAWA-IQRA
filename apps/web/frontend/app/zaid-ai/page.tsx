'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SUGGESTED_QUESTIONS = [
  {
    q: 'What is Tajweed and why is it important?',
    label: 'What is Tajweed?',
  },
  {
    q: 'Explain the letters and rule of Qalqalah.',
    label: 'Explain Qalqalah',
  },
  {
    q: 'How does the AI recitation scoring work?',
    label: 'How AI Scoring works',
  },
  {
    q: 'Can you teach me the rules of Ghunnah?',
    label: 'Learn Ghunnah',
  },
]

// Client-side knowledge base to generate intelligent, instant responses.
const getBotResponse = (input: string): string => {
  const query = input.toLowerCase().trim()

  if (query.includes('qalqalah') || query.includes('bouncing') || query.includes('echoing')) {
    return `### **Qalqalah (Echoing / Bouncing Sound)**

**Qalqalah** means to make an echoing or bouncing sound at the end of reciting a letter when it has a **Sukun** (static state) or when you stop on it.

#### **1. The 5 Letters of Qalqalah**
The letters are combined in the mnemonic phrase: **قُطْبُ جَدٍّ** (Qutb Jaddin)
- **ق** (Qaf)
- **ط** (Ta)
- **ب** (Ba)
- **ج** (Jeem)
- **د** (Dal)

#### **2. Levels of Qalqalah**
- **Qalqalah Kubra (Strongest)**: Occurs when stopping at the end of an ayah on a Qalqalah letter (especially if it has a Shaddah), e.g., \`ٱلْحَقُّ\` in Surah Al-Lahab.
- **Qalqalah Wusta (Medium)**: Occurs when stopping at the end of a word on a Qalqalah letter without a Shaddah, e.g., \`لَمْ يَلِدْ\`.
- **Qalqalah Sughra (Minor)**: Occurs in the middle of a word when the Qalqalah letter has a Sukun, e.g., \`يَقْطَعُونَ\`.

*Try reciting Surah Al-Ikhlas to practice these bouncing letter endings!*`
  }

  if (query.includes('ghunnah') || query.includes('nasalization') || query.includes('nasal')) {
    return `### **Ghunnah (Nasalization)**

**Ghunnah** is a nasal sound produced from the nose (nasal cavity). It is a mandatory rule of reciting that must be held for **2 counts (beats)**.

#### **1. Core Letters of Ghunnah**
Ghunnah applies permanently to two letters when they carry a **Shaddah (ّ)**:
1. **Nun Muschaddadah (نّ)**: E.g., \`إِنَّ\` (Inna) or \`النَّاس\` (An-Naas).
2. **Mim Muschaddadah (مّ)**: E.g., \`ثُمَّ\` (Thumma) or \`عَمَّ\` (Amma).

#### **2. How to Practice**
When pronouncing these letters, hold the sound in your nose for about 1.5 to 2 seconds. If you close your nostrils, the sound should stop completely. 

*Practice this in Surah An-Nas, which contains many Nun Muschaddadah letters!*`
  }

  if (query.includes('scoring') || query.includes('how does') || query.includes('ai') || query.includes('feedback') || query.includes('heatmap')) {
    return `### **How the TILAWA AI Scoring Works**

TILAWA uses state-of-the-art speech processing to help you perfect your recitation:

1. **Audio Capture**: When you click record and recite an ayah, the app captures your voice and sends it to our FastAPI backend.
2. **Phonetic Transcription (ASR)**: We run a fine-tuned **Whisper speech model** trained specifically on Quranic recitations to transcribe your pronunciation.
3. **Acoustic Alignment**: The system aligns the phonemes of your voice with the target canonical recitation (Sheikh Yasser Al-Dosari).
4. **Semantic Heatmap**: The app highlights the Quranic Arabic text:
   - <span class="text-emerald-500 font-semibold">Green</span>: Correct pronunciation and Tajweed.
   - <span class="text-amber-500 font-semibold">Amber</span>: Minor rules deviation (e.g. holding a Ghunnah for too short).
   - <span class="text-red-500 font-semibold">Red</span>: Major pronunciation error or missing syllables.

*Use our **Tajweed Hub** to study specific rules that the AI flags as mistakes!*`
  }

  if (query.includes('tajweed') || query.includes('what is') || query.includes('rule')) {
    return `### **What is Tajweed?**

**Tajweed** (تَجْوِيدْ) literally means *beautification* or *doing something well*. In Quranic science, it is the set of rules governing how the letters of individual words should be pronounced, giving each letter its rights and characteristics.

#### **Core Categories of Tajweed Rules:**
1. **Makharij al-Huruf**: The correct articulation points of letters (lips, tongue, throat, nose).
2. **Sifat al-Huruf**: The characteristics of letters (whispering, echoing, softness).
3. **Rules of Noon Sakinah & Tanween**: How to pronounce Nun with Sukun (Izhar, Ikhfa, Idgham, Iqlab).
4. **Rules of Meem Sakinah**: How to pronounce Mim with Sukun.
5. **Madd Rules**: Rules of elongation (stretching vowel sounds).

*Zaid Tip: Start with **Ghunnah** and **Qalqalah** first as they are the most common rules in the shorter Surahs of Juz 'Amma!*`
  }

  if (query.includes('fatihah') || query.includes('surah 1') || query.includes('opening')) {
    return `### **Surah Al-Fatihah (The Opening)**

**Surah Al-Fatihah** is the first chapter of the Quran and is recited in every unit (Rak'ah) of daily prayers.

#### **Key Details:**
- **Number**: Surah 1
- **Ayah Count**: 7 verses
- **Revelation Place**: Makkah
- **Core Rules**:
  - The heavy letter **R** in \`ٱلرَّحْمَٰنِ\` (Ar-Rahman).
  - Elongation (Madd) at the end of the verses, e.g., \`ٱلْعَٰلَمِينَ\` (Al-Aalameen).
  - The correct articulation point of the letter **Dad (ض)** in \`ٱلضَّآلِّينَ\` (Ad-Dalleen).

*You can select Surah Al-Fatihah from our homepage browser to stream the recitation and practice!*`
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('salam') || query.includes('assalamu') || query.includes('hey')) {
    return `Assalamu Alaikum! I am **Zaid**, your dedicated Quranic learning assistant. 

I can help you understand:
- **Tajweed Rules** (Qalqalah, Ghunnah, Izhar, Madd, etc.)
- **Quranic Arabic Letters** and correct pronunciation.
- **Platform Features** (How our AI recitation scoring and trackers work).

What would you like to learn today? You can select one of the suggested prompts or type your own question below!`
  }

  return `Thank you for your question! I am Zaid, your basic learning assistant. 

To help you best, here are some common topics I can explain:
- Type **"Qalqalah"** to learn about echoing letters.
- Type **"Ghunnah"** to learn about holding nasalization sounds.
- Type **"Tajweed"** to learn the foundational rules of beautiful recitation.
- Type **"AI Scoring"** to understand how TILAWA analyzes your voice.

*Please let me know if you would like me to explain any of these Quranic reading concepts in detail!*`
}

export default function ZaidAiPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Assalamu Alaikum! I am **Zaid**, your Quranic learning assistant. 

How can I help you perfect your recitation or understand the rules of Tajweed today? Feel free to ask me anything about Quranic letters, pronunciation, or how our AI scoring works!`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const botReplyContent = getBotResponse(text)
      const botMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: botReplyContent,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 850)
  }

  return (
    <div className="mx-auto flex h-dvh max-w-5xl flex-col bg-background p-4 md:p-6">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/10">
            <Bot className="size-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Zaid AI Assistant</h1>
            <p className="text-xs text-muted-foreground">Personal Tutor for Basic Quran Learning</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500 md:flex">
          <Sparkles className="size-3.5" />
          Always Online
        </div>
      </header>

      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto rounded-xl border border-border bg-card/50 p-4 md:p-6 shadow-inner">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex size-8 shrink-0 select-none items-center justify-center rounded-full text-xs font-semibold shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {msg.role === 'user' ? (
                  <User className="size-4" aria-hidden="true" />
                ) : (
                  <Bot className="size-4" aria-hidden="true" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : 'bg-muted text-foreground rounded-tl-none border border-border/60'
                }`}
              >
                {/* Standard markdown formatting wrapper */}
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {msg.content.split('\n').map((para, i) => {
                    if (para.startsWith('### ')) {
                      return <h3 key={i} className="text-sm font-bold mt-2 mb-1">{para.replace('### ', '')}</h3>
                    }
                    if (para.startsWith('- ') || para.startsWith('* ')) {
                      return <li key={i} className="ml-4 list-disc">{para.substring(2)}</li>
                    }
                    if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ') || para.startsWith('4. ')) {
                      return <li key={i} className="ml-4 list-decimal">{para.substring(3)}</li>
                    }
                    return <p key={i} className="mb-2 last:mb-0">{para}</p>
                  })}
                </div>
                <span
                  className={`mt-1.5 block text-[9px] ${
                    msg.role === 'user' ? 'text-primary-foreground/75' : 'text-muted-foreground'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 mr-auto max-w-[85%]">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs shadow-sm">
                <Bot className="size-4" />
              </div>
              <div className="rounded-2xl rounded-tl-none bg-muted px-4 py-3 border border-border/60 shadow-sm">
                <div className="flex items-center gap-1 py-1">
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0.2s]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="mt-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <HelpCircle className="size-3.5" />
            Suggested questions:
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((sq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(sq.q)}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground/80 hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              >
                <MessageSquare className="size-3 text-primary" />
                {sq.label}
                <ArrowRight className="size-2.5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSendMessage(input)
        }}
        className="mt-4 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Zaid about letters, Tajweed rules..."
          className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none shadow-sm"
        />
        <button
          type="submit"
          className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/10 transition-opacity hover:opacity-90 cursor-pointer"
          aria-label="Send message"
        >
          <Send className="size-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
