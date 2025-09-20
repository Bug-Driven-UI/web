import type { BaseDragState, ParentRecord } from '@formkit/drag-and-drop';

export const LEAF_NODE_TYPES = ['button', 'input', 'switch'] as const;
export const PARENT_NODE_TYPES = ['row', 'column'] as const;

export type LeafNodeType = (typeof LEAF_NODE_TYPES)[number];
export type ParentNodeType = (typeof PARENT_NODE_TYPES)[number];
export type NodeType = LeafNodeType | ParentNodeType;

export interface LeafNode {
  height: string;
  id: string;
  margin: string;
  text: string;
  type: LeafNodeType;
  width: string;
}

export interface ParentNode {
  children?: BuilderElement[];
  height: string;
  id: string;
  margin: string;
  type: ParentNodeType;
  width: string;
}

export type BuilderElement = LeafNode | ParentNode;

export type AcceptsFn = (
  targetParent: ParentRecord<BuilderElement>,
  initialParent: ParentRecord<BuilderElement>,
  currentParent: ParentRecord<BuilderElement>,
  state: BaseDragState<BuilderElement>
) => boolean;

export const isParentType = (type: NodeType): type is ParentNodeType =>
  (PARENT_NODE_TYPES as readonly ParentNodeType[]).includes(type as ParentNodeType);

export const isLeafType = (type: NodeType): type is LeafNodeType =>
  (LEAF_NODE_TYPES as readonly LeafNodeType[]).includes(type as LeafNodeType);

export const isParentElement = (element: BuilderElement): element is ParentNode =>
  isParentType(element.type);

export const isLeafElement = (element: BuilderElement): element is LeafNode =>
  isLeafType(element.type);
