'use client';

import type { ParentConfig } from '@formkit/drag-and-drop';

import { dropOrSwap } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import React from 'react';

import type { Component } from '@/generated/api/admin/models';

import { DRAG_DROP_COMPONENT_NAME } from '@/src/utils/constants';

import type { DragDropContextValue } from './DragDropContext';
import type { DragDropComponent, DragDropState } from './types';

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
    plugins: [dropOrSwap({ shouldSwap: () => false })],
    accepts: (targetParentData, initialParentData) => {
      if (props.allowMultiple ?? true) {
        return true;
      }

      if (initialParentData.el === targetParentData.el) {
        return true;
      }

      const currentValues = targetParentData.data.getValues(targetParentData.el);
      return currentValues.length === 0;
    }
  };
  const [componentsRef, components, setComponents] = useDragAndDrop<
    HTMLDivElement,
    DragDropComponent
  >(props.action === 'update' ? props.initialComponents : [], config);

  const removeComponentById = React.useCallback(
    (targetId: string) =>
      setComponents((screenComponents) => {
        const pruneComponent = (component: DragDropComponent): DragDropComponent | null => {
          if (component.id === targetId) {
            return null;
          }

          let childrenChanged: boolean = false;
          let statesChanged: boolean = false;
          let nextChildren: DragDropComponent[] | undefined;
          let nextStates: DragDropState[] | undefined;

          if (component.children?.length) {
            const prunedChildren = component.children
              .map(pruneComponent)
              .filter((child): child is DragDropComponent => Boolean(child));

            if (prunedChildren.length !== component.children.length) {
              childrenChanged = true;
            } else {
              childrenChanged = prunedChildren.some(
                (child, index) => child !== component.children?.[index]
              );
            }

            if (childrenChanged) {
              nextChildren = prunedChildren;
            }
          }

          if (component.states?.length) {
            const prunedStates = component.states.map((state) => {
              if (!state.component) {
                return state;
              }

              const prunedStateComponent = pruneComponent(state.component);

              if (!prunedStateComponent) {
                statesChanged = true;
                return {
                  ...state,
                  component: undefined
                };
              }

              if (prunedStateComponent !== state.component) {
                statesChanged = true;
                return {
                  ...state,
                  component: prunedStateComponent
                };
              }

              return state;
            });

            if (statesChanged) {
              nextStates = prunedStates;
            }
          }

          if (childrenChanged || statesChanged) {
            return {
              ...component,
              ...(!!(statesChanged as boolean) && { states: nextStates ?? [] }),
              ...(childrenChanged && { children: nextChildren ?? [] })
            };
          }

          return component;
        };

        const pruneComponents = (items: DragDropComponent[]): DragDropComponent[] =>
          items
            .map(pruneComponent)
            .filter((component): component is DragDropComponent => Boolean(component));

        return pruneComponents(screenComponents);
      }),
    [setComponents]
  );

  const updateStateConditions = React.useCallback(
    (targetId: string, conditions: DragDropState[]) =>
      setComponents((screenComponents) => {
        const updateTree = (component: DragDropComponent): DragDropComponent => {
          if (component.id === targetId && component.type === 'stateful') {
            return {
              ...component,
              states: conditions.map((condition) => ({
                id: condition.id,
                condition: condition.condition,
                component: component.states?.find((state) => state.id === condition.id)?.component
              }))
            };
          }

          let updatedComponent = component;

          if (component.children?.length) {
            const nextChildren = component.children.map(updateTree);
            const childrenChanged = nextChildren.some(
              (child, index) => child !== component.children?.[index]
            );

            if (childrenChanged) {
              updatedComponent = {
                ...updatedComponent,
                children: nextChildren
              };
            }
          }

          if (component.states?.length) {
            let statesChanged = false;
            const nextStates = component.states.map((state) => {
              if (!state.component) {
                return state;
              }

              const nextStateComponent = updateTree(state.component);

              if (nextStateComponent !== state.component) {
                statesChanged = true;
                return {
                  ...state,
                  component: nextStateComponent
                };
              }

              return state;
            });

            if (statesChanged) {
              if (updatedComponent === component) {
                updatedComponent = { ...updatedComponent };
              }
              updatedComponent.states = nextStates;
            }
          }

          return updatedComponent;
        };

        return screenComponents.map(updateTree);
      }),
    [setComponents]
  );

  const updateComponentById = React.useCallback(
    (targetId: string, children: DragDropComponent[]) =>
      setComponents((screenComponents) => {
        const updateTree = (component: DragDropComponent): DragDropComponent => {
          if (component.id === targetId) {
            return {
              ...component,
              children
            };
          }

          let updatedComponent = component;

          if (component.children?.length) {
            const nextChildren = component.children.map(updateTree);
            const childrenChanged = nextChildren.some(
              (child, index) => child !== component.children?.[index]
            );

            if (childrenChanged) {
              updatedComponent = {
                ...updatedComponent,
                children: nextChildren
              };
            }
          }

          if (component.states?.length) {
            let statesChanged = false;
            const nextStates = component.states.map((state) => {
              if (!state.component) {
                return state;
              }

              const nextStateComponent = updateTree(state.component);

              if (nextStateComponent !== state.component) {
                statesChanged = true;
                return {
                  ...state,
                  component: nextStateComponent
                };
              }

              return state;
            });

            if (statesChanged) {
              updatedComponent =
                updatedComponent === component ? { ...updatedComponent } : updatedComponent;
              updatedComponent.states = nextStates;
            }
          }

          return updatedComponent;
        };

        return screenComponents.map(updateTree);
      }),
    [setComponents]
  );

  const updateStateComponent = React.useCallback(
    (targetId: string, stateId: string, nextStateComponent?: DragDropComponent) =>
      setComponents((screenComponents) => {
        const updateTree = (component: DragDropComponent): DragDropComponent => {
          let updatedComponent = component;

          if (component.id === targetId && component.type === 'stateful') {
            return {
              ...component,
              states: (component.states ?? []).map((state) =>
                state.id === stateId
                  ? {
                      ...state,
                      component: nextStateComponent
                    }
                  : state
              )
            };
          }

          if (component.children?.length) {
            const nextChildren = component.children.map(updateTree);
            const hasChanged = nextChildren.some(
              (child, index) => child !== component.children?.[index]
            );

            if (hasChanged) {
              updatedComponent = {
                ...updatedComponent,
                children: nextChildren
              };
            }
          }

          if (component.states?.length) {
            const nextStates = component.states.map((state) => {
              if (!state.component) {
                return state;
              }

              const updatedStateComponent = updateTree(state.component);

              return updatedStateComponent !== state.component
                ? {
                    ...state,
                    component: updatedStateComponent
                  }
                : state;
            });

            const hasStateChanged = nextStates.some(
              (state, index) => state !== component.states?.[index]
            );

            if (hasStateChanged) {
              updatedComponent = {
                ...updatedComponent,
                states: nextStates
              };
            }
          }

          return updatedComponent;
        };

        return screenComponents.map(updateTree);
      }),
    [setComponents]
  );

  const getComponentsTree = (): Component[] => {
    const buildBranch = (dragDropComponent: DragDropComponent): Component => {
      const component = componentsContext.getComponentById(
        dragDropComponent.id,
        dragDropComponent.type
      );
      console.log('## component', component);
      console.log('## dragDropComponent', dragDropComponent);
      if (dragDropComponent.type === 'stateful') {
        return {
          ...component,
          id: dragDropComponent.id,
          type: dragDropComponent.type,
          states:
            dragDropComponent.states
              ?.filter((state): state is DragDropState & { component: DragDropComponent } =>
                Boolean(state.component)
              )
              .map((state) => ({
                condition: state.condition,
                component: buildBranch(state.component)
              })) ?? []
        } as Component;
      }

      if (dragDropComponent.children) {
        return {
          ...component,
          id: dragDropComponent.id,
          type: dragDropComponent.type,
          children: dragDropComponent.children.map(buildBranch)
        } as Component;
      }

      return component;
    };
    console.log('## components', components);
    return components.map(buildBranch);
  };

  const value = React.useMemo(
    () => ({
      components,
      activeComponent,
      updateActiveComponent: setActiveComponent,
      componentsRef,
      getComponentsTree,
      updateStateConditions,
      updateStateComponent,
      allowMultiple: props.allowMultiple ?? true,
      removeComponentById,
      updateComponentById
    }),
    [
      components,
      componentsRef,
      setActiveComponent,
      activeComponent,
      removeComponentById,
      updateComponentById,
      updateStateComponent,
      updateStateConditions,
      getComponentsTree,
      props.allowMultiple
    ]
  );

  return <DragDropContext value={value}>{props.children}</DragDropContext>;
};
