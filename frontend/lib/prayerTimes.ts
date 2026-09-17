/**
 * Prayer times utilities
 * Fetches Salah times from Aladhan API with caching
 */

interface PrayerTimes {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Sunset: string
  Maghrib: string
  Isha: string
  Imsak: string
  Midnight: string
}

interface AladhanTimingsResponse {
  data: {
    timings: PrayerTimes
  }
}

const PRAYER_TIMES_CACHE_KEY = 'tilawa_prayer_times_cache'
const PRAYER_TIMES_DATE_KEY = 'tilawa_prayer_times_date'
const USER_LOCATION_KEY = 'tilawa_user_location'
const USER_METHOD_KEY = 'tilawa_calculation_method'

export interface UserLocation {
  latitude: number
  longitude: number
  city?: string
}

/**
 * Request geolocation from browser
 */
export async function requestGeolocation(): Promise<UserLocation | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported')
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: UserLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        localStorage.setItem(USER_LOCATION_KEY, JSON.stringify(location))
        resolve(location)
      },
      () => resolve(null)
    )
  })
}

/**
 * Get cached user location or request new one
 */
export async function getUserLocation(): Promise<UserLocation | null> {
  const cached = localStorage.getItem(USER_LOCATION_KEY)
  if (cached) {
    try {
      return JSON.parse(cached)
    } catch {
      localStorage.removeItem(USER_LOCATION_KEY)
    }
  }

  return requestGeolocation()
}

/**
 * Set user location manually
 */
export function setUserLocation(location: UserLocation): void {
  localStorage.setItem(USER_LOCATION_KEY, JSON.stringify(location))
}

/**
 * Fetch prayer times from Aladhan API
 * method: 1=Karachi, 2=ISNA (North America), 3=MWL (Makkah), 4=Egyptain, 5=JAKIM, etc
 */
export async function getPrayerTimes(
  latitude: number,
  longitude: number,
  date?: Date,
  method: number = 2
): Promise<PrayerTimes | null> {
  const targetDate = date || new Date()
  const dateStr = `${String(targetDate.getDate()).padStart(2, '0')}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${targetDate.getFullYear()}`

  const cacheDate = localStorage.getItem(PRAYER_TIMES_DATE_KEY)
  const cacheKey = `${PRAYER_TIMES_CACHE_KEY}_${latitude}_${longitude}_${method}`

  // Check cache validity
  if (cacheDate === dateStr) {
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      try {
        return JSON.parse(cached)
      } catch {
        localStorage.removeItem(cacheKey)
      }
    }
  }

  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=${method}`
    )

    if (!response.ok) throw new Error('Failed to fetch prayer times')

    const data: AladhanTimingsResponse = await response.json()
    const timings = data.data.timings

    // Cache the result
    localStorage.setItem(cacheKey, JSON.stringify(timings))
    localStorage.setItem(PRAYER_TIMES_DATE_KEY, dateStr)

    return timings
  } catch (error) {
    console.error('Error fetching prayer times:', error)
    return null
  }
}

/**
 * Get available calculation methods
 */
export async function getCalculationMethods() {
  try {
    const response = await fetch('https://api.aladhan.com/v1/methods')
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching methods:', error)
    return null
  }
}

/**
 * Set user's preferred calculation method
 */
export function setCalculationMethod(method: number): void {
  localStorage.setItem(USER_METHOD_KEY, String(method))
}

/**
 * Get user's preferred calculation method (default: 2 = ISNA)
 */
export function getCalculationMethod(): number {
  const stored = localStorage.getItem(USER_METHOD_KEY)
  return stored ? parseInt(stored, 10) : 2
}

/**
 * Calculate which prayer is next and time remaining
 */
export function getNextPrayer(
  timings: PrayerTimes,
  now: Date = new Date()
): {
  name: string
  timeRemaining: number
  progress: number
} {
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const prayers = [
    { name: 'Fajr', time: timings.Fajr },
    { name: 'Dhuhr', time: timings.Dhuhr },
    { name: 'Asr', time: timings.Asr },
    { name: 'Maghrib', time: timings.Maghrib },
    { name: 'Isha', time: timings.Isha },
  ]

  let nextPrayer = prayers[0]
  let nextPrayerMinutes = 0
  let prevPrayerMinutes = 0

  for (let i = 0; i < prayers.length; i++) {
    const [h, m] = prayers[i].time.split(':').map(Number)
    const prayerMinutes = h * 60 + m

    if (prayerMinutes > currentMinutes) {
      nextPrayer = prayers[i]
      nextPrayerMinutes = prayerMinutes
      prevPrayerMinutes = i > 0 ? (() => {
        const [ph, pm] = prayers[i - 1].time.split(':').map(Number)
        return ph * 60 + pm
      })() : prayerMinutes - 360 // Assume 6 hour window for first prayer
      break
    }
  }

  // If no prayer found today, next is Fajr tomorrow
  if (nextPrayer === prayers[0] && currentMinutes > (() => {
    const [h, m] = prayers[4].time.split(':').map(Number)
    return h * 60 + m
  })()) {
    nextPrayerMinutes = (() => {
      const [h, m] = prayers[0].time.split(':').map(Number)
      return h * 60 + m + 1440
    })()
    prevPrayerMinutes = (() => {
      const [h, m] = prayers[4].time.split(':').map(Number)
      return h * 60 + m
    })()
  }

  const timeRemaining = nextPrayerMinutes - currentMinutes
  const progress = Math.max(
    0,
    Math.min(
      100,
      ((currentMinutes - prevPrayerMinutes) / (nextPrayerMinutes - prevPrayerMinutes)) * 100
    )
  )

  return {
    name: nextPrayer.name,
    timeRemaining: Math.max(0, timeRemaining * 60 * 1000), // convert to milliseconds
    progress,
  }
}
