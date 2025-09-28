import type { RestRequestConfig } from 'mock-config-server';

import type {
  ComponentTemplate,
  TemplateUpdateResponseSuccess
} from '@/generated/api/admin/models';

import { generateEmptyComponent } from '@/src/utils/helpers';

const template: ComponentTemplate = {
  id: 'template-1',
  name: 'UserCard',
  component: generateEmptyComponent({ id: 'template-1-component', type: 'box' }),
  createdAtTimestampMs: 1_720_003_000_000,
  lastModifiedAtTimestampMs: 1_720_005_000_000
};

const data: TemplateUpdateResponseSuccess = {
  type: 'success',
  template
};

export const putTemplateUpdateMock: RestRequestConfig = {
  path: '/v1/template/update',
  method: 'put',
  routes: [{ data }]
};
