import type { RestRequestConfig } from 'mock-config-server';

import type { TextStylesByTokenResponseSuccess } from '@/generated/api/admin/models';

const data: TextStylesByTokenResponseSuccess = {
  type: 'success',
  data: {
    textStyles: [
      { id: 'text-style-1', token: 'heading.lg', size: 24, weight: 600, decoration: 'italic' },
      { id: 'text-style-2', token: 'body.md', size: 16, weight: 400, decoration: 'regular' },
      { id: 'text-style-3', token: 'caption.sm', size: 12, weight: 400, decoration: 'regular' }
    ]
  }
};

export const postTextStyleGetByTokenMock: RestRequestConfig = {
  path: '/v1/textStyle/getByToken',
  method: 'post',
  routes: [{ data }]
};
