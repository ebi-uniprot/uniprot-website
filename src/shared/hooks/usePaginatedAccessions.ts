import { useEffect, useState } from 'react';

import { APIModel } from '../types/apiModel';
import { SearchResults } from '../types/results';
import useDataApi from './useDataApi';
import useNSQuery from './useNSQuery';
import { PaginatedResults } from './usePagination';

const BATCHSIZE = 1000;

const usePaginatedAccessions = <T extends APIModel, R extends APIModel>(
  accessions?: string[],
  converter?: (data: T[]) => R[]
): PaginatedResults<R> => {
  const total = accessions?.length;
  const initialApiUrl = useNSQuery({
    accessions: accessions?.slice(0, BATCHSIZE),
    getSequence: true,
    noSort: true,
  });
  const [batchStart, setBatchStart] = useState(0);

  // usePrefetch(metaData.nextUrl);
  const [allResults, setAllResults] = useState<R[]>([]);

  // Reset conditions, when any of the things in the dep array changes
  useEffect(() => {
    setAllResults([]);
    setBatchStart(0);
  }, [initialApiUrl, converter]);

  const { data, loading, progress, error, status } = useDataApi<
    SearchResults<T | R>
  >(
    useNSQuery({
      accessions: accessions?.slice(batchStart, batchStart + BATCHSIZE),
      getSequence: true,
      noSort: true,
    })
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    const transformedResults = converter
      ? converter(results as T[])
      : (results as R[]);

    setAllResults((allRes) => [...allRes, ...transformedResults]);
  }, [data, converter]);

  const handleLoadMoreRows = () => {
    setBatchStart((batchStart) => batchStart + BATCHSIZE);
  };

  // if the number of results is less than BATCHSIZE, there is no more data to be loaded
  const hasMoreData = total
    ? allResults.length >= BATCHSIZE && total > allResults.length
    : false;

  const initialLoading = loading && batchStart === 0;

  return {
    allResults,
    initialLoading,
    progress,
    hasMoreData,
    handleLoadMoreRows,
    total,
    error,
    status,
  };
};

export default usePaginatedAccessions;
