import { postV1TemplateGetByName } from '@/generated/api/admin/requests/bduiApi';
import { Card, CardContent, CardHeader } from '@/src/components/ui';

import { TemplatesTable } from './TemplatesTable/TemplatesTable';

export const TemplatesTab = async () => {
  const postV1TemplateGetByNameResponse = await postV1TemplateGetByName({ data: { query: '' } });

  return (
    <Card>
      <CardHeader>
        Управление UI-шаблонами, которые могут быть переиспользованы на экранах
      </CardHeader>
      <CardContent>
        <TemplatesTable templates={postV1TemplateGetByNameResponse.data.templates} />
      </CardContent>
    </Card>
  );
};
