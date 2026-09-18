'use client'

import { useEffect, useState } from 'react'

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Ensure we're on the client before accessing browser APIs
    if (typeof window === 'undefined') return

    // Set initial theme from localStorage or default to light
    const theme = localStorage.getItem('theme') || 'light'
    const isDark = theme === 'dark'

    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Listen for system theme changes (only if theme is set to system)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      const currentTheme = localStorage.getItem('theme') || 'light'
      if (currentTheme === 'system') {
        if (e.matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    setMounted(true)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // During SSR and before mount, return children as-is (no DOM modifications)
  if (!mounted) return <>{children}</>

  return <>{children}</>
}
