import { postV1ColorStyleGetByToken } from '@/generated/api/admin/requests/bduiApi';
import { Card, CardContent, CardHeader } from '@/src/components/ui';

import { ColorStylesTable } from './components';

export const ColorStylesTab = async () => {
  const postV1ColorStyleGetByTokenResponse = await postV1ColorStyleGetByToken({
    data: { query: '' }
  });

  return (
    <Card>
      <CardHeader>Управление цветами через токены</CardHeader>
      <CardContent>
        <ColorStylesTable colorStyles={postV1ColorStyleGetByTokenResponse.data.colorStyles} />
      </CardContent>
    </Card>
  );
};
