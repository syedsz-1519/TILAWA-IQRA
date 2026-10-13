'use client'

import { useTheme } from './theme-provider'

interface ThemeToggleProps {
  /** Extra Tailwind classes */
  className?: string
  /** Whether to show a label beside the icon */
  showLabel?: boolean
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { isDark, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`
        tap-target relative flex items-center gap-2 rounded-xl border border-border
        bg-card text-sm font-medium text-foreground
        transition-all duration-[var(--duration-base)]
        hover:border-primary/40 hover:bg-muted press-effect
        ${className}
      `}
    >
      {/* Icon track — slides between sun and moon */}
      <span
        className="relative flex size-5 items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        {/* Sun */}
        <span
          className={`absolute transition-all duration-300 ${
            isDark ? 'translate-y-6 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <SunIcon />
        </span>
        {/* Moon */}
        <span
          className={`absolute transition-all duration-300 ${
            isDark ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
          }`}
        >
          <MoonIcon />
        </span>
      </span>

      {showLabel && (
        <span>{isDark ? 'Light' : 'Dark'}</span>
      )}
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="9" y1="1.5" x2="9" y2="3"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          transform={`rotate(${deg} 9 9)`}
        />
      ))}
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M14.5 9.5A6 6 0 0 1 8 3.5a6 6 0 1 0 6.5 6z"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}
