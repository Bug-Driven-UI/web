import type { NodeRecord } from '@formkit/drag-and-drop';

import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { useComponentsContext } from '@/src/utils/contexts/components';
import { generateEmptyComponent } from '@/src/utils/helpers';

import { BASE_COMPONENTS } from '../constants';

export const useTemplatePanelComponentsTab = () => {
  const componentsContext = useComponentsContext();

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
      const newId = crypto.randomUUID();

      const updatedParentComponents = parentComponents.map((parentComponent) => ({
        ...parentComponent,
        ...(parentComponent.id === draggedComponent.data.value.id && {
          id: newId
        })
      }));

      componentsContext.updateComponentById(
        newId,
        generateEmptyComponent({ id: newId, type: draggedComponent.data.value.type })
      );

      // @ts-expect-error
      parent.data.setValues(updatedParentComponents, parent.el);
    }
  });

  return {
    state: { baseComponentsRef, baseComponents }
  };
};
