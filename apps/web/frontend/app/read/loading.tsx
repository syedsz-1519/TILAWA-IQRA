export default function ReadLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-pulse space-y-6">
      <div className="h-10 w-48 bg-muted rounded-md" />
      <div className="h-16 w-full bg-muted/60 rounded-lg" />
      <div className="space-y-4 pt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-6 border border-border rounded-xl space-y-3">
            <div className="h-6 w-3/4 bg-muted rounded ms-auto" />
            <div className="h-4 w-1/2 bg-muted/70 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
