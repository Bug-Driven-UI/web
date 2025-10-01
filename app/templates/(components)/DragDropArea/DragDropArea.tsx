'use client';

import React from 'react';

import { Typography } from '@/src/components/ui';
import { useDragDropContext } from '@/src/utils/contexts/dragDrop';

import { CompositeComponent, LeafComponent, StatefulComponent } from './(components)';

export const DragDropArea = () => {
  const dragDropContext = useDragDropContext();

  return (
    <div ref={dragDropContext.componentsRef} className='bg-muted/40 flex h-full flex-col gap-2 p-5'>
      {dragDropContext.components.map((dragDropComponent) => {
        if ('states' in dragDropComponent) {
          return (
            <StatefulComponent key={dragDropComponent.id} dragDropComponent={dragDropComponent} />
          );
        }
        if ('children' in dragDropComponent) {
          return (
            <CompositeComponent key={dragDropComponent.id} dragDropComponent={dragDropComponent} />
          );
        }
        return <LeafComponent key={dragDropComponent.id} dragDropComponent={dragDropComponent} />;
      })}
      {!dragDropContext.components.length && (
        <Typography className='self-center' variant='muted'>
          Drag and drop components here
        </Typography>
      )}
    </div>
  );
};
