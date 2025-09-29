'use client';

import type { ParentConfig } from '@formkit/drag-and-drop';

import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import React from 'react';

import { DRAG_DROP_COMPONENT_NAME } from '@/src/utils/constants';

import type { DragDropContextValue } from './DragDropContext';
import type { DragDropComponent } from './types';

import { DragDropContext } from './DragDropContext';

type DragDropProviderProps =
  | {
      action: 'create';
      allowMultiple?: boolean;
      children: React.ReactNode;
    }
  | {
      action: 'update';
      allowMultiple?: boolean;
      children: React.ReactNode;
      initialComponents: DragDropComponent[];
    };

export const DragDropProvider = (props: DragDropProviderProps) => {
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
  config.accepts = () => (props.allowMultiple ? true : !components.length);

  const removeComponentById = React.useCallback(
    (targetId: string) =>
      setComponents((screenComponents) => {
        const pruneComponents = (items: DragDropComponent[]): DragDropComponent[] => {
          let mutated = false;

          const next = items.reduce<DragDropComponent[]>((acc, component) => {
            if (component.id === targetId) {
              mutated = true;
              return acc;
            }

            if (component.children?.length) {
              const prunedChildren = pruneComponents(component.children);

              if (prunedChildren !== component.children) {
                mutated = true;
                acc.push({
                  ...component,
                  children: prunedChildren
                });

                return acc;
              }
            }

            acc.push(component);
            return acc;
          }, []);

          return mutated ? next : items;
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

  const value = React.useMemo(
    () => ({
      components,
      activeComponent,
      updateActiveComponent: setActiveComponent,
      componentsRef,
      allowMultiple: props.allowMultiple ?? true,
      removeComponentById,
      updateComponentById
    }),
    [components, activeComponent, removeComponentById, updateComponentById]
  );

  return <DragDropContext value={value}>{props.children}</DragDropContext>;
};
