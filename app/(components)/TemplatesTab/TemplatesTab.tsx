import { postV1TemplateGetByName } from '@/generated/api/admin/requests/bduiApi';
import { Card, CardContent, CardHeader } from '@/src/components/ui';

import { TemplatesTable } from './TemplatesTable/TemplatesTable';

export const TemplatesTab = async () => {
  const postV1TemplateGetByNameResponse = await postV1TemplateGetByName({ data: {} });

  return (
    <Card>
      <CardHeader>
        Управление UI-шаблонами, которые пере используются в различных экранах и командах.
      </CardHeader>
      <CardContent>
        <TemplatesTable templates={postV1TemplateGetByNameResponse.data.templates} />
      </CardContent>
    </Card>
  );
};
