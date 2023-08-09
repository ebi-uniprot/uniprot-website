import {
  exactMatchSearchTerms,
  modifyQueryWithSuggestions,
  SearchTextLink,
} from './SearchSuggestions';

import useDataApi from '../../hooks/useDataApi';

import { stringifyUrl } from '../../utils/url';
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
  const { modifiedQuery, searchValue } = modifyQueryWithSuggestions(
    query,
    'exact',
    exactMatchSearchTerms
  );

  const { headers } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    stringifyUrl(apiUrls.search(Namespace.uniprotkb), {
      query: modifiedQuery,
      size: 0,
    })
  );

  const hasExactSuggestion =
    Number(headers?.['x-total-results']) &&
    Number(headers?.['x-total-results']) !== total;

  if (hasExactSuggestion && query !== modifiedQuery) {
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
