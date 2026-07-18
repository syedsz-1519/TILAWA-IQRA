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
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-12 md:py-16">
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          <Icon className="size-3.5 text-primary" aria-hidden="true" />
          {eyebrow}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          {arabic && (
            <p lang="ar" dir="rtl" className="text-2xl leading-relaxed text-primary md:text-3xl">
              {arabic}
            </p>
          )}
        </div>
        <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </section>
  )
}
