'use client';

import React from 'react';

import type { ScreenVersion, ShortApiRepresentation } from '@/generated/api/admin/models';

export interface ScreenContextValue {
  action: 'create' | 'update';
  apis: ShortApiRepresentation[];
  name: string;
  screenNavigationParams: string[];
  version: ScreenVersion;
  versions: ScreenVersion[];
  saveScreen: () => void;
  updateApis: (apis: ShortApiRepresentation[]) => void;
  updateName: (name: string) => void;
  updateScreen: () => void;
  updateScreenNavigationParams: (params: string[]) => void;
  updateVersion: (isProduction: boolean) => void;
}

export const ScreenContext = React.createContext<ScreenContextValue>({
  apis: [],
  name: '',
  action: 'create',
  screenNavigationParams: [],
  version: {} as ScreenVersion,
  versions: [],
  saveScreen: () => {},
  updateScreen: () => {},
  updateApis: () => {},
  updateName: () => {},
  updateScreenNavigationParams: () => {},
  updateVersion: () => {}
});
