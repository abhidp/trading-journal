import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['mydomain.gmail.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  }
};

export default nextConfig;
