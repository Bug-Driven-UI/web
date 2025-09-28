'use client';

import React from 'react';

import type { Component } from '@/generated/api/admin/models';

export interface TemplateContextValue {
  action: 'create' | 'update';
  components: Map<string, Component>;
  name: string;
  getComponentById: (id: string, type: Component['type']) => Component;
  updateComponentById: (id: string, component: Component) => void;
  updateName: (value: string) => void;
}

export const TemplateContext = React.createContext<TemplateContextValue>({
  action: 'create',
  components: new Map(),
  name: 'Untitled template',
  getComponentById: () => ({}) as Component,
  updateComponentById: () => {},
  updateName: () => {}
});
