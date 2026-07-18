'use client'

import { useEffect, useState } from 'react'
import {
  Heart,
  Landmark,
  BookOpen,
  HandHeart,
  Moon,
  Brain,
  HelpingHand,
} from 'lucide-react'

const HABITS = [
  { id: 'fajr', label: 'Fajr in Congregation', icon: Landmark },
  { id: 'tilawah', label: 'Daily Quran Reading', icon: BookOpen },
  { id: 'dua', label: 'Duas & Adhkar', icon: HelpingHand },
  { id: 'charity', label: 'Charity / Kindness', icon: HandHeart },
  { id: 'sleep', label: 'Early Sleep', icon: Moon },
  { id: 'reflection', label: 'Self Reflection', icon: Brain },
]

export default function NafsTrackerPage() {
  const [done, setDone] = useState<Record<string, boolean>>({})
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem('tilawa-nafs') || '{}'))
      setNote(localStorage.getItem('tilawa-nafs-note') || '')
    } catch {
      // ignore malformed storage
    }
  }, [])

  function toggle(id: string) {
    const next = { ...done, [id]: !done[id] }
    setDone(next)
    localStorage.setItem('tilawa-nafs', JSON.stringify(next))
  }

  function saveNote() {
    localStorage.setItem('tilawa-nafs-note', note)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const completed = Object.values(done).filter(Boolean).length

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Spiritual Journey
        </p>
        <h1 className="mt-1 text-3xl font-bold text-balance md:text-4xl">Nafs Tracker</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Monitor your spiritual practices and build consistent Islamic habits. Saved privately on
          your device.
        </p>

        {/* Today's habits */}
        <section className="mt-8 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold">Today&apos;s Habits</h2>
            <span className="text-xs text-muted-foreground">
              {completed} of {HABITS.length} completed
            </span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(completed / HABITS.length) * 100}%` }}
            />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {HABITS.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => toggle(h.id)}
                aria-pressed={done[h.id] || false}
                className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                  done[h.id]
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-background hover:bg-muted'
                }`}
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                    done[h.id] ? 'bg-primary/20' : 'bg-muted'
                  }`}
                >
                  <h.icon
                    className={`size-4 ${done[h.id] ? 'text-primary' : 'text-muted-foreground'}`}
                    aria-hidden="true"
                  />
                </span>
                <span className="text-sm font-medium">{h.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Reflection */}
        <section className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Heart className="size-4 text-primary" aria-hidden="true" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
              Daily Muhasabah (Self-Accountability)
            </h2>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Today's thoughts, struggles, and gratitude... (Stored privately on your device)"
            rows={4}
            className="mt-4 w-full resize-y rounded-lg border border-border bg-background p-4 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={saveNote}
              className="rounded-lg border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              {saved ? 'Saved!' : 'Save Reflection'}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
