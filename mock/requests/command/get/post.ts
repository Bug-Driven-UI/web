import type { RestRequestConfig } from 'mock-config-server';

import type { CommandResponseSuccess } from '@/generated/api/admin/models';

const data: CommandResponseSuccess = {
  type: 'success',
  command: {
    id: 'command-1',
    name: 'GenerateReport',
    commandParams: ['startDate', 'endDate'],
    // todo update after backend to id
    apis: [
      { apiName: 'api-1', apiAlias: 'api-1', apiParams: ['startDate', 'endDate'] },
      { apiName: 'api-2', apiAlias: 'api-2', apiParams: ['startDate', 'endDate'] }
    ],
    // todo update after backend to id
    itemTemplate: {} as NonNullable<CommandResponseSuccess['command']>['itemTemplate'],
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
