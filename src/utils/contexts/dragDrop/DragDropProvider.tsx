'use client';

import type { ParentConfig } from '@formkit/drag-and-drop';

import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import React from 'react';

import type { Component } from '@/generated/api/admin/models';

import { DRAG_DROP_COMPONENT_NAME } from '@/src/utils/constants';

import type { DragDropContextValue } from './DragDropContext';
import type { DragDropComponent } from './types';

import { useComponentsContext } from '../components';
import { DragDropContext } from './DragDropContext';

type DragDropProviderProps =
  | {
      action: 'create';
      allowMultiple?: boolean;
      children: React.ReactNode;
      initialComponents?: DragDropComponent[];
    }
  | {
      action: 'update';
      allowMultiple?: boolean;
      children: React.ReactNode;
      initialComponents: DragDropComponent[];
    };

export const DragDropProvider = (props: DragDropProviderProps) => {
  const componentsContext = useComponentsContext();
  const [activeComponent, setActiveComponent] =
    React.useState<DragDropContextValue['activeComponent']>();

  const config: Partial<ParentConfig<DragDropComponent>> = {
    name: DRAG_DROP_COMPONENT_NAME.ROOT,
    group: DRAG_DROP_COMPONENT_NAME.ROOT,
    dropZone: true,
    sortable: false,
    plugins: [dropOrSwap({ shouldSwap: () => false })]
  };
  const [componentsRef, components, setComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >(props.action === 'update' ? props.initialComponents : [], config);
  // todo fix why this accepts still accepting all new components when I passed allowMultiple=false
  config.accepts = () => {
    console.log('accepts');
    console.log('#props.allowMultiple', props.allowMultiple);
    console.log('#components.length', components.length);
    return props.allowMultiple ? true : !components.length;
  };

  const removeComponentById = React.useCallback(
    (targetId: string) =>
      setComponents((screenComponents) => {
        const pruneComponents = (items: DragDropComponent[]): DragDropComponent[] => {
          const next = items.reduce<DragDropComponent[]>((acc, component) => {
            if (component.id === targetId) {
              return acc;
            }

            if (component.children?.length) {
              const prunedChildren = pruneComponents(component.children);

              acc.push({
                ...component,
                children: prunedChildren
              });

              return acc;
            }

            acc.push(component);
            return acc;
          }, []);

          return next;
        };

        return pruneComponents(screenComponents);
      }),
    [setComponents]
  );

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
    [setComponents]
  );

  const getComponentsTree = (): Component[] => {
    const buildBranch = (dragDropComponent: DragDropComponent): Component => {
      const component = componentsContext.getComponentById(
        dragDropComponent.id,
        dragDropComponent.type
      );

      if (dragDropComponent.children) {
        return {
          ...component,
          children: dragDropComponent.children.map(buildBranch)
        } as Component;
      }

      return component;
    };

    return components.map(buildBranch);
  };

  const value = React.useMemo(
    () => ({
      components,
      activeComponent,
      updateActiveComponent: setActiveComponent,
      componentsRef,
      getComponentsTree,
      allowMultiple: props.allowMultiple ?? true,
      removeComponentById,
      updateComponentById
    }),
    [components, activeComponent, removeComponentById, updateComponentById]
  );

  return <DragDropContext value={value}>{props.children}</DragDropContext>;
};
