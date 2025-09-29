import type { RestRequestConfig } from 'mock-config-server';

import type { ComponentTemplate, TemplateResponseSuccess } from '@/generated/api/admin/models';

import { generateEmptyComponent } from '@/src/utils/helpers';

const template: ComponentTemplate = {
  id: 'template-1',
  name: 'UserCard',
  component: {
    ...generateEmptyComponent({ id: `template-1-component`, type: 'box' }),
    type: 'box',
    children: [
      {
        ...generateEmptyComponent({ id: `template-1-children-1`, type: 'box' }),
        type: 'box',
        children: [generateEmptyComponent({ id: `template-1-children-2`, type: 'text' })]
      }
    ]
  },
  createdAtTimestampMs: Date.now(),
  lastModifiedAtTimestampMs: Date.now()
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
