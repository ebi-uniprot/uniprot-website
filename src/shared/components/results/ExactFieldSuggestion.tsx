import { useEffect, useState } from 'react';
import qs from 'query-string';

import {
  exactMatchSearchTerms,
  modifyQueryWithSuggestions,
  SearchTextLink,
} from './SearchSuggestions';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';

import { Namespace } from '../../types/namespaces';
import { SearchResults } from '../../types/results';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';

const ExactFieldSuggestion = ({
  query,
  total,
  results: existingResults,
}: {
  query: string;
  total: number;
  results: UniProtkbAPIModel[];
}) => {
  const [dataAvailable, setDataAvailable] = useState(false);
  const { modifiedQuery, searchValue } = modifyQueryWithSuggestions(
    query,
    'exact',
    exactMatchSearchTerms
  );

  const { data: newData } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    `${apiUrls.search(Namespace.uniprotkb)}?${qs.stringify({
      query: modifiedQuery,
    })}`
  );

  useEffect(() => {
    if (newData?.results.length && newData.results.length !== total) {
      const differentResultSet = newData.results.filter((r) =>
        existingResults.some(
          (existing) => existing.primaryAccession !== r.primaryAccession
        )
      );
      if (differentResultSet.length) {
        setDataAvailable(true);
      }
    }
  }, [newData, existingResults, total]);

  if (dataAvailable && query !== modifiedQuery) {
    return (
      <small>
        {' '}
        or show only exact matches for{' '}
        <SearchTextLink query={modifiedQuery} text={searchValue} />
      </small>
    );
  }
  return null;
};

export default ExactFieldSuggestion;
