'use client';

import React from 'react';

export interface TemplateContextValue {
  name: string;
  updateName: (value: string) => void;
}

export const TemplateContext = React.createContext<TemplateContextValue>({
  name: 'Untitled template',
  updateName: () => {}
});
