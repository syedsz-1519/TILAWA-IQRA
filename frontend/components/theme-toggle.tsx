'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = (localStorage.getItem('theme') || 'system') as 'light' | 'dark' | 'system'
    setThemeState(savedTheme)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)

    // Update document class immediately
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex size-9 items-center justify-center rounded-md text-muted-foreground"
        disabled
      >
        <Moon className="size-4" aria-hidden="true" />
      </button>
    )
  }

  const isDark = theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  )
}
