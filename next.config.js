/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic optimizations for Vercel deployment
  swcMinify: true,
  reactStrictMode: true,
  // Ensure Vercel can bundle the app correctly
  experimental: {
    // This allows Next.js to resolve dependencies more effectively
    esmExternals: 'loose'
  }
}

module.exports = nextConfig 