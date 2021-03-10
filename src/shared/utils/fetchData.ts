import axios, { AxiosPromise, AxiosRequestConfig, CancelToken } from 'axios';

export default function fetchData<T>(
  url: string,
  headers: Record<string, string> = {},
  cancelToken?: CancelToken,
  axiosOptions: AxiosRequestConfig = {}
): AxiosPromise<T> {
  return axios({
    url,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    cancelToken,
    ...axiosOptions,
  });
}
