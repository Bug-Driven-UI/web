import type { RestRequestConfig } from 'mock-config-server';

import type { APIResponseSuccess } from '@/generated/api/admin/models';

const data: APIResponseSuccess = {
  type: 'success',
  data: {
    api: {
      createdAtTimestampMs: 0,
      id: 'api-1',
      description: 'API для получения данных о корзине пользователя',
      name: 'Cart API',
      endpoints: [
        {
          responseName: 'getCart',
          timeoutMs: 5000,
          method: 'GET',
          url: '/cart',
          isRequired: true
        },
        {
          responseName: 'updateCart',
          timeoutMs: 5000,
          method: 'PUT',
          url: '/cart',
          isRequired: false
        }
      ],
      params: ['cartId'],
      schema: {
        type: 'object',
        properties: {
          key1: {
            type: 'string'
          },
          key2: {
            type: 'number'
          },
          key3: {
            type: 'object',
            properties: {
              nestedKey: { type: 'string' }
            }
          }
        }
      },
      mappingScript: 'return { key1: "value", key2: 42, key3: { nestedKey: "nested" } };'
    }
  }
};

export const postApiGetMock: RestRequestConfig = {
  path: '/v1/external/get',
  method: 'post',
  routes: [{ data }]
};
