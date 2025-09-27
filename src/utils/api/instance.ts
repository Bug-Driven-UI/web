import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const getInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const promise = instance({
    ...config,
    ...options,
    headers: {
      ...options?.headers
    }
  }).then(({ data }) => data);

  return promise;
};
