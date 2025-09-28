'use client';

import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import React from 'react';

import { DRAG_DROP_COMPONENT_NAME } from '@/src/utils/constants';

import type { DragDropContextValue } from './DragDropContext';
import type { DragDropComponent } from './types';

import { DragDropContext } from './DragDropContext';

interface DragDropProviderProps {
  allowMultiple?: boolean;
  children: React.ReactNode;
}

export const DragDropProvider = ({ children, allowMultiple = true }: DragDropProviderProps) => {
  const [activeComponent, setActiveComponent] =
    React.useState<DragDropContextValue['activeComponent']>();

  const [componentsRef, components, setComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >([], {
    name: DRAG_DROP_COMPONENT_NAME.ROOT,
    group: 'root',
    dropZone: true,
    sortable: false,
    ...(!allowMultiple && {
      accepts: (targetParent) => {
        // todo fix
        console.log(
          '#targetParent.data.getValues(targetParent.el)',
          targetParent.data.getValues(targetParent.el)
        );
        return !targetParent.data.getValues(targetParent.el).length;
      }
    }),
    plugins: [dropOrSwap({ shouldSwap: () => false })]
  });

  const updateComponentById = React.useCallback(
    (targetId: string, children: DragDropComponent[]) =>
      setComponents((screenComponents) => {
        const updateList = (components: DragDropComponent[]): DragDropComponent[] =>
          components.map((component) => {
            if (component.id === targetId) {
              return {
                ...component,
                children
              };
            }

            if ('children' in component && component.children?.length) {
              return {
                ...component,
                children: updateList(component.children)
              };
            }

            return component;
          });

        return updateList(screenComponents);
      }),
    []
  );

  const value = React.useMemo(
    () => ({
      components,
      activeComponent,
      updateActiveComponent: setActiveComponent,
      componentsRef,
      updateComponentById
    }),
    [components, activeComponent]
  );

  return <DragDropContext value={value}>{children}</DragDropContext>;
};
