import type { RestRequestConfig } from 'mock-config-server';

import type { CommandResponseSuccess } from '@/generated/api/admin/models';

const data: CommandResponseSuccess = {
  type: 'success',
  command: {
    id: 'command-1',
    name: 'GenerateReport',
    params: ['startDate', 'endDate'],
    apis: [
      {
        id: 'api-1',
        alias: 'api-1',
        params: [
          { name: 'startDate', value: '{{ inputs.startDate }}' },
          { name: 'endDate', value: '{{ inputs.endDate }}' }
        ]
      },
      {
        id: 'api-2',
        alias: 'api-2',
        params: [
          { name: 'country', value: '{{ inputs.country }}' },
          { name: 'department', value: '{{ inputs.department }}' }
        ]
      }
    ],
    itemTemplateId: 'template-1',
    fallbackMessage: 'Не удалось сформировать отчёт',
    createdAtTimestampMs: 1_720_000_000_000,
    lastModifiedAtTimestampMs: 1_720_000_500_000
  }
};

export const postCommandGetMock: RestRequestConfig = {
  path: '/v1/command/get',
  method: 'post',
  routes: [{ data }]
};
