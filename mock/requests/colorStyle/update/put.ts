import type { RestRequestConfig } from 'mock-config-server';

import type { ColorStyleUpdateResponseSuccess } from '@/generated/api/admin/models';

const data: ColorStyleUpdateResponseSuccess = {
  type: 'success',
  data: {
    colorStyle: {
      id: 'color-style-2',
      token: 'button.primary',
      color: '#FF6F61'
    }
  }
};

export const putColorStyleUpdateMock: RestRequestConfig = {
  path: '/v1/colorStyle/update',
  method: 'put',
  routes: [{ data }]
};
