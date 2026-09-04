/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Serve modern formats. The source photography is 700KB–1MB per file, so this
  // is the single biggest Core Web Vitals win on the site.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Next 16 only honours quality values listed here — anything else silently
    // falls back to 75, which is why per-image `quality` had no effect.
    qualities: [45, 55, 62, 65, 70, 75],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384],
  },

  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Fingerprinted build output is safe to cache forever.
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, must-revalidate' }],
      },
    ];
  },

  async redirects() {
    return [
      // The old SPA linked "Contact Us" from a few places as /contact-us.
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/home', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
