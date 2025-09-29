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
    type: 'progressBar',
    id: 'progressBar'
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
    type: 'stateful',
    id: 'stateful',
    children: []
  },
  {
    type: 'dynamicColumn',
    id: 'dynamicColumn'
  },
  {
    type: 'dynamicRow',
    id: 'dynamicRow'
  }
];
