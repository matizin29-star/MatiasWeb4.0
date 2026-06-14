import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
