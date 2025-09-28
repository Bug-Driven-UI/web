import type { NodeRecord } from '@formkit/drag-and-drop';

import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { BASE_COMPONENTS } from '../constants';

export const useTemplatePanelComponentsTab = () => {
  // const dragDropContext = useDragDropContext();
  const [baseComponentsRef, baseComponents, setBaseComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >(BASE_COMPONENTS, {
    dropZone: false,
    plugins: [dropOrSwap({ shouldSwap: () => false })],
    onDragend: ({ parent, draggedNode }) => {
      setBaseComponents(BASE_COMPONENTS);

      const parentComponents = parent.data.getValues(parent.el) as DragDropComponent[];
      const draggedComponent = draggedNode as NodeRecord<DragDropComponent>;

      const updatedParentComponents = parentComponents.map((parentComponent) => ({
        ...parentComponent,
        ...(parentComponent.id === draggedComponent.data.value.id && {
          id: crypto.randomUUID()
        })
      }));

      // @ts-expect-error
      parent.data.setValues(updatedParentComponents, parent.el);
    }
  });

  return {
    state: { baseComponentsRef, baseComponents }
  };
};
