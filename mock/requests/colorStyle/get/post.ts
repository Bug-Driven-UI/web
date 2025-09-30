import type { RestRequestConfig } from 'mock-config-server';

import type { ColorStyleResponseSuccess } from '@/generated/api/admin/models';

const data: ColorStyleResponseSuccess = {
  type: 'success',
  data: {
    colorStyle: {
      id: 'color-style-1',
      token: 'background.primary',
      color: '#3366FF'
    }
  }
};

export const postColorStyleGetMock: RestRequestConfig = {
  path: '/v1/colorStyle/get',
  method: 'post',
  routes: [{ data }]
};
