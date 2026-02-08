/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@tambo-ai/react'],
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
