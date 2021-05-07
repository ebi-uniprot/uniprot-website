import { useEffect, useState } from 'react';

import usePrefetch from './usePrefetch';

import { APIModel } from '../types/apiModel';
import useDataApi from './useDataApi';
import getNextURLFromHeaders from '../utils/getNextURLFromHeaders';

export type UsePagination = {
  allResults: APIModel[];
  initialLoading: boolean;
  progress?: number;
  hasMoreData: boolean;
  handleLoadMoreRows: () => void;
  total?: number;
};

const usePagination = (initialApiUrl?: string): UsePagination => {
  const [url, setUrl] = useState(initialApiUrl);
  const [metaData, setMetaData] = useState<{
    total?: number;
    nextUrl?: string;
  }>(() => ({ total: undefined, nextUrl: undefined }));

  usePrefetch(metaData.nextUrl);
  const [allResults, setAllResults] = useState<APIModel[]>([]);

  useEffect(() => {
    setAllResults([]);
    setMetaData({ total: undefined, nextUrl: undefined });
    setUrl(initialApiUrl);
  }, [initialApiUrl]);

  const { data, loading, progress, headers } = useDataApi<{
    results: APIModel[];
  }>(url);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    const total: string | undefined = headers?.['x-total-records'];
    setAllResults((allRes) => [...allRes, ...results]);
    setMetaData(() => ({
      total: total ? parseInt(total, 10) : 0,
      nextUrl: getNextURLFromHeaders(headers),
    }));
  }, [data, headers]);

  const { total, nextUrl } = metaData;

  const handleLoadMoreRows = () => nextUrl && setUrl(nextUrl);

  const hasMoreData = total ? total > allResults.length : false;

  const initialLoading = loading && url === initialApiUrl;

  return {
    allResults,
    initialLoading,
    progress,
    hasMoreData,
    handleLoadMoreRows,
    total,
  };
};

export default usePagination;
