import type { FlatMockServerConfig } from 'mock-config-server';

import * as requests from './mock/requests';

const flatMockServerConfig: FlatMockServerConfig = [
  {
    baseUrl: '/api',
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['content-type', 'authorization'],
      credentials: true
    }
  },
  {
    interceptors: {
      request: async ({ setDelay }) => {
        await setDelay(1000);
      }
    },
    configs: Object.values(requests)
  }
];

export default flatMockServerConfig;
