import axios, { CancelToken } from 'axios';

export default function fetchData<T>(
  url: string,
  headers: Record<string, unknown> = {},
  cancelToken?: CancelToken,
  axiosOptions = {}
) {
  return axios.get<T>(url, {
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    cancelToken,
    ...axiosOptions,
  });
}
