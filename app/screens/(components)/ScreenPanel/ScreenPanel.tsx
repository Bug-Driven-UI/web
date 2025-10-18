import { cookies } from 'next/headers';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { setScreenTabCookieAction } from '@/app/(actions)/setScreenTabCookieAction';
import {
  TemplatePanelComponentsTab,
  TemplatePanelTemplatesTab
} from '@/app/templates/(components)/TemplatePanel/components';
import {
  postV1ExternalGetByName,
  postV1TemplateGetByName
} from '@/generated/api/admin/requests/bduiApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui';
import { COOKIE_KEYS } from '@/src/utils/constants';

import { SCREEN_PANEL_TABS } from '../../constants';
import { SaveScreenButton, ScreenPanelMainTab, ScreenPanelStatesTab } from './components';

export const ScreenPanel = async () => {
  const [postV1TemplateGetByNameResponse, postV1ExternalGetByNameResponse] = await Promise.all([
    postV1TemplateGetByName({ data: { query: '' } }),
    postV1ExternalGetByName({ data: { query: '' } })
  ]);
  const templateComponents = postV1TemplateGetByNameResponse.data.templates.map(
    (template) =>
      ({
        id: template.id,
        type: template.name,
        template
      }) as DragDropComponent
  );

  const cookieStore = await cookies();
  const tab = cookieStore.get(COOKIE_KEYS.SCREEN_TAB)?.value ?? SCREEN_PANEL_TABS.MAIN;

  return (
    <div className='p-6'>
      <Tabs defaultValue={tab} onValueChange={setScreenTabCookieAction}>
        <div className='flex justify-between'>
          <TabsList className='mb-4'>
            <TabsTrigger value={SCREEN_PANEL_TABS.MAIN}>Основное</TabsTrigger>
            <TabsTrigger value={SCREEN_PANEL_TABS.STATES}>Стэйты</TabsTrigger>
            <TabsTrigger value={SCREEN_PANEL_TABS.COMPONENTS}>Компоненты</TabsTrigger>
            <TabsTrigger value={SCREEN_PANEL_TABS.TEMPLATES}>Шаблоны</TabsTrigger>
            <TabsTrigger value={SCREEN_PANEL_TABS.PREVIEW}>Preview mode</TabsTrigger>
          </TabsList>
          <SaveScreenButton />
        </div>

        <TabsContent value={SCREEN_PANEL_TABS.MAIN}>
          <ScreenPanelMainTab availableApis={postV1ExternalGetByNameResponse.data.apiNames} />
        </TabsContent>
        <TabsContent value={SCREEN_PANEL_TABS.STATES}>
          <ScreenPanelStatesTab />
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
