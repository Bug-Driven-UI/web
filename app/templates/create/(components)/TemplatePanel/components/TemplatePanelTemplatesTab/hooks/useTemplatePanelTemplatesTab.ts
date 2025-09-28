import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

export interface UseTemplatePanelTemplatesTabParams {
  templateComponents: DragDropComponent[];
}

export const useTemplatePanelTemplatesTab = (params: UseTemplatePanelTemplatesTabParams) => {
  const [templateComponentsRef, templateComponents, setTemplateComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >(params.templateComponents, {
    dropZone: false,
    plugins: [dropOrSwap({ shouldSwap: () => false })],
    onDragend: (data) => {
      setTemplateComponents(params.templateComponents);

      data.parent.data.setValues(
        data.parent.data
          .getValues(data.parent.el)
          .map((child) => ({ ...child, id: crypto.randomUUID() })),
        data.parent.el
      );
    }
  });

  return {
    state: { templateComponentsRef, templateComponents }
  };
};
