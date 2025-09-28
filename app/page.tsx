import { cookies } from 'next/headers';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui';
import { COOKIE_KEYS } from '@/src/utils/constants';

import { setTabCookieAction } from './(actions)';
import {
  ColorStylesTab,
  CommandsTab,
  ExternalApisTab,
  ScreensTab,
  TemplatesTab,
  TextStylesTab
} from './(components)';

const MAIN_PAGE_TABS = {
  SCREENS: 'screens',
  COMMANDS: 'commands',
  EXTERNAL_APIS: 'externalApis',
  TEXT_STYLES: 'textStyles',
  COLOR_STYLES: 'colorStyles',
  TEMPLATES: 'templates'
} as const;

const MainPage = async () => {
  const cookieStore = await cookies();
  const tab = cookieStore.get(COOKIE_KEYS.TAB)?.value ?? MAIN_PAGE_TABS.SCREENS;

  return (
    <div className='overflow-auto p-6'>
      <Tabs className='w-full' defaultValue={tab} onValueChange={setTabCookieAction}>
        <TabsList>
          <TabsTrigger value={MAIN_PAGE_TABS.SCREENS}>Screens</TabsTrigger>
          <TabsTrigger value={MAIN_PAGE_TABS.TEMPLATES}>Templates</TabsTrigger>
          <TabsTrigger value={MAIN_PAGE_TABS.COMMANDS}>Commands</TabsTrigger>
          <TabsTrigger value={MAIN_PAGE_TABS.EXTERNAL_APIS}>External APIs</TabsTrigger>
          <TabsTrigger value={MAIN_PAGE_TABS.TEXT_STYLES}>Text Styles</TabsTrigger>
          <TabsTrigger value={MAIN_PAGE_TABS.COLOR_STYLES}>Colors</TabsTrigger>
        </TabsList>

        <TabsContent className='mt-8' value={MAIN_PAGE_TABS.SCREENS}>
          <ScreensTab />
        </TabsContent>
        <TabsContent className='mt-8' value={MAIN_PAGE_TABS.TEMPLATES}>
          <TemplatesTab />
        </TabsContent>
        <TabsContent className='mt-8' value={MAIN_PAGE_TABS.COMMANDS}>
          <CommandsTab />
        </TabsContent>
        <TabsContent className='mt-8' value={MAIN_PAGE_TABS.EXTERNAL_APIS}>
          <ExternalApisTab />
        </TabsContent>
        <TabsContent className='mt-8' value={MAIN_PAGE_TABS.TEXT_STYLES}>
          <TextStylesTab />
        </TabsContent>
        <TabsContent className='mt-8' value={MAIN_PAGE_TABS.COLOR_STYLES}>
          <ColorStylesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainPage;
