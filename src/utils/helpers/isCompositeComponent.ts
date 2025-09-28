import type { Component, CompositeBase } from '@/generated/api/admin/models';

 
// @ts-expect-error
export const isCompositeComponent = (component: Component): component is CompositeBase =>
  'children' in component && typeof component.children === 'object';
