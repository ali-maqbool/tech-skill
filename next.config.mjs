/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove X-Powered-By header
  poweredByHeader: false,
  // Compress responses
  compress: true,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },
  // Experimental: optimise package imports to reduce bundle size
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', '@react-three/drei'],
  },
};

export default nextConfig;
