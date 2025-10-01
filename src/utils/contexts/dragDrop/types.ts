import type { Component, ComponentTemplate } from '@/generated/api/admin/models';

export interface DragDropState {
  component?: DragDropComponent;
  condition: string;
  id: string;
}

export interface DragDropComponent {
  children?: DragDropComponent[];
  id: string;
  states?: DragDropState[];
  template?: ComponentTemplate;
  type: Component['type'];
}
