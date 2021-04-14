import { useEffect, useState } from 'react';

import usePrefetch from './usePrefetch';

import { APIModel } from '../types/apiModel';
import useDataApi from './useDataApi';
import getNextURLFromHeaders from '../utils/getNextURLFromHeaders';

const usePagination = (initialApiUrl?: string) => {
  const [url, setUrl] = useState(initialApiUrl);
  const [metaData, setMetaData] = useState<{
    total: number;
    nextUrl?: string;
  }>(() => ({ total: 0, nextUrl: undefined }));
  usePrefetch(metaData.nextUrl);
  const [allResults, setAllResults] = useState<APIModel[]>([]);

  useEffect(() => {
    setAllResults([]);
    setMetaData({ total: 0, nextUrl: undefined });
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
    setAllResults((allRes) => [...allRes, ...results]);
    setMetaData(() => ({
      total: +(headers?.['x-totalrecords'] || 0),
      nextUrl: getNextURLFromHeaders(headers),
    }));
  }, [data, headers]);

  const { total, nextUrl } = metaData;

  const handleLoadMoreRows = () => nextUrl && setUrl(nextUrl);

  const hasMoreData = total > allResults.length;

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
