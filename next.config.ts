import type { NextConfig } from "next";

// Baseline security headers for every response. Vercel already sends
// Strict-Transport-Security on the production domain.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first: noticeably smaller than WebP for the same photo.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // French and English have separate root layouts (for a correct <html lang>),
    // so URLs that match no route get this single 404 page.
    globalNotFound: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
