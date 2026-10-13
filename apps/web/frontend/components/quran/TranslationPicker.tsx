'use client'

/**
 * TranslationPicker
 *
 * A compact button that opens a grouped translation chooser.
 * - Desktop: a popover anchored to the button
 * - Mobile (< 768 px): a bottom sheet
 * - Languages are numbered 1, 2, 3...; editions numbered 1.1, 1.2...
 * - A language with one edition selects on first tap; multiple editions
 *   expand a collapsible sub-list.
 * - Badges: "Audio" (green) when real human audio exists; "Read only" when
 *   the edition does not appear in Listen.
 * - Search by language or translator name.
 * - Recently used (up to 3) floated to the top.
 * - "None / Arabic only" option always available.
 * - Selection persisted in localStorage and shared via a custom DOM event.
 * - Fully keyboard and screen-reader accessible.
 *
 * Props:
 *   mode — "read" (show all editions) | "listen" (hide readOnly editions)
 *   className — forwarded to the trigger button
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronRight, Headphones, Search, Type, X } from 'lucide-react'
import {
  DEFAULT_EDITION_ID,
  ENABLED_EDITIONS,
  LISTEN_EDITIONS,
  getEdition,
  getEditionsByLanguage,
  type TranslationEdition,
} from '@/lib/quran-languages'
import { KEYS, EVENTS } from '@/lib/prefs'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ARABIC_ONLY_ID = '__arabic_only__'
const RECENT_KEY = 'tilawa-recent-translations'
const MAX_RECENT = 3

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getRecentIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? '[]')
  } catch {
    return []
  }
}

function pushRecentId(id: string) {
  if (typeof window === 'undefined' || id === ARABIC_ONLY_ID) return
  const prev = getRecentIds().filter((x) => x !== id)
  const next = [id, ...prev].slice(0, MAX_RECENT)
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(next))
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface EditionRowProps {
  edition: TranslationEdition
  isActive: boolean
  index: string
  onSelect: (id: string) => void
}

function EditionRow({ edition, isActive, index, onSelect }: EditionRowProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isActive}
      onClick={() => onSelect(edition.id)}
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-start text-sm transition-colors',
        isActive
          ? 'bg-primary/10 font-medium text-primary'
          : 'text-foreground hover:bg-muted',
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="w-7 shrink-0 text-xs text-muted-foreground">{index}</span>
        <div className="min-w-0">
          <p className="truncate font-medium">{edition.label}</p>
          <p className="truncate text-xs text-muted-foreground">{edition.translator}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {edition.translationAudioFolder && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            <Headphones className="size-2.5" aria-hidden="true" />
            Audio
          </span>
        )}
        {edition.readOnly && (
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Read
          </span>
        )}
        {isActive && (
          <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
        )}
      </div>
    </button>
  )
}

interface LanguageGroupProps {
  langIndex: number
  langName: string
  langNative: string
  editions: TranslationEdition[]
  activeId: string
  onSelect: (id: string) => void
  isOpen: boolean
  onToggle: () => void
}

function LanguageGroup({
  langIndex,
  langName,
  langNative,
  editions,
  activeId,
  onSelect,
  isOpen,
  onToggle,
}: LanguageGroupProps) {
  const singleEdition = editions.length === 1
  const hasActive = editions.some((e) => e.id === activeId)

  if (singleEdition) {
    return (
      <div>
        <p className="mb-0.5 flex items-center gap-1 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>{langIndex}.</span>
          <span>{langName}</span>
          <span className="font-normal normal-case" dir={editions[0].direction}>
            {langNative}
          </span>
        </p>
        <EditionRow
          edition={editions[0]}
          isActive={editions[0].id === activeId}
          index={`${langIndex}.1`}
          onSelect={onSelect}
        />
      </div>
    )
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-start transition-colors hover:bg-muted',
          hasActive && !isOpen && 'bg-primary/5',
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">{langIndex}.</span>
          <span className="text-sm font-semibold text-foreground">{langName}</span>
          <span className="text-xs text-muted-foreground" dir={editions[0].direction}>
            {langNative}
          </span>
          {hasActive && !isOpen && (
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
          )}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">{editions.length} editions</span>
          {isOpen ? (
            <ChevronDown className="size-3.5" aria-hidden="true" />
          ) : (
            <ChevronRight className="size-3.5" aria-hidden="true" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="mt-0.5 ml-4 flex flex-col gap-0.5 border-l border-border pl-3">
          {editions.map((edition, ei) => (
            <EditionRow
              key={edition.id}
              edition={edition}
              isActive={edition.id === activeId}
              index={`${langIndex}.${ei + 1}`}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export interface TranslationPickerProps {
  mode?: 'read' | 'listen'
  className?: string
}

export function TranslationPicker({ mode = 'read', className }: TranslationPickerProps) {
  const [activeId, setActiveId] = useState(DEFAULT_EDITION_ID)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [openLangs, setOpenLangs] = useState<Set<string>>(new Set())
  const [recentIds, setRecentIds] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Sync with localStorage
  useEffect(() => {
    const load = () => {
      const saved = window.localStorage.getItem(KEYS.LANG)
      if (saved) setActiveId(saved)
      setRecentIds(getRecentIds())
    }
    load()
    window.addEventListener(EVENTS.LANG_CHANGED, load)
    return () => window.removeEventListener(EVENTS.LANG_CHANGED, load)
  }, [])

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Close on outside click (desktop popover)
  useEffect(() => {
    if (!open || isMobile) return
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, isMobile])

  // Focus search when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const select = useCallback((id: string) => {
    const value = id === ARABIC_ONLY_ID ? ARABIC_ONLY_ID : id
    setActiveId(value)
    if (value !== ARABIC_ONLY_ID) {
      window.localStorage.setItem(KEYS.LANG, value)
      pushRecentId(value)
      setRecentIds(getRecentIds())
    } else {
      window.localStorage.removeItem(KEYS.LANG)
    }
    window.dispatchEvent(new CustomEvent(EVENTS.LANG_CHANGED))
    setOpen(false)
    setQuery('')
  }, [])

  const toggleLang = useCallback((langCode: string) => {
    setOpenLangs((prev) => {
      const next = new Set(prev)
      if (next.has(langCode)) next.delete(langCode)
      else next.add(langCode)
      return next
    })
  }, [])

  // Pool of editions based on mode
  const editionPool = mode === 'listen' ? LISTEN_EDITIONS : ENABLED_EDITIONS

  // Language groups filtered by search query
  const groups = useMemo(() => {
    const all = getEditionsByLanguage().map((g) => ({
      ...g,
      editions: g.editions.filter((e) => editionPool.some((p) => p.id === e.id)),
    })).filter((g) => g.editions.length > 0)

    if (!query.trim()) return all
    const q = query.toLowerCase()
    return all
      .map((g) => ({
        ...g,
        editions: g.editions.filter(
          (e) =>
            e.translator.toLowerCase().includes(q) ||
            e.label.toLowerCase().includes(q) ||
            e.langName.toLowerCase().includes(q) ||
            e.langNative.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.editions.length > 0)
  }, [query, editionPool])

  // Recent editions that are still in the pool
  const recentEditions = useMemo(
    () => recentIds.map((id) => editionPool.find((e) => e.id === id)).filter(Boolean) as TranslationEdition[],
    [recentIds, editionPool],
  )

  const activeEdition = activeId === ARABIC_ONLY_ID ? null : getEdition(activeId)
  const triggerLabel = activeEdition
    ? `${activeEdition.langName} — ${activeEdition.label}`
    : 'Arabic only'

  const PanelContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Type className="size-4 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold">Choose Translation</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close translation picker"
          className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-border px-3 py-2">
        <div className="relative">
          <Search className="pointer-events-none absolute start-2.5 top-2.5 size-3.5 text-muted-foreground" aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search language or translator..."
            aria-label="Search translations"
            className="h-8 w-full rounded-md border border-border bg-card ps-8 pe-3 text-xs placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Scrollable list */}
      <div
        className="flex-1 overflow-y-auto px-3 py-2"
        role="listbox"
        aria-label="Available translations"
      >
        {/* Arabic only option */}
        {!query && (
          <div className="mb-3">
            <button
              type="button"
              role="option"
              aria-selected={activeId === ARABIC_ONLY_ID}
              onClick={() => select(ARABIC_ONLY_ID)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm transition-colors',
                activeId === ARABIC_ONLY_ID
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-foreground hover:bg-muted',
              )}
            >
              <span className="text-base" aria-hidden="true">🕋</span>
              <div>
                <p className="font-medium">None / Arabic only</p>
                <p className="text-xs text-muted-foreground">Pure Arabic Uthmani text, no translation</p>
              </div>
              {activeId === ARABIC_ONLY_ID && <span className="ml-auto size-2 rounded-full bg-primary" aria-hidden="true" />}
            </button>
          </div>
        )}

        {/* Recently used */}
        {!query && recentEditions.length > 0 && (
          <div className="mb-3">
            <p className="mb-1 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Recently used
            </p>
            {recentEditions.map((e) => (
              <EditionRow
                key={e.id}
                edition={e}
                isActive={e.id === activeId}
                index=""
                onSelect={select}
              />
            ))}
            <div className="my-2 border-t border-border" />
          </div>
        )}

        {/* Language groups */}
        <div className="flex flex-col gap-2">
          {groups.map((g, gi) => (
            <LanguageGroup
              key={g.langCode}
              langIndex={gi + 1}
              langName={g.langName}
              langNative={g.langNative}
              editions={g.editions}
              activeId={activeId}
              onSelect={select}
              isOpen={openLangs.has(g.langCode) || (!!query && g.editions.length > 0)}
              onToggle={() => toggleLang(g.langCode)}
            />
          ))}
        </div>

        {groups.length === 0 && (
          <p className="py-6 text-center text-xs text-muted-foreground">No translations match your search.</p>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Trigger button */}
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Translation: ${triggerLabel}`}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex max-w-[200px] items-center gap-1.5 truncate rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-muted sm:max-w-xs',
          className,
        )}
      >
        <Type className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
        <span className="truncate">{triggerLabel}</span>
        <ChevronDown className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
      </button>

      {/* Desktop popover */}
      {open && !isMobile && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Translation picker"
          className="absolute z-50 mt-1 w-80 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
          style={{ maxHeight: '480px' }}
        >
          <div className="h-[480px]">
            {PanelContent}
          </div>
        </div>
      )}

      {/* Mobile bottom sheet */}
      {open && isMobile && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          {/* Sheet */}
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Translation picker"
            className="relative h-[75dvh] w-full rounded-t-2xl border-t border-border bg-card shadow-xl"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1" aria-hidden="true">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            {PanelContent}
          </div>
        </div>
      )}
    </>
  )
}
