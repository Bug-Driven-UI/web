import type { RestRequestConfig } from 'mock-config-server';

import type { ComponentTemplate, TemplateResponseSuccess } from '@/generated/api/admin/models';

import { generateEmptyComponent } from '@/src/utils/helpers';

const template: ComponentTemplate = {
  id: 'template-1',
  name: 'UserCard',
  component: generateEmptyComponent({ id: 'template-1-component', type: 'box' }),
  createdAtTimestampMs: 1_720_003_000_000,
  lastModifiedAtTimestampMs: 1_720_003_500_000
};

const data: TemplateResponseSuccess = {
  type: 'success',
  command: template
};

export const postTemplateGetMock: RestRequestConfig = {
  path: '/v1/template/get',
  method: 'post',
  routes: [{ data }]
};
