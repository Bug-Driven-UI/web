'use client';

import React from 'react';

import type { Component } from '@/generated/api/admin/models';

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
  const [activeComponentId, setActiveComponentId] =
    React.useState<TemplateContextValue['activeComponentId']>();
  const [name, setName] = React.useState<TemplateContextValue['name']>(
    initialName ?? 'Untitled template'
  );

  const [components] = React.useState<TemplateContextValue['components']>(() => new Map());

  const updateComponentById = (componentId: string, component: Component) =>
    components.set(componentId, component);

  const value = React.useMemo(
    () => ({
      activeComponentId,
      updateActiveComponentId: setActiveComponentId,
      components,
      name,
      action,
      updateName: setName,
      updateComponentById
    }),
    [screen]
  );

  return <TemplateContext value={value}>{children}</TemplateContext>;
};
