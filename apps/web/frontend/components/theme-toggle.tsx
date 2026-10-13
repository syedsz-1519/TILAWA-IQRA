'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme, type Theme } from './theme-provider'

const OPTIONS: { value: Theme; label: string; icon: string }[] = [
  { value: 'light',  label: 'Light',  icon: '☀️' },
  { value: 'dark',   label: 'Dark',   icon: '🌙' },
  { value: 'system', label: 'System', icon: '💻' },
]

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const currentIcon = resolvedTheme === 'dark' ? '🌙' : '☀️'

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Theme: ${theme}. Click to change.`}
        className="
          tap-target flex items-center gap-1.5 rounded-xl border border-border
          bg-card px-3 text-sm font-medium text-foreground
          transition-colors hover:border-primary/40 hover:bg-muted press-effect
        "
      >
        <span aria-hidden="true">{currentIcon}</span>
        <span className="hidden sm:inline capitalize">{theme}</span>
        {/* Chevron */}
        <svg
          className={`size-3 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12" fill="none" aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="
            absolute right-0 top-full z-50 mt-1.5 w-36
            rounded-xl border border-border bg-card p-1
            shadow-[var(--shadow-card-hover)]
            animate-in-fade
          "
          role="menu"
          aria-label="Theme options"
        >
          {OPTIONS.map((opt) => {
            const isActive = theme === opt.value
            return (
              <button
                key={opt.value}
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => { setTheme(opt.value); setOpen(false) }}
                className={`
                  flex w-full items-center gap-2.5 rounded-lg px-3 py-2
                  text-sm transition-colors press-effect
                  ${isActive
                    ? 'bg-primary/10 font-semibold text-primary'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <span aria-hidden="true">{opt.icon}</span>
                {opt.label}
                {isActive && (
                  <svg className="ml-auto size-3.5 text-primary" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                    <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
