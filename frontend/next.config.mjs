/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript build errors will now be fatal during build (no more ignoreBuildErrors)
  // This ensures type safety in production deployments
  images: {
    unoptimized: true,
  },
}

export default nextConfig
