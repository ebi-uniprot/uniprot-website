import axios from 'axios';

export default function fetchData(url) {
  const headers = {
    Accept: 'application/json',
  };
  return axios.get(url, {
    headers,
  });
}
