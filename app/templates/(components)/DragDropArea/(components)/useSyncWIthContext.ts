import type React from 'react';

import { useEffect, useRef } from 'react';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { useDragDropContext } from '@/src/utils/contexts/dragDrop';

const buildChildrenSignature = (components: DragDropComponent[]): string =>
  components
    .map((component) => {
      const nestedSignature = component.children?.length
        ? buildChildrenSignature(component.children)
        : '';

      return `${component.id}:${component.type}:${nestedSignature}`;
    })
    .join('|');

interface UseSyncWIthContextParams {
  childrenComponents: DragDropComponent[];
  dragDropComponent: DragDropComponent;
  setChildrenComponents: React.Dispatch<React.SetStateAction<DragDropComponent[]>>;
}

export const useSyncWIthContext = ({
  dragDropComponent,
  setChildrenComponents,
  childrenComponents
}: UseSyncWIthContextParams) => {
  const dragDropContext = useDragDropContext();
  const lastSyncedSignatureRef = useRef<string>('');
  const isSyncingFromContextRef = useRef(false);

  useEffect(() => {
    const nextChildren = dragDropComponent.children ?? [];
    const nextSignature = buildChildrenSignature(nextChildren);

    if (lastSyncedSignatureRef.current === nextSignature) {
      return;
    }

    isSyncingFromContextRef.current = true;
    lastSyncedSignatureRef.current = nextSignature;
    setChildrenComponents(nextChildren);
  }, [dragDropComponent.children, setChildrenComponents]);

  useEffect(() => {
    if (isSyncingFromContextRef.current) {
      isSyncingFromContextRef.current = false;
      return;
    }

    const nextSignature = buildChildrenSignature(childrenComponents);

    if (lastSyncedSignatureRef.current === nextSignature) {
      return;
    }

    lastSyncedSignatureRef.current = nextSignature;
    dragDropContext.updateComponentById(dragDropComponent.id, childrenComponents);
  }, [childrenComponents, dragDropComponent.id, dragDropContext]);
};
