import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import {
  TemplatePanelComponentsTab,
  TemplatePanelTemplatesTab
} from '@/app/templates/(components)/TemplatePanel/components';
import {
  postV1ApiGetByName,
  postV1TemplateGetByName
} from '@/generated/api/admin/requests/bduiApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui';

import { SaveScreenButton, ScreenPanelMainTab } from './components';
import { SCREEN_PANEL_TABS } from './constants';

export const ScreenPanel = async () => {
  const [postV1TemplateGetByNameResponse, postV1ApiGetByNameResponse] = await Promise.all([
    postV1TemplateGetByName({ data: { query: '' } }),
    postV1ApiGetByName({ data: { query: '' } })
  ]);
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
      <Tabs defaultValue={SCREEN_PANEL_TABS.MAIN}>
        <div className='flex justify-between'>
          <TabsList className='mb-4'>
            <TabsTrigger value={SCREEN_PANEL_TABS.MAIN}>Main</TabsTrigger>
            <TabsTrigger value={SCREEN_PANEL_TABS.COMPONENTS}>Components</TabsTrigger>
            <TabsTrigger value={SCREEN_PANEL_TABS.TEMPLATES}>Templates</TabsTrigger>
          </TabsList>
          <SaveScreenButton />
        </div>

        <TabsContent value={SCREEN_PANEL_TABS.MAIN}>
          <ScreenPanelMainTab availableApis={postV1ApiGetByNameResponse.data.apiNames} />
        </TabsContent>
        <TabsContent value={SCREEN_PANEL_TABS.COMPONENTS}>
          <TemplatePanelComponentsTab />
        </TabsContent>
        <TabsContent value={SCREEN_PANEL_TABS.TEMPLATES}>
          <TemplatePanelTemplatesTab templateComponents={templateComponents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
