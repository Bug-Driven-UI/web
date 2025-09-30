import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';

import type { Component } from '@/generated/api/admin/models';
import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { useComponentsContext } from '@/src/utils/contexts/components';
import { useDragDropContext } from '@/src/utils/contexts/dragDrop';
import { isCompositeComponent } from '@/src/utils/helpers';

export interface UseTemplatePanelTemplatesTabParams {
  templateComponents: DragDropComponent[];
}

export const useTemplatePanelTemplatesTab = (params: UseTemplatePanelTemplatesTabParams) => {
  const componentsContext = useComponentsContext();
  const dragDropContext = useDragDropContext();

  const [templateComponentsRef, templateComponents, setTemplateComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >(params.templateComponents, {
    dropZone: false,
    plugins: [dropOrSwap({ shouldSwap: () => false })],
    onDragend: ({ parent, draggedNode }) => {
      setTemplateComponents(params.templateComponents);

      const draggedComponent = draggedNode.data.value as DragDropComponent;
      if (!draggedComponent.template) return;

      const newComponentId = crypto.randomUUID();
      const parentComponents = parent.data.getValues(parent.el) as DragDropComponent[];
      const updatedParentComponents = parentComponents.map((parentComponent) => ({
        ...parentComponent,
        ...(parentComponent.id === draggedComponent.id && {
          ...draggedComponent,
          id: newComponentId,
          type: draggedComponent.template!.component.type,
          ...(isCompositeComponent(draggedComponent.template!.component) && { children: [] })
        })
      }));

      // @ts-expect-error
      parent.data.setValues(updatedParentComponents, parent.el);

      const toDragDropComponent = (component: Component): DragDropComponent => ({
        id: component.id,
        type: component.type,
        ...(isCompositeComponent(component) && { children: [] })
      });

      const registerComponent = (component: Component) => {
        componentsContext.updateComponentById(component.id, component);

        if (isCompositeComponent(component)) {
          const updatedComponentChildren = component.children.map((child) => ({
            ...child,
            id: crypto.randomUUID()
          }));
          dragDropContext.updateComponentById(
            component.id,
            updatedComponentChildren.map((child) => toDragDropComponent(child))
          );
          updatedComponentChildren.forEach(registerComponent);
        }
      };

      registerComponent({
        ...draggedComponent.template!.component,
        id: newComponentId
      });
    }
  });

  return {
    state: { templateComponentsRef, templateComponents }
  };
};
