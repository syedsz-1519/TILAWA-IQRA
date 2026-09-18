'use client'

import { useEffect, useState } from 'react'

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set initial theme from localStorage or system preference
    const theme = localStorage.getItem('theme') || 'system'
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      const currentTheme = localStorage.getItem('theme') || 'system'
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

  if (!mounted) return <>{children}</>

  return <>{children}</>
}
