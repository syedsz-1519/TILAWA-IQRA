'use client'

import { useEffect } from 'react'

/**
 * Component that clears stale caches and service workers on mount
 * This fixes "module factory not available" errors from lucide-react
 */
export function CacheClearer() {
  useEffect(() => {
    // Unregister service workers to prevent caching issues
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister().catch((error) => {
            console.debug('Failed to unregister service worker:', error)
          })
        })
      })
    }

    // Clear old caches
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name).catch((error) => {
            console.debug('Failed to delete cache:', error)
          })
        })
      })
    }
  }, [])

  return null
}
