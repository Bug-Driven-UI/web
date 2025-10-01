import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
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
