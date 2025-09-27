import type { RestRequestConfig } from 'mock-config-server';

import type { CommandsByNameResponseSuccess } from '@/generated/api/admin/models';

const data: CommandsByNameResponseSuccess = {
  type: 'success',
  data: {
    commands: [
      { id: 'command-1', name: 'GenerateReport' },
      { id: 'command-2', name: 'CreateInvoice' },
      { id: 'command-3', name: 'SyncInventory' }
    ]
  }
};

export const postCommandGetByNameMock: RestRequestConfig = {
  path: '/v1/command/getByName',
  method: 'post',
  routes: [{ data }]
};
