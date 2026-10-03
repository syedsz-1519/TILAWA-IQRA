import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-background">
      <div className="mb-4 text-6xl">📖</div>
      <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="max-w-md text-sm text-muted-foreground mb-6">
        The page or Surah resource you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  )
}
