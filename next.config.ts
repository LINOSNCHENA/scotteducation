import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com", },
      { protocol: "https", hostname: "ui-avatars.com", },
      { protocol: "https", hostname: "randomuser.me", },
      { protocol: "https", hostname: "images.unsplash.com", },
      { protocol: "https", hostname: "source.unsplash.com", },
      { protocol: "https", hostname: "plus.unsplash.com", },
      // Wildcard pattern (must include dots for subdomains)
      { protocol: "https", hostname: "**.unsplash.com", },
      // ✅ Add this line:
      { protocol: "https", hostname: "example.com" },
    ],
    deviceSizes: [360, 480, 640, 768, 828, 1024, 1080, 1200, 1366, 1440, 1600, 1920, 2048, 2560, 3840],
    imageSizes: [32, 64, 96, 128, 192, 256, 320, 384, 512, 640, 768],
    minimumCacheTTL: 60, // 60 seconds minimum cache time
  },
  // Add other Next.js config options here
};

export default nextConfig;