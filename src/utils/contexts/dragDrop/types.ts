import type { Component, ComponentTemplate } from '@/generated/api/admin/models';

export interface DragDropComponent {
  children?: DragDropComponent[];
  id: string;
  template?: ComponentTemplate;
  type: Component['type'];
}
