// TILAWA Service Worker for Offline Quran Reading
const CACHE_VERSION = 'tilawa-quran-v1'
const RUNTIME_CACHE = 'tilawa-runtime-v1'
const API_CACHE = 'tilawa-quran-api-v1'

// Core surah pages & essential assets to precache for offline reading
const PRECACHE_URLS = [
  '/',
  '/read',
  '/read/1',   // Al-Fatihah
  '/read/36',  // Ya-Sin
  '/read/55',  // Ar-Rahman
  '/read/67',  // Al-Mulk
  '/read/112', // Al-Ikhlas
  '/read/113', // Al-Falaq
  '/read/114', // An-Nas
  '/icon.svg',
  '/apple-icon.png',
  '/manifest.webmanifest',
]

// Precache essential Quran text API data for core surahs
const CORE_QURAN_API_URLS = [
  'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/1.json',
  'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-abdullahyusufal/1.json',
  'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/urd-abulaalamaududi/1.json',
  'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/112.json',
  'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-abdullahyusufal/112.json',
  'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/113.json',
  'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/114.json',
]

// Install event: cache core surah pages safely
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION)
      const apiCache = await caches.open(API_CACHE)

      // Fetch and cache core pages using allSettled to ensure installation succeeds
      // even if an individual route is unavailable during build
      await Promise.allSettled(
        PRECACHE_URLS.map(async (url) => {
          try {
            const response = await fetch(url, { cache: 'no-cache' })
            if (response && response.ok) {
              await cache.put(url, response)
            }
          } catch (err) {
            console.warn(`[SW] Precache skipped for ${url}:`, err)
          }
        }),
      )

      // Precache core Quran text APIs
      await Promise.allSettled(
        CORE_QURAN_API_URLS.map(async (url) => {
          try {
            const response = await fetch(url, { mode: 'cors' })
            if (response && response.ok) {
              await apiCache.put(url, response)
            }
          } catch (err) {
            console.warn(`[SW] Quran API precache skipped for ${url}:`, err)
          }
        }),
      )

      await self.skipWaiting()
    })(),
  )
})

// Activate event: purge outdated caches and take control
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_VERSION, RUNTIME_CACHE, API_CACHE]
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys.map((key) => {
          if (!currentCaches.includes(key)) {
            return caches.delete(key)
          }
        }),
      )
      await self.clients.claim()
    })(),
  )
})

// Fetch event: handle offline reading and intelligent caching
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only handle GET requests
  if (request.method !== 'GET') {
    return
  }

  // 1. Quran Translation & Arabic text API requests (jsdelivr CDN)
  // Use Stale-While-Revalidate: return cache instantly for offline reading, update in background
  if (url.hostname.includes('jsdelivr.net') && url.pathname.includes('/editions/')) {
    event.respondWith(
      (async () => {
        const apiCache = await caches.open(API_CACHE)
        const cachedResponse = await apiCache.match(request)

        const networkFetch = fetch(request)
          .then(async (networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              await apiCache.put(request, networkResponse.clone())
            }
            return networkResponse
          })
          .catch(() => null)

        return cachedResponse || (await networkFetch) || new Response(
          JSON.stringify({ error: 'Offline - content not yet cached' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } },
        )
      })(),
    )
    return
  }

  // 2. Navigation requests for HTML pages (including /read and /read/*)
  // Use Network-First with Cache fallback for real-time updates while online,
  // falling back cleanly to cached surah pages when offline
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request)
          if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE)
            // Cache the visited surah page for future offline reading
            cache.put(request, networkResponse.clone())
          }
          return networkResponse
        } catch (error) {
          // Network failed: attempt to match exact page from caches
          const cachedResponse =
            (await caches.match(request)) ||
            (await caches.match(url.pathname))

          if (cachedResponse) {
            return cachedResponse
          }

          // Fallback to cached Surah directory or root
          const fallback =
            (await caches.match('/read')) ||
            (await caches.match('/'))

          if (fallback) {
            return fallback
          }

          return new Response(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Offline - TILAWA</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>You are currently offline</h1><p>Please connect to the internet to browse new Surahs, or return to <a href="/read">cached surahs</a>.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } },
          )
        }
      })(),
    )
    return
  }

  // 3. Static assets: _next/static, css, fonts, images
  // Cache-First strategy
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico')
  ) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request)
        if (cached) {
          return cached
        }
        try {
          const networkResponse = await fetch(request)
          if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE)
            cache.put(request, networkResponse.clone())
          }
          return networkResponse
        } catch {
          return cached || new Response('', { status: 404 })
        }
      })(),
    )
    return
  }
})
