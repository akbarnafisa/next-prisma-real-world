/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  images: {
    domains: [
      "nextjs.org",
      "www.prisma.io",
      "prisma.io",
      "www.apollographql.com",
      "apollographql.com",
      "tailwindcss.com",
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig)
