import type { RestRequestConfig } from 'mock-config-server';

import type { ComponentTemplate, TemplateSaveResponseSuccess } from '@/generated/api/admin/models';

import { generateEmptyComponent } from '@/src/utils/helpers';

const template: ComponentTemplate = {
  id: 'template-2',
  name: 'OrderSummary',
  component: generateEmptyComponent({ id: 'template-2-component', type: 'row' }),
  createdAtTimestampMs: 1_720_004_000_000,
  lastModifiedAtTimestampMs: 1_720_004_500_000
};

const data: TemplateSaveResponseSuccess = {
  type: 'success',
  data: { template }
};

export const postTemplateSaveMock: RestRequestConfig = {
  path: '/v1/template/save',
  method: 'post',
  routes: [{ data }]
};
