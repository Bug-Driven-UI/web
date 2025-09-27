import React from 'react';

import type { Screen } from '@/generated/api/admin/models';

interface TemplateContextValue {
  name: string;
  template: Screen;
  updateScreen: (screen: Screen) => void;
}

export const INITIAL_TEMPLATE: Template = {
  apis: {},
  components: [],
  screenName: '',
  version: 1
};

export const TemplateContext = React.createContext<TemplateContextValue>({
  screen: INITIAL_TEMPLATE,
  updateScreen: () => {}
});
