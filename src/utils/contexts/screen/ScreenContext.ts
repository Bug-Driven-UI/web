import React from 'react';

import type { ShortApiRepresentation } from '@/generated/api/admin/models';

interface ScreenContextVersion {
  isProduction: boolean;
  name: string;
}

export interface ScreenContextValue {
  apis: ShortApiRepresentation[];
  name: string;
  screenNavigationParams: string[];
  version: ScreenContextVersion;
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
  saveScreen: () => {},
  updateApis: () => {},
  updateName: () => {},
  updateScreenNavigationParams: () => {},
  updateVersion: () => {}
});
