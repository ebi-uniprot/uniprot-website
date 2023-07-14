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
  results,
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

  const { data } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    `${apiUrls.search(Namespace.uniprotkb)}?${qs.stringify({
      query: modifiedQuery,
    })}`
  );

  useEffect(() => {
    if (data?.results.length && data.results.length !== total) {
      const differentResultSet = data.results.filter((r) =>
        results.some(
          (existing) => existing.primaryAccession !== r.primaryAccession
        )
      );
      if (differentResultSet.length) {
        setDataAvailable(true);
      }
    }
  }, [data]);

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
