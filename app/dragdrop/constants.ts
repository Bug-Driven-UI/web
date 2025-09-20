import type { BuilderElement } from './types';

export const TEMPLATE_LIBRARY: BuilderElement[] = [
  {
    id: 'template-button',
    type: 'button',
    text: 'Primary button',
    margin: 'mt-2 mb-2',
    width: 'w-auto',
    height: 'h-10'
  },
  {
    id: 'template-input',
    type: 'input',
    text: 'Email address',
    margin: 'mt-2 mb-2',
    width: 'w-full',
    height: 'h-10'
  },
  {
    id: 'template-switch',
    type: 'switch',
    text: 'Enable notifications',
    margin: 'mt-3 mb-3',
    width: 'w-auto',
    height: 'h-6'
  },
  {
    id: 'template-row',
    type: 'row',
    margin: 'mt-4 mb-4',
    width: 'w-full',
    height: 'h-auto',
    children: []
  },
  {
    id: 'template-column',
    type: 'column',
    margin: 'mt-4 mb-4',
    width: 'w-full',
    height: 'h-auto',
    children: []
  }
];
