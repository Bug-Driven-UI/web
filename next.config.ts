import type { NextConfig } from 'next';

import process from 'node:process';

const API_URL = process.env.API_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/:path*`
      }
    ];
  }
};

export default nextConfig;
