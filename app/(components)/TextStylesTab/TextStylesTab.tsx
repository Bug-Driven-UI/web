import { postV1TextStyleGetByToken } from '@/generated/api/admin/requests/bduiApi';
import { Card, CardContent, CardHeader } from '@/src/components/ui';

import { TextStylesTable } from './components';

export const TextStylesTab = async () => {
  const postV1TextStyleGetByTokenResponse = await postV1TextStyleGetByToken({
    data: { query: '' }
  });

  return (
    <Card>
      <CardHeader>Управление стилями текста через токены</CardHeader>
      <CardContent>
        <TextStylesTable textStyles={postV1TextStyleGetByTokenResponse.data.textStyles} />
      </CardContent>
    </Card>
  );
};
