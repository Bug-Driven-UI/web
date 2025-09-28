import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/src/components/ui';
import { DragDropProvider } from '@/src/utils/contexts/dragDrop';
import { TemplateProvider } from '@/src/utils/contexts/template';

import { ComponentPanel, DragDropArea, TemplatePanel } from './(components)';

const TemplatesCreatePage = () => {
  return (
    <DragDropProvider>
      <TemplateProvider action='create'>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={25}>
            <div className='max-h-full overflow-y-auto'>
              <TemplatePanel />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50}>
            <DragDropArea />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25}>
            <ComponentPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TemplateProvider>
    </DragDropProvider>
  );
};

export default TemplatesCreatePage;
