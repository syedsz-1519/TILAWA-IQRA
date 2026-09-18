'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return
    }

    const register = async () => {
      try {
        // Clear old caches to fix module loading issues
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames
            .filter((name) => !name.includes('v2'))
            .map((name) => caches.delete(name))
        )

        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        })

        // Check for updates periodically
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (
                installingWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                console.info('[TILAWA] New Quran offline content available.')
              }
            })
          }
        })
      } catch (error) {
        console.warn('[TILAWA] Service worker registration failed:', error)
      }
    }

    if (document.readyState === 'complete') {
      register()
    } else {
      window.addEventListener('load', register)
      return () => window.removeEventListener('load', register)
    }
  }, [])

  return null
}
