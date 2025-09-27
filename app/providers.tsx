import type { ComponentProps, ReactNode } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { QueryClientProvider } from '@/src/utils/contexts/QueryClientContext';

interface ProvidersProps {
  children: ReactNode;
  theme: Omit<ComponentProps<typeof NextThemesProvider>, 'children'>;
}

export const Providers = ({ theme, children }: ProvidersProps) => (
  <QueryClientProvider>
    <NextThemesProvider {...theme}>{children}</NextThemesProvider>
  </QueryClientProvider>
);
