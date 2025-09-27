import type { RestRequestConfig } from 'mock-config-server';

import type {
  ComponentTemplate,
  TemplateUpdateResponseSuccess
} from '@/generated/api/admin/models';

const data: TemplateUpdateResponseSuccess = {
  type: 'success',
  template: {
    id: 'template-1',
    name: 'UserCard',
    component: {} as ComponentTemplate['component'],
    createdAtTimestampMs: 1_720_003_000_000,
    lastModifiedAtTimestampMs: 1_720_005_000_000
  }
};

export const putTemplateUpdateMock: RestRequestConfig = {
  path: '/v1/template/update',
  method: 'put',
  routes: [{ data }]
};
