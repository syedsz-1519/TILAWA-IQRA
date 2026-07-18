'use client'

import { BookOpen, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navItems, settingsItem } from '@/lib/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="size-4" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">TILAWA</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 text-sm lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === '/#listen' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground',
                  active ? 'font-medium text-foreground' : 'text-muted-foreground',
                )}
              >
                {item.title}
              </Link>
            )
          })}
          <Link
            href={settingsItem.href}
            className={cn(
              'rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground',
              pathname.startsWith('/settings')
                ? 'font-medium text-foreground'
                : 'text-muted-foreground',
            )}
          >
            {settingsItem.title}
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background lg:hidden"
        >
          <ul className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            {[...navItems, settingsItem].map((item) => {
              const Icon = item.icon
              const active =
                item.href === '/#listen' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted',
                      active && 'bg-muted',
                    )}
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{item.title}</span>
                      <span className="text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
