// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
const { env } = require('./server/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig
