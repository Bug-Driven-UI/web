import type { DragDropComponent } from '@/src/utils/contexts/dragDrop';

export const BASE_COMPONENTS: DragDropComponent[] = [
  {
    type: 'box',
    id: 'box',
    children: []
  },
  {
    type: 'row',
    id: 'row',
    children: []
  },
  {
    type: 'column',
    id: 'column',
    children: []
  },
  {
    type: 'text',
    id: 'text'
  },
  {
    type: 'input',
    id: 'input'
  },
  {
    type: 'image',
    id: 'image'
  },
  {
    type: 'spacer',
    id: 'spacer'
  },
  {
    type: 'progressbar',
    id: 'progressbar'
  },
  {
    type: 'switch',
    id: 'switch'
  },
  {
    type: 'button',
    id: 'button'
  },
  {
    type: 'stateful-component',
    id: 'stateful-component',
    children: []
  },
  {
    type: 'dynamic-column',
    id: 'dynamic-column',
    children: []
  },
  {
    type: 'dynamic-row',
    id: 'dynamic-row',
    children: []
  }
];
