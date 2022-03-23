import axios, { AxiosPromise, AxiosRequestConfig, CancelToken } from 'axios';
import { keysToLowerCase } from './utils';

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
  headers: Record<string, string> = {},
  cancelToken: CancelToken | undefined = undefined,
  axiosOptions: AxiosRequestConfig = {}
): AxiosPromise<T> {
  return axios({
    url,
    method: 'GET',
    responseType:
      headers.Accept && !headers.Accept.includes('json') ? 'text' : 'json',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    cancelToken,
    ...axiosOptions,
  });
}
