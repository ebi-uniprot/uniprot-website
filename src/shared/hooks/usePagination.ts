import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

// import usePrefetch from './usePrefetch';
import useDataApi from './useDataApi';

import getNextURLFromHeaders from '../utils/getNextURLFromHeaders';

import { APIModel } from '../types/apiModel';
import { SearchResults, SearchResultsWarning } from '../types/results';

export type PaginatedResults<R extends APIModel = APIModel> = {
  allResults: R[];
  initialLoading: boolean;
  progress?: number;
  hasMoreData: boolean;
  handleLoadMoreRows: () => void;
  total?: number;
  failedIds?: string[];
  error?: AxiosError<{ messages?: string[] }>;
  status?: number | undefined;
  warnings?: SearchResultsWarning[];
};

const usePagination = <T extends APIModel, R extends APIModel>(
  initialApiUrl?: string,
  converter?: (data: T[]) => R[]
): PaginatedResults<R> => {
  const [url, setUrl] = useState(initialApiUrl);
  const [metaData, setMetaData] = useState<{
    total?: number;
    nextUrl?: string;
    warnings?: SearchResultsWarning[];
  }>(() => ({ total: undefined, nextUrl: undefined, warnings: undefined }));

  // usePrefetch(metaData.nextUrl);
  const [allResults, setAllResults] = useState<R[]>([]);

  // Reset conditions, when any of the things in the dep array changes
  useEffect(() => {
    setAllResults([]);
    setMetaData({ total: undefined, nextUrl: undefined });
    setUrl(initialApiUrl);
  }, [initialApiUrl, converter]);

  const { data, loading, progress, headers, error, status } = useDataApi<
    SearchResults<T | R> & {
      failedIds?: string[];
    }
  >(url);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results, warnings } = data;
    const transformedResults = converter
      ? converter(results as T[])
      : (results as R[]);
    const total: string | undefined = headers?.['x-total-results'];
    setAllResults((allRes) => [...allRes, ...transformedResults]);
    setMetaData({
      total: total ? parseInt(total, 10) : 0,
      nextUrl: getNextURLFromHeaders(headers),
      warnings,
    });
  }, [data, headers, converter]);

  const { total, nextUrl, warnings } = metaData;

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
    failedIds: data?.failedIds,
    error,
    status,
    warnings,
  };
};

export default usePagination;
