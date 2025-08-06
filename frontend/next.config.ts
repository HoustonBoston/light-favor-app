import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('http://localhost:8080/**')]
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"]
  }

};

export default nextConfig;
