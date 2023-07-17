import { useEffect, useState } from 'react';

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
}: {
  query: string;
  total: number;
}) => {
  const [dataAvailable, setDataAvailable] = useState(false);
  const { modifiedQuery, searchValue } = modifyQueryWithSuggestions(
    query,
    'exact',
    exactMatchSearchTerms
  );

  const searchParams = new URLSearchParams({
    query: `${modifiedQuery}`,
  });

  const { data } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    `${apiUrls.search(Namespace.uniprotkb)}?${searchParams}`
  );

  useEffect(() => {
    if (data?.results.length && data.results.length !== total) {
      setDataAvailable(true);
    }
  }, [data, total]);

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
