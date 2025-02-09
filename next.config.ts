/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // matches any hostname
      },
    ],
  },
};

module.exports = nextConfig;
