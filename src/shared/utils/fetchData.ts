import axios, { AxiosPromise, AxiosRequestConfig, CancelToken } from 'axios';

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
    transitional: {
      silentJSONParsing: false,
    },
    ...axiosOptions,
  });
}
