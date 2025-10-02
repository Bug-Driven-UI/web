'use client';

import React from 'react';

import type { Component } from '@/generated/api/admin/models';

export interface ComponentsContextValue {
  action: 'create' | 'update';
  components: Map<string, Component>;
  changeComponentId: (oldId: string, newId: string) => void;
  getComponentById: (id: string, type: Component['type']) => Component;
  removeComponentById: (id: string) => void;
  updateComponentById: (id: string, component: Component) => void;
}

export const ComponentsContext = React.createContext<ComponentsContextValue>({
  action: 'create',
  components: new Map(),
  getComponentById: () => ({}) as Component,
  changeComponentId: () => {},
  removeComponentById: () => {},
  updateComponentById: () => {}
});
