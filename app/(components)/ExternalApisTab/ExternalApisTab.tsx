import { postV1ApiGetByName } from '@/generated/api/admin/requests/bduiApi';
import { Card, CardContent, CardHeader } from '@/src/components/ui';

import { ExternalApisTable } from './components';

export const ExternalApisTab = async () => {
  const postV1ApiGetByNameResponse = await postV1ApiGetByName({ data: {} });

  return (
    <Card>
      <CardHeader>
        Управление внешними API, которые представляют собой запросы за данными на сторонние сервисы
      </CardHeader>
      <CardContent>
        <ExternalApisTable externalApis={postV1ApiGetByNameResponse.data.apiNames} />
      </CardContent>
    </Card>
  );
};
