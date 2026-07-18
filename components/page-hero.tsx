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
    <section className="relative overflow-hidden border-b border-border bg-card bg-islamic-pattern">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/4 size-96 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, oklch(0.78 0.13 165 / 50%) 0%, transparent 70%)',
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-14 md:py-20">
        {/* Eyebrow badge */}
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary animate-fade-in">
          <Icon className="size-3.5" aria-hidden="true" />
          {eyebrow}
        </div>

        {/* Title block */}
        <div className="flex flex-col gap-3 animate-fade-in-up animation-delay-100">
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {arabic && (
            <p
              lang="ar"
              dir="rtl"
              className="text-2xl leading-relaxed text-primary md:text-3xl animate-float"
            >
              {arabic}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground animate-fade-in-up animation-delay-200">
          {description}
        </p>
      </div>
    </section>
  )
}
