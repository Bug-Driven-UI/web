'use client';

import React from 'react';

import type { Component } from '@/generated/api/admin/models';

import type { DragDropComponent, DragDropState } from './types';

export interface DragDropContextValue {
  activeComponent?: DragDropComponent;
  allowMultiple: boolean;
  components: DragDropComponent[];
  componentsRef: React.RefObject<HTMLDivElement>;
  changeComponentId: (oldId: string, newId: string) => void;
  getComponentsTree: () => Component[];
  removeComponentById: (targetId: string) => void;
  updateActiveComponent: (component?: DragDropComponent) => void;
  updateComponentById: (targetId: string, children: DragDropComponent[]) => void;
  updateStateComponent: (targetId: string, stateId: string, component?: DragDropComponent) => void;
  updateStateConditions: (targetId: string, conditions: DragDropState[]) => void;
}

export const DragDropContext = React.createContext<DragDropContextValue>({
  components: [],
  getComponentsTree: () => [],
  allowMultiple: true,
  changeComponentId: () => {},
  updateStateConditions: () => {},
  updateStateComponent: () => {},
  componentsRef: null as unknown as React.RefObject<HTMLDivElement>,
  removeComponentById: () => {},
  updateActiveComponent: () => {},
  updateComponentById: () => {}
});
