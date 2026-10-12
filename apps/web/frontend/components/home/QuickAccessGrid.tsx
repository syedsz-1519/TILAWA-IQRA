'use client'

import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────────────────
   QuickAccessGrid — 4-tile grid using design tokens.

   IMPORTANT: All colour classes are static strings, NOT dynamic interpolations.
   Dynamic Tailwind class names (e.g. `bg-${color}`) are never generated at
   build time and result in invisible backgrounds. Use the staticCardStyle map.
───────────────────────────────────────────────────────────────────────────── */

interface Tile {
  title: string
  description: string
  href: string
  /** Static SVG icon path — original to TILAWA, not copied from any other app */
  icon: React.ReactNode
  /** Static Tailwind classes — must be complete literal strings */
  cardClass: string
  iconClass: string
}

/* Original SVG icons authored for TILAWA's design language.
   These are simple geometric forms inspired by classical Islamic geometry
   (star polygons, crescent, compass rose, prayer arch) — not copied icons. */

function IconReadQuran() {
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28" fill="none"
      aria-hidden="true" focusable="false"
    >
      {/* Open book with a centre spine */}
      <path
        d="M4 7C4 6.448 4.448 6 5 6H11C12.657 6 14 7.343 14 9V22C14 22 12 21 10 21H5C4.448 21 4 20.552 4 20V7Z"
        fill="currentColor" opacity="0.25"
      />
      <path
        d="M24 7C24 6.448 23.552 6 23 6H17C15.343 6 14 7.343 14 9V22C14 22 16 21 18 21H23C23.552 21 24 20.552 24 20V7Z"
        fill="currentColor" opacity="0.25"
      />
      <line x1="14" y1="9" x2="14" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Text lines on left page */}
      <line x1="6.5"  y1="11" x2="11.5" y2="11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <line x1="6.5"  y1="14" x2="11.5" y2="14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <line x1="6.5"  y1="17" x2="10"   y2="17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      {/* Text lines on right page */}
      <line x1="16.5" y1="11" x2="21.5" y2="11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <line x1="16.5" y1="14" x2="21.5" y2="14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <line x1="16.5" y1="17" x2="20"   y2="17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  )
}

function IconTajweed() {
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28" fill="none"
      aria-hidden="true" focusable="false"
    >
      {/* Sound wave with Arabic hamza above — represents proper recitation */}
      <circle cx="14" cy="15" r="2.5" fill="currentColor"/>
      <path d="M9 15 C9 11.5 19 11.5 19 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M6 15 C6 8.5 22 8.5 22 15"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.55"/>
      {/* Hamzah-inspired diacritic above */}
      <path d="M12.5 7.5 C12.5 6 13 5.5 14 5.5 C15 5.5 15.5 6 15.5 7.5 C15.5 8.5 14.8 9 14 9 C13.2 9 12.5 8.5 12.5 7.5Z"
        stroke="currentColor" strokeWidth="1.25" fill="none" opacity="0.8"/>
    </svg>
  )
}

function IconDuaAdhkar() {
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28" fill="none"
      aria-hidden="true" focusable="false"
    >
      {/* Raised hands (dua gesture) — simplified, respectful geometry */}
      <path
        d="M8 20 L8 12 C8 11.448 8.448 11 9 11 C9.552 11 10 11.448 10 12 L10 16"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path
        d="M10 14 C10 13.448 10.448 13 11 13 C11.552 13 12 13.448 12 14 L12 16"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path
        d="M12 14.5 C12 13.948 12.448 13.5 13 13.5 C13.552 13.5 14 13.948 14 14.5 L14 16"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path
        d="M8 20 C8 22 10 24 14 24 C18 24 20 22 20 20 L20 16 C20 15.448 19.552 15 19 15 C18.448 15 18 15.448 18 16 L18 14.5 C18 13.948 17.552 13.5 17 13.5 C16.448 13.5 16 13.948 16 14.5 L16 14 C16 13.448 15.552 13 15 13 C14.448 13 14 13.448 14 14 L14 16"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Light rays above — spiritual aspiration */}
      <line x1="14" y1="4" x2="14" y2="7"   stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.6"/>
      <line x1="10" y1="5" x2="11" y2="7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.4"/>
      <line x1="18" y1="5" x2="17" y2="7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.4"/>
    </svg>
  )
}

function IconQibla() {
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28" fill="none"
      aria-hidden="true" focusable="false"
    >
      {/* Compass rose — kaaba at centre, cardinal directions */}
      <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
      {/* Needle pointing north-east (Mecca direction is variable — generic) */}
      <path d="M14 14 L17.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 14 L10.5 20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
      {/* Centre dot */}
      <circle cx="14" cy="14" r="2" fill="currentColor"/>
      {/* Cardinal tick marks */}
      <line x1="14" y1="5"  x2="14" y2="7"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="21" x2="14" y2="23"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="5"  y1="14" x2="7"  y2="14"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="21" y1="14" x2="23" y2="14"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )
}

const TILES: Tile[] = [
  {
    title: 'Read Quran',
    description: 'Uthmani script, distraction-free',
    href: '/read',
    icon: <IconReadQuran />,
    /* Static classes — complete literal strings for Tailwind JIT */
    cardClass:
      'bg-sky-50 hover:bg-sky-100 border-sky-200/60 dark:bg-sky-950/30 dark:hover:bg-sky-900/40 dark:border-sky-800/40',
    iconClass: 'text-sky-600 dark:text-sky-400',
  },
  {
    title: 'Tajweed',
    description: 'Learn recitation rules',
    href: '/tajweed',
    icon: <IconTajweed />,
    cardClass:
      'bg-violet-50 hover:bg-violet-100 border-violet-200/60 dark:bg-violet-950/30 dark:hover:bg-violet-900/40 dark:border-violet-800/40',
    iconClass: 'text-violet-600 dark:text-violet-400',
  },
  {
    title: 'Dua & Adhkar',
    description: 'Daily supplications',
    href: '/dua-library',
    icon: <IconDuaAdhkar />,
    cardClass:
      'bg-rose-50 hover:bg-rose-100 border-rose-200/60 dark:bg-rose-950/30 dark:hover:bg-rose-900/40 dark:border-rose-800/40',
    iconClass: 'text-rose-600 dark:text-rose-400',
  },
  {
    title: 'Qibla',
    description: 'Prayer direction finder',
    href: '/qibla',
    icon: <IconQibla />,
    cardClass:
      'bg-emerald-50 hover:bg-emerald-100 border-emerald-200/60 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40 dark:border-emerald-800/40',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
  },
]

export function QuickAccessGrid() {
  return (
    /* 2-col grid at all widths — 4 cols at lg+ */
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {TILES.map((tile) => (
        <Link
          key={tile.href}
          href={tile.href}
          className={`
            group flex flex-col items-start justify-between gap-5
            rounded-2xl border p-4 sm:p-5
            transition-all duration-200
            press
            ${tile.cardClass}
          `}
        >
          {/* Title + description */}
          <div>
            <h3 className="text-fluid-sm font-semibold text-foreground leading-snug">
              {tile.title}
            </h3>
            <p className="mt-0.5 text-fluid-xs text-muted-foreground leading-snug">
              {tile.description}
            </p>
          </div>

          {/* Icon — bottom-right, scales on hover */}
          <div
            className={`
              transition-transform duration-200
              group-hover:scale-110 group-hover:rotate-3
              ${tile.iconClass}
            `}
          >
            {tile.icon}
          </div>
        </Link>
      ))}
    </div>
  )
}
