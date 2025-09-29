import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/src/components/ui';
import { ComponentsProvider } from '@/src/utils/contexts/components';
import { DragDropProvider } from '@/src/utils/contexts/dragDrop';
import { TemplateProvider } from '@/src/utils/contexts/template';

import { ComponentPanel, DragDropArea, TemplatePanel } from '../(components)';

export const dynamic = 'force-dynamic';

const TemplatesCreatePage = () => {
  return (
    <TemplateProvider>
      <DragDropProvider action='create' allowMultiple={false}>
        <ComponentsProvider action='create'>
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={20}>
              <div className='overflow-y-auto'>
                <TemplatePanel />
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
        </ComponentsProvider>
      </DragDropProvider>
    </TemplateProvider>
  );
};

export default TemplatesCreatePage;
