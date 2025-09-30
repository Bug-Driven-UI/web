import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';
import process from 'node:process';

export const instance = axios.create({
  baseURL: `${process.env.BACKEND_INTERNAL_URL}/api`
});

// instance.interceptors.request.use((request) => {
//   console.log('Starting Request', JSON.stringify(request, null, 2));
//   return request;
// });

// instance.interceptors.response.use((response) => {
//   console.log('Response:', JSON.stringify(response, null, 2));
//   return response;
// });

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
