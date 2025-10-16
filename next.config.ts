import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      },
      {
        protocol: 'http',
        hostname: '*'
      }
    ]
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        // eslint-disable-next-line node/prefer-global/process
        destination: `${process.env.NEXT_PUBLIC_BACKEND_INTERNAL_URL}/api/:path*`
      }
    ];
  }
};

export default nextConfig;
