export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center bg-background page-bottom-safe">
      <div className="text-7xl" aria-hidden="true">📖</div>
      <div>
        <h1 className="text-fluid-2xl font-bold text-foreground">Page Not Found</h1>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          This page doesn&apos;t exist — but your journey through the Quran does.
        </p>
      </div>
      <a
        href="/"
        className="tap-target rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 press-effect"
      >
        Return Home
      </a>
    </div>
  )
}
