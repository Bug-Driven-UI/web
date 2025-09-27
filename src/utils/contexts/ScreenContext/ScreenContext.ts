import React from 'react';

import type { Screen } from '@/generated/api/admin/models';

interface ScreenContextValue {
  screen: Screen;
  updateScreen: (screen: Screen) => void;
}

export const INITIAL_SCREEN: Screen = {
  apis: {},
  components: [],
  screenName: '',
  version: 1
};

export const ScreenContext = React.createContext<ScreenContextValue>({
  screen: INITIAL_SCREEN,
  updateScreen: () => {}
});
