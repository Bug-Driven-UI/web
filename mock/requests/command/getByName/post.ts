import type { RestRequestConfig } from 'mock-config-server';

import type { CommandsByNameResponseSuccess } from '@/generated/api/admin/models';

const data: CommandsByNameResponseSuccess = {
  type: 'success',
  data: {
    commands: [
      {
        id: 'command-1',
        name: 'GenerateReport',
        apis: [],
        createdAtTimestampMs: 1_720_004_000_000,
        lastModifiedAtTimestampMs: 1_720_004_500_000,
        params: []
      },
      {
        id: 'command-2',
        name: 'CreateInvoice',
        apis: [],
        createdAtTimestampMs: 1_720_004_000_000,
        lastModifiedAtTimestampMs: 1_720_004_500_000,
        params: []
      },
      {
        id: 'command-3',
        name: 'SyncInventory',
        apis: [],
        createdAtTimestampMs: 1_720_004_000_000,
        lastModifiedAtTimestampMs: 1_720_004_500_000,
        params: []
      }
    ]
  }
};

export const postCommandGetByNameMock: RestRequestConfig = {
  path: '/v1/command/getByName',
  method: 'post',
  routes: [{ data }]
};
