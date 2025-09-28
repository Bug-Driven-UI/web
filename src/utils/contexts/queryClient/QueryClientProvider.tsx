'use client';

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } }
});

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => (
  <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>
);
