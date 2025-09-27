import type { RestRequestConfig } from 'mock-config-server';

import type { CommandSaveResponseSuccess } from '@/generated/api/admin/models';

const data: CommandSaveResponseSuccess = {
  type: 'success',
  data: {
    command: {
      id: 'command-2',
      name: 'CreateInvoice',
      commandParams: ['clientId', 'amount'],
      // todo update after backend to id
      apis: [
        { apiName: 'api-1', apiAlias: 'api-1', apiParams: ['startDate', 'endDate'] },
        { apiName: 'api-2', apiAlias: 'api-2', apiParams: ['startDate', 'endDate'] }
      ],
      // todo update after backend to id
      itemTemplate: {} as NonNullable<
        CommandSaveResponseSuccess['data']['command']
      >['itemTemplate'],
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
