import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
