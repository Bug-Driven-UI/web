'use client';

import React from 'react';

import type { Component } from '@/generated/api/admin/models';

import { generateEmptyComponent } from '@/src/utils/helpers';

import type { TemplateContextValue } from './TemplateContext';

import { TemplateContext } from './TemplateContext';

interface ScreenProviderProps {
  action: TemplateContextValue['action'];
  children: React.ReactNode;
  initialName?: string;
  // todo
  // initialComponents:
}

export const TemplateProvider = ({ action, children, initialName }: ScreenProviderProps) => {
  const [name, setName] = React.useState<TemplateContextValue['name']>(
    initialName ?? 'Untitled template'
  );

  const [components] = React.useState<TemplateContextValue['components']>(() => new Map());

  const updateComponentById = (componentId: string, component: Component) =>
    components.set(componentId, component);

  const getComponentById = (id: string, type: Component['type']) => {
    const component = components.get(id);
    if (component) {
      if ('children' in component) delete component.children;

      return component;
    }

    const emptyComponent = generateEmptyComponent({ id, type });
    if ('children' in emptyComponent) delete emptyComponent.children;
    components.set(id, emptyComponent);

    return emptyComponent;
  };

  const value = React.useMemo(
    () => ({
      components,
      name,
      action,
      updateName: setName,
      updateComponentById,
      getComponentById
    }),
    [name]
  );

  return <TemplateContext value={value}>{children}</TemplateContext>;
};
