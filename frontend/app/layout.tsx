import type { Metadata, Viewport } from 'next'
import { Geist, Amiri } from 'next/font/google'
import { PlayerProvider } from '@/components/player/player-provider'
import { PlayerBar } from '@/components/player/player-bar'
import { ThemeProvider } from '@/components/theme-provider'
import { AppShell } from '@/components/app-shell'
import { ServiceWorkerRegister } from '@/components/service-worker-register'
import { logEnvironmentValidation } from '@/lib/env.validation'
import { MidnightRefreshInitializer } from '@/components/midnight-refresh-initializer'
import './fonts.css'
import './globals.css'

// Validate environment variables on app startup
logEnvironmentValidation()

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})

export const metadata: Metadata = {
  title: 'TILAWA - Quranic Recitation & Learning',
  description:
    'AI-powered Quranic recitation learning, tajweed rules, hadith library, and memorization companion.',
  manifest: '/manifest.webmanifest',
  generator: 'v0.app',
  icons: {
    icon: '/images/tilawa-logo.jpeg',
    apple: '/images/tilawa-logo.jpeg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f6' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f0d' },
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
      <body className="antialiased font-sans">
        <ThemeProvider>
          <PlayerProvider>
            <MidnightRefreshInitializer />
            <AppShell>{children}</AppShell>
            <PlayerBar />
            <ServiceWorkerRegister />
          </PlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
