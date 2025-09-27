export const ROUTES = {
  MAIN: '/',
  SCREENS: {
    CREATE: '/screens/create',
    $ID: (id?: string) => `/screens/${id ?? ':id'}`
  },
  COMMANDS: {
    CREATE: '/commands/create',
    $ID: (id?: string) => `/commands/${id ?? ':id'}`
  },
  COLOR_STYLES: {
    CREATE: '/color-styles/create',
    $ID: (id?: string) => `/color-styles/${id ?? ':id'}`
  },
  TEXT_STYLES: {
    CREATE: '/text-styles/create',
    $ID: (id?: string) => `/text-styles/${id ?? ':id'}`
  },
  EXTERNAL_APIS: {
    CREATE: '/external-apis/create',
    $ID: (id?: string) => `/external-apis/${id ?? ':id'}`
  },
  TEMPLATES: {
    CREATE: '/templates/create',
    $ID: (id?: string) => `/templates/${id ?? ':id'}`
  }
};
