import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { BASE_COMPONENTS } from '../constants';

export const useTemplatePanelComponentsTab = () => {
  const [baseComponentsRef, baseComponents, setBaseComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >(BASE_COMPONENTS, {
    dropZone: false,
    plugins: [dropOrSwap({ shouldSwap: () => false })],
    onDragend: (data) => {
      setBaseComponents(BASE_COMPONENTS);

      data.parent.data.setValues(
        data.parent.data
          .getValues(data.parent.el)
          .map((child) => ({ ...child, id: crypto.randomUUID() })),
        data.parent.el
      );
    }
  });

  return {
    state: { baseComponentsRef, baseComponents }
  };
};
