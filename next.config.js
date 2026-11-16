/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 2,
    webpackBuildWorker: false,
  },

  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ];
  },

  images: {
    deviceSizes: [360, 390, 430, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [48, 64, 96, 128, 192, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [75, 88],
    remotePatterns: [
      { protocol: 'https', hostname: 'backend.nexus.edu.np' },
      { protocol: 'https', hostname: 'api.nexus.edu.np' },
    ],
  },
};

export default nextConfig;
