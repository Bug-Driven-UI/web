import type { RestRequestConfig } from 'mock-config-server';

import type { CommandSaveResponseSuccess } from '@/generated/api/admin/models';

const data: CommandSaveResponseSuccess = {
  type: 'success',
  data: {
    command: {
      id: 'command-2',
      name: 'CreateInvoice',
      params: ['clientId', 'amount'],
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
            { name: 'clientId', value: '{{ inputs.clientId }}' },
            { name: 'amount', value: '{{ inputs.amount }}' }
          ]
        }
      ],
      itemTemplateId: 'template-1',
      fallbackMessage: 'Не удалось создать счёт',
      createdAtTimestampMs: 1_720_001_000_000,
      lastModifiedAtTimestampMs: 1_720_001_500_000
    }
  }
};

export const postCommandSaveMock: RestRequestConfig = {
  path: '/v1/command/save',
  method: 'post',
  routes: [{ data }]
};
