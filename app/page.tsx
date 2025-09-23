import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui';

import { CommandsTab, ScreensTab } from './(components)';

const MainPage = () => (
  <div>
    <Tabs className='w-full' defaultValue='commands'>
      <TabsList>
        <TabsTrigger value='screens'>Экраны</TabsTrigger>
        <TabsTrigger value='commands'>Команды</TabsTrigger>
        <TabsTrigger value='apis'>Внешние API</TabsTrigger>
        <TabsTrigger value='styles'>Стили</TabsTrigger>
      </TabsList>

      <TabsContent className='mt-8' value='screens'>
        <ScreensTab />
      </TabsContent>
      <TabsContent className='mt-8' value='commands'>
        <CommandsTab />
      </TabsContent>
    </Tabs>
  </div>
);

export default MainPage;
