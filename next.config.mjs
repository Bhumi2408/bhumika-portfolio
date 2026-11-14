/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // don't advertise "X-Powered-By: Next.js"
  poweredByHeader: false,

  cacheComponents: true,
  partialPrefetching: true,

  images: {
    // serve modern formats for the photo + project screenshots
    formats: ["image/avif", "image/webp"],
    // optimised images stay cached for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // basic security headers on every route
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
