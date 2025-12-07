import type { NextConfig } from "next";

// Next.js 16 changed the NextConfig typing; allow additional custom keys
const nextConfig: Partial<NextConfig> & Record<string, any> = {
  eslint: {
    // Allow builds to complete even if ESLint reports errors/warnings
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // matches any hostname
      },
    ],
  },
};

export default nextConfig;
