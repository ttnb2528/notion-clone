import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignore ESLint during builds to prevent blocking deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during builds (not recommended for production)
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
