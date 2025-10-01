import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';

import type { Component } from '@/generated/api/admin/models';
import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { useComponentsContext } from '@/src/utils/contexts/components';
import { isCompositeComponent } from '@/src/utils/helpers';

export interface UseTemplatePanelTemplatesTabParams {
  templateComponents: DragDropComponent[];
}

export const useTemplatePanelTemplatesTab = (params: UseTemplatePanelTemplatesTabParams) => {
  const componentsContext = useComponentsContext();

  const cloneComponentTree = (
    component: Component
  ): {
    component: Component;
    dragDropComponent: DragDropComponent;
    componentsToRegister: Component[];
  } => {
    const clonedComponent: Component = {
      ...component,
      id: crypto.randomUUID()
    };

    const dragDropComponent: DragDropComponent = {
      id: clonedComponent.id,
      type: clonedComponent.type
    };

    const componentsToRegister: Component[] = [clonedComponent];

    if (component.type === 'stateful' && clonedComponent.type === 'stateful') {
      const originalStates = component.states ?? [];
      const clonedStates = originalStates.map((state) => {
        const clonedState = cloneComponentTree(state.component);
        componentsToRegister.push(...clonedState.componentsToRegister);

        return {
          condition: state.condition,
          component: clonedState.component,
          dragDropState: {
            id: crypto.randomUUID(),
            condition: state.condition,
            component: clonedState.dragDropComponent
          }
        };
      });

      clonedComponent.states = clonedStates.map((state) => ({
        condition: state.condition,
        component: state.component
      }));

      dragDropComponent.states = clonedStates.map((state) => state.dragDropState);

      return {
        component: clonedComponent,
        dragDropComponent,
        componentsToRegister
      };
    }

    if (isCompositeComponent(component) && isCompositeComponent(clonedComponent)) {
      const clonedChildren = component.children.map((child) => cloneComponentTree(child));

      clonedComponent.children = clonedChildren.map((child) => child.component);
      dragDropComponent.children = clonedChildren.map((child) => child.dragDropComponent);

      clonedChildren.forEach((child) => {
        componentsToRegister.push(...child.componentsToRegister);
      });
    }

    return {
      component: clonedComponent,
      dragDropComponent,
      componentsToRegister
    };
  };

  const [templateComponentsRef, templateComponents, setTemplateComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >(params.templateComponents, {
    dropZone: false,
    plugins: [dropOrSwap({ shouldSwap: () => false })],
    onDragend: ({ parent, draggedNode }) => {
      setTemplateComponents(params.templateComponents);

      const draggedComponent = draggedNode.data.value as DragDropComponent;
      const templateRoot = draggedComponent.template?.component;
      if (!templateRoot) {
        return;
      }

      const parentComponents = parent.data.getValues(parent.el) as DragDropComponent[];
      const cloned = cloneComponentTree(templateRoot);
      const targetIndex = parentComponents.findIndex(
        (parentComponent) => parentComponent.id === draggedComponent.id
      );

      if (targetIndex === -1) {
        return;
      }

      const nextParentComponents = [...parentComponents];
      nextParentComponents[targetIndex] = cloned.dragDropComponent;

      // @ts-expect-error
      parent.data.setValues(nextParentComponents, parent.el);

      cloned.componentsToRegister.forEach((componentToRegister) => {
        componentsContext.updateComponentById(componentToRegister.id, componentToRegister);
      });
    }
  });

  return {
    state: { templateComponentsRef, templateComponents }
  };
};
