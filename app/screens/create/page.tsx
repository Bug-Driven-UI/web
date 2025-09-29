import { ComponentPanel, DragDropArea } from '@/app/templates/(components)';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/src/components/ui';
import { ComponentsProvider } from '@/src/utils/contexts/components';
import { DragDropProvider } from '@/src/utils/contexts/dragDrop';
import { ScreenProvider } from '@/src/utils/contexts/screen';

export const dynamic = 'force-dynamic';

const CreateScreenPage = () => {
  return (
    <ScreenProvider>
      <ComponentsProvider action='create'>
        <DragDropProvider action='create'>
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={20}>
              <div className='overflow-y-auto'>
                {/* // todo  */}
                {/* <TemplatePanel /> */}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={75}>
              <div className='h-full overflow-y-auto'>
                <DragDropArea />
              </div>
            </ResizablePanel>
            <ComponentPanel />
          </ResizablePanelGroup>
        </DragDropProvider>
      </ComponentsProvider>
    </ScreenProvider>
  );
};

export default CreateScreenPage;
