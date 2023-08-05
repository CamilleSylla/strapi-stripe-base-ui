/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.MEDIA_BUCKET_HOST,
        port: '',
        pathname: process.env.MEDIA_BUCKET_PATHNAME,
      },
    ],
  },
}

module.exports = nextConfig
