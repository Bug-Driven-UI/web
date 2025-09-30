'use client';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider
} from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

interface ErrorWithMessage {
  message?: string;
}
const getErrorMessages = (error: unknown): string[] => {
  if (isAxiosError(error)) {
    const responseData = error.response?.data as { errors?: ErrorWithMessage[] } | undefined;
    if (responseData?.errors) {
      return responseData.errors
        .map((errorItem) => errorItem?.message)
        .filter((message): message is string => Boolean(message));
    }
  }
  if (typeof error === 'object' && error !== null) {
    const maybeErrors = (error as { errors?: ErrorWithMessage[] }).errors;
    if (maybeErrors) {
      return maybeErrors
        .map((errorItem) => errorItem?.message)
        .filter((message): message is string => Boolean(message));
    }
    const message = (error as ErrorWithMessage).message;
    if (message) {
      return [message];
    }
  }
  if (error instanceof Error) {
    return [error.message];
  }
  if (typeof error === 'string') {
    return [error];
  }
  return [];
};

const handleApiError = (error: unknown) => {
  const messages = getErrorMessages(error);
  if (!messages.length) {
    return;
  }
  toast.error(messages.join('\n'));
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  },
  queryCache: new QueryCache({
    onError: handleApiError
  }),
  mutationCache: new MutationCache({
    onError: handleApiError
  })
});
interface QueryClientProviderProps {
  children: React.ReactNode;
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => (
  <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>
);
