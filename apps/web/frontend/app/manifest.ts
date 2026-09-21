import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'TILAWA - Quranic Recitation & Learning',
    short_name: 'TILAWA',
    description:
      'AI-powered Quranic recitation learning, tajweed rules, hadith library, and memorization companion.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#faf9f6',
    theme_color: '#15803d',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/tilawa-logo.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'maskable',
      },
    ],
  }
}
