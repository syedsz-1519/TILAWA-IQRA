import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Amiri } from 'next/font/google'
import { PlayerProvider } from '@/components/player/player-provider'
import { PlayerBar } from '@/components/player/player-bar'
import { ThemeProvider } from '@/components/theme-provider'
import { AppShell } from '@/components/app-shell'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})

export const metadata: Metadata = {
  title: 'TILAWA — Learn, Listen, and Recite the Quran',
  description:
    'AI-powered Quranic recitation learning. Listen to beautiful recitation by Yasser Al-Dosari, track your khatm, and perfect your tajweed.',
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PlayerProvider>
            <AppShell>{children}</AppShell>
            <PlayerBar />
          </PlayerProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
