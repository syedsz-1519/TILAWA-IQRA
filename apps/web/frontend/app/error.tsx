'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled App Error:', error)
  }, [error])

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center bg-background page-bottom-safe">
      <div className="text-6xl" aria-hidden="true">⚠️</div>
      <div>
        <h2 className="text-fluid-xl font-bold text-foreground">Something went wrong</h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          An error occurred. Please try again or return home.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => reset()}
          className="tap-target rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 press-effect"
        >
          Try Again
        </button>
        <a
          href="/"
          className="tap-target rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted press-effect"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
