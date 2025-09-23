import { Card, CardContent, CardHeader } from '@/src/components/ui';

import { CommandsTable } from './components';

export const CommandsTab = () => {
  // todo request for screens

  return (
    <Card>
      <CardHeader>
        Управление командами, которые представляют собой действия на экране...
      </CardHeader>
      <CardContent>
        <CommandsTable />
      </CardContent>
    </Card>
  );
};
