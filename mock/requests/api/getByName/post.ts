import type { RestRequestConfig } from 'mock-config-server';

import type { APINamesResponseSuccess } from '@/generated/api/admin/models';

const data: APINamesResponseSuccess = {
  type: 'success',
  data: {
    apiNames: [
      { id: 'api-1', name: 'API 1', description: 'Описание' },
      { id: 'api-2', name: 'API 2', description: '' },
      { id: 'api-3', name: 'API 3', description: '' }
    ]
  }
};

export const postApiGetByNameMock: RestRequestConfig = {
  path: '/v1/external/getByName',
  method: 'post',
  routes: [{ data }]
};
