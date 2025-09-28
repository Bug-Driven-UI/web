import type { Component } from '@/generated/api/admin/models';

export interface DragDropComponent {
  children?: DragDropComponent[];
  id: string;
  type: Component['type'];
}
