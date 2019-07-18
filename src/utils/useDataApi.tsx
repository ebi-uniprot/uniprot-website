/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import fetchData from './fetchData';

const useDataApi = (url: string) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(url);
      setData(result.data);
    };
    getData();
  }, [url]);

  return data;
};

export default useDataApi;
