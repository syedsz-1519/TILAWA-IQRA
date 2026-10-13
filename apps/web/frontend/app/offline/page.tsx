import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "You're Offline — TILAWA",
}

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6 text-center bg-background page-bottom-safe">
      {/* Arabic opener */}
      <p
        lang="ar"
        dir="rtl"
        className="text-4xl font-serif text-primary opacity-60"
        aria-hidden="true"
      >
        بِسْمِ اللَّهِ
      </p>

      {/* Wifi-off icon */}
      <div className="flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
          <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <circle cx="12" cy="20" r="1" fill="currentColor" />
        </svg>
      </div>

      <div>
        <h1 className="text-fluid-xl font-bold text-foreground">You&apos;re offline</h1>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
          Connect to the internet to access all of TILAWA. Previously visited
          Quran pages and cached API data are available.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/read"
          className="tap-target rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 press-effect"
        >
          Cached Surahs
        </Link>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="tap-target rounded-xl border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted press-effect"
        >
          Try Again
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        Tip: visit surahs while online to cache them for offline reading.
      </p>
    </div>
  )
}
