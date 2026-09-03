import { type AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { type APIModel } from '../types/apiModel';
import {
  type SearchResults,
  type SearchResultsWarning,
  type Suggestion,
} from '../types/results';
import getNextURLFromHeaders from '../utils/getNextURLFromHeaders';
import useDataApi from './useDataApi';

export type PaginatedResults<R extends APIModel = APIModel> = {
  allResults: R[];
  initialLoading: boolean;
  progress?: number;
  hasMoreData: boolean;
  handleLoadMoreRows: () => void;
  total?: number;
  // For ID Mapping
  failedIds?: string[];
  // For ID Mapping
  suggestedIds?: Array<{ from: string; to: string }>;
  // For ID Mapping
  obsoleteCount?: number;
  error?: AxiosError<undefined | { messages?: string[] }>;
  status?: number | undefined;
  warnings?: SearchResultsWarning[];
  suggestions?: Suggestion[];
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
    suggestions?: Suggestion[];
  }>(() => ({
    total: undefined,
    nextUrl: undefined,
    warnings: undefined,
    suggesstions: undefined,
  }));

  const [allResults, setAllResults] = useState<R[]>([]);

  // Reset conditions, when any of the things in the dep array changes
  useEffect(() => {
    /* eslint-disable @eslint-react/set-state-in-effect -- resets the accumulated pages when the query/converter changes; cannot be derived during render */
    setAllResults([]);
    setMetaData({ total: undefined, nextUrl: undefined });
    setUrl(initialApiUrl);
    /* eslint-enable @eslint-react/set-state-in-effect */
  }, [initialApiUrl, converter]);

  const { data, loading, progress, headers, error, status } = useDataApi<
    SearchResults<T | R> & Pick<PaginatedResults, 'failedIds' | 'suggestedIds'>
  >(url);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results, warnings, suggestions } = data;
    const transformedResults = converter
      ? converter(results as T[])
      : (results as R[]);
    const total: string | undefined = headers?.['x-total-results'];
    /* eslint-disable @eslint-react/set-state-in-effect -- accumulates each fetched page into state as the request resolves */
    setAllResults((allRes) => [...allRes, ...transformedResults]);
    setMetaData({
      total: total ? parseInt(total, 10) : 0,
      nextUrl: getNextURLFromHeaders(headers),
      warnings,
      suggestions,
    });
    /* eslint-enable @eslint-react/set-state-in-effect */
  }, [data, headers, converter]);

  const { total, nextUrl, warnings, suggestions } = metaData;

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
    suggestedIds: data?.suggestedIds,
    obsoleteCount: data?.obsoleteCount,
    error,
    status,
    warnings,
    suggestions,
  };
};

export default usePagination;
