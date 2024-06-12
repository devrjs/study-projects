/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        // pathname: '/devrjs/**',
      },
    ],
  },
}

export default nextConfig
