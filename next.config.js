/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@tambo-ai/react'],
  // Silence Next.js 16 warning about mixed configs.
  // We keep the webpack config for now as standard builds might still use it,
  // or if we opt-out of Turbopack later.
  turbopack: {},
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
