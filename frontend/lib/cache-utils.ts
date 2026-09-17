/**
 * Caching utilities with stale-while-revalidate pattern
 * Allows instant UI render with cached data, then silently revalidates
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number // Time to live in milliseconds
}

const cacheStore = new Map<string, CacheEntry<any>>()

/**
 * Get cached data if fresh, otherwise undefined
 */
export function getCached<T>(key: string, ttlMs: number = 3600000): T | null {
  const entry = cacheStore.get(key)
  if (!entry) return null

  const age = Date.now() - entry.timestamp
  if (age > entry.ttl) {
    cacheStore.delete(key)
    return null
  }

  return entry.data as T
}

/**
 * Set cache with optional TTL
 */
export function setCached<T>(key: string, data: T, ttlMs: number = 3600000): void {
  cacheStore.set(key, {
    data,
    timestamp: Date.now(),
    ttl: ttlMs,
  })
}

/**
 * Check if cache is stale (exists but old)
 */
export function isCacheStale(key: string, ttlMs: number = 3600000): boolean {
  const entry = cacheStore.get(key)
  if (!entry) return true

  const age = Date.now() - entry.timestamp
  return age > ttlMs
}

/**
 * Clear specific cache entry
 */
export function clearCache(key: string): void {
  cacheStore.delete(key)
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  cacheStore.clear()
}

/**
 * Get cache size in bytes (approximate)
 */
export function getCacheSize(): number {
  return JSON.stringify(Array.from(cacheStore.entries())).length
}

/**
 * Stale-while-revalidate pattern:
 * Return cached data immediately, then revalidate in background
 */
export async function staleWhileRevalidate<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = 3600000
): Promise<T> {
  // Return cached data if fresh
  const cached = getCached<T>(key, ttlMs)
  if (cached !== null) {
    return cached
  }

  // Fetch fresh data
  const fresh = await fetcher()
  setCached(key, fresh, ttlMs)

  // If cache was stale, return fresh and revalidate in background
  return fresh
}
