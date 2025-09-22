import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useEffect } from 'react';

import type { ComponentData, CompositeComponentData } from '@/app/types';

import { ScreenComponent } from '../ScreenComponent/ScreenComponent';

export interface ScreenCompositeComponentProps {
  component: CompositeComponentData;
  updateChildrenById: (id: string, children: ComponentData[]) => void;
}

export const ScreenCompositeComponent = ({
  component,
  updateChildrenById
}: ScreenCompositeComponentProps) => {
  const [childrenComponentsRef, childrenComponents] = useDragAndDrop<HTMLDivElement, ComponentData>(
    component.children,
    {
      name: `${component.type}-${component.id}`,
      group: 'screen',
      sortable: false,
      dropZone: true,
      plugins: [dropOrSwap({ shouldSwap: () => false })]
    }
  );

  useEffect(() => {
    updateChildrenById(component.id, childrenComponents);
  }, [childrenComponents]);

  return (
    <div className='border-border/60 rounded-2xl border p-1 shadow-sm'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <p className='text-muted-foreground text-xs font-semibold tracking-wide uppercase'>
            {component.type}
          </p>
        </div>
      </div>
      <div
        ref={childrenComponentsRef}
        className={`border-border/60 bg-muted/30 relative mt-4 flex min-h-[140px] gap-3 rounded-xl border border-dashed p-3 ${
          (component.type === 'row' && 'flex-row', component.type === 'column' && 'flex-col')
        }`}
      >
        {childrenComponents.map((childrenComponent) => (
          <div key={childrenComponent.id} className='flex-1'>
            <ScreenComponent
              updateChildrenById={updateChildrenById}
              component={childrenComponent}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
