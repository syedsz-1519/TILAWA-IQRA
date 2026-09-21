/**
 * Clear service worker cache and reload
 * This helps fix "module factory not available" errors
 */
export async function clearCacheAndReload() {
  // Unregister all service workers
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (const registration of registrations) {
        await registration.unregister()
      }
      console.log('✅ Service workers unregistered')
    } catch (error) {
      console.error('Failed to unregister service workers:', error)
    }
  }

  // Clear all caches
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map((name) => caches.delete(name)))
      console.log('✅ All caches cleared')
    } catch (error) {
      console.error('Failed to clear caches:', error)
    }
  }

  // Clear localStorage
  try {
    localStorage.clear()
    console.log('✅ Local storage cleared')
  } catch (error) {
    console.error('Failed to clear local storage:', error)
  }

  // Hard reload the page
  window.location.reload()
}

/**
 * Check if we should clear cache on load
 */
export function checkAndClearStaleCache() {
  const lastClearTime = localStorage.getItem('_cache_clear_time')
  const now = Date.now()
  const ONE_DAY = 24 * 60 * 60 * 1000

  // Clear cache daily or if it's the first load
  if (!lastClearTime || now - parseInt(lastClearTime) > ONE_DAY) {
    localStorage.setItem('_cache_clear_time', now.toString())

    // Unregister old service workers quietly
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister())
      })
    }

    // Clear old caches quietly
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name))
      })
    }
  }
}
