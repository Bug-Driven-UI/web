import type { CompositeComponentData, LeafComponentData } from './types';

export const DRAG_AND_DROP_COMPONENT_NAME = {
  SCREEN: 'screen',
  LIBRARY: {
    LEAF: 'library-leaf',
    COMPOSITE: 'library-composite'
  }
};

export const LEAF_COMPONENTS_LIBRARY: LeafComponentData[] = [
  {
    id: 'library-button',
    text: 'Button',
    type: 'button'
  },
  {
    id: 'library-input',
    text: 'Input',
    type: 'input'
  },
  {
    id: 'library-text',
    text: 'Text',
    type: 'text'
  }
];

export const COMPOSITE_COMPONENTS_LIBRARY: CompositeComponentData[] = [
  {
    id: 'library-box',
    text: 'Box',
    type: 'box',
    children: []
  },
  {
    id: 'library-column',

    text: 'column',
    type: 'column',
    children: []
  },
  {
    id: 'library-row',
    text: 'row',
    type: 'row',
    children: []
  }
];
