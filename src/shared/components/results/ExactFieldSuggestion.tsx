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

const ExactFieldSuggestion = ({ query }: { query: string }) => {
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
    if (data?.results.length) {
      setDataAvailable(true);
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
