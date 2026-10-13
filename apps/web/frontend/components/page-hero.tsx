import type { LucideIcon } from 'lucide-react'

export function PageHero({
  icon: Icon,
  eyebrow,
  title,
  arabic,
  description,
}: {
  icon: LucideIcon
  eyebrow: string
  title: string
  arabic?: string
  description: string
}) {
  return (
    <section className="border-b border-border bg-card">
      <div className="page-hero-inner flex flex-col items-start gap-4">
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          <Icon className="size-3.5 text-primary" aria-hidden="true" />
          {eyebrow}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-balance text-fluid-2xl font-semibold tracking-tight">
            {title}
          </h1>
          {arabic && (
            <p lang="ar" dir="rtl" className="text-fluid-xl leading-relaxed text-primary">
              {arabic}
            </p>
          )}
        </div>
        <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </section>
  )
}
