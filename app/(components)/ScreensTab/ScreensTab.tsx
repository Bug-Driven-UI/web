import { postV1ScreenGetByName } from '@/generated/api/admin/requests/bduiApi';
import { Card, CardContent, CardHeader } from '@/src/components/ui';

import { ScreensTable } from './ScreensTable/ScreensTable';

export const ScreensTab = async () => {
  const postV1ScreenGetByNameResponse = await postV1ScreenGetByName({ data: {} });

  return (
    <Card>
      <CardHeader>Управление экранами, которые являются основной сущностью в BD UI.</CardHeader>
      <CardContent>
        <ScreensTable screens={postV1ScreenGetByNameResponse.data.screenNames} />
      </CardContent>
    </Card>
  );
};
