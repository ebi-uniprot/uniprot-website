import React, { useState, useEffect } from 'react';
import fetchData from './fetchData';
import 'regenerator-runtime/runtime';

const useDataApi = (url: string) => {
  const [data, setData] = useState<any>({});

  const getData = async () => {
    const result = await fetchData(url);
    setData(result.data);
  };

  useEffect(() => {
    getData();
  }, [url]);

  return data;
};

export default useDataApi;
