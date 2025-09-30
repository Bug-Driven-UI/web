import { postV1CommandGetByName } from '@/generated/api/admin/requests/bduiApi';
import { Card, CardContent, CardHeader } from '@/src/components/ui';

import { CommandsTable } from './components';

export const CommandsTab = async () => {
  const postV1CommandGetByNameResponse = await postV1CommandGetByName({ data: { query: '' } });

  return (
    <Card>
      <CardHeader>
        Управление командами, которые представляют собой действия на экране...
      </CardHeader>
      <CardContent>
        <CommandsTable commands={postV1CommandGetByNameResponse.data.commands} />
      </CardContent>
    </Card>
  );
};
