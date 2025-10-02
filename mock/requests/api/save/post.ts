import type { RestRequestConfig } from 'mock-config-server';

import type { ApiRepresentation, APISaveResponseSuccess } from '@/generated/api/admin/models';

const data: APISaveResponseSuccess = {
  type: 'success',
  data: { api: {} as ApiRepresentation }
};

export const postApiSaveMock: RestRequestConfig = {
  path: '/v1/external/save',
  method: 'post',
  routes: [{ data }]
};
