import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

export const instance = axios.create({
  baseURL:
    // eslint-disable-next-line node/prefer-global/process
    typeof window !== 'undefined' ? '/api' : `${process.env.NEXT_PUBLIC_BACKEND_INTERNAL_URL}/api`
});

instance.interceptors.request.use((config) => {
  console.log('## instance', JSON.stringify(config, null, 2));
  return config;
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
