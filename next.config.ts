import type { NextConfig } from 'next';

import process from 'node:process';

const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL;
console.log('#BACKEND_INTERNAL_URL ---------------', BACKEND_INTERNAL_URL);
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_INTERNAL_URL}/:path*`
      }
    ];
  },
  output: 'standalone'
};

export default nextConfig;
