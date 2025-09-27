import type { RestRequestConfig } from 'mock-config-server';

import type { TemplatesByNameResponseSuccess } from '@/generated/api/admin/models';

const data: TemplatesByNameResponseSuccess = {
  type: 'success',
  data: {
    templates: [
      { id: 'template-1', name: 'UserCard' },
      { id: 'template-2', name: 'OrderSummary' },
      { id: 'template-3', name: 'ProductTile' }
    ]
  }
};

export const postTemplateGetByNameMock: RestRequestConfig = {
  path: '/v1/template/getByName',
  method: 'post',
  routes: [{ data }]
};
