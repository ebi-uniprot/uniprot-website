import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import useDataApi from './useDataApi';

import getNextURLFromHeaders from '../utils/getNextURLFromHeaders';

import { APIModel } from '../types/apiModel';
import { SearchResults } from '../types/results';
import useNSQuery from './useNSQuery';

export type usePaginatedAccessions<R extends APIModel = APIModel> = {
  allResults: R[];
  initialLoading: boolean;
  progress?: number;
  hasMoreData: boolean;
  handleLoadMoreRows: () => void;
  total?: number;
  failedIds?: string[];
  error?: AxiosError<{ messages?: string[] }>;
  status?: number | undefined;
};

const usePaginatedAccessions = <T extends APIModel, R extends APIModel>(
  accessions?: string[],
  //   initialApiUrl?: string,
  converter?: (data: T[]) => R[]
): usePaginatedAccessions<R> => {
  const batchSize = 1000;

  const [batchStart, setBatchStart] = useState(0);

  const initialApiUrl = useNSQuery({
    accessions: accessions?.slice(batchStart, batchSize),
    getSequence: true,
  });

  const [url, setUrl] = useState(initialApiUrl);
  const [metaData, setMetaData] = useState<{
    total?: number;
    // nextUrl?: string;
  }>(() => ({ total: undefined }));

  const [allResults, setAllResults] = useState<R[]>([]);

  // Reset conditions, when any of the things in the dep array changes
  useEffect(() => {
    setAllResults([]);
    setMetaData({ total: undefined });
    // setUrl(initialApiUrl);
  }, [accessions, converter]);

  const { data, loading, progress, headers, error, status } = useDataApi<
    SearchResults<T | R> & {
      failedIds?: string[];
    }
  >(url);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    const transformedResults = converter
      ? converter(results as T[])
      : (results as R[]);
    const total: number | undefined = accessions?.length;
    setAllResults((allRes) => [...allRes, ...transformedResults]);
    setMetaData(() => ({
      total: total || 0,
      //   nextUrl: getNextURLFromHeaders(headers),
    }));
    setBatchStart(batchStart + batchSize);
  }, [data, converter]);
  console.log(allResults);
  //   useEffect(() => {
  //       setUrl()
  //   }, [batchSize]);

  const { total } = metaData;

  let nextUrl = useNSQuery({
    accessions:
      batchStart < batchSize && accessions?.slice(batchStart, batchSize),
    getSequence: true,
  });

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
  };
};

export default usePaginatedAccessions;
