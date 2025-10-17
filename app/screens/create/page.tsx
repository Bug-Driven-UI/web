import type { Component } from '@/generated/api/admin/models';
import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { ComponentPanel, DragDropArea } from '@/app/templates/(components)';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/src/components/ui';
import { ComponentsProvider } from '@/src/utils/contexts/components';
import { DragDropProvider } from '@/src/utils/contexts/dragDrop';
import { ScreenProvider } from '@/src/utils/contexts/screen';
import { generateEmptyComponent, isCompositeComponent } from '@/src/utils/helpers';

import { ScreenPanel } from '../(components)';

export const dynamic = 'force-dynamic';

const CreateScreenPage = async () => {
  const topBarComponent: Component = generateEmptyComponent({
    id: 'top-bar',
    type: 'row'
  });
  const contentComponent: Component = generateEmptyComponent({
    id: crypto.randomUUID(),
    type: 'column'
  });
  const bottomBarComponent: Component = generateEmptyComponent({
    id: 'bottom-bar',
    type: 'row'
  });

  const initialScreenComponents = new Map<string, Component>();
  const buildDragDropComponent = (component: Component): DragDropComponent => {
    initialScreenComponents.set(component.id, component);

    if (!isCompositeComponent(component)) {
      return {
        id: component.id,
        type: component.type
      };
    }

    return {
      id: component.id,
      type: component.type,
      children: component.children.map((child) => buildDragDropComponent(child))
    };
  };

  const initialDragDropComponents: DragDropComponent[] = [];

  initialDragDropComponents.push(buildDragDropComponent(topBarComponent));
  initialDragDropComponents.push(buildDragDropComponent(contentComponent));
  initialDragDropComponents.push(buildDragDropComponent(bottomBarComponent));

  return (
    <ComponentsProvider action='create' initialComponents={initialScreenComponents}>
      <DragDropProvider action='create' initialComponents={initialDragDropComponents}>
        <ScreenProvider action='create'>
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={35}>
              <div className='overflow-y-auto'>
                <ScreenPanel />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={65}>
              <div className='h-full overflow-y-auto'>
                <DragDropArea />
              </div>
            </ResizablePanel>
            <ComponentPanel />
          </ResizablePanelGroup>
        </ScreenProvider>
      </DragDropProvider>
    </ComponentsProvider>
  );
};

export default CreateScreenPage;
