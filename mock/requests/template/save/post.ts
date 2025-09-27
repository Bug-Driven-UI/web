import type { RestRequestConfig } from 'mock-config-server';

import type { ComponentTemplate, TemplateSaveResponseSuccess } from '@/generated/api/admin/models';

const data: TemplateSaveResponseSuccess = {
  type: 'success',
  data: {
    template: {
      id: 'template-2',
      name: 'OrderSummary',
      component: {} as ComponentTemplate['component'],
      createdAtTimestampMs: 1_720_004_000_000,
      lastModifiedAtTimestampMs: 1_720_004_500_000
    }
  }
};

export const postTemplateSaveMock: RestRequestConfig = {
  path: '/v1/template/save',
  method: 'post',
  routes: [{ data }]
};
