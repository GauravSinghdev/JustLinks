import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['cdn.pixabay.com', 'lh3.googleusercontent.com'], // Add both domains here
  },
};

export default nextConfig;
