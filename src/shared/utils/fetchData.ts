import axios, { AxiosPromise, AxiosRequestConfig, CancelToken } from 'axios';

import { keysToLowerCase } from './utils';
import { gtagFn } from './logging';

axios.interceptors.response.use((response) => {
  if (
    response.data &&
    response.status >= 200 &&
    response.status < 300 &&
    typeof response.data === 'string' &&
    // Need to lowercase headers as axios doesn't do this before the interceptor.
    keysToLowerCase(response?.headers)['content-type']?.includes('json')
  ) {
    response.data = JSON.parse(response.data);
  }
  return response;
});

export default function fetchData<T>(
  url: string,
  cancelToken: CancelToken | undefined = undefined,
  axiosOptions: AxiosRequestConfig = {}
): AxiosPromise<T> {
  const options = { ...axiosOptions };
  if (!options.responseType) {
    options.responseType =
      typeof axiosOptions?.headers?.Accept === 'string' &&
      !axiosOptions.headers.Accept.includes('json')
        ? 'text'
        : 'json';
  }
  if (!options?.headers) {
    options.headers = {};
  }
  if (!options.headers.Accept) {
    options.headers = { ...options.headers, Accept: 'application/json' };
  }
  const promise = axios({
    url,
    method: 'GET',
    cancelToken,
    ...options,
  });

  promise.then(
    () => {
      gtagFn('event', 'success', {
        event_category: 'data load',
        event_label: url,
      });
    },
    () => {
      gtagFn('event', 'error', {
        event_category: 'data load',
        event_label: url,
      });
    }
  );

  return promise;
}
