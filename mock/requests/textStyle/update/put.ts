import type { RestRequestConfig } from 'mock-config-server';

import type { TextStyleUpdateResponseSuccess } from '@/generated/api/admin/models';

const data: TextStyleUpdateResponseSuccess = {
  type: 'success',
  textStyle: {
    id: 'text-style-1',
    token: 'heading.lg',
    size: 24,
    weight: 600,
    decoration: 'italic'
  }
};

export const putTextStyleUpdateMock: RestRequestConfig = {
  path: '/v1/textStyle/update',
  method: 'put',
  routes: [{ data }]
};
