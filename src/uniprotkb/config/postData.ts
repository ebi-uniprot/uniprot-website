import axios from 'axios';

export default function postData(
  url: string,
  options: {
    headers: Record<string, string>;
    data?: FormData;
  } = {
    headers: {},
  }
) {
  const { headers = {}, data } = options;
  return axios.post(url, data, {
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  });
}
