'use client'

import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────────────────
 * TILAWA Quick-Access tiles
 *
 * Original SVG icons — hand-authored, not copied from any existing app.
 * Tile gradient backgrounds use CSS custom properties (static, no JIT bugs).
 * ───────────────────────────────────────────────────────────────────────────── */

function IconQuran() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {/* Open book shape */}
      <path d="M14 6 C14 6 9 4 4 5 L4 22 C9 21 14 23 14 23 C14 23 19 21 24 22 L24 5 C19 4 14 6 14 6Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <line x1="14" y1="6" x2="14" y2="23" stroke="currentColor" strokeWidth="1.5" />
      {/* Lines of text */}
      <line x1="7" y1="10" x2="12" y2="9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="7" y1="13" x2="12" y2="12.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="7" y1="16" x2="12" y2="15.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="16" y1="9.5" x2="21" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="16" y1="12.5" x2="21" y2="13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="16" y1="15.5" x2="21" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function IconTajweed() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {/* Sound wave bars */}
      <rect x="3"  y="16" width="3" height="8"  rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="8"  y="11" width="3" height="13" rx="1.5" fill="currentColor" opacity="0.75" />
      <rect x="13" y="6"  width="3" height="18" rx="1.5" fill="currentColor" />
      <rect x="18" y="11" width="3" height="13" rx="1.5" fill="currentColor" opacity="0.75" />
      <rect x="23" y="16" width="3" height="8"  rx="1.5" fill="currentColor" opacity="0.6" />
      {/* Curved line above — tajweed elongation mark */}
      <path d="M8 8 Q14 4 20 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function IconDua() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {/* Two cupped hands */}
      <path d="M6 18 C6 14 8 11 10 10 L10 8 C10 7 11 6 12 7 L12 12"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 18 C22 14 20 11 18 10 L18 8 C18 7 17 6 16 7 L16 12"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 18 Q6 22 14 22 Q22 22 22 18"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Light rays (blessing) */}
      <line x1="14" y1="3" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="4" x2="11.5" y2="6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="18" y1="4" x2="16.5" y2="6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconQibla() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {/* Compass circle */}
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
      {/* Compass needle — North (red tip = qibla direction) */}
      <polygon points="14,5 16,14 14,13 12,14" fill="currentColor" />
      <polygon points="14,23 12,14 14,15 16,14" fill="currentColor" opacity="0.35" />
      {/* Centre dot */}
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      {/* Tick marks */}
      <line x1="14" y1="4"  x2="14" y2="7"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14" y1="21" x2="14" y2="24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="4"  y1="14" x2="7"  y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="21" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

const TILES = [
  {
    title: 'Read Quran',
    description: 'Arabic + 15 translations',
    Icon: IconQuran,
    href: '/read',
    tileClass: 'tile-quran',
    iconColorClass: 'text-primary',
  },
  {
    title: 'Tajweed',
    description: 'Recitation rules & practice',
    Icon: IconTajweed,
    href: '/tajweed',
    tileClass: 'tile-tajweed',
    iconColorClass: 'text-purple-500 dark:text-purple-400',
  },
  {
    title: 'Dua & Adhkar',
    description: 'Daily supplications',
    Icon: IconDua,
    href: '/dua-library',
    tileClass: 'tile-dua',
    iconColorClass: 'text-accent',
  },
  {
    title: 'Qibla',
    description: 'Prayer direction finder',
    Icon: IconQibla,
    href: '/qibla',
    tileClass: 'tile-qibla',
    iconColorClass: 'text-teal-600 dark:text-teal-400',
  },
]

export function QuickAccessGrid() {
  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Quick Access
      </h2>
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {TILES.map(({ title, description, Icon, href, tileClass, iconColorClass }) => (
          <Link
            key={href}
            href={href}
            className={`group card-sacred press-effect flex flex-col justify-between gap-5 p-5 ${tileClass} border-transparent hover:border-primary/20`}
          >
            {/* Text */}
            <div>
              <p className="text-sm font-semibold leading-tight text-foreground">{title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{description}</p>
            </div>

            {/* Icon */}
            <div
              className={`${iconColorClass} transition-transform duration-[var(--duration-base)] group-hover:scale-110 group-hover:translate-x-0.5`}
            >
              <Icon />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
