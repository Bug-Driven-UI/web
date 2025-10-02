'use client';

import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { useDragDropContext } from '@/src/utils/contexts/dragDrop';
import { cn } from '@/src/utils/helpers';

import { StatefulComponent } from '..';
import { LeafComponent } from '../LeafComponent/LeafComponent';
import { useSyncWIthContext } from '../useSyncWIthContext';

export interface CompositeComponentProps {
  dragDropComponent: DragDropComponent;
  statefulParent?: DragDropComponent;
}

export const CompositeComponent = ({ dragDropComponent }: CompositeComponentProps) => {
  const dragDropContext = useDragDropContext();

  const [childrenComponentsRef, childrenComponents, setChildrenComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >(dragDropComponent.children ?? [], {
    sortable: false,
    dropZone: true,
    plugins: [dropOrSwap({ shouldSwap: () => false })]
  });

  useSyncWIthContext({ childrenComponents, dragDropComponent, setChildrenComponents });

  return (
    <section
      className={cn(
        '[&:hover:not(:has(section:hover))]:border-primary border-border/60 rounded-xl border p-1 shadow-sm',
        dragDropContext.activeComponent?.id === dragDropComponent.id && 'border-primary'
      )}
      onClick={(event) => {
        event.stopPropagation();
        dragDropContext.updateActiveComponent(dragDropComponent);
      }}
    >
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <p className='text-muted-foreground text-xs font-semibold tracking-wide'>
            {dragDropComponent.type} {dragDropComponent.id === 'top-bar' && '(Top bar)'}
            {dragDropComponent.id === 'bottom-bar' && '(Bottom bar)'}
            {dragDropComponent.template && `(${dragDropComponent.template.name})`}
          </p>
        </div>
      </div>
      <div
        ref={childrenComponentsRef}
        className={`border-border/60 bg-muted/30 relative mt-4 flex min-h-[140px] justify-between gap-1 rounded-xl border border-dashed p-0 ${
          (dragDropComponent.type === 'row' && 'flex-row',
          dragDropComponent.type === 'column' && 'flex-col')
        }`}
      >
        {childrenComponents.map((childrenComponent) => {
          if ('states' in childrenComponent) {
            return (
              <div key={childrenComponent.id} className='flex-1'>
                <StatefulComponent dragDropComponent={childrenComponent} />
              </div>
            );
          }
          if ('children' in childrenComponent) {
            return (
              <div key={childrenComponent.id} className='flex-1'>
                <CompositeComponent dragDropComponent={childrenComponent} />
              </div>
            );
          }
          return (
            <div key={childrenComponent.id} className='flex-1'>
              <LeafComponent dragDropComponent={childrenComponent} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
