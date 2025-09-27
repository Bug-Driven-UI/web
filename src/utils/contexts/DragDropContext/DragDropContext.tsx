import React from 'react';

import type { DragDropComponent } from './types';

interface DragDropContextValue {
  components: DragDropComponent[];
  componentsRef: React.RefObject<HTMLDivElement>;
  updateComponentById: (targetId: string, children: DragDropComponent[]) => void;
}

export const DragDropContext = React.createContext<DragDropContextValue>({
  components: [],
  componentsRef: null as unknown as React.RefObject<HTMLDivElement>,
  updateComponentById: () => {}
});
