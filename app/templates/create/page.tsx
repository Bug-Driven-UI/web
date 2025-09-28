import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/src/components/ui';
import { ComponentsProvider } from '@/src/utils/contexts/components';
import { DragDropProvider } from '@/src/utils/contexts/dragDrop';
import { TemplateProvider } from '@/src/utils/contexts/template';

import { ComponentPanel, DragDropArea, TemplatePanel } from '../(components)';

const TemplatesCreatePage = () => {
  return (
    <TemplateProvider>
      <ComponentsProvider action='create'>
        <DragDropProvider action='create' allowMultiple={false}>
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
        </DragDropProvider>
      </ComponentsProvider>
    </TemplateProvider>
  );
};

export default TemplatesCreatePage;
