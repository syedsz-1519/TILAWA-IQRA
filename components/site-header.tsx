import { BookOpen } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="size-4" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">TILAWA</span>
        </a>
        <nav aria-label="Main navigation" className="flex items-center gap-1 text-sm">
          <a
            href="/#listen"
            className="rounded-md px-3 py-2 font-medium text-foreground transition-colors hover:bg-muted"
          >
            Listen
          </a>
          <a
            href="/iqra"
            className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Iqra Mode
          </a>
          <a
            href="/#features"
            className="hidden rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:block"
          >
            Features
          </a>
          <a
            href="/#listen"
            className="ms-2 hidden rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:block"
          >
            Start Listening
          </a>
        </nav>
      </div>
    </header>
  )
}
