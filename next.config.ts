import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
