'use client';

import React from 'react';

import type { Component } from '@/generated/api/admin/models';

import type { DragDropComponent } from '../dragDrop';
import type { ComponentsContextValue } from './ComponentsContext';

import { generateEmptyComponent } from '../../helpers';
import { useDragDropContext } from '../dragDrop';
import { ComponentsContext } from './ComponentsContext';

type ComponentsProviderProps =
  | {
      action: Extract<ComponentsContextValue['action'], 'create'>;
      children: React.ReactNode;
      initialComponents?: Map<string, Component>;
    }
  | {
      action: Extract<ComponentsContextValue['action'], 'update'>;
      children: React.ReactNode;
      initialComponents: Map<string, Component>;
    };

export const ComponentsProvider = (props: ComponentsProviderProps) => {
  const dragDropContext = useDragDropContext();
  const [components] = React.useState<ComponentsContextValue['components']>(() =>
    props.action === 'update' ? props.initialComponents : new Map()
  );

  const updateComponentById = (componentId: string, component: Component) => {
    components.set(componentId, component);
  };

  const removeComponentById = (componentId: string) => {
    components.delete(componentId);
  };

  const getComponentById = (id: string, type: Component['type']) => {
    const component = components.get(id);
    if (component) {
      if ('children' in component) delete component.children;

      return component;
    }

    const emptyComponent = generateEmptyComponent({ id, type });
    if ('children' in emptyComponent) delete emptyComponent.children;
    components.set(id, emptyComponent);

    return emptyComponent;
  };

  const getComponentsTree = (): Component[] => {
    const buildBranch = (dragDropComponent: DragDropComponent): Component => {
      const component = components.get(dragDropComponent.id)!;

      if (dragDropComponent.children) {
        return {
          ...component,
          children: dragDropComponent.children.map(buildBranch)
        } as Component;
      }

      return component;
    };

    return dragDropContext.components.map(buildBranch);
  };

  const value = React.useMemo(
    () => ({
      components,
      action: props.action,
      updateComponentById,
      removeComponentById,
      getComponentById,
      getComponentsTree
    }),
    [components]
  );

  return <ComponentsContext value={value}>{props.children}</ComponentsContext>;
};
