import { postV1ExternalGetByName } from '@/generated/api/admin/requests/bduiApi';
import { Card, CardContent, CardHeader } from '@/src/components/ui';

import { ExternalApisTable } from './components';

export const ExternalApisTab = async () => {
  const postV1ExternalGetByNameResponse = await postV1ExternalGetByName({ data: { query: '' } });

  return (
    <Card>
      <CardHeader>
        Управление внешними API, которые представляют собой запросы за данными на сторонние сервисы
      </CardHeader>
      <CardContent>
        <ExternalApisTable externalApis={postV1ExternalGetByNameResponse.data.apiNames} />
      </CardContent>
    </Card>
  );
};
