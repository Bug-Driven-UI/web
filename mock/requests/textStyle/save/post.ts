import type { RestRequestConfig } from 'mock-config-server';

import type { TextStyleSaveResponseSuccess } from '@/generated/api/admin/models';

const data: TextStyleSaveResponseSuccess = {
  type: 'success',
  data: {
    textStyle: {
      id: 'text-style-4',
      token: 'button.label',
      size: 16,
      weight: 500,
      decoration: 'italic'
    }
  }
};

export const postTextStyleSaveMock: RestRequestConfig = {
  path: '/v1/textStyle/save',
  method: 'post',
  routes: [{ data }]
};
