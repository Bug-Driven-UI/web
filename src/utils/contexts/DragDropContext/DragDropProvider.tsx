import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import React from 'react';

import { DRAG_DROP_COMPONENT_NAME } from '@/src/utils/constants';

import type { DragDropComponent } from './types';

import { DragDropContext } from './DragDropContext';

interface DragDropProviderProps {
  children: React.ReactNode;
}

export const DragDropProvider = ({ children }: DragDropProviderProps) => {
  const [dragDropComponentsRef, dragDropComponents, setScreenComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >([], {
    name: DRAG_DROP_COMPONENT_NAME.SCREEN,
    group: 'screen',
    dropZone: true,
    sortable: false,
    plugins: [dropOrSwap({ shouldSwap: () => false })]
  });

  const updateComponentById = React.useCallback(
    (targetId: string, children: DragDropComponent[]) =>
      setScreenComponents((screenComponents) => {
        const updateList = (components: DragDropComponent[]): DragDropComponent[] =>
          components.map((component) => {
            if (component.id === targetId) {
              return {
                ...component,
                children
              };
            }

            if (isCompositeComponent(component) && component.children.length) {
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
      components: dragDropComponents,
      componentsRef: dragDropComponentsRef,
      updateComponentById
    }),
    [dragDropComponents]
  );

  return <DragDropContext value={value}>{children}</DragDropContext>;
};
