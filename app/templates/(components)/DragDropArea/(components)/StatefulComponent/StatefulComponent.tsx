import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import React from 'react';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui';
import { useDragDropContext } from '@/src/utils/contexts/dragDrop';
import { cn } from '@/src/utils/helpers';

import { CompositeComponent } from '..';
import { LeafComponent } from '../LeafComponent/LeafComponent';
import { useSyncWithStatefulContext } from '../useSyncWithStatefulContext';

interface StatefulComponentProps {
  dragDropComponent: DragDropComponent;
}

export const StatefulComponent = ({ dragDropComponent }: StatefulComponentProps) => {
  const dragDropContext = useDragDropContext();
  const states = dragDropComponent.states ?? [];

  const [selectedStateId, setSelectedStateId] = React.useState<string | undefined>(states[0]?.id);

  React.useEffect(() => {
    if (!states.length) {
      setSelectedStateId(undefined);
      return;
    }

    if (!states.find((state) => state.id === selectedStateId)) {
      setSelectedStateId(states[0].id);
    }
  }, [selectedStateId, states]);

  const plugins = React.useMemo(() => [dropOrSwap({ shouldSwap: () => false })], []);
  const currentState = states.find((state) => state.id === selectedStateId);
  const currentChildren = currentState?.component ? [currentState.component] : [];
  const allowDrop = Boolean(currentState);

  const [stateComponentsRef, stateComponents, setStateComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >(currentChildren, {
    name: 'stateful',
    sortable: false,
    dropZone: allowDrop,
    plugins,
    accepts: (targetParent) =>
      allowDrop && (targetParent.data.getValues(targetParent.el)?.length ?? 0) < 1
  });

  useSyncWithStatefulContext({
    dragDropComponent,
    selectedStateId,
    setStateComponents,
    stateComponents
  });

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
        {!!states.length && (
          <Select value={selectedStateId} onValueChange={setSelectedStateId}>
            <SelectTrigger onClick={(event) => event.stopPropagation()}>
              <SelectValue placeholder='Create and select condition' />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.id} value={state.id}>
                  {state.condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {!states.length && (
        <div
          className={`border-border/60 bg-muted/30 relative mt-4 flex min-h-[140px] justify-between gap-1 rounded-xl border border-dashed p-0 ${
            (dragDropComponent.type === 'row' && 'flex-row',
            dragDropComponent.type === 'column' && 'flex-col')
          }`}
        >
          <div className='text-muted-foreground m-auto px-4 text-center text-xs'>
            Add a state to enable dropping components
          </div>
        </div>
      )}
      {!!states.length && (
        <div
          ref={states.length ? stateComponentsRef : null}
          className={`border-border/60 bg-muted/30 relative mt-4 flex min-h-[140px] justify-between gap-1 rounded-xl border border-dashed p-0 ${
            (dragDropComponent.type === 'row' && 'flex-row',
            dragDropComponent.type === 'column' && 'flex-col')
          }`}
        >
          {!states.length && (
            <div className='text-muted-foreground m-auto px-4 text-center text-xs'>
              Add a state to enable dropping components
            </div>
          )}
          {stateComponents.map((stateComponent) => {
            if ('states' in stateComponent) {
              return (
                <div key={stateComponent.id} className='flex-1'>
                  <StatefulComponent dragDropComponent={stateComponent} />
                </div>
              );
            }
            if ('children' in stateComponent) {
              return (
                <div key={stateComponent.id} className='flex-1'>
                  <CompositeComponent dragDropComponent={stateComponent} />
                </div>
              );
            }
            return (
              <div key={stateComponent.id} className='flex-1'>
                <LeafComponent dragDropComponent={stateComponent} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
