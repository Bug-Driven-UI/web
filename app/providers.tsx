import type { ComponentProps, ReactNode } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ProvidersProps {
  children: ReactNode;
  theme: Omit<ComponentProps<typeof NextThemesProvider>, 'children'>;
}

export const Providers = ({ theme, children }: ProvidersProps) => (
  <NextThemesProvider {...theme}>{children}</NextThemesProvider>
);
