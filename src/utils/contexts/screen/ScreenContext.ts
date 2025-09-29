'use client';

import React from 'react';

import type { ScreenVersion, ShortApiRepresentation } from '@/generated/api/admin/models';

interface ScreenContextVersion {
  isProduction: boolean;
  name: string;
}

export interface ScreenContextValue {
  apis: ShortApiRepresentation[];
  name: string;
  screenNavigationParams: string[];
  version: ScreenContextVersion;
  versions: ScreenVersion[];
  saveScreen: () => void;
  updateApis: (apis: ShortApiRepresentation[]) => void;
  updateName: (name: string) => void;
  updateScreenNavigationParams: (params: string[]) => void;
  updateVersion: (version: ScreenContextVersion) => void;
}

export const ScreenContext = React.createContext<ScreenContextValue>({
  apis: [],
  name: '',
  screenNavigationParams: [],
  version: { isProduction: false, name: 'v1' },
  versions: [],
  saveScreen: () => {},
  updateApis: () => {},
  updateName: () => {},
  updateScreenNavigationParams: () => {},
  updateVersion: () => {}
});
