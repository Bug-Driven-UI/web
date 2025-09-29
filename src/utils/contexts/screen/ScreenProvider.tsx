'use client';

import React from 'react';

import { ScreenContext } from './ScreenContext';

interface ScreenProviderProps {
  children: React.ReactNode;
}

export const ScreenProvider = ({ children }: ScreenProviderProps) => {
  return <ScreenContext value={{}}>{children}</ScreenContext>;
};
