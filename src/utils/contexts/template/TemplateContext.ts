'use client';

import React from 'react';

import type { Component } from '@/generated/api/admin/models';

export interface TemplateContextValue {
  action: 'create' | 'update';
  activeComponentId?: string;
  components: Map<string, Component>;
  name: string;
  updateActiveComponentId: (componentId: string) => void;
  updateComponentById: (componentId: string, component: Component) => void;
  updateName: (value: string) => void;
}

export const TemplateContext = React.createContext<TemplateContextValue>({
  action: 'create',
  components: new Map(),
  name: 'Untitled template',
  updateActiveComponentId: () => {},
  updateComponentById: () => {},
  updateName: () => {}
});
