'use client';

import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useEffect } from 'react';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { useDragDropContext } from '@/src/utils/contexts/dragDrop';
import { cn } from '@/src/utils/helpers';

import { LeafComponent } from '../LeafComponent/LeafComponent';

export interface CompositeComponentProps {
  component: DragDropComponent;
}

export const CompositeComponent = ({ component }: CompositeComponentProps) => {
  const dragDropContext = useDragDropContext();

  const [childrenComponentsRef, childrenComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >(component.children ?? [], {
    sortable: false,
    dropZone: true,
    plugins: [dropOrSwap({ shouldSwap: () => false })]
  });

  useEffect(() => {
    dragDropContext.updateComponentById(component.id, childrenComponents);
  }, [childrenComponents]);

  return (
    <section
      className={cn(
        '[&:hover:not(:has(section:hover))]:border-primary border-border/60 rounded-xl border p-1 shadow-sm',
        dragDropContext.activeComponent?.id === component.id && 'border-primary'
      )}
      onClick={(event) => {
        event.stopPropagation();
        dragDropContext.updateActiveComponent(component);
      }}
    >
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <p className='text-muted-foreground text-xs font-semibold tracking-wide'>
            {component.type} {component.template && `(${component.template.name})`}
          </p>
        </div>
      </div>
      <div
        ref={childrenComponentsRef}
        className={`border-border/60 bg-muted/30 relative mt-4 flex min-h-[140px] justify-between gap-10 rounded-xl border border-dashed p-3 ${
          (component.type === 'row' && 'flex-row', component.type === 'column' && 'flex-col')
        }`}
      >
        {childrenComponents.map((childrenComponent) => (
          <div key={childrenComponent.id} className='flex-1'>
            {'children' in childrenComponent && (
              <CompositeComponent component={childrenComponent} />
            )}
            {!('children' in childrenComponent) && <LeafComponent component={childrenComponent} />}
          </div>
        ))}
      </div>
    </section>
  );
};
