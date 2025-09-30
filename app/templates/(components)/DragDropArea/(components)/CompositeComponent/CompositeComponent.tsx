'use client';

import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useEffect, useRef } from 'react';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { useDragDropContext } from '@/src/utils/contexts/dragDrop';
import { cn } from '@/src/utils/helpers';

import { LeafComponent } from '../LeafComponent/LeafComponent';

export interface CompositeComponentProps {
  dragDropComponent: DragDropComponent;
}

const buildChildrenSignature = (components: DragDropComponent[]): string =>
  components
    .map((component) => {
      const nestedSignature = component.children?.length
        ? buildChildrenSignature(component.children)
        : '';

      return `${component.id}:${component.type}:${nestedSignature}`;
    })
    .join('|');

export const CompositeComponent = ({ dragDropComponent }: CompositeComponentProps) => {
  const dragDropContext = useDragDropContext();
  // const component = componentsContext.getComponentById(
  //   dragDropComponent.id,
  //   dragDropComponent.type
  // );
  // todo stateful component

  const [childrenComponentsRef, childrenComponents, setChildrenComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >(dragDropComponent.children ?? [], {
    sortable: false,
    dropZone: true,
    plugins: [dropOrSwap({ shouldSwap: () => false })]
  });

  const lastSyncedSignatureRef = useRef<string>('');
  const isSyncingFromContextRef = useRef(false);

  useEffect(() => {
    const nextChildren = dragDropComponent.children ?? [];
    const nextSignature = buildChildrenSignature(nextChildren);

    if (lastSyncedSignatureRef.current === nextSignature) {
      return;
    }

    isSyncingFromContextRef.current = true;
    lastSyncedSignatureRef.current = nextSignature;
    setChildrenComponents(nextChildren);
  }, [dragDropComponent.children, setChildrenComponents]);

  useEffect(() => {
    if (isSyncingFromContextRef.current) {
      isSyncingFromContextRef.current = false;
      return;
    }

    const nextSignature = buildChildrenSignature(childrenComponents);

    if (lastSyncedSignatureRef.current === nextSignature) {
      return;
    }

    lastSyncedSignatureRef.current = nextSignature;
    dragDropContext.updateComponentById(dragDropComponent.id, childrenComponents);
  }, [childrenComponents, dragDropComponent.id, dragDropContext]);

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
            {dragDropComponent.type}{' '}
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
        {childrenComponents.map((childrenComponent) => (
          <div key={childrenComponent.id} className='flex-1'>
            {'children' in childrenComponent && (
              <CompositeComponent dragDropComponent={childrenComponent} />
            )}
            {!('children' in childrenComponent) && (
              <LeafComponent dragDropComponent={childrenComponent} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
