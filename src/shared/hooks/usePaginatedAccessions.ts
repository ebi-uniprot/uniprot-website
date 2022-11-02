import { useEffect, useState } from 'react';

import useDataApi from './useDataApi';
import useNSQuery from './useNSQuery';

import { APIModel } from '../types/apiModel';
import { SearchResults } from '../types/results';
import { PaginatedResults } from './usePagination';

const BATCHSIZE = 1000;

const usePaginatedAccessions = <T extends APIModel, R extends APIModel>(
  accessions?: string[],
  converter?: (data: T[]) => R[]
): PaginatedResults<R> => {
  const [metaData, setMetaData] = useState({
    batchStart: 0,
    accessionBatch: accessions?.slice(0, BATCHSIZE),
  });

  const [allResults, setAllResults] = useState<R[]>([]);

  const initialUrl = useNSQuery({
    accessions: metaData.accessionBatch,
    getSequence: true,
  });

  const [batchUrl, setBatchUrl] = useState(initialUrl);

  const total = accessions?.length;

  // Reset conditions, when any of the things in the dep array changes
  useEffect(() => {
    setAllResults([]);
    setMetaData({
      batchStart: 0,
      accessionBatch: accessions?.slice(0, BATCHSIZE),
    });
    setBatchUrl(undefined);
  }, [accessions, converter]);

  const { data, loading, progress, error, status } = useDataApi<
    SearchResults<T | R> & {
      failedIds?: string[];
    }
  >(batchUrl);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    const transformedResults = converter
      ? converter(results as T[])
      : (results as R[]);

    setAllResults((allRes) => [...allRes, ...transformedResults]);
    const { batchStart: prevBatchStart } = metaData;
    const newBatchStart = prevBatchStart + BATCHSIZE;
    setMetaData({
      batchStart: newBatchStart,
      accessionBatch:
        newBatchStart < (total || 0) - BATCHSIZE
          ? accessions?.slice(newBatchStart, newBatchStart + BATCHSIZE)
          : accessions?.slice(newBatchStart),
    });
  }, [data, converter]);

  const { accessionBatch } = metaData;

  const url = useNSQuery({
    accessions: accessionBatch,
    getSequence: true,
  });

  const handleLoadMoreRows = () => url && setBatchUrl(url);

  const hasMoreData = total ? total > allResults.length : false;

  const initialLoading =
    loading && accessionBatch === accessions?.slice(0, BATCHSIZE);

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
