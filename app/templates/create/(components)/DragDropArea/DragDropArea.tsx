'use client';

import React from 'react';

import { Typography } from '@/src/components/ui';
import { useDragDropContext } from '@/src/utils/contexts/dragDrop';

import { CompositeComponent, LeafComponent } from './(components)';

export const DragDropArea = () => {
  const dragDropContext = useDragDropContext();

  return (
    <div ref={dragDropContext.componentsRef} className='bg-muted/40 flex h-full flex-col gap-2 p-5'>
      {dragDropContext.components.map((component) => (
        <React.Fragment key={component.id}>
          {'children' in component && <CompositeComponent component={component} />}
          {!('children' in component) && <LeafComponent component={component} />}
        </React.Fragment>
      ))}
      {!dragDropContext.components.length && (
        <Typography className='self-center' variant='muted'>
          Drag and drop components here
        </Typography>
      )}
    </div>
  );
};
