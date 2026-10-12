/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  images: {
    // Removed `unoptimized: true` — next/image optimisation is now active.
    // Remote images served from these origins are allowed.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'api.alquran.cloud',
      },
    ],
    // Improve LCP by preloading the logo variant on initial load
    deviceSizes: [360, 390, 430, 768, 1024, 1280, 1440],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
