'use client';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { useDragDropContext } from '@/src/utils/contexts/dragDrop';
import { cn } from '@/src/utils/helpers';

export interface LeafComponentProps {
  dragDropComponent: DragDropComponent;
}

export const LeafComponent = ({ dragDropComponent }: LeafComponentProps) => {
  const dragDropContext = useDragDropContext();

  return (
    <section
      className={cn(
        'border-border/60 hover:border-primary flex flex-col gap-3 rounded-xl border p-4 shadow-sm',
        dragDropContext.activeComponent?.id === dragDropComponent.id && 'border-primary'
      )}
      onClick={(event) => {
        event.stopPropagation();
        dragDropContext.updateActiveComponent(dragDropComponent);
      }}
    >
      <div>
        <p className='text-muted-foreground text-xs font-semibold tracking-wide'>
          {dragDropComponent.type}
          {dragDropComponent.template && `(${dragDropComponent.template.name})`}
        </p>
      </div>
    </section>
  );
};
