import type React from 'react';

import { useEffect, useRef } from 'react';

import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

import { useDragDropContext } from '@/src/utils/contexts/dragDrop';

const buildComponentSignature = (component: DragDropComponent): string => {
  const childrenSignature = component.children?.length
    ? component.children.map(buildComponentSignature).join('|')
    : '';
  const statesSignature = component.states?.length
    ? component.states
        .map(
          (state) =>
            `${state.condition}:${state.component ? buildComponentSignature(state.component) : ''}`
        )
        .join('|')
    : '';

  return `${component.id}:${component.type}:${childrenSignature}:${statesSignature}`;
};

const buildSignature = (components: DragDropComponent[]): string =>
  components.map((component) => buildComponentSignature(component)).join('|');

interface UseSyncWithStatefulContextParams {
  dragDropComponent: DragDropComponent;
  selectedStateId?: string;
  setStateComponents: React.Dispatch<React.SetStateAction<DragDropComponent[]>>;
  stateComponents: DragDropComponent[];
}

export const useSyncWithStatefulContext = ({
  dragDropComponent,
  selectedStateId,
  setStateComponents,
  stateComponents
}: UseSyncWithStatefulContextParams) => {
  const dragDropContext = useDragDropContext();
  const lastSyncedSignatureRef = useRef<string>('');
  const isSyncingFromContextRef = useRef(false);
  const selectedState = selectedStateId
    ? dragDropComponent.states?.find((state) => state.id === selectedStateId)
    : undefined;

  useEffect(() => {
    if (!selectedState) {
      if (stateComponents.length) {
        isSyncingFromContextRef.current = true;
        setStateComponents([]);
      }
      lastSyncedSignatureRef.current = '';
      return;
    }

    const nextComponents = selectedState.component ? [selectedState.component] : [];
    const nextSignature = buildSignature(nextComponents);

    if (lastSyncedSignatureRef.current === nextSignature) {
      return;
    }

    isSyncingFromContextRef.current = true;
    lastSyncedSignatureRef.current = nextSignature;
    setStateComponents(nextComponents);
  }, [dragDropComponent.states, selectedState, setStateComponents, selectedStateId]);

  useEffect(() => {
    if (isSyncingFromContextRef.current) {
      isSyncingFromContextRef.current = false;
      return;
    }

    if (!selectedState) {
      return;
    }

    if (stateComponents.length > 1) {
      isSyncingFromContextRef.current = true;
      setStateComponents([stateComponents[stateComponents.length - 1]]);
      return;
    }

    const nextSignature = buildSignature(stateComponents);

    if (lastSyncedSignatureRef.current === nextSignature) {
      return;
    }

    lastSyncedSignatureRef.current = nextSignature;

    const nextComponent = stateComponents[0];

    dragDropContext.updateStateComponent(dragDropComponent.id, selectedState.id, nextComponent);
  }, [
    dragDropComponent.id,
    dragDropComponent.states,
    dragDropContext,
    selectedState,
    selectedStateId,
    setStateComponents,
    stateComponents
  ]);
};
