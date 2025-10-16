import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { postV1TemplateGetByName } from '@/generated/api/admin/requests/bduiApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui';

import { TEMPLATE_PANEL_TABS } from '../../constants';
import {
  SaveTemplateButton,
  TemplatePanelComponentsTab,
  TemplatePanelMainTab,
  TemplatePanelTemplatesTab
} from './components';

export const TemplatePanel = async () => {
  const postV1TemplateGetByNameResponse = await postV1TemplateGetByName({ data: { query: '' } });
  const templateComponents = postV1TemplateGetByNameResponse.data.templates.map(
    (template) =>
      ({
        id: template.id,
        type: template.name,
        template
      }) as DragDropComponent
  );

  return (
    <div className='p-6'>
      <Tabs defaultValue={TEMPLATE_PANEL_TABS.MAIN}>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <TabsList className='mb-4'>
            <TabsTrigger value={TEMPLATE_PANEL_TABS.MAIN}>Основное</TabsTrigger>
            <TabsTrigger value={TEMPLATE_PANEL_TABS.COMPONENTS}>Компоненты</TabsTrigger>
            <TabsTrigger value={TEMPLATE_PANEL_TABS.TEMPLATES}>Шаблоны</TabsTrigger>
            <TabsTrigger value={TEMPLATE_PANEL_TABS.PREVIEW}>Preview mode</TabsTrigger>
          </TabsList>
          <SaveTemplateButton />
        </div>

        <TabsContent value={TEMPLATE_PANEL_TABS.MAIN}>
          <TemplatePanelMainTab />
        </TabsContent>
        <TabsContent value={TEMPLATE_PANEL_TABS.COMPONENTS}>
          <TemplatePanelComponentsTab />
        </TabsContent>
        <TabsContent value={TEMPLATE_PANEL_TABS.TEMPLATES}>
          <TemplatePanelTemplatesTab templateComponents={templateComponents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
