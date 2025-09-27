import type { RestRequestConfig } from 'mock-config-server';

import type { TextStyleResponseSuccess } from '@/generated/api/admin/models';

const data: TextStyleResponseSuccess = {
  type: 'success',
  textStyle: {
    id: 'text-style-1',
    token: 'heading.lg',
    size: 24,
    weight: 600,
    decoration: 'italic'
  }
};

export const postTextStyleGetMock: RestRequestConfig = {
  path: '/v1/textStyle/get',
  method: 'post',
  routes: [{ data }]
};
