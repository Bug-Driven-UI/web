import type { RestRequestConfig } from 'mock-config-server';

import type { ScreenNamesResponseSuccess } from '@/generated/api/admin/models';

const data: ScreenNamesResponseSuccess = {
  type: 'success',
  data: {
    screenNames: [
      { id: '1', name: 'Главный экран', description: 'Описание' },
      { id: '2', name: 'Второй экран', description: '' },
      { id: '3', name: 'Третий экран', description: '' }
    ]
  }
};

export const postScreenGetByNameMock: RestRequestConfig = {
  path: '/v1/screen/getByName',
  method: 'post',
  routes: [{ data }]
};
