'use client';

import React from 'react';

import type { DragDropComponent } from './types';

export interface DragDropContextValue {
  activeComponent?: DragDropComponent;
  allowMultiple: boolean;
  components: DragDropComponent[];
  componentsRef: React.RefObject<HTMLDivElement>;
  updateActiveComponent: (component?: DragDropComponent) => void;
  updateComponentById: (targetId: string, children: DragDropComponent[]) => void;
}

export const DragDropContext = React.createContext<DragDropContextValue>({
  components: [],
  // todo
  allowMultiple: true,
  componentsRef: null as unknown as React.RefObject<HTMLDivElement>,
  updateActiveComponent: () => {},
  updateComponentById: () => {}
});
