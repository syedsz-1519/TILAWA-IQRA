'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  BookOpenText,
  Grid2x2,
  Headphones,
  Heart,
  Home,
  Lightbulb,
  Menu,
  X,
} from 'lucide-react'
import { navGroups, settingsItem } from '@/lib/navigation'

// ---------------------------------------------------------------------------
// Mobile bottom-nav tabs — icon only with label underneath
// ---------------------------------------------------------------------------
const BOTTOM_TABS = [
  { label: 'Home',   href: '/',           icon: Home        },
  { label: 'Listen', href: '/listen',     icon: Headphones  },
  { label: 'Read',   href: '/read',       icon: BookOpenText },
  { label: 'Dua',    href: '/dua-library', icon: Heart      },
  // "More" tab handled separately — opens the drawer
] as const

// Compute active state safely (only on client)
function useActivePathCheck() {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const isActive = (href: string): boolean => {
    if (!isClient || !pathname) return false
    return pathname === href || (href !== '/' && pathname.startsWith(href + '/'))
  }

  return { isClient, isActive }
}

// ---------------------------------------------------------------------------
// Sidebar (used both on desktop and inside the mobile drawer)
// ---------------------------------------------------------------------------
function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { isClient, isActive } = useActivePathCheck()

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="border-b border-border px-5 py-5">
        <Link href="/" onClick={onNavigate} className="flex items-center gap-3">
          <Image
            src="/images/tilawa-logo.jpeg"
            alt="TILAWA logo"
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-lg object-cover"
          />
          <span className="min-w-0">
            <span className="block font-serif text-xl font-bold tracking-[0.2em] text-primary">
              TILAWA
            </span>
            <span className="mt-0.5 block text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              From Iqra to Tilawa
            </span>
          </span>
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {group.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-[44px] items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                        active
                          ? 'border border-primary/40 bg-primary/10 font-medium text-primary'
                          : 'border border-transparent text-foreground/80 hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <item.icon className="size-4 shrink-0" aria-hidden="true" />
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Settings */}
      <div className="border-t border-border p-3">
        <Link
          href={settingsItem.href}
          onClick={onNavigate}
          className={`flex min-h-[44px] items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
            isActive(settingsItem.href)
              ? 'border-primary/40 bg-primary/10 font-medium text-primary'
              : 'border-border text-foreground/80 hover:bg-muted hover:text-foreground'
          }`}
        >
          <settingsItem.icon className="size-4" aria-hidden="true" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// AppShell
// ---------------------------------------------------------------------------
export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  // Set client flag and close drawer on navigation
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-dvh">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-border bg-card lg:block">
        <SidebarContent />
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile top bar — logo + hamburger                                   */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:hidden"
        style={{
          height: 'calc(var(--header-h) + env(safe-area-inset-top, 0px))',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/tilawa-logo.jpeg"
            alt="TILAWA logo"
            width={32}
            height={32}
            className="size-8 rounded-md object-cover"
          />
          <span className="font-serif text-lg font-bold tracking-[0.2em] text-primary">TILAWA</span>
        </Link>

        <button
          type="button"
          onClick={() => setDrawerOpen((v) => !v)}
          aria-expanded={drawerOpen}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          className="tap-target rounded-md border border-border text-foreground transition-colors hover:bg-muted press-effect"
        >
          {drawerOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile full drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setDrawerOpen(false)}
          />
          <div
            className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-border bg-card shadow-xl"
            style={{ paddingTop: 'calc(var(--header-h) + env(safe-area-inset-top, 0px))' }}
          >
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/*
        Main content area:
        - Mobile: top padding = header height + safe-area-inset-top
        - Mobile: bottom padding managed by page-bottom-safe utility class on each page
        - Desktop: no extra padding needed (sidebar handles layout)
      */}
      <main
        className="min-w-0 flex-1 lg:pt-0"
        style={{
          paddingTop: 'calc(var(--header-h) + env(safe-area-inset-top, 0px))',
        }}
      >
        {children}
      </main>

      {/* ================================================================== */}
      {/* Mobile bottom navigation bar                                        */}
      {/* ================================================================== */}
      <nav
        aria-label="Quick navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/97 backdrop-blur lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <ul className="flex items-stretch" style={{ height: 'var(--bottom-nav-h)' }}>
          {/* Regular tabs */}
          {BOTTOM_TABS.map((tab) => {
            const Icon = tab.icon
            const pathname_val = isClient ? pathname : null
            const active = pathname_val && (
              pathname_val === tab.href || (tab.href !== '/' && pathname_val.startsWith(tab.href + '/'))
            )
            return (
              <li key={tab.href} className="flex flex-1">
                <Link
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors press-effect ${
                    active
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {/* Active pill background */}
                  {active && (
                    <span
                      className="absolute inset-x-2 top-1 h-1 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  )}
                  <Icon
                    className={`size-5 transition-transform ${active ? 'scale-110' : ''}`}
                    aria-hidden="true"
                    strokeWidth={active ? 2.5 : 1.75}
                  />
                  {tab.label}
                </Link>
              </li>
            )
          })}

          {/* "More" tab */}
          <li className="flex flex-1">
            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label="Open full navigation menu"
              className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors press-effect ${
                drawerOpen ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {drawerOpen && (
                <span
                  className="absolute inset-x-2 top-1 h-1 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
              <Grid2x2
                className={`size-5 transition-transform ${drawerOpen ? 'scale-110' : ''}`}
                aria-hidden="true"
                strokeWidth={drawerOpen ? 2.5 : 1.75}
              />
              More
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
