import type { RestRequestConfig } from 'mock-config-server';

import type { ApiRepresentation, APIUpdateResponseSuccess } from '@/generated/api/admin/models';

const data: APIUpdateResponseSuccess = {
  type: 'success',
  data: { api: {} as ApiRepresentation }
};

export const putApiUpdateMock: RestRequestConfig = {
  path: '/v1/api/update',
  method: 'put',
  routes: [{ data }]
};
