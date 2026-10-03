'use client'

import { createContext, useContext, useEffect, type ReactNode } from 'react'

export type Theme = 'light'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  isDark: false,
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Ensure dark mode class is completely removed and theme is set to light
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    localStorage.setItem('theme', 'light')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'light', setTheme: () => {}, isDark: false }}>
      {children}
    </ThemeContext.Provider>
  )
}
