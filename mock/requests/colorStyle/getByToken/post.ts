import type { RestRequestConfig } from 'mock-config-server';

import type { ColorStylesByTokenResponseSuccess } from '@/generated/api/admin/models';

const data: ColorStylesByTokenResponseSuccess = {
  type: 'success',
  data: {
    colorStyles: [
      { id: 'color-style-1', token: 'background.primary', color: '#3366FF' },
      { id: 'color-style-2', token: 'button.primary', color: '#FF6F61' },
      { id: 'color-style-3', token: 'badge.warning', color: '#FFC107' }
    ]
  }
};

export const postColorStyleGetByTokenMock: RestRequestConfig = {
  path: '/v1/colorStyle/getByToken',
  method: 'post',
  routes: [{ data }]
};
