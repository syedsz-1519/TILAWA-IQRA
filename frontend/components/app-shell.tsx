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
  Languages,
  Lightbulb,
  Menu,
  X,
} from 'lucide-react'
import { navGroups, settingsItem } from '@/lib/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { QURAN_LANGUAGES, DEFAULT_LANGUAGE } from '@/lib/quran-languages'
import { KEYS, EVENTS } from '@/lib/prefs'

// ---------------------------------------------------------------------------
// Mobile bottom-nav tabs — icon only with label underneath
// ---------------------------------------------------------------------------
const BOTTOM_TABS = [
  { label: 'Home',   href: '/',           icon: Home        },
  { label: 'Listen', href: '/listen',     icon: Headphones  },
  { label: 'Read',   href: '/read',       icon: BookOpenText },
  { label: 'Dua',    href: '/hadith-dua', icon: Lightbulb   },
  // "More" tab handled separately — opens the drawer
] as const

// ---------------------------------------------------------------------------
// Sidebar (used both on desktop and inside the mobile drawer)
// ---------------------------------------------------------------------------
function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const [langCode, setLangCode] = useState(DEFAULT_LANGUAGE)

  useEffect(() => {
    const loadLang = () => {
      const saved = window.localStorage.getItem(KEYS.LANG)
      if (saved && QURAN_LANGUAGES.some((l) => l.code === saved)) setLangCode(saved)
    }
    loadLang()
    window.addEventListener('storage', loadLang)
    window.addEventListener(EVENTS.LANG_CHANGED, loadLang)
    return () => {
      window.removeEventListener('storage', loadLang)
      window.removeEventListener(EVENTS.LANG_CHANGED, loadLang)
    }
  }, [])

  const changeLanguage = (code: string) => {
    setLangCode(code)
    window.localStorage.setItem(KEYS.LANG, code)
    window.dispatchEvent(new CustomEvent(EVENTS.LANG_CHANGED))
  }

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
                const active =
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'))
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${
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

      {/* Language selector */}
      <div className="border-t border-border p-3 pb-0">
        <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground/80">
          <span className="flex items-center gap-3 text-muted-foreground">
            <Languages className="size-4 shrink-0" aria-hidden="true" />
            Language
          </span>
          <select
            value={langCode}
            onChange={(e) => changeLanguage(e.target.value)}
            className="cursor-pointer bg-transparent pr-1 text-xs font-semibold text-foreground focus:outline-none"
            aria-label="Select Quran translation language"
          >
            {QURAN_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} className="bg-card text-foreground">
                {l.label === l.nativeLabel ? l.label : `${l.label} — ${l.nativeLabel}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Settings + theme toggle */}
      <div className="border-t border-border p-3">
        <Link
          href={settingsItem.href}
          onClick={onNavigate}
          className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors ${
            pathname === settingsItem.href
              ? 'border-primary/40 bg-primary/10 font-medium text-primary'
              : 'border-border text-foreground/80 hover:bg-muted hover:text-foreground'
          }`}
        >
          <span className="flex items-center gap-3">
            <settingsItem.icon className="size-4" aria-hidden="true" />
            Settings
          </span>
          <ThemeToggle />
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
  const pathname = usePathname()

  // Close drawer on navigation
  useEffect(() => { setDrawerOpen(false) }, [pathname])

  return (
    <div className="flex min-h-dvh">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-border bg-card lg:block">
        <SidebarContent />
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile top bar — logo only + hamburger (no lang picker)             */}
      {/* ------------------------------------------------------------------ */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:hidden">
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

        {/* Hamburger — only for the full drawer (all sections) */}
        <button
          type="button"
          onClick={() => setDrawerOpen((v) => !v)}
          aria-expanded={drawerOpen}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          className="flex size-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted"
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
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-border bg-card pt-14 shadow-xl">
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content — extra bottom padding on mobile for top bar + bottom nav + player bar */}
      <main className="min-w-0 flex-1 pt-14 pb-28 lg:pb-0 lg:pt-0">{children}</main>

      {/* ================================================================== */}
      {/* Mobile bottom navigation bar                                        */}
      {/* ================================================================== */}
      <nav
        aria-label="Quick navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <ul className="flex items-stretch">
          {/* Regular tabs */}
          {BOTTOM_TABS.map((tab) => {
            const Icon = tab.icon
            const active =
              pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href + '/'))
            return (
              <li key={tab.href} className="flex flex-1">
                <Link
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
                    active
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon
                    className={`size-5 transition-transform ${active ? 'scale-110' : ''}`}
                    aria-hidden="true"
                    strokeWidth={active ? 2.5 : 1.75}
                  />
                  {tab.label}
                  {/* Active dot indicator */}
                  {active && (
                    <span className="mt-0.5 h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
                  )}
                </Link>
              </li>
            )
          })}

          {/* "More" tab — opens the full drawer */}
          <li className="flex flex-1">
            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label="Open full navigation menu"
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
                drawerOpen ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid2x2
                className={`size-5 transition-transform ${drawerOpen ? 'scale-110' : ''}`}
                aria-hidden="true"
                strokeWidth={drawerOpen ? 2.5 : 1.75}
              />
              More
              {drawerOpen && (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
