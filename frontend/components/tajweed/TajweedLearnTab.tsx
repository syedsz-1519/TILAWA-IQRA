'use client'

import { tajweedRules } from '@/data/tajweed-rules'

export function TajweedLearnTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Understanding Tajweed Rules
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Tajweed is the art of reciting the Quran with proper pronunciation and application of its rules. 
          Learning these rules helps us recite the Quran as the Prophet Muhammad (ﷺ) taught it, and understanding 
          the precise meanings of the words. There are several main categories of Tajweed rules:
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {tajweedRules.map((rule) => (
          <div
            key={rule.id}
            className="rounded-xl border-2 border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
          >
            {/* Header with color swatch */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">{rule.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{rule.arabicName}</p>
              </div>
              <div
                className="size-12 rounded-lg border-2 border-border"
                style={{ backgroundColor: rule.color }}
              />
            </div>

            {/* Description */}
            <p className="mb-4 leading-relaxed text-foreground">
              {rule.description}
            </p>

            {/* Examples */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Examples
              </p>
              <div className="space-y-2">
                {rule.examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-border/30 bg-muted/30 p-3"
                  >
                    <p
                      lang="ar"
                      dir="rtl"
                      className="text-lg font-serif text-foreground"
                    >
                      {example.arabic}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {example.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Rule */}
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Application
              </p>
              <p className="text-sm text-foreground">{rule.application}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-bold text-foreground">Tips for Learning Tajweed</h3>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="mt-1 flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
              1
            </span>
            <span className="text-sm text-foreground">
              Listen to professional reciters (huffaz) to hear correct pronunciation
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
              2
            </span>
            <span className="text-sm text-foreground">
              Practice regularly with a Tajweed teacher or using quality learning resources
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
              3
            </span>
            <span className="text-sm text-foreground">
              Memorize the rules and apply them consciously during recitation
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
              4
            </span>
            <span className="text-sm text-foreground">
              Be patient—perfecting Tajweed takes time and consistent practice
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
