import type { Metadata, Viewport } from 'next'
import { Geist, Amiri } from 'next/font/google'
import { PlayerProvider } from '@/components/player/player-provider'
import { PlayerBar } from '@/components/player/player-bar'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/language-context'
import { AppShell } from '@/components/app-shell'
import { ServiceWorkerRegister } from '@/components/service-worker-register'
import { ErrorBoundary, ErrorDebugPanel } from '@/components/error-boundary'
import { CacheClearer } from '@/components/cache-clearer'
import { logEnvironmentValidation } from '@/lib/env.validation'
import { MidnightRefreshInitializer } from '@/components/midnight-refresh-initializer'
import './fonts.css'
import './globals.css'

// Validate environment variables on app startup
logEnvironmentValidation()

/* ── Web-safe font loading via next/font/google ─────────────────────────── */
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
})

/* ── App-wide metadata ──────────────────────────────────────────────────── */
const APP_URL = 'https://tilawaa.vercel.app'

export const metadata: Metadata = {
  title: {
    default: 'TILAWA — Quranic Recitation & Learning',
    template: '%s | TILAWA',
  },
  description:
    'Read, listen, and learn the Holy Quran. Tajweed rules, Dua & Adhkar, Hadith library, Qibla finder — all in one beautiful app.',
  metadataBase: new URL(APP_URL),
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', type: 'image/png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png',  type: 'image/png', sizes: '32x32', media: '(prefers-color-scheme: dark)'  },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    url: APP_URL,
    title: 'TILAWA — Quranic Recitation & Learning',
    description:
      'Read, listen, and learn the Holy Quran. Tajweed rules, Dua & Adhkar, Hadith library, Qibla finder — all in one beautiful app.',
    siteName: 'TILAWA',
    locale: 'en_US',
    /* TODO: Replace with a proper 1200×630 OG image in /public/og-image.png */
    images: [
      {
        url: '/images/tilawa-logo.jpeg',
        width: 512,
        height: 512,
        alt: 'TILAWA — From Iqra to Tilawa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TILAWA — Quranic Recitation & Learning',
    description:
      'Read, listen, and learn the Holy Quran. Tajweed rules, Dua & Adhkar, Hadith library, Qibla finder.',
    images: ['/images/tilawa-logo.jpeg'],
  },
  keywords: [
    'Quran', 'Quranic recitation', 'Tajweed', 'Islamic app',
    'Dua', 'Adhkar', 'Hadith', 'Qibla', 'learn Quran', 'TILAWA',
  ],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',   /* enables env(safe-area-inset-*) on iOS */
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f7fb' },
    { media: '(prefers-color-scheme: dark)',  color: '#0d0b1a' },
  ],
}

/* ── Root layout ────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Preload the Amiri Quran woff2 — it's the largest, most critical
          Arabic font. The browser will start fetching it before CSS is parsed.
        */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="https://cdn.jsdelivr.net/npm/amiri-quran@0.4/data/fonts/Amiri%20Quran.woff2"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external font CDNs */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body className="antialiased font-sans bg-background text-foreground">
        <CacheClearer />
        <ErrorBoundary
          context={{
            component: 'RootLayout',
            action: 'render',
          }}
        >
          <ThemeProvider>
            <LanguageProvider>
              <PlayerProvider>
                <MidnightRefreshInitializer />
                <AppShell>{children}</AppShell>
                <PlayerBar />
                <ServiceWorkerRegister />
                <ErrorDebugPanel />
              </PlayerProvider>
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
