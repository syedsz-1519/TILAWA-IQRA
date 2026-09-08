/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Enable strict TypeScript checking for production deployments
    strict: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
