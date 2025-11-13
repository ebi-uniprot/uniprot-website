import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import apiUrls from '../../config/apiUrls/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import { Namespace } from '../../types/namespaces';
import { SearchResults } from '../../types/results';
import {
  exactMatchSearchTerms,
  modifyQueryWithSuggestions,
} from '../../utils/searchSuggestions';
import { stringifyUrl } from '../../utils/url';
import { SearchLink } from './SearchTextLink';

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
    stringifyUrl(apiUrls.search.searchPrefix(Namespace.uniprotkb), {
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
        <SearchLink query={modifiedQuery}>{searchValue}</SearchLink>
      </small>
    );
  }
  return null;
};

export default ExactFieldSuggestion;
