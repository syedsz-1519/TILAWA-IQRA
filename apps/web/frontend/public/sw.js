/**
 * TILAWA Service Worker — v3
 *
 * Strategy overview:
 * ─────────────────────────────────────────────────────────────────────────────
 *  /_next/static/**  → Cache-first (immutable hashed assets, long-lived)
 *  /*.woff2 / fonts  → Cache-first (fonts never change)
 *  quran API (CDN)   → Stale-while-revalidate (serve cache, update in bg)
 *  Navigation (.html)→ Network-first, fall back to /offline if network fails
 *  Everything else   → Network-first, no cache
 *
 * We do NOT precache HTML pages — they reference hashed JS chunks that change
 * on every deploy. Caching stale HTML causes blank screens offline.
 * Instead we cache API data and static assets so Quran text works offline.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SW_VERSION   = 'tilawa-v3'
const ASSET_CACHE  = `${SW_VERSION}-assets`   // _next/static + fonts
const API_CACHE    = `${SW_VERSION}-quran-api` // Quran text CDN
const OFFLINE_URL  = '/offline'

// ---------------------------------------------------------------------------
// INSTALL — skip waiting, let the new SW activate immediately
// ---------------------------------------------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(ASSET_CACHE).then(async (cache) => {
      // Pre-cache only static assets we know exist
      await cache.addAll([
        '/offline',          // our offline fallback page
        '/icon.svg',
        '/apple-icon.png',
        '/manifest.webmanifest',
        '/images/tilawa-logo.jpeg',
      ]).catch(() => {
        // If any static asset 404s (e.g. during CI), don't block installation
      })
    })
  )
  self.skipWaiting()
})

// ---------------------------------------------------------------------------
// ACTIVATE — purge old caches, claim all clients
// ---------------------------------------------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== ASSET_CACHE && k !== API_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  )
})

// ---------------------------------------------------------------------------
// FETCH — request routing
// ---------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only handle GET
  if (request.method !== 'GET') return

  // ── 1. Hashed Next.js static assets → Cache-first (immutable) ────────────
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, ASSET_CACHE))
    return
  }

  // ── 2. Fonts (woff2 / ttf / Google Fonts) → Cache-first ─────────────────
  if (
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff') ||
    url.hostname === 'fonts.gstatic.com' ||
    url.hostname === 'fonts.googleapis.com'
  ) {
    event.respondWith(cacheFirst(request, ASSET_CACHE))
    return
  }

  // ── 3. Local static files (icons, images, manifest) → Cache-first ────────
  if (
    url.origin === self.location.origin && (
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.ico') ||
      url.pathname.endsWith('.jpeg') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname === '/manifest.webmanifest'
    )
  ) {
    event.respondWith(cacheFirst(request, ASSET_CACHE))
    return
  }

  // ── 4. Quran text API (jsdelivr / alquran.cloud) → Stale-while-revalidate ─
  if (
    url.hostname.includes('jsdelivr.net') ||
    url.hostname.includes('alquran.cloud')
  ) {
    event.respondWith(staleWhileRevalidate(request, API_CACHE))
    return
  }

  // ── 5. Navigation requests (HTML pages) → Network-first, offline fallback ─
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigate(request))
    return
  }

  // ── 6. Everything else → pass through ─────────────────────────────────────
})

// ---------------------------------------------------------------------------
// Strategies
// ---------------------------------------------------------------------------

/** Cache-first: return from cache immediately; only hit network if not cached. */
async function cacheFirst(request, cacheName) {
  const cache  = await caches.open(cacheName)
  const cached = await cache.match(request)
  if (cached) return cached

  try {
    const fresh = await fetch(request)
    if (fresh && fresh.ok) cache.put(request, fresh.clone())
    return fresh
  } catch {
    return new Response('', { status: 504 })
  }
}

/** Stale-while-revalidate: serve from cache instantly, update in background. */
async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName)
  const cached = await cache.match(request)

  const networkFetch = fetch(request).then((fresh) => {
    if (fresh && fresh.ok) cache.put(request, fresh.clone())
    return fresh
  }).catch(() => null)

  return cached || await networkFetch || new Response(
    JSON.stringify({ error: 'Offline — Quran data not yet cached' }),
    { status: 503, headers: { 'Content-Type': 'application/json' } }
  )
}

/** Network-first for navigation: try network, fall back to /offline page. */
async function networkFirstNavigate(request) {
  try {
    const fresh = await fetch(request)
    // Cache successful navigation responses in asset cache
    if (fresh && fresh.ok) {
      const cache = await caches.open(ASSET_CACHE)
      cache.put(request, fresh.clone())
    }
    return fresh
  } catch {
    // Network failed — try exact match, then the offline page
    const cached = await caches.match(request)
    if (cached) return cached

    const offline = await caches.match(OFFLINE_URL)
    if (offline) return offline

    // Last resort inline fallback
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#0e0c1a">
  <title>TILAWA — Offline</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui,sans-serif;background:#0e0c1a;color:#f0ede8;min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;gap:1.5rem}
    h1{font-size:clamp(1.5rem,5vw,2rem);font-weight:700}
    p{color:#8a8099;max-width:320px;line-height:1.6;font-size:.9rem}
    a{display:inline-block;margin-top:.5rem;padding:.75rem 2rem;background:#c9a227;color:#0e0c1a;border-radius:.75rem;text-decoration:none;font-weight:600;font-size:.875rem}
    .arabic{font-size:2rem;opacity:.5;margin-bottom:.5rem}
  </style>
</head>
<body>
  <p class="arabic" lang="ar">بِسْمِ اللَّهِ</p>
  <h1>You're offline</h1>
  <p>Connect to the internet to read and listen to the Quran. Previously visited pages and Quran API responses are available below.</p>
  <a href="/read">Open Cached Surahs</a>
</body>
</html>`,
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    )
  }
}

// ---------------------------------------------------------------------------
// MESSAGE — handle skipWaiting from update banner
// ---------------------------------------------------------------------------
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
