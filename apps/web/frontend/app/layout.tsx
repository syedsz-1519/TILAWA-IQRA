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

export const metadata: Metadata = {
  title: {
    default: 'TILAWA – Quranic Recitation & Learning',
    template: '%s | TILAWA',
  },
  description:
    'Read, listen, and learn the Holy Quran with tajweed guidance, daily ayah, duas, hadith and Qibla — a calm, premium companion for every Muslim.',
  metadataBase: new URL('https://tilawaa.vercel.app'),
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png',  media: '(prefers-color-scheme: dark)'  },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://tilawaa.vercel.app',
    title: 'TILAWA – Quranic Recitation & Learning',
    description:
      'Read, listen, and learn the Holy Quran with tajweed guidance, daily ayah, duas, hadith and Qibla.',
    siteName: 'TILAWA',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'TILAWA – From Iqra to Tilawa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TILAWA – Quranic Recitation & Learning',
    description:
      'Read, listen, and learn the Holy Quran with tajweed guidance, daily ayah, duas, hadith and Qibla.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',       /* honours notch / Dynamic Island safe areas */
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f8fc' },   /* matches --background light */
    { media: '(prefers-color-scheme: dark)',  color: '#0e0c1a' },   /* matches --background dark  */
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${geist.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans overflow-x-hidden">
        {/* Skip-to-content — keyboard accessibility */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
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
