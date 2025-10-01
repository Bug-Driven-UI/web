import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

export const instance = axios.create({
  // eslint-disable-next-line node/prefer-global/process
  baseURL: typeof window !== 'undefined' ? '/api' : process.env.NEXT_PUBLIC_BACKEND_INTERNAL_URL
});

export const getInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const promise = instance({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers
    }
  }).then(({ data }) => data);

  return promise;
};
