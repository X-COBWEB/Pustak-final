/** @type {import('next').NextConfig} */
// next.config.mjs

const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for development
  swcMinify: true, // Use SWC for faster builds
  images: {
    domains: ["manee.com.np"], // Allow images from this domain
  },
};

export default nextConfig;
