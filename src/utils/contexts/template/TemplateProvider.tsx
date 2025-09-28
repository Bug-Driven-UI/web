'use client';

import React from 'react';

import type { TemplateContextValue } from './TemplateContext';

import { TemplateContext } from './TemplateContext';

interface TemplateProviderProps {
  children: React.ReactNode;
  initialName?: string;
}

export const TemplateProvider = ({ children, initialName }: TemplateProviderProps) => {
  const [name, setName] = React.useState<TemplateContextValue['name']>(
    initialName ?? 'Untitled template'
  );

  const value = React.useMemo(() => ({ name, updateName: setName }), [name]);

  return <TemplateContext value={value}>{children}</TemplateContext>;
};
