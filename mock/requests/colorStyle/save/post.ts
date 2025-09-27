import type { RestRequestConfig } from 'mock-config-server';

import type { ColorStyleSaveResponseSuccess } from '@/generated/api/admin/models';

const data: ColorStyleSaveResponseSuccess = {
  type: 'success',
  data: {
    colorStyle: {
      id: 'color-style-2',
      token: 'button.primary',
      color: '#FF6F61'
    }
  }
};

export const postColorStyleSaveMock: RestRequestConfig = {
  path: '/v1/colorStyle/save',
  method: 'post',
  routes: [{ data }]
};
