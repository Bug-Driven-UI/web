import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { postV1TemplateGetByName } from '@/generated/api/admin/requests/bduiApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui';

import {
  TemplatePanelComponentsTab,
  TemplatePanelMainTab,
  TemplatePanelTemplatesTab
} from './components';
import { TEMPLATE_PANEL_TABS } from './constants';

export const TemplatePanel = async () => {
  const postV1TemplateGetByNameResponse = await postV1TemplateGetByName({ data: {} });
  const templateComponents: DragDropComponent[] =
    postV1TemplateGetByNameResponse.data.templates.map((template) => ({
      id: template.id,
      name: template.name,
      type: template.name
    }));

  return (
    <div className='p-6'>
      <Tabs defaultValue={TEMPLATE_PANEL_TABS.MAIN}>
        <TabsList className='mx-auto mb-4'>
          <TabsTrigger value={TEMPLATE_PANEL_TABS.MAIN}>Main</TabsTrigger>
          <TabsTrigger value={TEMPLATE_PANEL_TABS.COMPONENTS}>Components</TabsTrigger>
          <TabsTrigger value={TEMPLATE_PANEL_TABS.TEMPLATES}>Templates</TabsTrigger>
        </TabsList>

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
