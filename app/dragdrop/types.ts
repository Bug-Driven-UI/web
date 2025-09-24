export const LEAF_COMPONENT_TYPES = ['button', 'input', 'text'] as const;
export const COMPOSITE_COMPONENT_TYPES = ['box', 'row', 'column'] as const;

export type CompositeComponentType = (typeof COMPOSITE_COMPONENT_TYPES)[number];
export type LeafComponentType = (typeof LEAF_COMPONENT_TYPES)[number];
export type ComponentType = CompositeComponentType | LeafComponentType;

export interface CompositeComponentData {
  children: ComponentData[];
  id: string;
  text: string;
  type: CompositeComponentType;
}

export interface LeafComponentData {
  id: string;
  text: string;
  type: LeafComponentType;
}

export type ComponentData = CompositeComponentData | LeafComponentData;

export const isCompositeComponent = (
  component: ComponentData
): component is CompositeComponentData =>
  COMPOSITE_COMPONENT_TYPES.includes(component.type as CompositeComponentType);

export const isLeafComponent = (component: ComponentData): component is LeafComponentData =>
  LEAF_COMPONENT_TYPES.includes(component.type as LeafComponentType);
