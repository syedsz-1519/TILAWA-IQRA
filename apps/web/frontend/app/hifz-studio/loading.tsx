export default function HifzStudioLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 animate-pulse space-y-6">
      <div className="h-10 w-64 bg-muted rounded-md" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-20 bg-muted/70 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-44 bg-card border border-border rounded-xl" />
        ))}
      </div>
    </div>
  )
}
