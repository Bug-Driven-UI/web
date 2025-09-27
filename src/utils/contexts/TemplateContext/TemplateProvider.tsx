import React from 'react';

import type { Screen } from '@/generated/api/admin/models';

import { INITIAL_SCREEN, ScreenContext } from './TemplateContext';

interface ScreenProviderProps {
  children: React.ReactNode;
}

export const ScreenProvider = ({ children }: ScreenProviderProps) => {
  const [screen, setScreen] = React.useState(INITIAL_SCREEN);

  const updateScreen = (newScreen: Screen) => setScreen(newScreen);
  const value = React.useMemo(() => ({ screen, updateScreen }), [screen]);

  return <ScreenContext value={value}>{children}</ScreenContext>;
};
