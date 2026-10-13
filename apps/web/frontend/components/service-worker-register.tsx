'use client'

import { useEffect } from 'react'

/**
 * ServiceWorkerRegister
 *
 * Registers /sw.js and handles update lifecycle cleanly:
 * - Registers on load (not blocking render)
 * - When a new SW is installed & ready, prompts user via a toast-style banner
 * - Clicking "Update" tells the waiting SW to skipWaiting, then reloads
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none', // always check for new SW on each load
        })

        // Check for updates now and every 60 s (good for Vercel deploys)
        reg.update().catch(() => {})
        const intervalId = setInterval(() => reg.update().catch(() => {}), 60_000)

        reg.addEventListener('updatefound', () => {
          const worker = reg.installing
          if (!worker) return

          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              // New SW ready — show update notification
              showUpdateBanner(worker)
            }
          })
        })

        // If a new SW took over while page was open, reload to apply
        let refreshing = false
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!refreshing) {
            refreshing = true
            window.location.reload()
          }
        })

        return () => clearInterval(intervalId)
      } catch (err) {
        // Don't let SW errors crash the app
        console.warn('[TILAWA] SW registration failed:', err)
      }
    }

    if (document.readyState === 'complete') {
      register()
    } else {
      window.addEventListener('load', register, { once: true })
    }
  }, [])

  return null
}

/** Inject a small "Update available" banner into the page */
function showUpdateBanner(worker: ServiceWorker) {
  // Remove any existing banner
  document.getElementById('tilawa-update-banner')?.remove()

  const banner = document.createElement('div')
  banner.id = 'tilawa-update-banner'
  banner.setAttribute('role', 'status')
  banner.setAttribute('aria-live', 'polite')
  banner.style.cssText = `
    position: fixed;
    bottom: calc(var(--bottom-nav-h, 3.5rem) + env(safe-area-inset-bottom, 0px) + 0.75rem);
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--card, #fff);
    border: 1px solid var(--border, #e2e8f0);
    border-radius: 1rem;
    padding: 0.75rem 1rem;
    box-shadow: var(--shadow-card-hover, 0 8px 24px rgba(0,0,0,0.12));
    font-size: 0.8125rem;
    white-space: nowrap;
    max-width: calc(100vw - 2rem);
  `

  const text = document.createElement('span')
  text.textContent = '✨ New version of TILAWA available'
  text.style.color = 'var(--foreground, #111)'

  const btn = document.createElement('button')
  btn.textContent = 'Update now'
  btn.style.cssText = `
    background: var(--primary, #3730a3);
    color: var(--primary-foreground, #fff);
    border: none;
    border-radius: 0.5rem;
    padding: 0.375rem 0.875rem;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
  `
  btn.addEventListener('click', () => {
    worker.postMessage({ type: 'SKIP_WAITING' })
    banner.remove()
  })

  const close = document.createElement('button')
  close.textContent = '✕'
  close.setAttribute('aria-label', 'Dismiss update notification')
  close.style.cssText = `
    background: transparent;
    border: none;
    color: var(--muted-foreground, #666);
    cursor: pointer;
    font-size: 0.875rem;
    padding: 0 0.25rem;
  `
  close.addEventListener('click', () => banner.remove())

  banner.append(text, btn, close)
  document.body.appendChild(banner)

  // Auto-dismiss after 30 s
  setTimeout(() => banner.remove(), 30_000)
}
