import type { RestRequestConfig } from 'mock-config-server';

import type { CommandUpdateResponseSuccess } from '@/generated/api/admin/models';

const data: CommandUpdateResponseSuccess = {
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
    itemTemplate: {} as NonNullable<CommandUpdateResponseSuccess['command']>['itemTemplate'],
    fallbackMessage: 'Не удалось сформировать отчёт',
    createdAtTimestampMs: 1_720_000_000_000,
    lastModifiedAtTimestampMs: 1_720_002_000_000
  }
};

export const putCommandUpdateMock: RestRequestConfig = {
  path: '/v1/command/update',
  method: 'put',
  routes: [{ data }]
};
