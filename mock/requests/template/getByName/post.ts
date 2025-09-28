import type { RestRequestConfig } from 'mock-config-server';

import type { Component, TemplatesByNameResponseSuccess } from '@/generated/api/admin/models';

import { generateEmptyComponent } from '@/src/utils/helpers';

const createTemplate = (id: string, name: string, type: Component['type']) => ({
  id,
  name,
  component: generateEmptyComponent({ id: `${id}-component`, type }),
  createdAtTimestampMs: Date.now(),
  lastModifiedAtTimestampMs: Date.now()
});

const data: TemplatesByNameResponseSuccess = {
  type: 'success',
  data: {
    templates: [
      createTemplate('template-1', 'UserCard', 'box'),
      createTemplate('template-2', 'OrderSummary', 'row'),
      createTemplate('template-3', 'ProductTile', 'column')
    ]
  }
};

export const postTemplateGetByNameMock: RestRequestConfig = {
  path: '/v1/template/getByName',
  method: 'post',
  routes: [{ data }]
};
