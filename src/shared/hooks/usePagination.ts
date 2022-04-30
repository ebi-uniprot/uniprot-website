import { useEffect, useState } from 'react';

import usePrefetch from './usePrefetch';
import useDataApi from './useDataApi';

import getNextURLFromHeaders from '../utils/getNextURLFromHeaders';

import { APIModel } from '../types/apiModel';
import { SearchResults } from '../types/results';

export type PaginatedResults = {
  allResults: APIModel[];
  initialLoading: boolean;
  progress?: number;
  hasMoreData: boolean;
  handleLoadMoreRows: () => void;
  total?: number;
  failedIds?: string[];
};

const usePagination = <T extends APIModel, R extends APIModel>(
  initialApiUrl?: string,
  converter?: (data: T[]) => R[]
): PaginatedResults => {
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

  const { data, loading, progress, headers } = useDataApi<
    SearchResults<APIModel> & {
      failedIds?: string[];
    }
  >(url);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    const transformedResults = converter ? converter(results as T[]) : results;
    const total: string | undefined = headers?.['x-total-records'];
    setAllResults((allRes) => [...allRes, ...transformedResults]);
    setMetaData(() => ({
      total: total ? parseInt(total, 10) : 0,
      nextUrl: getNextURLFromHeaders(headers),
    }));
  }, [data, headers, converter]);

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
    failedIds: data?.failedIds,
  };
};

export default usePagination;
