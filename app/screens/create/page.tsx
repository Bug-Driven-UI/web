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

const CreateScreenPage = () => {
  const topBarComponent: Component = generateEmptyComponent({
    id: crypto.randomUUID(),
    type: 'row'
  });
  const contentComponent: Component = generateEmptyComponent({
    id: crypto.randomUUID(),
    type: 'column'
  });
  const bottomBarComponent: Component = generateEmptyComponent({
    id: crypto.randomUUID(),
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
  initialDragDropComponents.push(contentComponent);
  initialDragDropComponents.push(bottomBarComponent);

  return (
    <ScreenProvider action='create'>
      <DragDropProvider action='create' initialComponents={initialDragDropComponents}>
        <ComponentsProvider action='create' initialComponents={initialScreenComponents}>
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={20}>
              <div className='overflow-y-auto'>
                <ScreenPanel />
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
    </ScreenProvider>
  );
};

export default CreateScreenPage;
