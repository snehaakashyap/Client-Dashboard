/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic optimizations for Vercel deployment
  swcMinify: true,
  reactStrictMode: true,
  
  // Ensure compatibility with React 18
  transpilePackages: [
    'react-day-picker',
    'recharts',
    'react-resizable-panels'
  ],
  
  // Allow older peer dependencies
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig 